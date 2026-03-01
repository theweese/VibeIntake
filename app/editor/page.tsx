"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, Button, Input } from '@/components/ui'
import { Sparkles, Save, Undo, LayoutTemplate, Send, User, ChevronRight, X, Copy, Check, Link as LinkIcon, Code, ShieldAlert } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

type FormField = { id: string; label: string; type?: string; required?: boolean; colSpan?: number; placeholder?: string; };

export default function AIFormEditor() {
    const [chatInput, setChatInput] = useState('')
    const [isAiThinking, setIsAiThinking] = useState(false)
    const [showShareModal, setShowShareModal] = useState(false)
    const [copied, setCopied] = useState<string | null>(null)

    // Simulated State of the Output Component
    const [formLayout, setFormLayout] = useState<FormField[]>([
        { id: 'f1', label: "Patient First Name", required: true },
        { id: 'f2', label: "Patient Last Name", required: true },
        { id: 'f3', label: "Date of Birth", type: "date" }
    ])

    useEffect(() => {
        const storedFields = localStorage.getItem('vibe-demo-fields')
        const demoFormName = localStorage.getItem('vibe-demo-form')

        if (storedFields) {
            try {
                const parsed = JSON.parse(storedFields)
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setFormLayout(parsed.map((f: any, i: number) => ({
                        id: `f_gen_${i}`,
                        label: f.label,
                        type: f.type,
                        required: true
                    })))
                    return; // Exit early if we loaded custom fields
                }
            } catch (e) {
                console.error("Failed to parse demo fields", e)
            }
        }

        // Fallbacks for the File Upload Demo Pipeline Route
        if (demoFormName === 'Adopt A Family Reg') {
            setFormLayout([
                { id: 'aaf_1', label: "Parent / Guardian Name", placeholder: "Full name...", required: true, colSpan: 6 },
                { id: 'aaf_2', label: "Date", type: "date", colSpan: 6 },
                { id: 'aaf_3', label: "Participant DOB / SSN", type: "sensitive_id" },
                { id: 'aaf_4', label: "Address", placeholder: "123 Main St" },
                { id: 'aaf_5', label: "City & Zip", placeholder: "...", colSpan: 6 },
                { id: 'aaf_6', label: "County", placeholder: "...", colSpan: 6 },
                { id: 'aaf_7', label: "Phone Number", type: "tel", placeholder: "(555) 000-0000" },
                { id: 'aaf_8', label: "Number in Household", placeholder: "Ex: 2 / 2 / 0" },
                { id: 'aaf_9', label: "Race", placeholder: "Select...", colSpan: 6 },
                { id: 'aaf_10', label: "Ethnicity", placeholder: "Select...", colSpan: 6 },
                { id: 'aaf_11', label: "Income Bracket (HUD Size)", placeholder: "Below 30% / 50% / 80% / Over 80%" },

                { id: 'aaf_s1', label: "Child Details", type: "section" },
                { id: 'aaf_c1', label: "Child's First & Last Name", placeholder: "..." },
                { id: 'aaf_c2', label: "Birthdate", placeholder: "MM/DD/YYYY", colSpan: 4 },
                { id: 'aaf_c3', label: "Age", type: "number", placeholder: "0", colSpan: 4 },
                { id: 'aaf_c4', label: "Sex", placeholder: "M/F", colSpan: 4 },
                { id: 'aaf_c5', label: "School", placeholder: "...", colSpan: 6 },
                { id: 'aaf_c6', label: "Grade (P-12)", placeholder: "...", colSpan: 6 },
                { id: 'aaf_c7', label: "Shoe Size", placeholder: "...", colSpan: 6 },
                { id: 'aaf_c8', label: "Category (Boys/Girls/Mens/Womens)", placeholder: "Select...", colSpan: 6 },
                { id: 'aaf_b1', label: "+ Add Another Child", type: "button" }
            ])
        } else if (demoFormName === 'Sterling Cooper Enterprise') {
            setFormLayout([
                { id: 'sc_1', label: "Full Legal Name", required: true },
                { id: 'sc_2', label: "Official Title / Department", required: true },
                { id: 'sc_3', label: "Date of Incident", type: "date" },
                { id: 'sc_4', label: "Authorized Signature", type: "text", required: true }
            ])
        }
    }, [])

    const handleAiEdit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!chatInput.trim()) return

        setIsAiThinking(true)
        setTimeout(() => {
            // Mock AI Action executing
            const inputLower = chatInput.toLowerCase()

            if (inputLower.includes('combine') || inputLower.includes('full name')) {
                // Keep all elements, but if we find "Parent / Guardian Name", swap it
                setFormLayout(prev => {
                    const next = [...prev]
                    const targetIndex = next.findIndex(f => f.label.includes('First Name') || f.label.includes('Parent / Guardian Name') || f.label.includes('Last Name'))
                    if (targetIndex !== -1) {
                        next[targetIndex] = { ...next[targetIndex], label: "Full Name", id: 'f_combined_name', colSpan: 12 }
                        // remove any sequential matching ones (e.g. Last Name if First Name was found)
                        const secondTarget = next.findIndex((f, idx) => idx > targetIndex && (f.label.includes('Last Name')))
                        if (secondTarget !== -1) next.splice(secondTarget, 1)
                    }
                    return next
                })
                toast.success("AI: Combined name fields into Full Name.")
            } else if (inputLower.includes('note') || inputLower.includes('comment') || inputLower.includes('add')) {
                setFormLayout(prev => {
                    const next = [...prev]
                    // Insert before the trailing submit button if there is one, else at end
                    const buttonIdx = next.findIndex(f => f.type === 'button')
                    const newField = { id: `f_added_${Date.now()}`, label: "Notes / Comments", type: "text", colSpan: 12 }

                    if (buttonIdx !== -1) {
                        next.splice(buttonIdx, 0, newField)
                    } else {
                        next.push(newField)
                    }
                    return next
                })
                toast.success("AI: Added Notes field to the layout.")
            } else {
                toast.error("AI Mock: Try asking to 'Add a notes field'")
            }
            setIsAiThinking(false)
            setChatInput('')
        }, 1500)
    }

    return (
        <>
            <div className="max-w-7xl mx-auto h-[calc(100vh-8rem)] flex flex-col pt-4">

                <div className="flex items-center justify-between mb-6 shrink-0">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 flex items-center gap-2">
                            <LayoutTemplate className="w-6 h-6 text-indigo-500" />
                            Form Architect Workspace
                        </h1>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline"><Undo className="w-4 h-4 mr-2" /> Revert</Button>
                        <Button variant="primary" onClick={() => setShowShareModal(true)}><Save className="w-4 h-4 mr-2" /> Publish Template</Button>
                    </div>
                </div>

                <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0">

                    {/* Left Side: Live Form Preview */}
                    <div className="lg:col-span-8 h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden flex flex-col shadow-sm relative">
                        <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex justify-between items-center text-sm font-medium text-slate-500">
                            Live Digital Preview
                            <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-indigo-400" /> Layout managed by AI</span>
                        </div>

                        <div className="p-12 flex-1 overflow-y-auto">
                            <div className="max-w-md mx-auto space-y-6">
                                <motion.div layout className="grid grid-cols-12 gap-x-4 gap-y-6">
                                    {formLayout.map((field) => {
                                        const colClass = field.colSpan === 6 ? 'col-span-12 md:col-span-6' : field.colSpan === 4 ? 'col-span-12 md:col-span-4' : 'col-span-12';

                                        return (
                                            <motion.div
                                                key={field.id}
                                                layout
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className={colClass}
                                            >
                                                {field.type === 'section' ? (
                                                    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                                                        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">{field.label}</h3>
                                                    </div>
                                                ) : field.type === 'sensitive_id' ? (
                                                    <div className="relative mt-2 mb-2 border border-rose-500/30 dark:border-rose-500/20 bg-rose-50/30 dark:bg-rose-950/20 rounded-xl p-4 shadow-sm animate-in fade-in duration-700">
                                                        <div className="absolute -top-3 right-4 bg-rose-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
                                                            <ShieldAlert className="w-3 h-3" /> PII Shield Active
                                                        </div>
                                                        <Input
                                                            density="compact"
                                                            label={field.label}
                                                            type="password"
                                                            placeholder={field.placeholder || "***-**-####"}
                                                            className="border-rose-200 dark:border-rose-900 bg-white dark:bg-slate-950 focus:ring-rose-400"
                                                        />
                                                    </div>
                                                ) : field.type === 'button' ? (
                                                    <Button variant="outline" className="w-full border-dashed border-2 py-4 h-auto mt-2 text-slate-500 hover:text-indigo-600 hover:border-indigo-300 dark:hover:border-indigo-800 transition-colors">
                                                        {field.label}
                                                    </Button>
                                                ) : (
                                                    <div className="relative">
                                                        {field.required && <span className="absolute top-0 right-1 text-rose-500 font-bold text-sm">*</span>}
                                                        <Input
                                                            density="compact"
                                                            label={field.label}
                                                            placeholder={field.placeholder || (field.type === 'date' ? 'mm/dd/yyyy' : '')}
                                                            type={field.type === 'date' ? 'date' : (field.type && field.type !== 'sensitive_id' && field.type !== 'section' && field.type !== 'button' ? field.type : 'text')}
                                                        />
                                                    </div>
                                                )}
                                            </motion.div>
                                        )
                                    })}
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: AI Chat Director */}
                    <div className="lg:col-span-4 h-full flex flex-col bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg mb-4">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">AI Architect</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                                I generated the initial schema from your image. Chat with me to modify fields, adjust validation rules, or reorder the layout.
                            </p>
                        </div>

                        <div className="flex-1 p-6 flex flex-col justify-end space-y-4 overflow-y-auto custom-scrollbar">
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center shrink-0">
                                    <User className="w-4 h-4 text-slate-500" />
                                </div>
                                <div className="p-3 bg-slate-200 dark:bg-slate-800 rounded-2xl rounded-tl-sm text-sm text-slate-800 dark:text-slate-200">
                                    Combine the first and last name fields into a single "Full Name" block.
                                </div>
                            </div>

                            {isAiThinking && (
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center shrink-0">
                                        <Sparkles className="w-4 h-4 text-white animate-pulse" />
                                    </div>
                                    <div className="p-3 text-sm text-indigo-600 dark:text-indigo-400 font-medium flex items-center gap-2">
                                        Modifying component structure...
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
                            <form onSubmit={handleAiEdit} className="relative">
                                <Input
                                    placeholder="Tell AI to update the form..."
                                    className="pr-12 bg-slate-50 dark:bg-slate-900/50 rounded-full"
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    disabled={isAiThinking}
                                />
                                <button type="submit" disabled={!chatInput.trim() || isAiThinking} className="absolute right-2 top-2 p-1.5 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 disabled:opacity-50 transition-colors">
                                    <Send className="w-4 h-4 ml-0.5" />
                                </button>
                            </form>
                        </div>
                    </div>

                </div>

            </div>

            <AnimatePresence>
                {showShareModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
                        >
                            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950">
                                <div>
                                    <h3 className="text-xl font-bold flex items-center gap-2"><Sparkles className="w-5 h-5 text-indigo-500" /> Form Published Successfully</h3>
                                    <p className="text-sm text-slate-500 mt-1">Your schema is now live and routing securely to your dashboard.</p>
                                </div>
                                <button onClick={() => setShowShareModal(false)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                                    <X className="w-5 h-5 text-slate-500" />
                                </button>
                            </div>

                            <div className="p-8 space-y-8">
                                <div>
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-3">
                                        <LinkIcon className="w-4 h-4" /> Share Direct Link
                                    </label>
                                    <div className="flex gap-2">
                                        <div className="flex-1 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 font-mono text-sm text-indigo-600 dark:text-indigo-400 overflow-hidden text-ellipsis whitespace-nowrap">
                                            https://submit.vibeintake.com/f/v1b3-auth-99x
                                        </div>
                                        <Button variant="outline" className="shrink-0" onClick={() => {
                                            navigator.clipboard.writeText('https://submit.vibeintake.com/f/v1b3-auth-99x')
                                            setCopied('link')
                                            setTimeout(() => setCopied(null), 2000)
                                        }}>
                                            {copied === 'link' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                        </Button>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-3">
                                        <Code className="w-4 h-4" /> Website Embed Code
                                    </label>
                                    <div className="relative group">
                                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 overflow-x-auto whitespace-pre">
                                            {`<iframe \n  src="https://submit.vibeintake.com/embed/f/v1b3-auth-99x" \n  width="100%" \n  height="600px" \n  frameBorder="0" \n  style="border-radius: 12px; border: 1px solid #e2e8f0;"\n></iframe>`}
                                        </div>
                                        <Button variant="secondary" size="sm" className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md bg-white/10 hover:bg-white/20 text-white border-white/20" onClick={() => {
                                            navigator.clipboard.writeText(`<iframe src="https://submit.vibeintake.com/embed/f/v1b3-auth-99x" width="100%" height="600px" frameBorder="0" style="border-radius: 12px; border: 1px solid #e2e8f0;"></iframe>`)
                                            setCopied('embed')
                                            setTimeout(() => setCopied(null), 2000)
                                        }}>
                                            {copied === 'embed' ? <Check className="w-4 h-4 mr-2 text-green-400" /> : <Copy className="w-4 h-4 mr-2" />}
                                            {copied === 'embed' ? 'Copied!' : 'Copy Snippet'}
                                        </Button>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-3">Paste this HTML directly into Webflow, WordPress, or your custom website.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}
