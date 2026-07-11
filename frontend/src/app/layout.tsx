import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "TTMS - Teacher Transfer Management System",
  description:
    "Online Teacher Transfer Management System for West Gojjam Educational Office",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <header className="border-b border-slate-200 bg-white/95 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:px-8 lg:flex-row lg:items-center lg:justify-between">
            <Link
              href="/"
              className="flex items-center gap-3 text-slate-900 no-underline"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-lg font-bold text-white shadow-lg shadow-blue-500/20">
                TT
              </div>
              <div>
                <p className="text-lg font-semibold">TTMS</p>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  Teacher Transfer System
                </p>
              </div>
            </Link>
            <nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-600">
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
              <Link href="/transferform" className="hover:text-blue-600">
                Transfer Form
              </Link>
              <Link href="/result" className="hover:text-blue-600">
                Result
              </Link>
              <Link href="/pdf-report" className="hover:text-blue-600">
                PDF Report
              </Link>
            </nav>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/login"
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Register
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-lg font-semibold text-white">TTMS</p>
              <p className="mt-2 max-w-xl text-sm text-slate-400">
                A modern teacher transfer management system for West Gojjam,
                built for efficiency and visibility.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <Link href="/pdf-report" className="hover:text-white">
                Download PDF
              </Link>
              <Link href="/reset-password" className="hover:text-white">
                Reset Password
              </Link>
              <Link href="/login" className="hover:text-white">
                Login
              </Link>
            </div>
          </div>
          <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} TTMS. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
