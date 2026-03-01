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
                        Relying on pen and paper <br className="hidden md:block" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-fuchsia-500">
                            forms?
                        </span>
                    </h1>

                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300 fill-mode-backwards block">
                        Let us assist you in replacing them with secure, web-based digital alternatives.
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
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">VibeIntake replaces manual paper workflows with an intelligent AI pipeline designed to seamlessly generate custom web forms and handle high-volume data imports.</p>
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
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

                        {/* For Non-Profits */}
                        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-xl group rounded-[2rem] flex flex-col h-full">
                            <CardContent className="p-10 pt-12 flex-1 flex flex-col">
                                <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center mb-8 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform shadow-sm">
                                    <Globe className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">For Non-Profits</h3>
                                <ul className="space-y-3 mb-8 flex-1">
                                    <li className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                                        <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                                        <span>Replace paper clipboards with digital intake pipelines.</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                                        <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                                        <span>Save thousands of hours of manual volunteer data entry.</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                                        <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                                        <span>Tested and proven to reduce operational costs locally.</span>
                                    </li>
                                </ul>
                                <Button variant="outline" className="w-full mt-auto border-emerald-500 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30">Learn More</Button>
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
                        <Link href="/contact" className="inline-block">
                            <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base w-full sm:w-auto border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 items-center justify-center">
                                Contact Sales
                            </Button>
                        </Link>
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
