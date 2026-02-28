import fetch from 'node-fetch';

const ZONE_ID = '580d0cf6904451843af7a0c8c632fd9b';
// These should ideally be passed in via process.env or loaded from .env
const CF_EMAIL = process.env.cloudFlareEmail || 'brett.weese@gmail.com';
const CF_API_KEY = process.env.cloudFlareApiKey || 'a997382bdf20225e6c88dce4ba4e83d44a727';

const headers = {
    'X-Auth-Email': CF_EMAIL,
    'X-Auth-Key': CF_API_KEY,
    'Content-Type': 'application/json',
};

/**
 * Creates a CNAME record for a new tenant subdomain.
 * @param {string} subdomain - The subdomain prefix (e.g., 'aflcio')
 * @returns {Promise<object>} The Cloudflare API response
 */
export async function addTenantSubdomain(subdomain) {
    const recordName = `${subdomain}.vibeintake.com`;

    // Wait, with wildcard (*.vibeintake.com) pointing to vercel, we technically don't need to add individual CNAMEs
    // unless we want to proxy them or manage them separately.
    // The instructions say "can programmatically add/remove CNAME records", so we build it anyway.

    // We point it to the Vercel app alias directly
    const target = 'cname.vercel-dns.com';

    try {
        const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                type: 'CNAME',
                name: recordName,
                content: target,
                ttl: 1, // Automatic
                proxied: true // Optional: pass through Cloudflare WAF/CDN
            }),
        });

        const data = await response.json();

        if (!data.success) {
            console.error('Failed to create CNAME:', JSON.stringify(data.errors, null, 2));
            return data;
        }

        console.log(`Successfully created CNAME: ${recordName} -> ${target}`);
        return data.result;
    } catch (error) {
        console.error('Error creating Subdomain:', error);
        throw error;
    }
}

/**
 * Removes a CNAME record for a tenant subdomain.
 * @param {string} subdomain - The subdomain prefix (e.g., 'aflcio')
 */
export async function removeTenantSubdomain(subdomain) {
    const recordName = `${subdomain}.vibeintake.com`;

    try {
        // First get the record ID
        const getUrl = new URL(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records`);
        getUrl.searchParams.append('name', recordName);
        getUrl.searchParams.append('type', 'CNAME');

        const getResponse = await fetch(getUrl, { headers });
        const getData = await getResponse.json();

        if (!getData.success || getData.result.length === 0) {
            console.log(`No record found for ${recordName}`);
            return null;
        }

        const recordId = getData.result[0].id;

        // Delete the record
        const deleteResponse = await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records/${recordId}`, {
            method: 'DELETE',
            headers,
        });

        const deleteData = await deleteResponse.json();

        if (deleteData.success) {
            console.log(`Successfully deleted CNAME: ${recordName}`);
        } else {
            console.error('Failed to delete CNAME:', JSON.stringify(deleteData.errors, null, 2));
        }

        return deleteData;
    } catch (error) {
        console.error('Error removing Subdomain:', error);
        throw error;
    }
}

// Example usage when run directly via node:
if (process.argv[2] === 'add' && process.argv[3]) {
    addTenantSubdomain(process.argv[3]);
} else if (process.argv[2] === 'remove' && process.argv[3]) {
    removeTenantSubdomain(process.argv[3]);
}
