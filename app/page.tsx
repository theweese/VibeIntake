"use client"

import { useState } from 'react'
import { Card, CardContent, Button, Input } from '@/components/ui'
import { UploadCloud, FileScan, CheckCircle2, ChevronRight, Lock, BrainCircuit, ShieldCheck, Zap, ArrowRight, Building2, Globe, Sparkles, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function MarketingHome() {
    const [demoState, setDemoState] = useState<'idle' | 'processing' | 'preview'>('idle')
    const [isForceSubmit, setIsForceSubmit] = useState(false)
    const [aiNote, setAiNote] = useState('')

    const handleTestUpload = () => {
        setDemoState('processing')
        setTimeout(() => {
            setDemoState('preview')
        }, 2500)
    }

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-20 pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] max-w-5xl mx-auto mb-8 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-150 fill-mode-backwards block">
                        Have forms you have to fill out <br className="hidden md:block" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-fuchsia-500">
                            manually?
                        </span>
                    </h1>

                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300 fill-mode-backwards block">
                        Let us create a web-based form to assist with it.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-500 fill-mode-backwards">
                        <Link href="/demo" className="w-full sm:w-auto">
                            <Button variant="primary" size="lg" className="rounded-full px-8 h-12 text-base w-full gap-2">
                                Try Interactive Demo <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                        <Link href="/contact" className="w-full sm:w-auto">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 text-base border-white/20 hover:bg-white/10 text-white rounded-full">
                                Schedule a Meeting
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-white/50 dark:bg-black/20 border-y border-slate-200/50 dark:border-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Everything you need to scale intake.</h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">VibeIntake replaces manual transcription with a privacy-first AI pipeline designed for medical, legal, and municipal forms.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:-translate-y-1 transition-transform duration-300">
                            <CardContent className="p-8 pt-8">
                                <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mb-6">
                                    <BrainCircuit className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Create Web Forms</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Have a form or forms you or your business have to fill out manually? Let us create a web-based form to assist with it.</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:-translate-y-1 transition-transform duration-300">
                            <CardContent className="p-8 pt-8">
                                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center mb-6">
                                    <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Store and Review Data</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Need us to help you store and review that data? Here's how we can help. Our private vault keeps your submissions safe and accessible.</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:-translate-y-1 transition-transform duration-300">
                            <CardContent className="p-8 pt-8">
                                <div className="w-12 h-12 rounded-xl bg-fuchsia-100 dark:bg-fuchsia-900/50 flex items-center justify-center mb-6">
                                    <Zap className="w-6 h-6 text-fuchsia-600 dark:text-fuchsia-400" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Custom Notifications</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">We can store data for you if you want, or just notify you or a set person instantly when you submit a form.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Use Cases Section */}
            <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">How we can assist you</h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">Whether you are organizing personal records or scaling an enterprise clinic, VibeIntake adapts to your workflow.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* For Yourself */}
                        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-xl group rounded-[2rem] flex flex-col h-full">
                            <CardContent className="p-10 pt-12 flex-1 flex flex-col">
                                <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-8 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform shadow-sm">
                                    <User className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">For Yourself</h3>
                                <ul className="space-y-3 mb-8 flex-1">
                                    <li className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                                        <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                                        <span>Digitize personal medical or legal records instantly.</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                                        <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                                        <span>Store highly sensitive documents in a unified, private vault.</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                                        <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                                        <span>Search scanned handwriting with our embedded AI.</span>
                                    </li>
                                </ul>
                                <Button variant="outline" className="w-full mt-auto">Create Personal Account</Button>
                            </CardContent>
                        </Card>

                        {/* For Your Business */}
                        <Card className="bg-gradient-to-br from-indigo-600 to-indigo-800 dark:from-indigo-900 dark:to-slate-900 border-transparent shadow-xl group relative text-white rounded-[2rem] flex flex-col h-full overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                            <CardContent className="p-10 pt-12 relative z-10 flex-1 flex flex-col">
                                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-8 text-white group-hover:scale-110 transition-transform backdrop-blur-md shadow-sm">
                                    <Building2 className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">For Your Business</h3>
                                <ul className="space-y-3 mb-8 flex-1">
                                    <li className="flex items-start gap-3 text-indigo-100">
                                        <CheckCircle2 className="w-5 h-5 text-indigo-300 shrink-0 mt-0.5" />
                                        <span>Secure data collection and client intake routing.</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-indigo-100">
                                        <CheckCircle2 className="w-5 h-5 text-indigo-300 shrink-0 mt-0.5" />
                                        <span>Zero-retention webhooks directly into your EHR or CRM.</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-indigo-100">
                                        <CheckCircle2 className="w-5 h-5 text-indigo-300 shrink-0 mt-0.5" />
                                        <span>Human-in-the-loop OCR review teams with SSO.</span>
                                    </li>
                                </ul>
                                <Link href="/contact">
                                    <Button className="w-full bg-white text-indigo-600 hover:bg-slate-100 mt-auto">Schedule a Meeting</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Interactive Demo Section */}
            <section className="py-32 relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Want to test out our AI based solution?</h2>
                        <p className="text-slate-600 dark:text-slate-400">Upload an example of your form here, and watch as our system creates an example web-based form that you can use.</p>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-indigo-500/10 dark:bg-indigo-500/5 blur-3xl -z-10 rounded-[3rem]" />
                        <Card className="mx-auto border-indigo-100 dark:border-indigo-900/80 shadow-2xl bg-white dark:bg-slate-900/95 overflow-hidden ring-1 ring-slate-200 dark:ring-slate-800">
                            <CardContent className="p-0">

                                <AnimatePresence mode="wait">
                                    <div className="flex flex-col items-center justify-center p-16 md:p-24 text-center border-2 border-dashed border-indigo-200 dark:border-indigo-800 m-8 rounded-3xl bg-indigo-50/50 dark:bg-indigo-950/20 cursor-pointer hover:bg-indigo-100/50 dark:hover:bg-indigo-900/30 transition-all">
                                        <div className="w-24 h-24 bg-white dark:bg-slate-800 shadow-md rounded-full flex items-center justify-center mb-8 transform transition-transform group-hover:scale-110 group-hover:-rotate-3">
                                            <FileScan className="w-12 h-12 text-indigo-500" />
                                        </div>
                                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Launch Form Architect Wizard</h3>
                                        <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-lg text-lg">Use our AI assistant or upload a scraped document to automatically generate a digital schema.</p>
                                        <Link href="/demo">
                                            <Button variant="primary" size="lg" className="rounded-full px-10 h-14 text-lg font-semibold shadow-lg shadow-indigo-500/25">Start Interactive Demo</Button>
                                        </Link>
                                    </div>

                                    {demoState === 'processing' && (
                                        <motion.div
                                            key="processing"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 1.05 }}
                                            className="flex flex-col items-center justify-center p-32 text-center m-8"
                                        >
                                            <div className="relative mb-10">
                                                <div className="absolute inset-0 border-4 border-indigo-500 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-30" />
                                                <div className="absolute inset-0 border-4 border-fuchsia-500 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-20" />
                                                <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-fuchsia-600 rounded-full flex items-center justify-center shadow-xl shadow-indigo-500/40 relative z-10">
                                                    <UploadCloud className="w-12 h-12 text-white animate-pulse" />
                                                </div>
                                            </div>
                                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-3 animate-pulse">Analyzing Layout & Handwriting...</h3>
                                            <p className="text-indigo-500 font-mono text-base">Identifying Privacy Markers (PII/PHI)</p>
                                        </motion.div>
                                    )}

                                    {demoState === 'preview' && (
                                        <motion.div
                                            key="preview"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800"
                                        >
                                            {/* Digital Preview */}
                                            <div className="p-8 md:p-12 bg-slate-50 dark:bg-black/20">
                                                <div className="mb-8 flex justify-between items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm">
                                                    <h4 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                                        <CheckCircle2 className="w-5 h-5 text-green-500" /> Live Demo Preview
                                                    </h4>
                                                    <span className="text-xs font-mono bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2.5 py-1 rounded-md font-bold shrink-0">React Component</span>
                                                </div>

                                                <div className="space-y-6 max-w-sm mx-auto">
                                                    <div>
                                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Patient Name</label>
                                                        <div className="w-full h-12 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 px-4 flex items-center shadow-sm"></div>
                                                    </div>
                                                    <div>
                                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block flex items-center gap-1.5">
                                                            Social Security <Lock className="w-3.5 h-3.5 text-amber-500" />
                                                        </label>
                                                        <div className="w-full h-12 border-2 border-amber-200 dark:border-amber-900/50 rounded-xl bg-amber-50/50 dark:bg-amber-900/10 px-4 flex items-center text-amber-900 dark:text-amber-500 tracking-widest font-mono text-xl shadow-inner">
                                                            ***-**-####
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* CTA Section */}
                                            <div className="p-8 md:p-12 flex flex-col justify-center items-start bg-white dark:bg-slate-900">
                                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-sm font-semibold mb-6 border border-indigo-100 dark:border-indigo-800/50">
                                                    <Sparkles className="w-4 h-4" /> 99.2% OCR Confidence
                                                </div>
                                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">Structure Extracted Successfully!</h3>
                                                <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed text-lg">
                                                    This is a live, functional React form schema mapped directly from your image. To deploy this to a public URL and begin capturing data securely, create your organization account.
                                                </p>
                                                <div className="flex gap-4 w-full flex-col">
                                                    {!isForceSubmit ? (
                                                        <>
                                                            <Button variant="primary" size="lg" className="w-full justify-between group h-14 text-lg shadow-md" onClick={() => toast.error("Validation Failed: Missing required fields or unreadable format.")}>
                                                                Submit Intake Form <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                            </Button>
                                                            <button onClick={() => setIsForceSubmit(true)} className="text-sm font-medium text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 underline underline-offset-4 text-center mt-3 transition-colors pt-2">
                                                                Having trouble? Force submit to Manual Review.
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl w-full animate-in slide-in-from-top-2 shadow-inner">
                                                            <label className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3 block flex items-center gap-2">
                                                                Add Note for AI/Human Reviewer
                                                                <span className="text-[10px] bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">PII Stripped</span>
                                                            </label>
                                                            <textarea
                                                                value={aiNote}
                                                                onChange={(e) => setAiNote(e.target.value)}
                                                                className="w-full h-28 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 p-4 text-base mb-5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-shadow"
                                                                placeholder="e.g. My SSN was smudged on the paper..."
                                                            />
                                                            <div className="flex gap-3">
                                                                <Button variant="outline" onClick={() => setIsForceSubmit(false)} className="flex-1 h-12">Cancel</Button>
                                                                <Button variant="secondary" className="flex-1 h-12 bg-amber-500 hover:bg-amber-600 text-white font-bold shadow-md" onClick={() => { toast.success("Sent to Human-in-the-loop review queue!"); setIsForceSubmit(false); setDemoState('idle'); setAiNote('') }}>
                                                                    Force Submit
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section >

            {/* CTA Pricing / Footer Section */}
            < section className="py-24 bg-slate-900 dark:bg-black mt-auto text-center border-t border-slate-800" >
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Reduce your reliance on paper forms.</h2>
                    <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                        But if you do still use paper forms and write things down, we can seamlessly ingest them.
                        We'll assist with either importing that data precisely into our system, or converting it to text and emailing an easy-to-read summary back to you.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
                        <Link href="/pricing" className="inline-block">
                            <Button variant="primary" size="lg" className="rounded-full px-8 h-12 text-base w-full sm:w-auto bg-white text-slate-900 hover:bg-slate-100 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
                                View Pricing Plans
                            </Button>
                        </Link>
                        <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base w-full sm:w-auto border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 items-center justify-center">
                            Contact Sales
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-800/60 pt-10 text-sm text-slate-500 text-left">
                        <div>
                            <div className="font-bold text-slate-300 mb-4 flex items-center gap-2"><SparklesIcon className="w-4 h-4 text-indigo-400" /> VibeIntake</div>
                            <div className="font-mono text-xs opacity-50">&copy; 2026 Vibeathon</div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
                            <Link href="/" className="hover:text-white transition-colors">Enterprise</Link>
                            <Link href="/pipelines" className="hover:text-white transition-colors">Integrations</Link>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Link href="/" className="hover:text-white transition-colors">Documentation</Link>
                            <Link href="/" className="hover:text-white transition-colors">Security Audit</Link>
                            <Link href="/" className="hover:text-white transition-colors">HIPAA Compliance</Link>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Link href="/" className="hover:text-white transition-colors">Sign In</Link>
                            <Link href="/" className="hover:text-white transition-colors">Create Account</Link>
                            <Link href="/" className="hover:text-white transition-colors">Contact</Link>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    )
}

function SparklesIcon(props: any) {
    return (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09l2.846.813-.813 2.846a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183 .394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
    )
}
