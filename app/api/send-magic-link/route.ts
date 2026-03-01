import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// We optionally load the API key if it exists, otherwise we just simulate it.
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, firstName } = body;

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // If no API key is set, we return success but note it's simulated.
        if (!resend) {
            console.log(`[SIMULATED EMAIL] Magic link requested for ${email}`);
            return NextResponse.json({ success: true, simulated: true });
        }

        // Hardcoding the from address to an arbitrary generic one, since Resend requires a verified domain to send from.
        // During testing, Resend allows sending TO the verified email account. So if the user has an API key, sending to their own email will work.
        const { data, error } = await resend.emails.send({
            from: 'VibeIntake <onboarding@resend.dev>',
            to: [email],
            subject: 'VibeIntake - Verify your account',
            html: `
                <div style="font-family: sans-serif; padding: 20px;">
                    <h2 style="color: #312E81;">Welcome to VibeIntake, ${firstName || 'User'}!</h2>
                    <p>Click the link below to verify your email and complete your account setup.</p>
                    <a href="https://vibeintake.vercel.app/dashboard" style="display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">Verify Email</a>
                    <p style="margin-top: 24px; color: #6B7280; font-size: 14px;">If you didn't request this email, you can safely ignore it.</p>
                </div>
            `,
        });

        if (error) {
            console.error('[RESEND ERROR]', error);
            // Even if it fails, maybe due to unverified domain, don't crash the demo!
            return NextResponse.json({ success: true, error: error.message, simulated: true });
        }

        return NextResponse.json({ success: true, data });

    } catch (error: any) {
        console.error('[API ERROR]', error);
        // Fallback to simulated mode so the demo never completely breaks
        return NextResponse.json({ success: true, simulated: true, error: error.message });
    }
}
