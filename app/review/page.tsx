"use client"

import { Card, CardContent, Button } from '@/components/ui'
import { FileSearch, CheckCircle2, FileImage, ShieldCheck, XCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ReviewQueue() {

    return (
        <div className="max-w-[1600px] mx-auto h-[calc(100vh-8rem)] flex flex-col pt-4">

            <div className="flex items-center justify-between mb-4 shrink-0">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 flex items-center gap-2">
                        <FileSearch className="w-6 h-6 text-amber-500" />
                        Human-in-the-loop Review Queue
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">14 documents flagged for low confidence handwriting.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="text-rose-600 border-rose-200 hover:bg-rose-50 dark:border-rose-900/50 dark:hover:bg-rose-900/20"><XCircle className="w-4 h-4 mr-2" /> Reject</Button>
                    <Button variant="primary" className="bg-green-600 hover:bg-green-700 dark:bg-green-600 text-white"><CheckCircle2 className="w-4 h-4 mr-2" /> Verify & Save to Vault</Button>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0 pb-6">

                {/* Left Side: Scanned Source */}
                <Card className="h-full flex flex-col overflow-hidden border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900/50">
                    <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900">
                        <div className="flex gap-2 items-center text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                            <FileImage className="w-4 h-4" /> Source Document
                        </div>
                        <div className="text-xs bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded">IMG_8492.jpg</div>
                    </div>
                    <div className="flex-1 p-8 flex items-center justify-center relative overflow-hidden">
                        {/* Mocking a zoomed in portion of handwriting */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-full max-w-lg aspect-[3/1] bg-white dark:bg-slate-800 shadow-2xl skew-y-2 transform relative flex items-center justify-center text-6xl font-[Caveat] text-slate-800 dark:text-slate-200 rotate-[-2deg]"
                        >
                            <div className="absolute inset-x-0 bottom-4 border-b-2 border-blue-200 dark:border-blue-900/50" />
                            S<span className="opacity-80">h</span>arron V<span className="opacity-60">i</span>be

                            {/* AI Confidence Bounding Box highlight */}
                            <div className="absolute inset-0 border-2 border-amber-500 rounded bg-amber-500/10 pointer-events-none" />
                            <div className="absolute top-2 right-2 bg-amber-500 text-black text-[10px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded">62% Conf</div>
                        </motion.div>
                    </div>
                </Card>

                {/* Right Side: Data Extraction Editor */}
                <Card className="h-full flex flex-col shadow-xl border-slate-200 dark:border-slate-800">
                    <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex justify-between items-center">
                        <div className="font-bold text-slate-900 dark:text-slate-100">AI Transcription Data</div>
                    </div>
                    <CardContent className="flex-1 p-8 overflow-y-auto">

                        <div className="space-y-6">

                            <div className="p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/50 rounded-xl relative">
                                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center shadow-sm">
                                    !
                                </div>
                                <label className="text-xs font-bold text-amber-900 dark:text-amber-500 uppercase tracking-wider mb-2 block">Flagged: Patient Name</label>
                                <input
                                    defaultValue="Sharron Vibe"
                                    className="w-full text-lg font-medium bg-white dark:bg-slate-950 border border-amber-300 dark:border-amber-800 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 focus:ring-amber-500 focus:border-amber-500"
                                />
                            </div>

                            <div className="p-4 border border-slate-100 dark:border-slate-800 rounded-xl">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block flex items-center justify-between">
                                    Date of Birth <ShieldCheck className="w-4 h-4 text-green-500" />
                                </label>
                                <input
                                    defaultValue="08/22/1975"
                                    className="w-full text-base bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100"
                                />
                            </div>

                        </div>

                    </CardContent>
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 flex justify-between">
                        <span>Press CMD+Enter to save and route to Webhook.</span>
                        <span>1 of 14 remaining</span>
                    </div>
                </Card>

            </div>

        </div>
    )
}
