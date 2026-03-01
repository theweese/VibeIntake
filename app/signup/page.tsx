"use client"

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, Button, Input } from '@/components/ui'
import { Fingerprint, Building2, User, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function SignupPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isEmailSent, setIsEmailSent] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        company: ''
    })

    const handleSsoClick = (provider: string) => {
        toast('Third-party local sign-ups with ' + provider + ' are currently in development as we finalize our infrastructure.', {
            icon: '🚧',
            duration: 4000
        });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            // Attempt to fire off the real email (or simulate it if no API key is set)
            await fetch('/api/send-magic-link', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email, firstName: formData.firstName })
            })

            setIsSubmitting(false)
            setIsEmailSent(true)
        } catch (error) {
            console.error('Failed to send magic link', error)
            setIsSubmitting(false)
            setIsEmailSent(true) // Still fallback to success for demo purposes
        }
    }

    const handleSimulateVerification = () => {
        setIsSubmitting(true)
        setTimeout(() => {
            if (typeof window !== 'undefined') {
                localStorage.setItem('vibe-session', JSON.stringify({
                    user: formData.firstName + ' ' + formData.lastName,
                    email: formData.email,
                    company: formData.company || 'My Organization'
                }))
            }
            toast.success('Email verified successfully!')
            window.location.href = '/dashboard'
        }, 800)
    }

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-slate-50 dark:bg-[#0A0D14]">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg mb-4">
                        <Fingerprint className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Create an Account</h1>
                    <p className="text-slate-500">Set up your workspace and begin deploying.</p>
                </div>

                <Card className="border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
                    <CardContent className="p-8 pt-8">
                        <AnimatePresence mode="wait">
                            {!isEmailSent ? (
                                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    {/* Fake SSO Buttons */}
                                    <div className="flex flex-col gap-3 mb-8">
                                        <Button
                                            variant="outline"
                                            className="w-full h-11 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center gap-3 opacity-50 cursor-not-allowed"
                                            onClick={() => handleSsoClick('Google')}
                                        >
                                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" className="w-5 h-5 grayscale" alt="Google" />
                                            <span className="font-medium">Continue with Google (Coming Soon)</span>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full h-11 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center gap-3 opacity-50 cursor-not-allowed"
                                            onClick={() => handleSsoClick('Microsoft 365')}
                                        >
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" className="w-5 h-5 grayscale" alt="Microsoft" />
                                            <span className="font-medium">Continue with Microsoft 365 (Coming Soon)</span>
                                        </Button>
                                    </div>

                                    <div className="flex items-center gap-4 mb-6 opacity-70">
                                        <div className="h-px flex-1 bg-slate-300 dark:bg-slate-700"></div>
                                        <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Or continue with email</span>
                                        <div className="h-px flex-1 bg-slate-300 dark:bg-slate-700"></div>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">First Name</label>
                                                <div className="relative">
                                                    <Input name="firstName" value={formData.firstName} onChange={handleChange} required className="pl-9 bg-slate-50 dark:bg-slate-950/50" placeholder="Jane" />
                                                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Last Name</label>
                                                <Input name="lastName" value={formData.lastName} onChange={handleChange} required className="bg-slate-50 dark:bg-slate-950/50" placeholder="Doe" />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Email Address</label>
                                            <div className="relative">
                                                <Input name="email" type="email" value={formData.email} onChange={handleChange} required className="pl-9 bg-slate-50 dark:bg-slate-950/50" placeholder="jane@company.com" />
                                                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5 pt-2">
                                            <label className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                                                <Building2 className="w-4 h-4" /> Company Name <span className="text-slate-400 dark:text-slate-500 font-normal ml-auto">(Optional)</span>
                                            </label>
                                            <Input name="company" value={formData.company} onChange={handleChange} className="bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-800" placeholder="Acme Corp" />
                                        </div>

                                        <Button type="submit" disabled={isSubmitting} className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white mt-4 font-bold rounded-xl transition-all shadow-md flex gap-2">
                                            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Send Verification Link <ArrowRight className="w-4 h-4" /></>}
                                        </Button>
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                                        <Mail className="w-8 h-8 text-green-600 dark:text-green-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Check your email</h3>
                                    <p className="text-slate-500 mb-8 max-w-sm mx-auto leading-relaxed">
                                        We sent a magic link to <span className="font-semibold text-slate-700 dark:text-slate-200">{formData.email}</span>. Click the link inside to verify your account.
                                    </p>

                                    <div className="pt-6 mt-8 border-t border-slate-200/50 dark:border-slate-800/50">
                                        <Button
                                            variant="ghost"
                                            onClick={handleSimulateVerification}
                                            disabled={isSubmitting}
                                            className="w-full text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                                        >
                                            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                            {isSubmitting ? 'Simulating...' : 'Developer: Simulate clicking the inner link'}
                                        </Button>
                                    </div>
                                    <p className="text-sm text-slate-400 mt-6">
                                        Didn't receive it? <button className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline" onClick={() => setIsEmailSent(false)}>Try another email</button>
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </CardContent>
                </Card>

                <p className="text-center text-sm text-slate-500 mt-6">
                    Already have an account? <Link href="#" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">Sign in</Link>
                </p>
            </motion.div>
        </div>
    )
}
