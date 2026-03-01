"use client"

import { useState, useRef, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent, Button, PageHeader, Badge, Input } from '@/components/ui'
import { UploadCloud, CheckCircle2, Sparkles, Loader2, FileScan, FileText, ArrowRight, ShieldAlert, Bot, ShieldCheck, RefreshCcw, Calendar, Bell, Smartphone, CalendarPlus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function UploadPage() {
    const router = useRouter()
    const [file, setFile] = useState<File | null>(null)
    const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'scanning' | 'morphing' | 'done'>('idle')
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [scanProgress, setScanProgress] = useState(0)
    const [fileName, setFileName] = useState('')
    const [pasteText, setPasteText] = useState('')
    const [detectedForm, setDetectedForm] = useState<'sterling-cooper' | 'dunder-mifflin-5k' | 'basic' | 'grandma-calendar'>('basic')
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Interactive Demo Chat State
    const [dynamicFields, setDynamicFields] = useState<string[]>([])
    const [chatInput, setChatInput] = useState('')
    const [isVerifying, setIsVerifying] = useState(false)
    const [captchaKey, setCaptchaKey] = useState('')
    const [captchaTarget, setCaptchaTarget] = useState('V1B3')
    const [iterationCount, setIterationCount] = useState(0)

    // Auto-Deploy State
    const [deploySlug, setDeploySlug] = useState('')
    const [isDeploying, setIsDeploying] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsLoggedIn(!!localStorage.getItem('vibe-session'))
        }
    }, [])

    const handleDeployTenant = async () => {
        if (!deploySlug.trim()) return
        setIsDeploying(true)
        try {
            const res = await fetch('/api/deploy-tenant', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subdomain: deploySlug.trim() })
            })
            const data = await res.json()
            if (data.success || data.domain) {
                // Instant mic drop demo link!
                window.location.href = `https://${data.domain}/dashboard`
            } else {
                alert('Domain deploy failed: ' + (data.error || 'Unknown error'))
            }
        } catch (e: any) {
            alert('Encountered error configuring Vercel domain.')
        } finally {
            setIsDeploying(false)
        }
    }

    const generateCaptcha = () => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
        let result = ''
        for (let i = 0; i < 4; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        setCaptchaTarget(result)
        setCaptchaKey('')
    }

    const handleChatSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!chatInput.trim()) return
        if (iterationCount >= 2) {
            alert("Demo limit reached. Please create an account to continue customizing.")
            return
        }
        setIsVerifying(true)
        generateCaptcha()
    }

    const handleCaptchaVerify = () => {
        if (captchaKey.toUpperCase() === captchaTarget) {
            setIsVerifying(false)
            setIterationCount(prev => prev + 1)
            setDynamicFields(prev => [...prev, chatInput])
            setChatInput('')
        } else {
            alert("Incorrect verification code, please try again.")
        }
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            const rawName = file.name
            setFileName(rawName.replace(/\.[^/.]+$/, ""))

            // Core Demo Hack: intelligently route image files vs document files to our two primary complex mock-ups
            const lowerName = rawName.toLowerCase()
            if (file.type.includes('image') || lowerName.includes('jpg') || lowerName.includes('png') || lowerName.includes('jpeg') || lowerName.includes('afl') || lowerName.includes('sterling')) {
                setDetectedForm('sterling-cooper')
            } else if (lowerName.includes('doc') || lowerName.includes('pdf') || lowerName.includes('sole') || lowerName.includes('christ') || lowerName.includes('dunder') || lowerName.includes('registration')) {
                setDetectedForm('dunder-mifflin-5k')
            } else {
                setDetectedForm('basic')
            }
            handleSimulateScan()
        }
    }

    const handlePasteSubmit = () => {
        if (!pasteText.trim()) return
        setFileName("Pasted Document Content")

        const lowerStr = pasteText.toLowerCase()
        if (lowerStr.includes('afl') || lowerStr.includes('cio') || lowerStr.includes('sterling') || lowerStr.includes('community') || lowerStr.includes('service')) {
            setDetectedForm('sterling-cooper')
        } else if (lowerStr.includes('sole') || lowerStr.includes('shoe') || lowerStr.includes('christ') || lowerStr.includes('dunder') || lowerStr.includes('registration') || lowerStr.includes('release')) {
            setDetectedForm('dunder-mifflin-5k')
        } else {
            setDetectedForm('basic')
        }

        handleSimulateScan()
    }

    const handleSimulateScan = () => {
        setUploadState('scanning')
        setTimeout(() => {
            setUploadState('morphing')
            setTimeout(() => {
                setUploadState('done')
            }, 3000)
        }, 2000)
    }

    const generateICS = () => {
        const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//VibeIntake//Personal Schedule//EN
BEGIN:VEVENT
UID:${Date.now()}1@vibeintake.com
DTSTAMP:20260228T120000Z
DTSTART:20260301T230000Z
DTEND:20260302T010000Z
SUMMARY:Sunday Dinner
DESCRIPTION:Family dinner - bring the casserole dish back.
END:VEVENT
BEGIN:VEVENT
UID:${Date.now()}2@vibeintake.com
DTSTAMP:20260228T120000Z
DTSTART:20260303T190000Z
DTEND:20260303T200000Z
SUMMARY:Dr. Smith Appt
DESCRIPTION:Bring updated medication list.
END:VEVENT
END:VCALENDAR`;

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Schedule_Extracted.ics');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }

    const resetFlow = () => {
        setUploadState('idle')
        setPasteText('')
        setFileName('')
        setDynamicFields([])
        setIterationCount(0)
    }

    const renderPIIShield = (label: string, placeholder: string) => (
        <motion.div
            initial={{ borderColor: 'transparent', backgroundColor: 'transparent' }}
            animate={{ borderColor: 'rgba(239, 68, 68, 0.4)', backgroundColor: 'rgba(239, 68, 68, 0.05)' }}
            className="px-3 pb-3 pt-4 rounded-xl border-2 relative"
        >
            <div className="absolute -top-2.5 right-4 bg-rose-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wider uppercase flex items-center gap-1 shadow-sm">
                <ShieldAlert className="w-3 h-3" /> PII SHIELD ACTIVE
            </div>
            <Input density="compact" label={label} type="password" placeholder={placeholder} />
        </motion.div>
    );

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 py-12 px-4">
            <PageHeader
                title="Form Architect"
                description="Upload a paper document or paste raw text. Our AI will automatically extract the structure and generate a privacy-first digital form schema."
                icon={FileScan}
            />

            <div className="max-w-3xl mx-auto">
                <AnimatePresence mode="wait">
                    {uploadState === 'idle' ? (
                        <motion.div key="upload-input" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} >
                            <Card className="flex flex-col shadow-xl">
                                <CardHeader className="border-b border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/20">
                                    <CardTitle className="text-xl flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-indigo-500" />
                                        Provide Source Material
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-8 flex flex-col gap-8">

                                    {/* Upload Option */}
                                    <div>
                                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-3 ml-1">Option 1: Upload a File</label>
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            className="border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-all cursor-pointer h-40 border-indigo-300 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-900/10 hover:bg-indigo-100/50 dark:hover:bg-indigo-900/20"
                                        >
                                            <div className="flex flex-col items-center">
                                                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm mb-3">
                                                    <UploadCloud className="w-6 h-6 text-indigo-500" />
                                                </div>
                                                <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Upload PDF or Image</h4>
                                                <p className="text-xs text-slate-500">JPG, PNG, PDF, or DOCX</p>
                                            </div>
                                        </div>
                                        <input
                                            type="file"
                                            className="hidden"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            accept="image/*,.pdf,.doc,.docx,.txt"
                                        />
                                    </div>

                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-slate-800"></div></div>
                                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-white dark:bg-[#0A0D14] px-4 text-slate-400 font-semibold tracking-wider">Or</span></div>
                                    </div>

                                    {/* Paste Option */}
                                    <div>
                                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-3 ml-1">Option 2: Paste Content</label>
                                        <textarea
                                            className="w-full min-h-[160px] rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-4 outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-sm placeholder:text-slate-400"
                                            placeholder="Paste the raw text of your document, email, or draft here..."
                                            value={pasteText}
                                            onChange={(e) => setPasteText(e.target.value)}
                                        />
                                        <div className="mt-3 flex justify-end">
                                            <Button onClick={handlePasteSubmit} disabled={!pasteText.trim()} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-12 px-6 shadow-md">
                                                Analyze Text <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Quick Try Demo Presets */}
                                    <div className="mt-4 pt-8 border-t border-slate-200 dark:border-slate-800">
                                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-4 ml-1">Option 3: Quick Try (Pitch Presets)</label>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <Button variant="outline" className="h-24 flex-col gap-2 hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20" onClick={() => { setFileName('Sterling Cooper PII Form.pdf'); setDetectedForm('sterling-cooper'); handleSimulateScan(); }}>
                                                <FileScan className="w-6 h-6 text-indigo-500" />
                                                <span className="font-bold text-sm">Enterprise Data</span>
                                                <span className="text-[10px] text-slate-500">Legal/Medical Extraction</span>
                                            </Button>
                                            <Button variant="outline" className="h-24 flex-col gap-2 hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20" onClick={() => { setFileName('Dunder Mifflin 5K Req.doc'); setDetectedForm('dunder-mifflin-5k'); handleSimulateScan(); }}>
                                                <FileText className="w-6 h-6 text-indigo-500" />
                                                <span className="font-bold text-sm">Non-Profit Signups</span>
                                                <span className="text-[10px] text-slate-500">Events & Donations</span>
                                            </Button>
                                            <Button variant="outline" className="h-24 flex-col gap-2 hover:border-fuchsia-400 hover:bg-fuchsia-50 dark:hover:bg-fuchsia-900/20" onClick={() => { setFileName('Grandmas Weekly Schedule.jpg'); setDetectedForm('grandma-calendar'); handleSimulateScan(); }}>
                                                <Calendar className="w-6 h-6 text-fuchsia-500" />
                                                <span className="font-bold text-sm">Personal Use</span>
                                                <span className="text-[10px] text-slate-500">Handwritten Schedules</span>
                                            </Button>
                                        </div>
                                    </div>

                                </CardContent>
                            </Card>
                        </motion.div>
                    ) : (
                        <motion.div key="output-preview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} >
                            <Card className="flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-none shadow-2xl relative overflow-hidden min-h-[600px] w-full mx-auto">
                                <div className="bg-slate-100 border-b border-slate-200 dark:bg-slate-900 dark:border-slate-800 p-4 flex justify-between items-center shrink-0">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                    </div>
                                    <Badge className="bg-white dark:bg-black text-xs font-mono tracking-widest text-indigo-500 border-indigo-200 dark:border-indigo-800">React Digital Form Preview</Badge>
                                </div>
                                <CardContent className="p-8 md:p-12 flex-1 overflow-auto">
                                    {uploadState === 'scanning' && (
                                        <div className="h-full flex flex-col items-center justify-center text-center py-20">
                                            <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-6" />
                                            <h3 className="text-xl font-bold mb-2">Analyzing Source Material...</h3>
                                            <p className="text-slate-500 max-w-sm">Extracting architecture, layout, and intent from your input.</p>
                                        </div>
                                    )}
                                    {(uploadState === 'morphing' || uploadState === 'done') && (
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-4">

                                            <div className="flex justify-between items-start mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
                                                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                                                    {fileName || 'New Form Document'}
                                                </h2>
                                                {uploadState === 'done' && (
                                                    <Button variant="outline" size="sm" onClick={resetFlow} className="shrink-0 text-slate-500">
                                                        Start Over
                                                    </Button>
                                                )}
                                            </div>

                                            {/* FALLBACK DEMO FORM */}
                                            {detectedForm === 'basic' && (
                                                <div className="space-y-4">
                                                    <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-6 mb-8 mt-2 flex flex-col md:flex-row gap-4 items-start md:items-center">
                                                        <div className="bg-indigo-100 dark:bg-indigo-800 p-3 rounded-full shrink-0">
                                                            <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-bold text-indigo-900 dark:text-indigo-300 mb-1">Standard Extraction Applied</h4>
                                                            <p className="text-indigo-800 dark:text-indigo-400 text-sm leading-relaxed">
                                                                We successfully translated your source material into basic text schemas. If you were expecting a more complex structure, our AI Agent can review your exact needs and build you a custom layout.
                                                            </p>
                                                        </div>
                                                        <Button onClick={() => window.location.href = '/demo'} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shrink-0">
                                                            Refine via Chat AI
                                                        </Button>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <Input density="compact" label="First Name" placeholder="Jane" />
                                                        <Input density="compact" label="Last Name" placeholder="Doe" />
                                                    </div>
                                                    <Input density="compact" label="Email Address" placeholder="jane.doe@example.com" type="email" />
                                                    <Input density="compact" label="Phone Number" placeholder="(555) 000-0000" type="tel" />
                                                    {renderPIIShield("Social Security Number", "***-**-####")}
                                                    <Input density="compact" label="Comments or Notes" placeholder="Type here..." />
                                                </div>
                                            )}

                                            {/* STERLING COOPER COMPLEX DEMO FORM */}
                                            {detectedForm === 'sterling-cooper' && (
                                                <div className="space-y-4">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <Input density="compact" label="Participant's Name" placeholder="Full name..." />
                                                        <Input density="compact" label="Date of Birth" placeholder="MM/DD/YYYY" type="date" />
                                                    </div>
                                                    <Input density="compact" label="Address" placeholder="Street Address" />
                                                    <div className="grid grid-cols-3 gap-4">
                                                        <Input density="compact" label="City" placeholder="City" />
                                                        <Input density="compact" label="State" placeholder="State" />
                                                        <Input density="compact" label="Zip Code" placeholder="Zip" />
                                                    </div>
                                                    <Input density="compact" label="County" placeholder="County" />
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <Input density="compact" label="Phone" type="tel" placeholder="(555) 000-0000" />
                                                        <Input density="compact" label="Alternate Phone/Email" placeholder="..." />
                                                    </div>

                                                    {renderPIIShield("Social Security Number", "***-**-####")}

                                                    <div className="grid grid-cols-3 gap-4">
                                                        <Input density="compact" label="Sex" placeholder="Male / Female / Other" />
                                                        <Input density="compact" label="Age" type="number" placeholder="0" />
                                                        <Input density="compact" label="Household Size" type="number" placeholder="0" />
                                                    </div>
                                                    <Input density="compact" label="Parent/Guardian's Name (if minor)" placeholder="..." />
                                                    <Input density="compact" label="Status" placeholder="Single / Married / Separated / Divorced / Widowed" />

                                                    <div className="grid grid-cols-1 gap-4">
                                                        <Input density="compact" label="Any Household Member Disabled?" placeholder="Yes / No" />
                                                        <Input density="compact" label="Active Military or Veteran?" placeholder="Yes / No" />
                                                        <Input density="compact" label="Single Head of Household w/ Children?" placeholder="Yes / No" />
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4">
                                                        <Input density="compact" label="Race" placeholder="Select..." />
                                                        <Input density="compact" label="Ethnicity" placeholder="Select..." />
                                                    </div>
                                                    <Input density="compact" label="Total Family Income Bracket (HUD Standard)" placeholder="Below 30% / 50% / 80% / Over 80%" />

                                                    {/* Dynamic Array Mock */}
                                                    <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
                                                        <h3 className="font-bold text-lg mb-4 text-slate-800 dark:text-slate-200">Household Assistance Needs</h3>
                                                        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl mb-4 space-y-4">
                                                            <div className="flex justify-between items-center text-sm font-semibold opacity-60"><span>Dependant 1</span></div>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <Input density="compact" label="First and Last Name" placeholder="..." />
                                                                <Input density="compact" label="Relation" placeholder="..." />
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <Input density="compact" label="Date of Birth" placeholder="MM/DD/YYYY" />
                                                                <Input density="compact" label="Social Security #" type="password" placeholder="***-**-####" />
                                                            </div>
                                                        </div>
                                                        <Button variant="outline" className="w-full border-dashed border-2 py-6 text-slate-500">
                                                            + Add Additional Participant
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}

                                            {/* DUNDER MIFFLIN / REGISTRATION COMPLEX DEMO FORM */}
                                            {detectedForm === 'dunder-mifflin-5k' && (
                                                <div className="space-y-4">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <Input density="compact" label="Parent / Guardian Name" placeholder="Full name..." />
                                                        <Input density="compact" label="Date" placeholder="MM/DD/YYYY" type="date" />
                                                    </div>
                                                    {renderPIIShield("Participant DOB / SSN", "***-**-####")}
                                                    <Input density="compact" label="Address" placeholder="123 Main St" />
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <Input density="compact" label="City & Zip" placeholder="..." />
                                                        <Input density="compact" label="County" placeholder="..." />
                                                    </div>
                                                    <Input density="compact" label="Phone Number" type="tel" placeholder="(555) 000-0000" />
                                                    <Input density="compact" label="Number in Household (Children / Adults / Seniors)" placeholder="Ex: 2 / 2 / 0" />

                                                    <div className="grid grid-cols-2 gap-4">
                                                        <Input density="compact" label="Race" placeholder="Select..." />
                                                        <Input density="compact" label="Ethnicity" placeholder="Select..." />
                                                    </div>
                                                    <Input density="compact" label="Income Bracket (HUD Size)" placeholder="Below 30% / 50% / 80% / Over 80%" />

                                                    <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
                                                        <h3 className="font-bold text-lg mb-4 text-slate-800 dark:text-slate-200">Child Details</h3>
                                                        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl mb-4 space-y-4">
                                                            <div className="flex justify-between items-center text-sm font-semibold opacity-60"><span>Child 1</span></div>
                                                            <Input density="compact" label="Child's First & Last Name" placeholder="..." />
                                                            <div className="grid grid-cols-3 gap-4">
                                                                <Input density="compact" label="Birthdate" placeholder="MM/DD/YYYY" />
                                                                <Input density="compact" label="Age" type="number" placeholder="0" />
                                                                <Input density="compact" label="Sex" placeholder="M/F" />
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <Input density="compact" label="School" placeholder="..." />
                                                                <Input density="compact" label="Grade (P-12)" placeholder="..." />
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <Input density="compact" label="Shoe Size" placeholder="..." />
                                                                <Input density="compact" label="Category (Boys/Girls/Mens/Womens)" placeholder="Select..." />
                                                            </div>
                                                        </div>
                                                        <Button variant="outline" className="w-full border-dashed border-2 py-4 h-auto text-slate-500 hover:text-indigo-600 hover:border-indigo-300 dark:hover:border-indigo-800 transition-colors">
                                                            + Add Another Child
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}

                                            {/* GRANDMA'S SCHEDULE / PERSONAL COMPLEX DEMO FORM */}
                                            {detectedForm === 'grandma-calendar' && (
                                                <div className="space-y-6 animate-in fade-in duration-500">
                                                    <div className="bg-fuchsia-50 dark:bg-fuchsia-900/20 border border-fuchsia-200 dark:border-fuchsia-800 rounded-2xl p-6 flex flex-col items-center text-center">
                                                        <div className="bg-fuchsia-100 dark:bg-fuchsia-800 p-4 rounded-full mb-4 shadow-sm border border-fuchsia-200 dark:border-fuchsia-700">
                                                            <CalendarPlus className="w-8 h-8 text-fuchsia-600 dark:text-fuchsia-300" />
                                                        </div>
                                                        <h4 className="font-black text-xl text-fuchsia-900 dark:text-fuchsia-100 mb-2">Schedule Digitized</h4>
                                                        <p className="text-fuchsia-800 dark:text-fuchsia-300/80 text-sm max-w-md">
                                                            We successfully read your handwritten notes. Here is your digital itinerary. You can export this directly to your device's calendar.
                                                        </p>
                                                    </div>

                                                    <div className="space-y-3">
                                                        <div className="flex items-center gap-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm">
                                                            <div className="w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 flex flex-col items-center justify-center font-bold tracking-tighter shadow-inner shrink-0 leading-tight">
                                                                <span className="text-[10px] uppercase opacity-80">Mar</span>
                                                                <span className="text-lg">01</span>
                                                            </div>
                                                            <div className="flex-1">
                                                                <h5 className="font-bold text-slate-900 dark:text-slate-100">Sunday Dinner</h5>
                                                                <p className="text-xs text-slate-500">6:00 PM - Bring the casserole dish back.</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm">
                                                            <div className="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex flex-col items-center justify-center font-bold tracking-tighter shadow-inner shrink-0 leading-tight">
                                                                <span className="text-[10px] uppercase opacity-80">Mar</span>
                                                                <span className="text-lg">03</span>
                                                            </div>
                                                            <div className="flex-1">
                                                                <h5 className="font-bold text-slate-900 dark:text-slate-100">Dr. Smith Appointments</h5>
                                                                <p className="text-xs text-slate-500">2:00 PM - Bring updated medication list.</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
                                                        <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 uppercase tracking-widest flex items-center gap-2">
                                                            <Bell className="w-4 h-4 text-slate-400" /> Notifications & Actions
                                                        </h3>
                                                        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                                                            <div className="flex items-center gap-3">
                                                                <Smartphone className="w-5 h-5 text-indigo-500" />
                                                                <div>
                                                                    <p className="font-semibold text-sm text-slate-900 dark:text-slate-100">SMS Reminders</p>
                                                                    <p className="text-[10px] text-slate-500">Text me 2 hours before events</p>
                                                                </div>
                                                            </div>
                                                            <div className="w-10 h-6 bg-indigo-500 rounded-full relative cursor-pointer shadow-inner">
                                                                <div className="w-4 h-4 rounded-full bg-white absolute right-1 top-1 shadow-sm"></div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <Button onClick={generateICS} className="w-full h-14 text-base font-bold rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 text-white shadow-xl mt-4 flex items-center justify-center gap-2">
                                                        <CalendarPlus className="w-5 h-5" /> Add to Apple / Google Calendar (.ics)
                                                    </Button>
                                                </div>
                                            )}

                                            {/* Dynamic fields added by Chat */}
                                            {dynamicFields.length > 0 && (
                                                <div className="space-y-4 mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-500">
                                                    <h3 className="font-semibold text-base mb-3 text-indigo-600 dark:text-indigo-400 flex items-center gap-2"><Sparkles className="w-4 h-4" /> Field Modified by AI</h3>
                                                    {dynamicFields.map((field, idx) => (
                                                        <Input density="compact" key={idx} label={field} placeholder="Auto-generated due to your feedback..." className="border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-900/10 focus:ring-indigo-400" />
                                                    ))}
                                                </div>
                                            )}

                                            {uploadState === 'done' && (
                                                <Button className="w-full h-14 text-lg mt-8 disabled:opacity-50 tracking-wide font-semibold rounded-2xl shrink-0" disabled>Submit Form</Button>
                                            )}
                                        </motion.div>
                                    )}
                                </CardContent>
                                {uploadState === 'done' && (
                                    <div className="bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 text-center shrink-0">
                                        {!isVerifying ? (
                                            <div className="flex flex-col">
                                                <div className="p-10 md:p-12 w-full mx-auto space-y-4 flex flex-col items-center justify-center bg-indigo-50/40 dark:bg-indigo-950/20 relative overflow-hidden border-t-2 border-indigo-100 dark:border-indigo-900">
                                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-fuchsia-500/5 to-transparent pointer-events-none" />
                                                    <h4 className="font-bold flex items-center justify-center gap-2 text-indigo-900 dark:text-indigo-200 text-xl relative">
                                                        <Bot className="w-6 h-6 text-indigo-600 dark:text-indigo-400" /> Refine with AI Assistant
                                                    </h4>
                                                    <p className="text-base text-center text-indigo-700/70 dark:text-indigo-300/70 relative font-medium">Need to modify this form? Tell the AI what needs changing.</p>
                                                    <form onSubmit={handleChatSubmit} className="flex gap-2 w-full mt-4 max-w-md relative">
                                                        <Input className="flex-1 bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm shadow-sm border-indigo-200 dark:border-indigo-800" placeholder="e.g., Add an emergency contact field..." value={chatInput} onChange={e => setChatInput(e.target.value)} />
                                                        <Button size="sm" type="submit" disabled={!chatInput.trim()} className="h-10 px-8 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md font-medium group transition-all">
                                                            Send <Sparkles className="w-4 h-4 ml-2 opacity-70 group-hover:opacity-100 transition-opacity" />
                                                        </Button>
                                                    </form>
                                                    {iterationCount > 0 && (
                                                        <p className="text-[10px] text-center opacity-60 uppercase tracking-widest mt-2 font-semibold text-indigo-600 dark:text-indigo-400 relative">Demo limit: {2 - iterationCount} changes remaining.</p>
                                                    )}
                                                </div>
                                                <div className="p-10 md:p-14 w-full mx-auto space-y-5 flex flex-col items-center justify-center bg-slate-900 dark:bg-black relative overflow-hidden">
                                                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-purple-500/10 to-transparent pointer-events-none" />
                                                    <div className="absolute -top-32 -right-32 p-8 opacity-20 blur-3xl rounded-full bg-indigo-500 w-96 h-96 pointer-events-none" />
                                                    <h4 className="font-extrabold text-white text-2xl md:text-3xl text-center relative tracking-tight">Ready to deploy this form?</h4>
                                                    <p className="text-base md:text-lg text-center text-slate-300 px-4 max-w-xl relative">Claim your custom subdomain and launch instantly.</p>
                                                    {isLoggedIn ? (
                                                        <div className="w-full max-w-md mt-6 relative z-10">
                                                            <div className="flex bg-white rounded-2xl p-1.5 shadow-2xl focus-within:ring-4 focus-within:ring-indigo-500/20 transition-all">
                                                                <div className="flex items-center flex-1 px-3 bg-white border-r border-slate-100 min-w-0">
                                                                    <input
                                                                        value={deploySlug}
                                                                        onChange={e => setDeploySlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                                                                        onKeyDown={e => e.key === 'Enter' && handleDeployTenant()}
                                                                        disabled={isDeploying}
                                                                        className="w-full h-12 text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent font-medium"
                                                                        placeholder="your-company"
                                                                    />
                                                                    <span className="text-slate-400 font-medium whitespace-nowrap hidden sm:block">.vibeintake.com</span>
                                                                </div>
                                                                <Button onClick={handleDeployTenant} disabled={!deploySlug.trim() || isDeploying} className="h-12 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 disabled:bg-indigo-600 text-white shadow-md font-bold text-base rounded-xl">
                                                                    {isDeploying ? <Loader2 className="w-5 h-5 animate-spin mx-4" /> : 'Deploy'}
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="w-full max-w-md mt-6 relative z-10 text-center bg-white/10 dark:bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                                                            <div className="mb-4">
                                                                <ShieldCheck className="w-10 h-10 text-indigo-400 mx-auto mb-2" />
                                                                <p className="text-white font-medium">Create a free account to secure your permanent subdomain and route submissions.</p>
                                                            </div>
                                                            <div className="w-full">
                                                                <Button onClick={() => router.push('/signup')} className="h-12 w-full bg-white text-indigo-900 hover:bg-slate-100 font-bold text-base shadow-lg cursor-pointer transform hover:scale-105 transition-all">
                                                                    Create Account & Deploy
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="p-8 w-full max-w-sm mx-auto space-y-4 text-center">
                                                <ShieldCheck className="w-10 h-10 text-amber-500 mx-auto" />
                                                <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">Security Check</h4>
                                                <p className="text-sm text-slate-500">Please prove you are human before we apply AI modifications.</p>
                                                <div className="p-4 my-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between font-mono font-bold text-2xl tracking-[0.5em] text-slate-700 dark:text-slate-300 shadow-sm">
                                                    {captchaTarget.split('').join(' ')} <RefreshCcw className="w-5 h-5 ml-4 text-slate-400 cursor-pointer hover:text-indigo-500 transition-colors" onClick={generateCaptcha} />
                                                </div>
                                                <Input density="compact" placeholder="Type the characters above" className="text-center tracking-widest uppercase font-mono bg-white dark:bg-slate-950" value={captchaKey} onChange={(e) => setCaptchaKey(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleCaptchaVerify()} />
                                                <div className="grid grid-cols-2 gap-3 mt-4">
                                                    <Button variant="outline" onClick={() => setIsVerifying(false)}>Cancel</Button>
                                                    <Button onClick={handleCaptchaVerify}>Verify & Apply Fix</Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
