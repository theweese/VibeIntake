"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from '@/components/ui'
import { Eye, EyeOff, FileText, User, Calendar, ShieldAlert, History, KeyRound } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function TicketDetail({ params }: { params: { id: string } }) {
    const [revealedFields, setRevealedFields] = useState<string[]>([])
    const [auditLogs, setAuditLogs] = useState<{ time: string, action: string, admin: string }[]>([
        { time: "10:02 AM", action: "Ticket Transcribed by Vision AI", admin: "System" },
        { time: "10:02 AM", action: "Submission Tagged 'New'", admin: "System" },
    ])

    const handleRevealField = (fieldId: string, fieldLabel: string) => {
        if (revealedFields.includes(fieldId)) {
            setRevealedFields(revealedFields.filter(id => id !== fieldId))
            return
        }

        // Attempt to reveal - simulate audit logging
        setRevealedFields([...revealedFields, fieldId])
        setAuditLogs([
            {
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                action: `Decrypted Sensitive Field: ${fieldLabel}`,
                admin: "Current User"
            },
            ...auditLogs
        ])
    }

    // Dummy structured data output from Phase 2 Morph
    const formData = [
        { id: 'f1', label: "Full Name", value: "Sarah Jenkins", type: "text", isSensitive: false },
        { id: 'f2', label: "Date of Birth", value: "04/12/1985", type: "date", isSensitive: false },
        { id: 'f3', label: "Social Security Number", value: "987-65-4321", type: "sensitive_id", maskPattern: "***-**-####", isSensitive: true },
        { id: 'f4', label: "Routing Number", value: "111000222", type: "sensitive_id", maskPattern: "******222", isSensitive: true },
        { id: 'f5', label: "Account ID", value: "87640091", type: "text", isSensitive: false },
    ]

    const applyMask = (value: string, pattern?: string) => {
        if (!pattern) return "**********"
        // Mock masking logic
        let masked = ""
        let valIndex = 0
        for (let char of pattern) {
            if (char === '*') { masked += '•'; valIndex++; }
            else if (char === '#') { masked += value[valIndex] || '#'; valIndex++; }
            else { masked += char; if (value[valIndex] === char) valIndex++; }
        }
        return masked
    }

    return (
        <div className="max-w-7xl mx-auto animate-in fade-in duration-500 pb-12">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-3">
                        <Link href="/" className="text-slate-500 hover:text-indigo-500 transition-colors text-sm font-medium">← Back to Command Center</Link>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mt-4 flex items-center gap-3">
                        Ticket {params.id || 'T-8902'}
                        <Badge variant="warning">New</Badge>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">Form: Patient Intake 2026 • Submitted 10 mins ago</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 dark:border-red-900/50 dark:hover:bg-red-900/20">Decline</Button>
                    <Button variant="primary">Mark In Progress</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Side: The Form Data (Privacy Shield) */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    <Card className="flex-1">
                        <CardHeader className="border-b border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-black/20 pb-4">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <FileText className="w-5 h-5 text-indigo-500" />
                                Submitted Digital Form
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="space-y-6">
                                {formData.map((field) => {
                                    const isRevealed = revealedFields.includes(field.id)

                                    return (
                                        <div key={field.id} className="group pb-6 border-b border-slate-100 last:border-0 dark:border-slate-800/50 flex items-start justify-between">
                                            <div className="flex-1">
                                                <label className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-2">
                                                    {field.label}
                                                    {field.isSensitive && <KeyRound className="w-3 h-3 text-amber-500" />}
                                                </label>

                                                <div className="mt-1">
                                                    {field.isSensitive ? (
                                                        <div className="inline-flex items-center gap-3">
                                                            <AnimatePresence mode="wait">
                                                                {isRevealed ? (
                                                                    <motion.p
                                                                        key="revealed"
                                                                        initial={{ opacity: 0, filter: 'blur(4px)' }}
                                                                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                                                                        exit={{ opacity: 0 }}
                                                                        className="text-lg font-medium text-rose-600 dark:text-rose-400 tracking-wide font-mono bg-rose-50 dark:bg-rose-900/20 px-3 py-1 rounded border border-rose-100 dark:border-rose-900/50"
                                                                    >
                                                                        {field.value}
                                                                    </motion.p>
                                                                ) : (
                                                                    <motion.p
                                                                        key="masked"
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        exit={{ opacity: 0, filter: 'blur(4px)' }}
                                                                        className="text-lg font-medium text-slate-700 dark:text-slate-300 tracking-[0.2em] font-mono px-3 py-1"
                                                                    >
                                                                        {applyMask(field.value, field.maskPattern)}
                                                                    </motion.p>
                                                                )}
                                                            </AnimatePresence>
                                                        </div>
                                                    ) : (
                                                        <p className="text-lg font-medium text-slate-900 dark:text-slate-100">{field.value}</p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Interactive Privacy Control */}
                                            {field.isSensitive && (
                                                <div className="ml-4 flex-shrink-0">
                                                    <Button
                                                        variant={isRevealed ? "ghost" : "outline"}
                                                        className={isRevealed ? "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800" : "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-900/50 text-amber-700 dark:text-amber-500 hover:bg-amber-100"}
                                                        onClick={() => handleRevealField(field.id, field.label)}
                                                    >
                                                        {isRevealed ? (
                                                            <><EyeOff className="w-4 h-4 mr-2" /> Hide Data</>
                                                        ) : (
                                                            <><Eye className="w-4 h-4 mr-2" /> Decrypt & View</>
                                                        )}
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Original Source Document Reference */}
                    <Card className="bg-slate-50 border-dashed border-2 cursor-pointer hover:bg-slate-100 transition-colors dark:bg-slate-900/30 dark:border-slate-800">
                        <CardContent className="h-24 flex items-center justify-center gap-3 opacity-60">
                            <FileText className="w-6 h-6" /> View Original Scanned Image
                        </CardContent>
                    </Card>
                </div>

                {/* Right Side: Compliance & Audit Log */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <Card className="border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20 shadow-none">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm flex items-center gap-2 text-rose-800 dark:text-rose-400 font-semibold tracking-tight uppercase">
                                <ShieldAlert className="w-4 h-4" />
                                Compliance Shield Active
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-rose-700/80 dark:text-rose-300/80 leading-relaxed">
                                This document contains protected PII. Accessing encrypted fields will automatically record your identity to the unalterable audit ledger.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="flex-1 flex flex-col">
                        <CardHeader className="border-b border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-black/20 pb-4">
                            <CardTitle className="text-lg flex items-center gap-2 font-mono">
                                <History className="w-5 h-5 text-indigo-500" />
                                Audit Ledger
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 flex-1 max-h-[500px] overflow-y-auto custom-scrollbar">
                            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 dark:before:via-slate-700 before:to-transparent">

                                <AnimatePresence>
                                    {auditLogs.map((log, i) => (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            key={i}
                                            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                                        >
                                            <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-700 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                                {log.action.includes('Decrypt') ? <KeyRound className="w-3.5 h-3.5 text-amber-500" /> : <div className="w-2 h-2 rounded-full bg-indigo-500" />}
                                            </div>

                                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{log.admin}</span>
                                                    <time className="text-xs text-slate-400">{log.time}</time>
                                                </div>
                                                <div className={`text-sm font-medium ${log.action.includes('Decrypt') ? 'text-rose-600 dark:text-rose-400' : 'text-slate-700 dark:text-slate-300'}`}>
                                                    {log.action}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    )
}
