"use client"

import { Card, CardContent, Button, PageHeader, Badge } from '@/components/ui'
import { Kanban, Search, ArrowRight, Clock, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

export default function CommandCenter() {

  const dummyTickets = [
    { id: "T-8902", name: "Sarah Jenkins", form: "Patient Intake 2026", status: "New", time: "10 mins ago" },
    { id: "T-8901", name: "Marcus Reed", form: "Financial Aid App", status: "In Progress", time: "1 hr ago" },
    { id: "T-8899", name: "Elena Rust", form: "Patient Intake 2026", status: "Resolved", time: "Yesterday" },
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 flex items-center gap-3">
            <div className="p-2 bg-slate-900 dark:bg-slate-800 rounded-xl">
              <Kanban className="w-6 h-6 text-white" />
            </div>
            Command Center
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Manage incoming form submissions and track PII audit logs.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/upload">
            <Button variant="outline" className="bg-white dark:bg-slate-950">Scan New Form</Button>
          </Link>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Submissions</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-slate-50 mt-2">1,204</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> Avg Triage Time
            </p>
            <p className="text-3xl font-bold text-slate-900 dark:text-slate-50 mt-2">4m 12s</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-indigo-100 dark:border-indigo-900/50">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Secure Data Fields
            </p>
            <p className="text-3xl font-bold text-indigo-900 dark:text-indigo-100 mt-2">3,492</p>
          </CardContent>
        </Card>
      </div>

      {/* Ticket Kanban Board simulation */}
      <div className="mt-8">
        <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100 mb-4">Recent Tickets</h3>

        <div className="bg-white/50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl overflow-hidden backdrop-blur-xl">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-200/60 dark:border-slate-800/60 text-sm font-medium text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-black/20">
            <div className="col-span-2">Ticket ID</div>
            <div className="col-span-3">Submitter</div>
            <div className="col-span-3">Form</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2 text-right">Time</div>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {dummyTickets.map(ticket => (
              <Link href={`/tickets/${ticket.id}`} key={ticket.id}>
                <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer group">
                  <div className="col-span-2 font-mono text-sm text-indigo-600 dark:text-indigo-400">{ticket.id}</div>
                  <div className="col-span-3 font-medium text-slate-900 dark:text-slate-100">{ticket.name}</div>
                  <div className="col-span-3 text-sm text-slate-600 dark:text-slate-400">{ticket.form}</div>
                  <div className="col-span-2">
                    <Badge variant={ticket.status === 'New' ? 'warning' : ticket.status === 'Resolved' ? 'success' : 'default'}>
                      {ticket.status}
                    </Badge>
                  </div>
                  <div className="col-span-2 text-right text-sm text-slate-500 dark:text-slate-500 flex items-center justify-end gap-2">
                    {ticket.time}
                    <ArrowRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 group-hover:text-indigo-500 transition-all group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
