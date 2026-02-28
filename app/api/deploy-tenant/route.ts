import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { subdomain } = await req.json();

        if (!subdomain) {
            return NextResponse.json({ error: 'Subdomain is required' }, { status: 400 });
        }

        const domainName = `${subdomain.toLowerCase().trim()}.vibeintake.com`;

        // Use the Vercel API Token and Project ID from .env
        const VERCEL_API_TOKEN = process.env.VERCEL_API_TOKEN;
        const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;

        if (!VERCEL_API_TOKEN || !VERCEL_PROJECT_ID) {
            return NextResponse.json({ error: 'Server configuration missing' }, { status: 500 });
        }

        // Add the domain to the Vercel project to bypass the "Authorize Cloudflare" UI popup
        // The Cloudflare wildcard (*.vibeintake.com -> vercel-dns) takes care of the actual DNS proxy.
        const response = await fetch(`https://api.vercel.com/v10/projects/${VERCEL_PROJECT_ID}/domains`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${VERCEL_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: domainName,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Vercel API Error:', data);

            // If the domain already exists, Vercel might throw a 400 or 409 conflict, which is actually fine for our demo
            if (data.error?.code === 'forbidden' || data.error?.code === 'domain_already_in_use' || data.error?.message?.includes('already assigned')) {
                return NextResponse.json({ success: true, domain: domainName, message: 'Domain already linked' });
            }

            return NextResponse.json({ error: data.error?.message || 'Failed to link domain' }, { status: response.status });
        }

        return NextResponse.json({
            success: true,
            domain: domainName,
            data
        });

    } catch (e: any) {
        console.error('Deploy Tenant Error:', e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
