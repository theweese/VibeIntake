"use client"

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, Button, Input } from '@/components/ui'
import { CheckCircle2, Send, Building2, User, Mail, MessageSquare } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        notes: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Mock submission to a webhook or email router
        setTimeout(() => {
            setIsSubmitting(false)
            setIsSuccess(true)
        }, 1500)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div className="max-w-3xl mx-auto py-16 px-4 animate-in fade-in duration-500">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">Schedule a Meeting</h1>
                <p className="text-lg text-slate-600 dark:text-slate-400">Tell us a little bit about your intake needs and we'll reach out to schedule a demo.</p>
            </div>

            <Card className="shadow-2xl border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm rounded-[2rem] overflow-hidden">
                <CardContent className="p-8 md:p-12">
                    <AnimatePresence mode="wait">
                        {!isSuccess ? (
                            <motion.form
                                key="contact-form"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-1.5 ml-1">
                                            <User className="w-4 h-4 text-indigo-500" /> First Name
                                        </label>
                                        <Input
                                            name="firstName"
                                            placeholder="Jane"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-1.5 ml-1">
                                            Last Name
                                        </label>
                                        <Input
                                            name="lastName"
                                            placeholder="Doe"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-1.5 ml-1">
                                        <Mail className="w-4 h-4 text-indigo-500" /> Email Address
                                    </label>
                                    <Input
                                        name="email"
                                        type="email"
                                        placeholder="jane.doe@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-1.5 ml-1">
                                        <Building2 className="w-4 h-4 text-indigo-500" /> Company (Optional)
                                    </label>
                                    <Input
                                        name="company"
                                        placeholder="Acme Corp"
                                        value={formData.company}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-1.5 ml-1">
                                        <MessageSquare className="w-4 h-4 text-indigo-500" /> Notes regarding your needs
                                    </label>
                                    <textarea
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        className="w-full min-h-[120px] rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                                        placeholder="I'm interested in deploying secure intake forms for my new clinic..."
                                        required
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-14 text-lg mt-8 font-semibold rounded-2xl gap-2"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Sending Request...' : 'Send Request'}
                                    {!isSubmitting && <Send className="w-5 h-5" />}
                                </Button>
                            </motion.form>
                        ) : (
                            <motion.div
                                key="contact-success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center text-center py-16 space-y-6"
                            >
                                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                                    <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Request Received!</h3>
                                    <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                                        Thank you, {formData.firstName}. We've received your notes and will reach out to <strong>{formData.email}</strong> shortly to schedule a meeting.
                                    </p>
                                </div>
                                <Button variant="outline" onClick={() => window.location.href = '/'} className="mt-4">
                                    Return to Home
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CardContent>
            </Card>
        </div>
    )
}
