"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Fingerprint, Kanban, UploadCloud, Building2, ChevronDown, Workflow, CreditCard, Sparkles, User, LogIn, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui"
import { useTheme } from "next-themes"

export function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [sessionData, setSessionData] = useState<{ company: string, user: string } | null>(null)
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const curSession = localStorage.getItem('vibe-session')
        if (curSession) {
            setIsLoggedIn(true)
            setSessionData(JSON.parse(curSession))
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('vibe-session')
        setIsLoggedIn(false)
        setSessionData(null)
        window.location.href = '/'
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/40 dark:bg-black/20 backdrop-blur-xl">
            <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">

                {/* Left Section: Logo & Conditional Org Switcher */}
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="p-1.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg group-hover:shadow-indigo-500/25 transition-all">
                            <Fingerprint className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
                            VibeIntake
                        </span>
                    </Link>

                    {isLoggedIn && (
                        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer group animate-in fade-in slide-in-from-left-2">
                            <div className="w-5 h-5 rounded bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
                                <Building2 className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{sessionData?.company || 'My Organization'}</span>
                            <span className="ml-1 text-[10px] font-bold py-0.5 px-1.5 rounded bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400">HQ</span>
                            <ChevronDown className="w-4 h-4 text-slate-400 ml-1 group-hover:text-slate-600 dark:group-hover:text-slate-300" />
                        </div>
                    )}
                </div>

                {/* Right Section: Navigation Links */}
                <nav className="hidden md:flex items-center gap-6">
                    {!isLoggedIn ? (
                        // Logged Out Navigation
                        <>
                            <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                                Home
                            </Link>
                            <Link href="/pricing" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                                Pricing
                            </Link>
                            <Link href="/demo" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                                Demo
                            </Link>
                            <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                                Contact Us
                            </Link>

                            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2" />

                            {mounted && (
                                <button
                                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                    className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors mr-1"
                                    aria-label="Toggle theme"
                                >
                                    {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                                </button>
                            )}

                            <Link href="/signup" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors flex items-center gap-2">
                                Login <LogIn className="w-4 h-4" />
                            </Link>
                            <Link href="/signup">
                                <Button size="sm" className="rounded-full shadow-sm">
                                    Sign Up
                                </Button>
                            </Link>
                        </>
                    ) : (
                        // Logged In Navigation
                        <>
                            <Link href="/upload" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors flex items-center gap-1.5 animate-in fade-in slide-in-from-right-2" style={{ animationDelay: '50ms' }}>
                                <UploadCloud className="w-4 h-4" /> Upload
                            </Link>
                            <Link href="/dashboard" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors flex items-center gap-1.5 animate-in fade-in slide-in-from-right-2" style={{ animationDelay: '100ms' }}>
                                <Kanban className="w-4 h-4" /> Dashboard
                            </Link>
                            <Link href="/pipelines" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors flex items-center gap-1.5 animate-in fade-in slide-in-from-right-2" style={{ animationDelay: '150ms' }}>
                                <Workflow className="w-4 h-4" /> Integrations
                            </Link>
                            <Link href="/pricing" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors flex items-center gap-1.5 animate-in fade-in slide-in-from-right-2" style={{ animationDelay: '200ms' }}>
                                <CreditCard className="w-4 h-4" /> Billing
                            </Link>

                            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2 animate-in fade-in" />

                            <div className="group relative">
                                <div
                                    className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300 mt-0 shadow-inner overflow-hidden cursor-pointer hover:border-indigo-500 transition-colors animate-in zoom-in"
                                    onClick={handleLogout}
                                >
                                    {sessionData?.user ? (
                                        <span className="uppercase">{sessionData.user.charAt(0)}</span>
                                    ) : (
                                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Brett" alt="Avatar" className="w-full h-full object-cover" />
                                    )}
                                </div>
                                {/* Tooltip hint to logout */}
                                <div className="absolute top-12 right-0 w-max bg-slate-800 text-white text-xs py-1 px-3 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    Sign Out
                                </div>
                            </div>
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}
