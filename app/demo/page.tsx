"use client"

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, Button, PageHeader, Input, Badge } from '@/components/ui'
import { FileScan, MessageSquare, Bot, User as UserIcon, UploadCloud, ShieldCheck, Lock, CheckCircle2, FileJson, ArrowRight, Loader2, RefreshCcw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type DemoStep = 'method' | 'expertise' | 'chat' | 'captcha' | 'preview' | 'upload_scanner'

export default function DemoPage() {
    const [step, setStep] = useState<DemoStep>('method')
    const [expertise, setExpertise] = useState<'beginner' | 'expert' | null>(null)
    const [chatMessages, setChatMessages] = useState<{ role: 'ai' | 'user', text: string }[]>([])
    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [captchaKey, setCaptchaKey] = useState('')
    const [captchaValid, setCaptchaValid] = useState(false)
    const [captchaTarget, setCaptchaTarget] = useState('V1B3')
    const [iterationCount, setIterationCount] = useState(0)
    const [generatedFields, setGeneratedFields] = useState<{ label: string, type: string }[]>([])

    const generateCaptcha = () => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
        let result = ''
        for (let i = 0; i < 4; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        setCaptchaTarget(result)
        setCaptchaKey('')
    }

    const startChat = (level: 'beginner' | 'expert') => {
        setExpertise(level)
        setStep('chat')
        if (level === 'beginner') {
            setChatMessages([
                { role: 'ai', text: "Welcome! Since you're new here, I'll guide you step-by-step. What kind of form are you trying to build today? (e.g., 'Patient Intake', 'Job Application')" }
            ])
        } else {
            setChatMessages([
                { role: 'ai', text: "Expert mode activated. Describe the form layout, fields, and any specific privacy constraints or file upload requirements." }
            ])
        }
    }

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault()
        if (!inputValue.trim()) return

        const newMessages = [...chatMessages, { role: 'user' as const, text: inputValue }]
        setChatMessages(newMessages)
        setInputValue('')
        setIsTyping(true)

        // Mock AI Responses based on conversational depth
        setTimeout(() => {
            setIsTyping(false)
            if (newMessages.length === 2 && expertise === 'beginner') {
                setChatMessages(prev => [...prev, { role: 'ai', text: "Great! I've noted your requirements. Are there any other specific fields you need on this form, or should I go ahead and build a secure React schema based on what we have so far?" }])
            } else {
                setChatMessages(prev => [...prev, { role: 'ai', text: "Got it. I have enough context to generate your React schema. Ready to build it?" }])
            }
        }, 1500)
    }

    const generateForm = async () => {
        if (iterationCount >= 3) {
            alert("Demo limit reached. Please create an account to continue customizing.")
            return
        }
        setIterationCount(prev => prev + 1)
        generateCaptcha()
        setCaptchaValid(false)
        setStep('captcha')

        // Log the interaction so the admins can review what people are trying to build
        try {
            const res = await fetch('/api/demo-log', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: chatMessages, expertise })
            })
            const data = await res.json()
            if (data.fields) {
                setGeneratedFields(data.fields)
            }
        } catch (e) {
            console.error("Failed to log interaction", e)
        }
    }

    const handleCaptchaVerify = () => {
        if (captchaKey.toUpperCase() === captchaTarget) {
            setCaptchaValid(true)
            setTimeout(() => {
                setStep('preview')
            }, 1000)
        } else {
            alert("Incorrect verification code, please try again.")
        }
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 py-12 px-4">

            <div className="text-center mb-12">
                <Badge variant="outline" className="mb-4 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800"><Sparkles className="w-3 h-3 mr-1" /> Interactive Demo</Badge>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">Build Your Form</h1>
                <p className="text-lg text-slate-600 dark:text-slate-400">Experience the VibeIntake pipeline without creating an account.</p>
            </div>

            <AnimatePresence mode="wait">
                {/* STEP 1: METHOD SELECTION */}
                {step === 'method' && (
                    <motion.div key="method" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-xl hover:shadow-2xl hover:border-indigo-500/50 cursor-pointer transition-all group flex flex-col h-full rounded-[2rem]" onClick={() => window.location.href = '/upload'}>
                            <CardContent className="p-10 pt-12 text-center flex flex-col items-center flex-1 justify-center">
                                <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/50 rounded-2xl flex items-center justify-center mb-8 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white dark:group-hover:bg-indigo-500 transition-colors shadow-sm">
                                    <FileScan className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Upload Paper Form</h3>
                                <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">Upload a scanned PDF or image and let our Vision AI extract the fields automatically.</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-xl hover:shadow-2xl hover:border-fuchsia-500/50 cursor-pointer transition-all group flex flex-col h-full rounded-[2rem]" onClick={() => setStep('expertise')}>
                            <CardContent className="p-10 pt-12 text-center flex flex-col items-center flex-1 justify-center">
                                <div className="w-14 h-14 bg-fuchsia-100 dark:bg-fuchsia-900/50 shadow-sm rounded-2xl flex items-center justify-center mb-8 text-fuchsia-600 dark:text-fuchsia-400 group-hover:bg-fuchsia-600 group-hover:text-white dark:group-hover:bg-fuchsia-500 transition-colors">
                                    <MessageSquare className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Chat with AI Assistant</h3>
                                <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">Tell our AI what you need using natural language. We'll build the digital form interactively.</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {/* STEP 2: EXPERTISE LEVEL */}
                {step === 'expertise' && (
                    <motion.div key="expertise" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="max-w-2xl mx-auto text-center">
                        <h2 className="text-2xl font-bold mb-8 text-slate-800 dark:text-slate-200">What is your expertise level with forms?</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2" onClick={() => startChat('beginner')}>
                                <span className="text-lg font-semibold">Beginner</span>
                                <span className="text-xs text-slate-500 font-normal">Guide me with examples & questions</span>
                            </Button>
                            <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2 border-indigo-200 dark:border-indigo-800" onClick={() => startChat('expert')}>
                                <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">Expert / Power User</span>
                                <span className="text-xs text-slate-500 font-normal">I know exactly what I want to prompt</span>
                            </Button>
                        </div>
                    </motion.div>
                )}

                {/* STEP 3: INTERACTIVE CHAT WIZARD */}
                {step === 'chat' && (
                    <motion.div key="chat" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto mb-12">
                        <Card className="flex flex-col h-[500px] md:h-[65vh] max-h-[700px] border-indigo-100 dark:border-indigo-900/50 shadow-xl overflow-hidden">
                            <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                                    <Bot className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white">VibeIntake Architect</h3>
                                    <p className="text-xs text-slate-500">{expertise === 'beginner' ? 'Guided Mode' : 'Expert Mode'}</p>
                                </div>
                            </div>

                            <CardContent className="flex-1 overflow-y-auto p-6 md:p-8 pt-10 md:pt-12 space-y-8 bg-white dark:bg-[#0A0D14]">
                                {chatMessages.map((msg, i) => (
                                    <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                                        {msg.role === 'ai' && (
                                            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center shrink-0 mt-1">
                                                <Bot className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                            </div>
                                        )}
                                        <div className={`p-5 px-6 text-base leading-relaxed rounded-3xl max-w-[85%] shadow-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-br-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-sm'}`}>
                                            {msg.text}
                                            {msg.role === 'ai' && chatMessages.length > 2 && i === chatMessages.length - 1 && (
                                                <Button size="sm" variant="primary" className="mt-4 w-full bg-indigo-500 hover:bg-indigo-600 text-white" onClick={generateForm}>
                                                    Generate & Preview Form <Sparkles className="w-4 h-4 ml-2" />
                                                </Button>
                                            )}
                                        </div>
                                        {msg.role === 'user' && (
                                            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0 mt-1">
                                                <UserIcon className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center shrink-0">
                                            <Loader2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 animate-spin" />
                                        </div>
                                        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 rounded-bl-none flex gap-1 items-center h-12">
                                            <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                )}
                            </CardContent>

                            <div className="p-4 bg-white dark:bg-[#0A0D14] border-t border-slate-200 dark:border-slate-800">
                                <form onSubmit={handleSendMessage} className="flex gap-2">
                                    <Input
                                        className="flex-1"
                                        placeholder="Type your reply..."
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        disabled={isTyping}
                                    />
                                    <Button type="submit" disabled={isTyping || !inputValue.trim()}>Send</Button>
                                </form>
                            </div>
                        </Card>
                    </motion.div>
                )}

                {/* STEP 4: CAPTCHA VALIDATION */}
                {step === 'captcha' && (
                    <motion.div key="captcha" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md mx-auto text-center">
                        <Card className="border-amber-200 dark:border-amber-900/50">
                            <CardHeader>
                                <ShieldCheck className="w-12 h-12 text-amber-500 mx-auto mb-2" />
                                <CardTitle>Security Check</CardTitle>
                                <p className="text-sm text-slate-500">Since you are not logged in, please prove you are human before we generate the schema infrastructure.</p>
                            </CardHeader>
                            <CardContent>
                                {!captchaValid ? (
                                    <div className="space-y-4">
                                        <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-between font-mono font-bold text-2xl tracking-[0.5em] text-slate-700 dark:text-slate-300">
                                            {captchaTarget.split('').join(' ')} <RefreshCcw className="w-5 h-5 ml-4 text-slate-400 cursor-pointer" onClick={generateCaptcha} />
                                        </div>
                                        <Input
                                            placeholder="Type the characters above"
                                            value={captchaKey}
                                            onChange={(e) => setCaptchaKey(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleCaptchaVerify()}
                                        />
                                        <Button className="w-full" onClick={handleCaptchaVerify}>Verify & Continue</Button>
                                    </div>
                                ) : (
                                    <div className="py-8 flex flex-col items-center text-green-600 dark:text-green-400">
                                        <CheckCircle2 className="w-12 h-12 mb-4" />
                                        <p className="font-bold text-lg">Verified</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {/* STEP 5: FINAL PREVIEW WITH SECURITY TOGGLES */}
                {step === 'preview' && (
                    <motion.div key="preview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto text-left">

                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                            <div>
                                <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900 dark:text-white"><CheckCircle2 className="text-green-500 w-6 h-6" /> AI Component Generated</h2>
                                <p className="text-slate-600 dark:text-slate-400 mt-2">Here is your functional digital schema and security configuration.</p>
                            </div>
                            <div className="flex gap-2 shrink-0 w-full md:w-auto">
                                <Button variant="outline" onClick={() => { setStep('method'); setIterationCount(0); setChatMessages([]); setGeneratedFields([]); }}><RefreshCcw className="w-4 h-4 mr-2" /> Start Over</Button>
                            </div>
                        </div>

                        <div className="max-w-3xl mx-auto min-h-[600px] flex flex-col">
                            {/* Visual Form Component */}
                            <Card className="flex flex-col flex-1 overflow-hidden shadow-2xl">
                                <div className="bg-slate-100 border-b border-slate-200 dark:bg-slate-900 dark:border-slate-800 p-4 border-b flex justify-between items-center">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                    </div>
                                    <Badge className="bg-white dark:bg-black text-xs font-mono">React Digital Form Preview</Badge>
                                </div>
                                <CardContent className="p-8 md:p-12 space-y-6 bg-white dark:bg-slate-950 flex-1 flex flex-col justify-center">

                                    {generatedFields.length > 0 ? (
                                        <div className="space-y-6 w-full">
                                            {generatedFields.map((field, idx) => (
                                                <div key={idx} className="w-full">
                                                    {field.type === 'textarea' ? (
                                                        <>
                                                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-1.5 ml-1">{field.label}</label>
                                                            <textarea className="w-full min-h-[100px] rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 outline-none focus:ring-2 focus:ring-indigo-500 resize-none" placeholder="Type here..."></textarea>
                                                        </>
                                                    ) : field.type === 'select' ? (
                                                        <Input label={field.label} placeholder="Select an option..." />
                                                    ) : (
                                                        <Input label={field.label} type={field.type === 'sensitive_id' ? 'password' : field.type} placeholder="..." />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            <div className="grid grid-cols-2 gap-6">
                                                <Input label="First Name" placeholder="Jane" />
                                                <Input label="Last Name" placeholder="Doe" />
                                            </div>
                                            <Input label="Email Address" placeholder="jane.doe@example.com" type="email" />
                                            <Input label="Phone Number" placeholder="(555) 000-0000" type="tel" />
                                            <div>
                                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-1.5 ml-1">Additional Comments</label>
                                                <textarea className="w-full min-h-[120px] rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-4 outline-none resize-none" placeholder="Type here..."></textarea>
                                            </div>
                                        </div>
                                    )}

                                    <Button className="w-full h-14 text-lg mt-8 disabled:opacity-50 tracking-wide font-semibold rounded-2xl shrink-0" disabled>Submit Form</Button>

                                </CardContent>
                                <div className="p-8 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 text-center">
                                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Want to customize this further or add strict data protection?</h4>
                                    <p className="text-sm text-slate-500 mb-6">Create a free account to enable Field Mapping, AES-256 Encryption, and File Uploads.</p>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <Button variant="outline" className="w-full bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 h-12" onClick={() => setStep('chat')} disabled={iterationCount >= 3}>
                                            <MessageSquare className="w-4 h-4 mr-2" />
                                            Continue Refining ({3 - iterationCount} left)
                                        </Button>
                                        <Button variant="primary" className="w-full h-12 shadow-md hover:shadow-lg transition-shadow bg-indigo-600 hover:bg-indigo-700 text-white">
                                            Sign Up to Deploy Form
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    )
}

function Sparkles(props: any) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            <path d="M5 3v4" />
            <path d="M19 17v4" />
            <path d="M3 5h4" />
            <path d="M17 19h4" />
        </svg>
    )
}
