"use client"

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, Button, Input } from '@/components/ui'
import { Building2, Users, FileStack, PlusCircle, Activity, Settings, LayoutGrid, CheckCircle2, ChevronRight, Hash, LogOut, FilePlus } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import toast from 'react-hot-toast'

type SessionData = {
    user: string;
    email: string;
    company: string;
}

export default function DashboardPage() {
    const [session, setSession] = useState<SessionData | null>(null)
    const [forms, setForms] = useState(['Employee Referral App', 'HIPAA Release Form'])
    const [users, setUsers] = useState<string[]>([])
    const [newUser, setNewUser] = useState('')

    useEffect(() => {
        const data = localStorage.getItem('vibe-session')
        if (data) {
            const parsed = JSON.parse(data)
            setSession(parsed)
            setUsers([parsed.user, 'System Admin'])
        } else {
            // Redirect to login if unauthorized
            window.location.href = '/signup'
        }
    }, [])

    const handleAddUser = () => {
        if (!newUser.trim()) return
        setUsers(prev => [...prev, newUser.trim()])
        setNewUser('')
        toast.success(`User ${newUser} added to workspace!`)
    }

    const handleAddForm = () => {
        window.location.href = '/upload' // Use our existing generation page
    }

    const handleLogout = () => {
        localStorage.removeItem('vibe-session')
        window.location.href = '/'
    }

    if (!session) return <div className="h-screen flex items-center justify-center p-8"><span className="animate-pulse text-indigo-500 font-bold">Loading Workspace...</span></div>

    // Subdomain mock logic
    const mockSubdomain = session.company.toLowerCase().replace(/[^a-z0-9]/g, '') + '.vibeintake.com'

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0A0D14] p-4 lg:p-8">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Dashboard Header */}
                <header className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mt-4 mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-fuchsia-600 rounded-2xl shadow-lg flex items-center justify-center text-white text-2xl font-black">
                            {session.company.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">
                                {session.company} Workspace
                            </h1>
                            <div className="text-sm text-slate-500 flex items-center gap-1.5 mt-1 font-mono">
                                <Activity className="w-3.5 h-3.5 text-green-500" /> Infrastructure Active
                                <span className="mx-2 text-slate-300 dark:text-slate-700">|</span>
                                <Link href={`https://${mockSubdomain}`} target="_blank" className="hover:text-indigo-400 hover:underline">
                                    {mockSubdomain}
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="h-11 shadow-sm"><Settings className="w-4 h-4 mr-2" /> Settings</Button>
                        <Button onClick={handleLogout} variant="destructive" className="h-11 shadow-sm"><LogOut className="w-4 h-4 mr-2" /> Sign Out</Button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Panel: Primary Content */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Summary Cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                            <Card className="border-none shadow-md bg-white dark:bg-slate-900">
                                <CardContent className="p-6">
                                    <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-4">
                                        <FileStack className="w-5 h-5" />
                                    </div>
                                    <p className="text-sm font-bold text-slate-500">Active Forms</p>
                                    <h4 className="text-3xl font-black text-slate-900 dark:text-white mt-1">{forms.length}</h4>
                                </CardContent>
                            </Card>
                            <Card className="border-none shadow-md bg-white dark:bg-slate-900">
                                <CardContent className="p-6">
                                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center mb-4">
                                        <Hash className="w-5 h-5" />
                                    </div>
                                    <p className="text-sm font-bold text-slate-500">Monthly Submissions</p>
                                    <h4 className="text-3xl font-black text-slate-900 dark:text-white mt-1">42</h4>
                                </CardContent>
                            </Card>
                            <Card className="border-none shadow-md bg-white dark:bg-slate-900 hidden lg:block">
                                <CardContent className="p-6">
                                    <div className="w-10 h-10 bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-600 dark:text-fuchsia-400 rounded-xl flex items-center justify-center mb-4">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <p className="text-sm font-bold text-slate-500">Workspace Members</p>
                                    <h4 className="text-3xl font-black text-slate-900 dark:text-white mt-1">{users.length}</h4>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Forms Data Table */}
                        <Card className="shadow-lg border-slate-200 dark:border-slate-800">
                            <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-4 bg-slate-50/50 dark:bg-slate-950/20 flex flex-row items-center justify-between">
                                <div className="space-y-1">
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <LayoutGrid className="w-5 h-5 text-indigo-500" /> Deployed Forms
                                    </CardTitle>
                                </div>
                                <Button onClick={handleAddForm} className="h-9 gap-1.5 shadow-sm text-sm">
                                    <FilePlus className="w-4 h-4" /> New Form
                                </Button>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {forms.map((form, i) => (
                                        <div key={i} className="p-5 flex items-center justify-between group hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-200 dark:border-slate-700 shadow-sm shrink-0">
                                                    <FileStack className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <h5 className="font-bold text-slate-900 dark:text-white">{form}</h5>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="flex items-center text-[10px] font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-md uppercase tracking-wide">
                                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse" /> LIVE
                                                        </span>
                                                        <span className="text-xs text-slate-500 font-mono tracking-wide px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">v1.0.{(i * 3) + 1}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Button variant="ghost" className="shrink-0 group-hover:bg-slate-200 dark:group-hover:bg-slate-800 w-8 h-8 p-0">
                                                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-500" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Panel */}
                    <div className="space-y-8">
                        {/* Identity Context */}
                        <Card className="bg-indigo-600 border-none shadow-xl text-white relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                            <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 blur-3xl rounded-full" />
                            <CardContent className="p-8 relative z-10">
                                <p className="text-indigo-200 font-bold uppercase tracking-wider text-xs mb-2">Signed in as</p>
                                <h3 className="text-2xl font-black mb-1">{session.user}</h3>
                                <p className="text-sm font-medium text-indigo-100 mb-6 font-mono opacity-80">{session.email}</p>
                                <Button className="w-full bg-white text-indigo-600 hover:bg-slate-100 gap-2 h-10" variant="secondary">
                                    Manage Profile
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Team Access */}
                        <Card className="shadow-lg border-slate-200 dark:border-slate-800">
                            <CardHeader className="pb-3 flex flex-row items-center justify-between border-b border-slate-100 dark:border-slate-800">
                                <CardTitle className="text-base font-bold flex items-center gap-2">
                                    <Users className="w-4 h-4 text-fuchsia-500" /> Workspace Team
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="p-4 space-y-3 bg-slate-50 dark:bg-slate-900/30">
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="jane@company.com"
                                            className="h-10 text-sm bg-white dark:bg-slate-950"
                                            value={newUser}
                                            onChange={(e) => setNewUser(e.target.value)}
                                            onKeyDown={e => e.key === 'Enter' && handleAddUser()}
                                        />
                                        <Button onClick={handleAddUser} className="h-10 shrink-0 px-3 bg-fuchsia-600 hover:bg-fuchsia-700 text-white shadow-md">
                                            Invite
                                        </Button>
                                    </div>
                                </div>
                                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {users.map((u, i) => (
                                        <div key={i} className="flex items-center gap-3 p-4">
                                            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-xs text-slate-500 shrink-0">
                                                {u.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{u}</p>
                                                <p className="text-xs text-slate-500">{i === 0 ? 'Owner' : 'Member'}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

            </div>
        </div>
    )
}
