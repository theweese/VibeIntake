import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Minimal environment variable parser to pull CF credentials securely
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
// Vercel handles Next.js Middleware Edge Functions natively out of the box so we point there.
const TARGET_DESTINATION = "cname.vercel-dns.com";

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

async function createCnameRecord(zoneId, name, target, proxied = true) {
    console.log(`[CF API] Creating CNAME record for ${name} pointing to ${target}...`);
    const res = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`, {
        method: 'POST',
        headers: {
            'X-Auth-Email': CF_EMAIL,
            'X-Auth-Key': CF_API_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            type: 'CNAME',
            name: name,
            content: target,
            ttl: 1, // 1 represents Automatic TTL
            proxied: proxied // Cloudflare Proxy for Automatic Edge SSL
        })
    });
    const data = await res.json();
    if (data.success) {
        console.log(`✅ Successfully created record: ${data.result.name}`);
        return data.result;
    } else {
        // Code 81053 means the record already exists, which is fine
        if (data.errors.some(e => e.code === 81053)) {
            console.log(`⚠️ Record already exists. Skipping.`);
        } else {
            console.error("❌ Failed to create record:", data.errors);
        }
    }
}

async function main() {
    if (!CF_API_KEY || !CF_EMAIL) {
        console.error("Missing Cloudflare API credentials in .env. Cannot proceed with wildcard orchestration.");
        process.exit(1);
    }

    try {
        const zoneId = await fetchZoneId();

        // 1. Establish the massive Wildcard Catch-All (*)
        // This is what allows *ANY* new company name to immediately resolve without a 5 minute DNS wait.
        await createCnameRecord(zoneId, '*', TARGET_DESTINATION, true);

        // 2. Establish a hard fallback for the specific demo moment
        await createCnameRecord(zoneId, 'stjoemachining', TARGET_DESTINATION, true);

        console.log("\n🎉 Cloudflare DNS configured for Multi-Tenant Next.js Wildcards!");
        console.log("Any new dynamic tenant like aflcio.vibeintake.com will now route through the Edge Middleware instantly.");

    } catch (err) {
        console.error("Error orchestrating Cloudflare API:", err);
    }
}

main();
