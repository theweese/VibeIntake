import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - images/ SVG/etc static assets ending in extensions
         */
        '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
    ],
};

export function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const hostname = req.headers.get('host') || '';

    // Define our "main" canonical domains so we know what ISN'T a routing subdomain
    const allowedDomains = [
        'localhost:3000',
        'localhost:3001',
        'vibeintake.com',
        'www.vibeintake.com'
    ];

    // Check if the current hostname is a subdomain we should route
    const isSubdomain = !allowedDomains.includes(hostname) &&
        (hostname.endsWith('.vibeintake.com') ||
            hostname.endsWith('.localhost:3000') ||
            hostname.endsWith('.localhost:3001'));

    if (isSubdomain) {
        // Extract the subdomain (e.g., 'stjoemachining' from 'stjoemachining.vibeintake.com')
        const subdomain = hostname.split('.')[0];

        // Rewrite the internal routing URL to our dynamic tenant folder
        // The user's URL bar will still perfectly say "stjoemachining.vibeintake.com/dashboard"
        return NextResponse.rewrite(new URL(`/tenant/${subdomain}${url.pathname}`, req.url));
    }

    return NextResponse.next();
}
