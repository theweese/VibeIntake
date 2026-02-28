import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '../../.env');
let CF_API_KEY = '';
let CF_EMAIL = '';

try {
    const envData = fs.readFileSync(envPath, 'utf8');
    const emailMatch = envData.match(/email="(.*?)"/);
    const keyMatch = envData.match(/cloudFlareApiKey="(.*?)"/);
    if (emailMatch) CF_EMAIL = emailMatch[1];
    if (keyMatch) CF_API_KEY = keyMatch[1];
} catch (e) {
    console.warn("Could not read .env file for Cloudflare credentials");
}

const DOMAIN = "vibeintake.com";

async function fetchZoneId() {
    console.log(`[CF API] Fetching Zone ID for ${DOMAIN}...`);
    const res = await fetch(`https://api.cloudflare.com/client/v4/zones?name=${DOMAIN}`, {
        headers: {
            'X-Auth-Email': CF_EMAIL,
            'X-Auth-Key': CF_API_KEY,
            'Content-Type': 'application/json'
        }
    });
    const data = await res.json();
    if (data.success && data.result.length > 0) {
        return data.result[0].id;
    }
    throw new Error("Could not fetch Zone ID: " + JSON.stringify(data.errors));
}

// Helper to find and delete existing conflicting records
async function deleteExistingRecords(zoneId, name) {
    const res = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records?name=${name}`, {
        headers: {
            'X-Auth-Email': CF_EMAIL,
            'X-Auth-Key': CF_API_KEY,
            'Content-Type': 'application/json'
        }
    });
    const data = await res.json();
    if (data.success) {
        for (const record of data.result) {
            console.log(`[CF API] Deleting old record for ${name} (ID: ${record.id})...`);
            await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records/${record.id}`, {
                method: 'DELETE',
                headers: {
                    'X-Auth-Email': CF_EMAIL,
                    'X-Auth-Key': CF_API_KEY,
                    'Content-Type': 'application/json'
                }
            });
        }
    }
}

async function createRecord({ zoneId, type, name, content, proxied }) {
    await deleteExistingRecords(zoneId, name);

    console.log(`[CF API] Creating ${type} record for ${name} -> ${content} (Proxied: ${proxied})...`);
    const res = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`, {
        method: 'POST',
        headers: {
            'X-Auth-Email': CF_EMAIL,
            'X-Auth-Key': CF_API_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            type,
            name,
            content,
            ttl: 1,
            proxied
        })
    });
    const data = await res.json();
    if (data.success) {
        console.log(`✅ Successfully created record: ${data.result.name}`);
    } else {
        console.error("❌ Failed to create record:", data.errors);
    }
}

async function main() {
    if (!CF_API_KEY || !CF_EMAIL) {
        console.error("Missing Cloudflare API credentials in .env");
        process.exit(1);
    }

    try {
        const zoneId = await fetchZoneId();

        // Vercel Verification Requirements:
        // 1. Root Domain (vibeintake.com) -> A Record pointing to 76.76.21.21
        await createRecord({
            zoneId,
            type: 'A',
            name: DOMAIN,
            content: '76.76.21.21',
            proxied: false // MUST BE FALSE FOR VERCEL TO VERIFY
        });

        // 2. WWW Domain (www.vibeintake.com) -> CNAME to cname.vercel-dns.com
        await createRecord({
            zoneId,
            type: 'CNAME',
            name: `www.${DOMAIN}`,
            content: '495ee92daf29aC00.vercel-dns-017.com',
            proxied: false // MUST BE FALSE
        });

        // 3. Wildcard (*.vibeintake.com) -> CNAME to cname.vercel-dns.com
        await createRecord({
            zoneId,
            type: 'CNAME',
            name: `*.${DOMAIN}`,
            content: '495ee92daf29aC00.vercel-dns-017.com',
            proxied: false // MUST BE FALSE
        });

        console.log("\n🎉 Vercel verification records have been pushed to Cloudflare!");

    } catch (err) {
        console.error("Error orchestrating Cloudflare API:", err);
    }
}

main();
