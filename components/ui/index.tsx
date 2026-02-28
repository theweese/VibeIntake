import * as React from "react"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

// --- Button Component ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
    size?: 'sm' | 'md' | 'lg';
}
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = "", variant = 'primary', size = 'md', ...props }, ref) => {
        const baseStyles = "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"

        const sizeStyles = {
            sm: "h-8 px-3 py-1 text-xs",
            md: "h-10 px-4 py-2",
            lg: "h-12 px-8 py-3 text-base"
        }

        const variants = {
            primary: "bg-indigo-600 text-white shadow hover:bg-indigo-700/90 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:text-white",
            secondary: "bg-slate-100 text-slate-900 shadow-sm hover:bg-slate-200/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
            outline: "border border-slate-200 bg-transparent hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-800",
            ghost: "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:text-slate-300 dark:hover:text-slate-50",
            destructive: "bg-red-500 text-white shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-red-100 dark:hover:bg-red-900/90"
        }

        return (
            <button ref={ref} className={cn(baseStyles, sizeStyles[size], variants[variant], className)} {...props} />
        )
    }
)
Button.displayName = "Button"

// --- Input Component ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, ...props }, ref) => {
        return (
            <div className="flex flex-col space-y-1.5 w-full">
                {label && (
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {label}
                    </label>
                )}
                <input
                    className={cn(
                        "flex h-10 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:focus:ring-indigo-500/50 focus:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all",
                        error && "border-red-500 focus:ring-red-400 focus:border-red-500",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && <p className="text-xs text-red-500">{error}</p>}
            </div>
        )
    }
)
Input.displayName = "Input"

// --- Card Component ---
export function Card({ className = "", children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={`rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl text-slate-950 dark:text-slate-50 shadow-sm ${className}`} {...props}>
            {children}
        </div>
    )
}

export function CardHeader({ className = "", children }: { className?: string, children: React.ReactNode }) {
    return <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
}

export function CardTitle({ className = "", children }: { className?: string, children: React.ReactNode }) {
    return <h3 className={`font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
}

export function CardContent({ className = "", children }: { className?: string, children: React.ReactNode }) {
    return <div className={`p-6 pt-0 ${className}`}>{children}</div>
}

// --- PageHeader Component ---
export function PageHeader({
    title,
    description,
    icon: Icon,
    action
}: {
    title: string,
    description?: string,
    icon?: LucideIcon,
    action?: React.ReactNode
}) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
                {Icon && (
                    <div className="p-3 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-xl">
                        <Icon className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                    </div>
                )}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">{title}</h1>
                    {description && (
                        <p className="text-slate-500 dark:text-slate-400 mt-1 max-w-xl text-sm md:text-base leading-relaxed">{description}</p>
                    )}
                </div>
            </div>
            {action && (
                <div className="flex-shrink-0">
                    {action}
                </div>
            )}
        </div>
    )
}

// --- Badge Component ---
export function Badge({ children, variant = "default", className = "" }: { children: React.ReactNode, variant?: "default" | "success" | "warning" | "error" | "outline", className?: string }) {
    const variants = {
        default: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
        success: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800",
        warning: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800",
        error: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800",
        outline: "border border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-400"
    }
    return (
        <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider", variants[variant], className)}>
            {children}
        </span>
    )
}
