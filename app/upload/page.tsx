"use client"

import { useState, useRef } from 'react'
import { Card, CardHeader, CardTitle, CardContent, Button, PageHeader, Badge, Input } from '@/components/ui'
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
                <Card className="flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-none shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                        <Badge variant="outline" className="text-[10px] bg-white dark:bg-black font-mono tracking-widest text-indigo-500 border-indigo-200 dark:border-indigo-800">AI COMPILED</Badge>
                    </div>
                    <CardHeader className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                        <CardTitle className="text-lg flex items-center gap-2 font-mono">
                            <Sparkles className="w-5 h-5 text-indigo-500" />
                            React Digital Form Preview
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-8 flex-1 overflow-auto">
                        {uploadState === 'idle' && (
                            <div className="flex items-center justify-center h-full text-slate-400 italic">Waiting for form input...</div>
                        )}
                        {uploadState === 'scanning' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                <div className="h-8 w-1/2 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
                                <div className="space-y-4">
                                    <div className="h-12 w-full bg-slate-100 dark:bg-slate-900 rounded-xl animate-pulse"></div>
                                    <div className="h-12 w-full bg-slate-100 dark:bg-slate-900 rounded-xl animate-pulse"></div>
                                    <div className="h-12 w-full bg-slate-100 dark:bg-slate-900 rounded-xl animate-pulse"></div>
                                </div>
                            </motion.div>
                        )}
                        {(uploadState === 'morphing' || uploadState === 'done') && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
                                <h2 className="text-2xl font-bold border-b border-slate-200 dark:border-slate-800 pb-2 mb-6">
                                    {fileName || 'Patient Intake 2026'}
                                </h2>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <Input label="First Name" placeholder="Jane" />
                                        <Input label="Last Name" placeholder="Doe" />
                                    </div>

                                    <Input label="Email Address" placeholder="jane.doe@example.com" type="email" />
                                    <Input label="Phone Number" placeholder="(555) 000-0000" type="tel" />

                                    {/* Dynamically highlight the PII safety shield mock block */}
                                    <motion.div
                                        initial={{ borderColor: 'transparent', backgroundColor: 'transparent' }}
                                        animate={{ borderColor: 'rgba(239, 68, 68, 0.5)', backgroundColor: 'rgba(239, 68, 68, 0.05)' }}
                                        className="p-4 rounded-xl border-2 relative"
                                    >
                                        <div className="absolute -top-3 right-4 bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider uppercase">
                                            PII Shield Active
                                        </div>
                                        <Input label="Social Security Number" type="password" placeholder="***-**-####" />
                                    </motion.div>

                                    <div>
                                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-1.5 ml-1">Comments or Notes</label>
                                        <textarea className="w-full min-h-[100px] rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 outline-none focus:ring-2 focus:ring-indigo-500 resize-none" placeholder="Type here..."></textarea>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </CardContent>
                    {uploadState === 'done' && (
                        <div className="absolute bottom-6 right-6 z-10">
                            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg">Deploy Form to Production</Button>
                        </div>
                    )}
                </Card>

            </div>
        </div>
    )
}
