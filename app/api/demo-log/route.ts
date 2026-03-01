import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function POST(req: Request) {
    try {
        const data = await req.json()
        const logEntry = {
            timestamp: new Date().toISOString(),
            messages: data.messages,
            expertise: data.expertise
        }

        // Attempt to log locally (will fail gracefully on Vercel read-only system)
        try {
            const logDir = path.join(process.cwd(), 'logs')
            const logFile = path.join(logDir, 'demo_interactions.jsonl')

            try {
                await fs.access(logDir)
            } catch {
                await fs.mkdir(logDir, { recursive: true })
            }

            await fs.appendFile(logFile, JSON.stringify(logEntry) + '\n')
        } catch (warn) {
            console.warn("Safely skipping file log (expected in serverless): ", warn)
        }

        // --- SIMULATED AI EXTRACTION LOGIC ---
        // To make the demo feel "live", we parse the user's chat messages for keywords
        // and dynamically construct a JSON schema that the frontend will render.
        const allText = data.messages
            .filter((m: any) => m.role === 'user')
            .map((m: any) => m.text.toLowerCase())
            .join(' ')

        let generatedFields: { label: string, type: 'text' | 'email' | 'tel' | 'textarea' | 'number' | 'select' | 'sensitive_id' }[] = []

        // Base fields we always assume
        generatedFields.push({ label: 'First Name', type: 'text' })
        generatedFields.push({ label: 'Last Name', type: 'text' })

        // Keyword mapping
        if (allText.includes('email')) generatedFields.push({ label: 'Email Address', type: 'email' })
        if (allText.includes('phone') || allText.includes('number')) generatedFields.push({ label: 'Phone Number', type: 'tel' })
        if (allText.includes('resume') || allText.includes('upload') || allText.includes('document')) generatedFields.push({ label: 'Document Upload (Simulated)', type: 'text' })
        if (allText.includes('ssn') || allText.includes('social security') || allText.includes('secure')) generatedFields.push({ label: 'Social Security Number', type: 'sensitive_id' })
        if (allText.includes('salary') || allText.includes('hourly') || allText.includes('yearly') || allText.includes('pay')) generatedFields.push({ label: 'Requested Salary', type: 'number' })
        if (allText.includes('department') || allText.includes('role') || allText.includes('title')) generatedFields.push({ label: 'Job Title / Department', type: 'text' })
        if (allText.includes('group') || allText.includes('groups') || allText.includes('team')) generatedFields.push({ label: 'Assigned Groups/Teams', type: 'text' })
        if (allText.includes('time') || allText.includes('log') || allText.includes('hours')) generatedFields.push({ label: 'Time Logs (Hours)', type: 'number' })
        if (allText.includes('food') || allText.includes('truck') || allText.includes('order') || allText.includes('meal')) generatedFields.push({ label: 'Order/Meal Selection', type: 'select' })
        if (allText.includes('schedule') || allText.includes('calendar') || allText.includes('ics') || allText.includes('date')) generatedFields.push({ label: 'Date / Time (ICS Sync)', type: 'text' }) // In a real app we'd map this to a date or datetime-local input
        if (allText.includes('status') || allText.includes('done') || allText.includes('approval') || allText.includes('state')) generatedFields.push({ label: 'Current Status', type: 'select' })
        if (allText.includes('trigger') || allText.includes('action') || allText.includes('cron') || allText.includes('monitor')) generatedFields.push({ label: 'Pipeline Action Trigger', type: 'text' })

        // Fallback for general text inputs
        if (generatedFields.length <= 2) {
            generatedFields.push({ label: 'Additional Comments', type: 'textarea' })
        }

        return NextResponse.json({ success: true, fields: generatedFields })
    } catch (error) {
        console.error('Failed to log demo interaction:', error)
        return NextResponse.json({ error: 'Failed to log' }, { status: 500 })
    }
}
