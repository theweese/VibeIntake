"use client"

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '@/components/ui'
import { Workflow, Plus, Trash2, Webhook, Mail, MessagesSquare, ShieldCheck, PlayCircle, ShieldAlert, MonitorUp, ServerCog, Clock, Activity, ArrowRight, Cloud, Lock, ExternalLink, Database } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

export default function PipelinesPage() {
    const [activeTab, setActiveTab] = useState<'pipelines' | 'rules' | 'integrations'>('pipelines')

    const [pipelines] = useState([
        { id: 1, type: 'Webhook', name: 'EHR Intake Sync', destination: 'https://api.my-ehr.internal/v1/intake', status: 'Active', icon: <Webhook className="w-5 h-5 text-fuchsia-500" /> },
        { id: 2, type: 'Email', name: 'Daily Digest', destination: 'records@stjoseph.org', status: 'Active', icon: <Mail className="w-5 h-5 text-blue-500" /> },
        { id: 3, type: 'Slack', name: 'Urgent Triage Alert', destination: '#triage-high-priority', status: 'Paused', icon: <MessagesSquare className="w-5 h-5 text-emerald-500" /> }
    ])

    const handleTest = (name: string) => {
        toast.success(`Test payload sent to ${name}`)
    }

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-indigo-500 to-fuchsia-500 rounded-2xl shadow-lg">
                        <Workflow className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Logistics & Integrations</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">Route data, set up automated triggers, and sync enterprise directories.</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="primary" className="gap-2 rounded-full"><Plus className="w-4 h-4" /> New Automation</Button>
                </div>
            </div>

            {/* Custom Tabs */}
            <div className="flex p-1 bg-slate-100 dark:bg-slate-800/50 rounded-2xl w-full max-w-2xl border border-slate-200 dark:border-slate-800">
                <button
                    onClick={() => setActiveTab('pipelines')}
                    className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${activeTab === 'pipelines' ? 'bg-white dark:bg-slate-900 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800'}`}
                >
                    <Webhook className="w-4 h-4" /> Data Pipelines
                </button>
                <button
                    onClick={() => setActiveTab('rules')}
                    className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${activeTab === 'rules' ? 'bg-white dark:bg-slate-900 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800'}`}
                >
                    <Clock className="w-4 h-4" /> Rules & Cron Jobs
                </button>
                <button
                    onClick={() => setActiveTab('integrations')}
                    className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${activeTab === 'integrations' ? 'bg-white dark:bg-slate-900 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800'}`}
                >
                    <ServerCog className="w-4 h-4" /> Enterprise Sync
                </button>
            </div>

            <AnimatePresence mode="wait">

                {/* TAB 1: PIPELINES */}
                {activeTab === 'pipelines' && (
                    <motion.div key="pipelines" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                    </motion.div>
                )}

                {/* TAB 2: RULES AND CRON JOBS */}
                {activeTab === 'rules' && (
                    <motion.div key="rules" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6 max-w-4xl">
                        <Card className="border-slate-200 dark:border-slate-800">
                            <CardContent className="p-8 pb-10">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">Live Status Triggers & Cron Sweeps</h2>
                                <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-2xl">
                                    Set up automations that run on a schedule (Cron) or instantly trigger an action when a form's data or status changes.
                                </p>

                                <div className="space-y-4">
                                    {/* Mock Trigger 1 */}
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-amber-50 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-500">
                                                <Clock className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                                    Check Dates <Badge variant="outline" className="text-xs bg-slate-100 dark:bg-slate-800">Daily at 00:00</Badge>
                                                </div>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">If form `Submission Date` is `Today`, trigger `Review Notifications`.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-medium text-green-600 dark:text-green-500">Active</span>
                                            <div className="w-10 h-6 bg-indigo-500 rounded-full relative cursor-pointer opacity-50"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" /></div>
                                        </div>
                                    </div>

                                    {/* Mock Trigger 2 */}
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-500">
                                                <Activity className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                                    Status Tracker <Badge variant="outline" className="text-xs bg-slate-100 dark:bg-slate-800">Live Webhook</Badge>
                                                </div>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">If `Form Status` changes to `Done`, invoke `EHR Intake Sync`.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-medium text-green-600 dark:text-green-500">Active</span>
                                            <div className="w-10 h-6 bg-indigo-500 rounded-full relative cursor-pointer opacity-50"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" /></div>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="outline" className="mt-6 w-full gap-2 border-dashed"><Plus className="w-4 h-4" /> Add New Rule</Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {/* TAB 3: ENTERPRISE SYNC (O365 & Google) */}
                {activeTab === 'integrations' && (
                    <motion.div key="integrations" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <Card className="border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden mb-8 relative group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                <CardHeader>
                                    <div className="flex items-center justify-between mb-2">
                                        <Cloud className="w-8 h-8 text-blue-500" />
                                        <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800">Coming Soon</Badge>
                                    </div>
                                    <CardTitle className="text-xl font-bold">Microsoft 365 Sync</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                                        Seamlessly sync your Azure Active Directory. Instantly pull employee records, department structures, and managerial hierarchies to auto-populate dropdowns for new user onboarding forms.
                                    </p>
                                    <Button variant="outline" className="w-full text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/50" disabled>
                                        Configure Azure AD Sync <Lock className="w-3 h-3 ml-2" />
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card className="border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden relative group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                <CardHeader>
                                    <div className="flex items-center justify-between mb-2">
                                        <Database className="w-8 h-8 text-emerald-500" />
                                        <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800">Coming Soon</Badge>
                                    </div>
                                    <CardTitle className="text-xl font-bold">Google Workspace Sync</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                                        Keep VibeIntake in perfect harmony with your Google Workspace directory. Map user groups to form permissions and allow form submissions to trigger automated Google Group membership changes or title updates.
                                    </p>
                                    <Button variant="outline" className="w-full text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50" disabled>
                                        Configure Google Workspace <Lock className="w-3 h-3 ml-2" />
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        {/* White-Glove IT Services CTA */}
                        <div>
                            <Card className="bg-slate-900 border-slate-800 shadow-2xl h-full flex flex-col items-center justify-center p-8 text-center relative overflow-hidden text-white">
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-500/30 rounded-full blur-[80px]" />
                                <div className="absolute -top-24 -left-24 w-64 h-64 bg-fuchsia-500/20 rounded-full blur-[80px]" />

                                <MonitorUp className="w-16 h-16 text-indigo-400 mb-6 relative z-10 drop-shadow-lg" />
                                <h3 className="text-2xl font-black mb-4 relative z-10 tracking-tight">Need White-Glove Setup?</h3>
                                <p className="text-slate-300 mb-8 max-w-sm mx-auto relative z-10 leading-relaxed font-medium">
                                    Every enterprise is different. If your team needs custom Active Directory mappings, HIPAA-compliant webhook orchestration, or full start-to-finish process implementation, we can handle it.
                                </p>
                                <Button size="lg" className="w-full sm:w-auto relative z-10 font-bold bg-white text-slate-900 hover:bg-slate-100 rounded-full h-14 px-8">
                                    Talk to Professional Services <ExternalLink className="w-4 h-4 ml-2" />
                                </Button>
                            </Card>
                        </div>
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    )
}
