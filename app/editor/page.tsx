"use client"

import { useState } from 'react'
import { Card, CardContent, Button, Input } from '@/components/ui'
import { Sparkles, Save, Undo, LayoutTemplate, Send, User, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function AIFormEditor() {
    const [chatInput, setChatInput] = useState('')
    const [isAiThinking, setIsAiThinking] = useState(false)

    // Simulated State of the Output Component
    const [formLayout, setFormLayout] = useState([
        { id: 'f1', label: "Patient First Name", required: true },
        { id: 'f2', label: "Patient Last Name", required: true },
        { id: 'f3', label: "Date of Birth", type: "date" }
    ])

    const handleAiEdit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!chatInput.trim()) return

        setIsAiThinking(true)
        setTimeout(() => {
            // Mock AI Action executing
            const inputLower = chatInput.toLowerCase()
            if (inputLower.includes('combine') || inputLower.includes('full name')) {
                setFormLayout([
                    { id: 'f_new', label: "Full Name", required: true },
                    { id: 'f3', label: "Date of Birth", type: "date" }
                ])
                toast.success("AI: Combined First & Last name fields.")
            } else {
                toast.error("AI Mock: Try asking to 'Combine the name fields'")
            }
            setIsAiThinking(false)
            setChatInput('')
        }, 1500)
    }

    return (
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
                    <Button variant="primary"><Save className="w-4 h-4 mr-2" /> Publish Template</Button>
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
                            <motion.div layout className="space-y-6">
                                {formLayout.map((field) => (
                                    <motion.div
                                        key={field.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="group"
                                    >
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2 flex justify-between">
                                            {field.label} {field.required && <span className="text-rose-500">*</span>}
                                        </label>
                                        <div className="w-full h-11 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 rounded-xl px-3 flex items-center shadow-sm">
                                            {field.type === 'date' ? 'mm/dd/yyyy' : ''}
                                        </div>
                                    </motion.div>
                                ))}
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
    )
}
