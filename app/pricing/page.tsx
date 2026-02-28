import { PageHeader, Card, CardHeader, CardTitle, CardContent, Button, Badge } from '@/components/ui'
import { CheckCircle2, ShieldAlert, Sparkles, Building2, Server, Globe } from 'lucide-react'
import Link from 'next/link'

export default function PricingPage() {
    const tiers = [
        {
            name: "Personal",
            price: "Free",
            description: "For individuals needing OCR extraction on a few forms per month.",
            features: ["100 Form Scans/mo", "Standard Security", "Email Notifications", "7-Day History"],
            icon: <Globe className="w-6 h-6 text-slate-500" />,
            highlight: false
        },
        {
            name: "Business",
            price: "$299",
            period: "/month",
            description: "For clinics and offices needing HIPAA compliant form pipelines.",
            features: ["5,000 Form Scans/mo", "PII Safety Shield", "Webhook Delivery", "AI Form Editor", "Sub-Accounts"],
            icon: <Sparkles className="w-6 h-6 text-indigo-500" />,
            highlight: true
        },
        {
            name: "Enterprise",
            price: "Custom",
            description: "For municipalities and hospital systems requiring massive historical uploads.",
            features: ["Unlimited Scans", "Dedicated VPC Vault", "Human-in-the-Loop Queue", "Batch SFTP Ingestion"],
            icon: <Building2 className="w-6 h-6 text-rose-500" />,
            highlight: false
        }
    ]

    return (
        <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">

            <div className="text-center max-w-3xl mx-auto mt-8">
                <Badge variant="outline" className="mb-4 text-indigo-500 border-indigo-200 dark:border-indigo-800">100% Data Isolation</Badge>
                <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 mb-6">
                    Scale your intake from Paper to Cloud
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                    Whether you are a local non-profit digitizing a clipboard, or an Enterprise hospital securely routing PII to existing EHRs, VibeIntake has a pipeline for you.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                {tiers.map((tier) => (
                    <Card key={tier.name} className={`relative p-2 ${tier.highlight ? 'border-indigo-500 shadow-xl shadow-indigo-500/10 dark:shadow-indigo-500/5' : ''}`}>
                        {tier.highlight && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full">
                                Most Popular
                            </div>
                        )}
                        <CardHeader>
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl ${tier.highlight ? 'bg-indigo-50 dark:bg-indigo-900/40' : 'bg-slate-100 dark:bg-slate-800'}`}>
                                    {tier.icon}
                                </div>
                            </div>
                            <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">{tier.description}</p>
                        </CardHeader>

                        <CardContent className="pt-2">
                            <div className="mb-8 flex items-baseline gap-1">
                                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{tier.price}</span>
                                {tier.period && <span className="text-slate-500 font-medium">{tier.period}</span>}
                            </div>

                            <ul className="space-y-4 mb-8">
                                {tier.features.map((feature, i) => (
                                    <li key={i} className="flex gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                                        <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Button variant={tier.highlight ? 'primary' : 'outline'} className="w-full">
                                {tier.price === "Custom" ? (
                                    <Link href="/contact" className="w-full text-center">Schedule a Meeting</Link>
                                ) : (
                                    "Get Started"
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-16 bg-slate-900 dark:bg-black rounded-3xl p-10 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl overflow-hidden relative">
                <div className="absolute top-[-50%] right-[-10%] w-[50%] h-[200%] bg-gradient-to-l from-indigo-500/20 to-transparent blur-3xl pointer-events-none transform rotate-12" />

                <div className="relative z-10 max-w-xl">
                    <div className="flex items-center gap-2 mb-4">
                        <ShieldAlert className="w-5 h-5 text-rose-400" />
                        <span className="text-rose-400 font-bold uppercase tracking-wider text-sm">Security Deep Dive</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">Zero Data Retention Option</h3>
                    <p className="text-slate-400 leading-relaxed">
                        Enterprise clusters can opt to use our OCR engine ephemerally. VibeIntake processes the form, pings your webhook or secure SFTP, and instantly shreds the file and database record from our servers within 100 milliseconds.
                    </p>
                </div>

                <div className="relative z-10 shrink-0">
                    <Button className="bg-white text-slate-900 hover:bg-slate-200">Read Security Whitepaper</Button>
                </div>
            </div>

        </div>
    )
}
