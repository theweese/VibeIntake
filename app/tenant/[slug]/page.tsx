import { PageHeader, Card, CardHeader, CardTitle, CardContent, Button } from '@/components/ui'
import { Building2, ShieldAlert } from 'lucide-react'

export default function TenantDashboard({ params }: { params: { slug: string } }) {
    // Capitalize the slug for the demo company name "stjoemachining" -> "Stjoemachining"
    const companyName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <PageHeader
                title={`${companyName} Secure Intake`}
                description={`Welcome to the dedicated intake portal for ${companyName}. All data submitted is end-to-end encrypted.`}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <Card className="shadow-lg border-indigo-100 dark:border-indigo-900/50">
                    <CardHeader>
                        <Building2 className="w-8 h-8 text-indigo-500 mb-2" />
                        <CardTitle>Forms & Documents</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">Select a form below to begin a new secure submission session.</p>
                        <div className="space-y-4">
                            <Button variant="outline" className="w-full justify-start h-14 text-left">
                                New Patient Registration
                            </Button>
                            <Button variant="outline" className="w-full justify-start h-14 text-left">
                                Annual HIPAA Consent
                            </Button>
                            <Button variant="outline" className="w-full justify-start h-14 text-left">
                                General Feedback
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                    <CardHeader>
                        <ShieldAlert className="w-8 h-8 text-slate-500 mb-2" />
                        <CardTitle>Portal Security</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                            You are accessing a secure, isolated sub-domain on the VibeIntake platform. All data collected here is partitioned and web-hooked directly to {companyName}'s internal ERP/CRM system without generic retention.
                        </p>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                            For support regarding this portal, please contact the local IT administration team at {companyName}.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
