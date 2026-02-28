"use client"

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Input } from '@/components/ui'
import { Workflow, Plus, Trash2, Webhook, Mail, MessagesSquare, ShieldCheck, PlayCircle, ShieldAlert } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function PipelinesPage() {
    const [pipelines, setPipelines] = useState([
        { id: 1, type: 'Webhook', name: 'EHR Intake Sync', destination: 'https://api.my-ehr.internal/v1/intake', status: 'Active', icon: <Webhook className="w-5 h-5 text-fuchsia-500" /> },
        { id: 2, type: 'Email', name: 'Daily Digest', destination: 'records@stjoseph.org', status: 'Active', icon: <Mail className="w-5 h-5 text-blue-500" /> },
        { id: 3, type: 'Slack', name: 'Urgent Triage Alert', destination: '#triage-high-priority', status: 'Paused', icon: <MessagesSquare className="w-5 h-5 text-emerald-500" /> }
    ])

    const handleTest = (name: string) => {
        toast.success(`Test payload sent to ${name}`)
    }

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 flex items-center gap-3">
                        <div className="p-2 bg-slate-900 dark:bg-slate-800 rounded-xl">
                            <Workflow className="w-6 h-6 text-white" />
                        </div>
                        Delivery Pipelines
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">Route extracted form data automatically to your existing infrastructure.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="primary" className="gap-2"><Plus className="w-4 h-4" /> New Pipeline</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Side: Pipeline List */}
                <div className="lg:col-span-2 space-y-6">
                    {pipelines.map((pipe) => (
                        <Card key={pipe.id} className="group hover:border-indigo-300 dark:hover:border-indigo-700/50 transition-colors">
                            <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl shrink-0 mt-1">
                                        {pipe.icon}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">{pipe.name}</h3>
                                            <Badge variant={pipe.status === 'Active' ? 'success' : 'outline'}>{pipe.status}</Badge>
                                        </div>
                                        <p className="text-sm font-mono text-slate-500 dark:text-slate-400 break-all">{pipe.destination}</p>

                                        <div className="flex items-center gap-4 mt-3 text-xs font-semibold text-slate-500 dark:text-slate-500">
                                            <span className="uppercase tracking-wider">Type: {pipe.type}</span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-indigo-400" /> Encrypted Payload</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex md:flex-col justify-end gap-2 shrink-0 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800/50 pt-4 md:pt-0 md:pl-6">
                                    <Button variant="secondary" size="sm" onClick={() => handleTest(pipe.name)} className="gap-2 whitespace-nowrap">
                                        <PlayCircle className="w-4 h-4" /> Test Ping
                                    </Button>
                                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 w-full justify-start md:justify-center">
                                        <Trash2 className="w-4 h-4 mr-2 md:mr-0" /> <span className="md:hidden">Delete</span>
                                    </Button>
                                </div>

                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Right Side: Security / Stats */}
                <div className="space-y-6">
                    <Card className="bg-gradient-to-br from-indigo-900 to-slate-900 border-indigo-800 text-slate-300 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl" />
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <ShieldAlert className="w-5 h-5 text-indigo-400" /> No-Retention Mode
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm leading-relaxed mb-6">
                                When Active Webhooks are enabled, VibeIntake can be configured to instantly shred submitted data from our databases after a successful HTTP 200 payload delivery.
                            </p>
                            <div className="flex items-center justify-between bg-black/40 p-3 rounded-lg border border-white/10">
                                <span className="text-sm font-medium text-white">Shred Data Post-Delivery</span>
                                <div className="w-10 h-6 bg-indigo-500 rounded-full relative cursor-pointer">
                                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-slate-500 uppercase tracking-wider">Pipeline Traffic (24h)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-end gap-2 mb-2">
                                <span className="text-4xl font-black text-slate-900 dark:text-slate-50">8,492</span>
                                <span className="text-sm font-medium text-green-500 mb-1">+12%</span>
                            </div>
                            <p className="text-xs text-slate-400">Successfully delivered payloads</p>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    )
}
