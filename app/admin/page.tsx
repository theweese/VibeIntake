"use client"

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, Button, PageHeader, Badge, Input } from '@/components/ui'
import { Server, Users, Search, ShieldCheck, MoreVertical, Building2, UserPlus, Key, Trash, Settings, LogOut, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

// Mock Data
const INITIAL_CLIENTS = [
    { id: '1', name: 'Sterling Cooper Intake', type: 'Enterprise', users: 14, status: 'Active', plan: 'Enterprise SLA' },
    { id: '2', name: 'Dunder Mifflin 5K', type: 'Non-Profit', users: 8, status: 'Active', plan: 'Non-Profit Tier' },
    { id: '3', name: 'Patient Registration', type: 'Medical', users: 3, status: 'Draft', plan: 'Pro' },
    { id: '4', name: 'City Archive Project', type: 'Enterprise', users: 12, status: 'Suspended', plan: 'Custom' }
]

export default function AdminConsole() {
    const [clients, setClients] = useState(INITIAL_CLIENTS)
    const [searchTerm, setSearchTerm] = useState('')
    const [isSimulatingAction, setIsSimulatingAction] = useState(false)

    const filteredClients = clients.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const handleSimulatedAction = (action: string, company: string) => {
        setIsSimulatingAction(true)
        setTimeout(() => {
            setIsSimulatingAction(false)
            toast.success(`${action} initialized for ${company}.`)
        }, 1000)
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0A0D14] flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col hidden md:flex">
                <div className="h-16 flex items-center px-6 border-b border-slate-800">
                    <ShieldCheck className="w-5 h-5 text-indigo-500 mr-2" />
                    <span className="text-white font-bold tracking-tight">VibeIntake Admin</span>
                </div>
                <nav className="flex-1 py-6 px-3 space-y-1">
                    <div className="px-3 py-2 bg-indigo-500/10 text-indigo-400 rounded-lg font-medium flex items-center text-sm mb-1">
                        <Building2 className="w-4 h-4 mr-3" /> Client Organizations
                    </div>
                    <div className="px-3 py-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg font-medium flex items-center text-sm mb-1 cursor-pointer transition-colors">
                        <Users className="w-4 h-4 mr-3" /> Platform Users
                    </div>
                    <div className="px-3 py-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg font-medium flex items-center text-sm mb-1 cursor-pointer transition-colors">
                        <Server className="w-4 h-4 mr-3" /> System Logs & Webhooks
                    </div>
                    <div className="px-3 py-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg font-medium flex items-center text-sm mb-1 cursor-pointer transition-colors">
                        <Key className="w-4 h-4 mr-3" /> Global Permissions
                    </div>
                </nav>
                <div className="p-4 border-t border-slate-800">
                    <div className="flex justify-between items-center text-slate-400 text-sm">
                        <span>Platform Owner</span>
                        <LogOut className="w-4 h-4 hover:text-rose-400 cursor-pointer transition-colors" />
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Client Organizations</h2>
                    <Button onClick={() => toast("Client creation form would open here.")} className="h-9 gap-2">
                        <UserPlus className="w-4 h-4" /> Add New Client
                    </Button>
                </header>

                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-6xl mx-auto space-y-6">

                        {/* Stats Row */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <Card>
                                <CardContent className="p-6">
                                    <p className="text-sm font-bold text-slate-500 mb-1">Total Organizations</p>
                                    <h4 className="text-3xl font-black text-slate-900 dark:text-white">{clients.length}</h4>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-6">
                                    <p className="text-sm font-bold text-slate-500 mb-1">Active Active Users</p>
                                    <h4 className="text-3xl font-black text-slate-900 dark:text-white">196</h4>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-6">
                                    <p className="text-sm font-bold text-slate-500 mb-1">Forms Processed Today</p>
                                    <h4 className="text-3xl font-black text-slate-900 dark:text-white">1,042</h4>
                                </CardContent>
                            </Card>
                            <Card className="bg-indigo-600 border-none text-white">
                                <CardContent className="p-6">
                                    <p className="text-sm font-bold text-indigo-200 mb-1">System Status</p>
                                    <h4 className="text-3xl font-black flex items-center gap-2">
                                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" /> Optimal
                                    </h4>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Search & Filter */}
                        <div className="flex gap-4">
                            <div className="relative flex-1 max-w-md">
                                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <Input
                                    className="pl-9 bg-white dark:bg-slate-900"
                                    placeholder="Search organizations..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Client Table */}
                        <Card className="shadow-lg overflow-hidden border-slate-200 dark:border-slate-800">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-50 dark:bg-slate-950/50 text-slate-500 font-bold uppercase tracking-wider text-xs border-b border-slate-200 dark:border-slate-800">
                                        <tr>
                                            <th className="px-6 py-4">Client / Workspace</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Sub-Accounts/Users</th>
                                            <th className="px-6 py-4">Plan Tier</th>
                                            <th className="px-6 py-4 text-right">Top Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900/50">
                                        {filteredClients.map((client) => (
                                            <tr key={client.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
                                                            {client.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-slate-900 dark:text-slate-100">{client.name}</div>
                                                            <div className="text-xs text-slate-500">{client.id}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Badge className={client.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-none' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-none'}>
                                                        {client.status}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4 font-mono text-slate-600 dark:text-slate-400">
                                                    {client.users} Users
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold">
                                                        {client.plan}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="h-8 gap-1.5"
                                                        onClick={() => handleSimulatedAction('Permissions Audit', client.name)}
                                                    >
                                                        <Key className="w-3.5 h-3.5" /> Manage
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        className="h-8 w-8 p-0"
                                                        onClick={() => handleSimulatedAction('Settings opened', client.name)}
                                                    >
                                                        <Settings className="w-4 h-4 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}
