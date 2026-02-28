import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";

const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: "VibeIntake | The Privacy-First Action Engine",
  description: "Paper-to-Digital Intake Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${outfit.variable} font-sans bg-slate-50 dark:bg-[#0A0D14] text-slate-900 dark:text-slate-50 min-h-screen selection:bg-indigo-500/30`}>

        {/* Abstract Background pattern */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-40 dark:opacity-20 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-400/20 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-blue-500/20 blur-[100px]" />
        </div>

        <div className="relative z-10 flex h-screen flex-col overflow-hidden">
          <Navbar />

          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
