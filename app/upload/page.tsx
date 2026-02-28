"use client"

import { useState, useRef } from 'react'
import { Card, CardHeader, CardTitle, CardContent, Button, PageHeader, Badge, Input } from '@/components/ui'
import { UploadCloud, CheckCircle2, FileJson, Sparkles, Loader2, FileScan, FileText, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function UploadPage() {
    const [uploadState, setUploadState] = useState<'idle' | 'scanning' | 'morphing' | 'done'>('idle')
    const [fileName, setFileName] = useState('')
    const [pasteText, setPasteText] = useState('')
    const [schemaLevel, setSchemaLevel] = useState<'basic' | 'advanced'>('advanced')
    const [generatedFields, setGeneratedFields] = useState<{ label: string, type: string }[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)

    const generateMockFields = (textToAnalyze: string) => {
        const lowerStr = textToAnalyze.toLowerCase()
        let newFields: { label: string, type: string }[] = []

        if (lowerStr.includes('afl') || lowerStr.includes('cio') || lowerStr.includes('community') || lowerStr.includes('service')) {
            newFields = [
                { label: 'Assistance Type Requested', type: 'select' },
                { label: 'Head of Household Full Name', type: 'text' },
                { label: 'Date of Birth (Head of Household)', type: 'text' },
                { label: 'Current Address (City, State, Zip, County)', type: 'textarea' },
                { label: 'Phone Number', type: 'tel' },
                { label: 'Social Security Number (Head of Household)', type: 'sensitive_id' },
                { label: 'Total Household Size', type: 'number' },
                { label: 'Marital Status', type: 'select' },
                { label: 'Race & Ethnicity', type: 'select' },
                { label: 'Total Annual Income Bracket', type: 'select' },
                { label: 'Dependent 1: Full Name & Relation', type: 'text' },
                { label: 'Dependent 1: Social Security Number', type: 'sensitive_id' },
                { label: 'Dependent 2: Full Name & Relation', type: 'text' },
                { label: 'Dependent 2: Social Security Number', type: 'sensitive_id' },
                { label: '+ Add Additional Dependent / Participant', type: 'dynamic_button' },
            ]
        } else if (lowerStr.includes('sole') || lowerStr.includes('shoe') || lowerStr.includes('christ')) {
            newFields = [
                { label: 'Parent / Guardian Name', type: 'text' },
                { label: 'Date', type: 'text' },
                { label: 'Address', type: 'text' },
                { label: 'City & Zip', type: 'text' },
                { label: 'County', type: 'text' },
                { label: 'Phone Number', type: 'tel' },
                { label: 'Number in Household', type: 'number' },
                { label: 'Participant DOB / SSN', type: 'sensitive_id' },
                { label: 'Race / Ethnicity', type: 'select' },
                { label: 'Income Bracket', type: 'select' },
                { label: 'Child 1: First & Last Name', type: 'text' },
                { label: 'Child 1: Age', type: 'number' },
                { label: 'Child 1: Details (Grade, Shoe Size)', type: 'textarea' },
            ]
        } else if (lowerStr.includes('registration') || lowerStr.includes('release')) {
            newFields = [
                { label: 'Registrant Full Name', type: 'text' },
                { label: 'Email Address', type: 'email' },
                { label: 'Phone Number', type: 'tel' },
                { label: 'Home Address', type: 'text' },
                { label: 'Social Security Number (Background Check)', type: 'sensitive_id' },
                { label: 'Public Relations Photo Consent', type: 'select' },
                { label: 'Signature Confirmation', type: 'text' },
            ]
        } else {
            newFields = [
                { label: 'First Name', type: 'text' },
                { label: 'Last Name', type: 'text' },
                { label: 'Email Address', type: 'email' },
                { label: 'Phone Number', type: 'tel' },
                { label: 'Social Security Number', type: 'sensitive_id' },
                { label: 'Comments or Notes', type: 'textarea' },
            ]
        }

        // If it hit the fallback branch, we flag it as basic
        const isAdvanced = lowerStr.includes('afl') || lowerStr.includes('cio') || lowerStr.includes('community') || lowerStr.includes('service') || lowerStr.includes('sole') || lowerStr.includes('shoe') || lowerStr.includes('christ') || lowerStr.includes('registration') || lowerStr.includes('release')
        setSchemaLevel(isAdvanced ? 'advanced' : 'basic')

        setGeneratedFields(newFields)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const rawName = e.target.files[0].name
            setFileName(rawName.replace(/\.[^/.]+$/, ""))
            generateMockFields(rawName)
            handleSimulateScan()
        }
    }

    const handlePasteSubmit = () => {
        if (!pasteText.trim()) return
        setFileName("Pasted Document Content")
        generateMockFields(pasteText)
        handleSimulateScan()
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

    const resetFlow = () => {
        setUploadState('idle')
        setPasteText('')
        setFileName('')
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 py-12 px-4">
            <PageHeader
                title="Form Architect"
                description="Upload a paper document or paste raw text. Our AI will automatically extract the structure and generate a privacy-first digital form schema."
                icon={FileScan}
            />

            <div className="max-w-3xl mx-auto">
                <AnimatePresence mode="wait">
                    {uploadState === 'idle' ? (
                        <motion.div key="upload-input" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} >
                            <Card className="flex flex-col shadow-xl">
                                <CardHeader className="border-b border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/20">
                                    <CardTitle className="text-xl flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-indigo-500" />
                                        Provide Source Material
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-8 flex flex-col gap-8">

                                    {/* Upload Option */}
                                    <div>
                                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-3 ml-1">Option 1: Upload a File</label>
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            className="border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-all cursor-pointer h-40 border-indigo-300 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-900/10 hover:bg-indigo-100/50 dark:hover:bg-indigo-900/20"
                                        >
                                            <div className="flex flex-col items-center">
                                                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm mb-3">
                                                    <UploadCloud className="w-6 h-6 text-indigo-500" />
                                                </div>
                                                <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Upload Scanned Form</h4>
                                                <p className="text-xs text-slate-500">JPG, PNG, PDF, or DOCX</p>
                                            </div>
                                        </div>
                                        <input
                                            type="file"
                                            className="hidden"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            accept="image/*,.pdf,.doc,.docx"
                                        />
                                    </div>

                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-slate-800"></div></div>
                                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-white dark:bg-[#0A0D14] px-4 text-slate-400 font-semibold tracking-wider">Or</span></div>
                                    </div>

                                    {/* Paste Option */}
                                    <div>
                                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-3 ml-1">Option 2: Paste Content</label>
                                        <textarea
                                            className="w-full min-h-[160px] rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-4 outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-sm placeholder:text-slate-400"
                                            placeholder="Paste the raw text of your document, email, or draft here..."
                                            value={pasteText}
                                            onChange={(e) => setPasteText(e.target.value)}
                                        />
                                        <div className="mt-3 flex justify-end">
                                            <Button onClick={handlePasteSubmit} disabled={!pasteText.trim()} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-12 px-6 shadow-md">
                                                Analyze Text <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </div>
                                    </div>

                                </CardContent>
                            </Card>
                        </motion.div>
                    ) : (
                        <motion.div key="output-preview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} >
                            <Card className="flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-none shadow-2xl relative overflow-hidden min-h-[600px] w-full mx-auto">
                                <div className="bg-slate-100 border-b border-slate-200 dark:bg-slate-900 dark:border-slate-800 p-4 flex justify-between items-center shrink-0">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                    </div>
                                    <Badge className="bg-white dark:bg-black text-xs font-mono tracking-widest text-indigo-500 border-indigo-200 dark:border-indigo-800">React Digital Form Preview</Badge>
                                </div>
                                <CardContent className="p-8 md:p-12 flex-1 overflow-auto">
                                    {uploadState === 'scanning' && (
                                        <div className="h-full flex flex-col items-center justify-center text-center py-20">
                                            <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-6" />
                                            <h3 className="text-xl font-bold mb-2">Analyzing Source Material...</h3>
                                            <p className="text-slate-500 max-w-sm">Extracting architecture, layout, and intent from your input.</p>
                                        </div>
                                    )}
                                    {(uploadState === 'morphing' || uploadState === 'done') && (
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">

                                            <div className="flex justify-between items-start mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
                                                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                                                    {fileName || 'Patient Intake 2026'}
                                                </h2>
                                                {uploadState === 'done' && (
                                                    <Button variant="outline" size="sm" onClick={resetFlow} className="shrink-0 text-slate-500">
                                                        Start Over
                                                    </Button>
                                                )}
                                            </div>

                                            {schemaLevel === 'basic' && (
                                                <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-6 mb-8 mt-2 flex flex-col md:flex-row gap-4 items-start md:items-center">
                                                    <div className="bg-indigo-100 dark:bg-indigo-800 p-3 rounded-full shrink-0">
                                                        <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-bold text-indigo-900 dark:text-indigo-300 mb-1">Standard Extraction Applied</h4>
                                                        <p className="text-indigo-800 dark:text-indigo-400 text-sm leading-relaxed">
                                                            We successfully translated your source material into basic text schemas. If you were expecting a more complex structure, our AI Agent can review your exact needs and build you a custom layout.
                                                        </p>
                                                    </div>
                                                    <Button onClick={() => window.location.href = '/demo'} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shrink-0">
                                                        Refine via Chat AI
                                                    </Button>
                                                </div>
                                            )}

                                            <div className="space-y-6">
                                                {generatedFields.map((field, idx) => (
                                                    <div key={idx} className="w-full">
                                                        {field.type === 'sensitive_id' ? (
                                                            <motion.div
                                                                initial={{ borderColor: 'transparent', backgroundColor: 'transparent' }}
                                                                animate={{ borderColor: 'rgba(239, 68, 68, 0.5)', backgroundColor: 'rgba(239, 68, 68, 0.05)' }}
                                                                className="p-4 rounded-xl border-2 relative"
                                                            >
                                                                <div className="absolute -top-3 right-4 bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider uppercase">
                                                                    PII Shield Active
                                                                </div>
                                                                <Input label={field.label} type="password" placeholder="***-**-####" />
                                                            </motion.div>
                                                        ) : field.type === 'textarea' ? (
                                                            <div>
                                                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-1.5 ml-1">{field.label}</label>
                                                                <textarea className="w-full min-h-[100px] rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 outline-none focus:ring-2 focus:ring-indigo-500 resize-none" placeholder="Type here..."></textarea>
                                                            </div>
                                                        ) : field.type === 'select' ? (
                                                            <Input label={field.label} placeholder="Select an option..." />
                                                        ) : field.type === 'dynamic_button' ? (
                                                            <div className="pt-2">
                                                                <Button type="button" variant="outline" className="w-full border-dashed border-2 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 h-12">
                                                                    {field.label}
                                                                </Button>
                                                            </div>
                                                        ) : (
                                                            <Input label={field.label} type={field.type} placeholder="..." />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>

                                            {uploadState === 'done' && (
                                                <Button className="w-full h-14 text-lg mt-8 disabled:opacity-50 tracking-wide font-semibold rounded-2xl shrink-0" disabled>Submit Form</Button>
                                            )}
                                        </motion.div>
                                    )}
                                </CardContent>
                                {uploadState === 'done' && (
                                    <div className="p-8 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 text-center shrink-0">
                                        <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Want to customize this further or add strict data protection?</h4>
                                        <p className="text-sm text-slate-500 mb-6">Create a free account to enable Field Mapping, AES-256 Encryption, and File Uploads.</p>
                                        <Button className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg">Sign Up to Deploy Form</Button>
                                    </div>
                                )}
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
