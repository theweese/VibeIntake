"use client"

import { useState, useRef } from 'react'
import { Card, CardHeader, CardTitle, CardContent, Button, PageHeader, Badge } from '@/components/ui'
import { UploadCloud, CheckCircle2, FileJson, Sparkles, Loader2, FileScan } from 'lucide-react'
import { motion } from 'framer-motion'

export default function UploadPage() {
    const [uploadState, setUploadState] = useState<'idle' | 'scanning' | 'morphing' | 'done'>('idle')
    const [fileName, setFileName] = useState('')
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const rawName = e.target.files[0].name
            // Strip the extension for a cleaner form title
            setFileName(rawName.replace(/\.[^/.]+$/, ""))
            handleSimulateScan()
        }
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

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <PageHeader
                title="Form Architect"
                description="Upload a paper document. Our AI will automatically extract the structure and generate a privacy-first digital form schema."
                icon={FileScan}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Left Side: Uploader */}
                <Card className="flex flex-col">
                    <CardHeader className="border-b border-slate-200/50 dark:border-slate-800/50">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <UploadCloud className="w-5 h-5 text-indigo-500" />
                            Source Material
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 flex-1 flex flex-col justify-center">

                        <div
                            onClick={() => uploadState === 'idle' && fileInputRef.current?.click()}
                            className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-all cursor-pointer h-64
                ${uploadState === 'idle'
                                    ? 'border-indigo-300 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-900/10 hover:bg-indigo-100/50 dark:hover:bg-indigo-900/20'
                                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/20 pointer-events-none'
                                }`}
                        >
                            <motion.div animate={{ scale: uploadState === 'idle' ? 1 : 0.9 }}>
                                {uploadState === 'idle' && (
                                    <div className="flex flex-col items-center">
                                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm mb-4">
                                            <UploadCloud className="w-8 h-8 text-indigo-500" />
                                        </div>
                                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Upload Scanned Form</h4>
                                        <p className="text-xs text-slate-500">JPG, PNG, PDF, or DOCX (Max 10MB)</p>
                                    </div>
                                )}
                                {uploadState === 'scanning' && (
                                    <div className="flex flex-col items-center text-indigo-600 dark:text-indigo-400">
                                        <Loader2 className="w-10 h-10 animate-spin mb-4" />
                                        <p className="font-medium">Vision AI Processing...</p>
                                        <p className="text-xs text-slate-500 mt-1 dark:text-slate-400">Extracting handwriting and layout.</p>
                                    </div>
                                )}
                                {uploadState === 'morphing' && (
                                    <div className="flex flex-col items-center text-fuchsia-600 dark:text-fuchsia-400">
                                        <Sparkles className="w-10 h-10 animate-pulse mb-4" />
                                        <p className="font-medium text-slate-900 dark:text-slate-100">Morphing to Digital Schema...</p>
                                        <p className="text-xs text-slate-500 mt-1 dark:text-slate-400">Applying Privacy-First rules.</p>
                                    </div>
                                )}
                                {uploadState === 'done' && (
                                    <div className="flex flex-col items-center">
                                        <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-2xl mb-4">
                                            <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                                        </div>
                                        <p className="font-medium text-slate-900 dark:text-slate-100">Extraction Complete</p>
                                        <Button variant="outline" className="mt-4" onClick={() => setUploadState('idle')}>Upload Another</Button>
                                    </div>
                                )}
                            </motion.div>
                        </div>

                        <input
                            type="file"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*,.pdf,.doc,.docx"
                        />

                    </CardContent>
                </Card>

                {/* Right Side: Morph Output */}
                <Card className="flex flex-col bg-slate-900 dark:bg-black text-slate-300 border-none shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                        <Badge variant="outline" className="text-[10px] border-slate-700 font-mono tracking-widest text-indigo-400">AI OUTPUT</Badge>
                    </div>
                    <CardHeader className="border-b border-slate-800">
                        <CardTitle className="text-lg flex items-center gap-2 text-white font-mono">
                            <FileJson className="w-5 h-5 text-indigo-400" />
                            schema.json
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 font-mono text-sm flex-1 overflow-auto">
                        {uploadState === 'idle' && (
                            <p className="text-slate-600 italic">Waiting for form input...</p>
                        )}
                        {uploadState === 'scanning' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                                <p className="text-indigo-400">{"{"}</p>
                                <p className="pl-4">"status": "analyzing_pixels",</p>
                                <p className="pl-4 text-slate-500">...</p>
                                <p className="text-indigo-400">{"}"}</p>
                            </motion.div>
                        )}
                        {(uploadState === 'morphing' || uploadState === 'done') && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-1.5 text-slate-300">
                                <p>{"{"}</p>
                                <p className="pl-4">"form_title": <span className="text-green-400">"{fileName || 'Patient Intake 2026'}"</span>,</p>
                                <p className="pl-4">"fields": [</p>
                                <p className="pl-8">{"{"}</p>
                                <p className="pl-12">"label": <span className="text-green-400">"Full Name"</span>,</p>
                                <p className="pl-12">"type": <span className="text-green-400">"text"</span></p>
                                <p className="pl-8">{"},"}</p>
                                <p className="pl-8">{"{"}</p>
                                <p className="pl-12">"label": <span className="text-green-400">"Social Security Number"</span>,</p>
                                <p className="pl-12">"type": <span className="text-green-400">"sensitive_id"</span>,</p>
                                <motion.p initial={{ backgroundColor: 'rgba(239, 68, 68, 0)' }} animate={{ backgroundColor: 'rgba(239, 68, 68, 0.2)' }} className="pl-12 text-rose-400 font-bold tracking-wide">
                                    "is_sensitive": true,
                                </motion.p>
                                <p className="pl-12">"mask_pattern": <span className="text-green-400">"***-**-####"</span></p>
                                <p className="pl-8">{"}"}</p>
                                <p className="pl-4">]</p>
                                <p>{"}"}</p>
                            </motion.div>
                        )}
                    </CardContent>
                    {uploadState === 'done' && (
                        <div className="absolute bottom-6 right-6">
                            <Button className="bg-white text-slate-900 hover:bg-slate-200">Deploy Form</Button>
                        </div>
                    )}
                </Card>

            </div>
        </div>
    )
}
