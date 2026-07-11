"use client";

import { saveSystemOverviewPdf } from "@/lib/pdf";

export default function PdfReportPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="mx-auto max-w-4xl bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          Download TTMS PDF Report
        </h1>
        <p className="text-gray-600 mb-8">
          Generate a PDF summary of the Teacher Transfer Management System for
          offline sharing and printing.
        </p>

        <button
          onClick={saveSystemOverviewPdf}
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition"
        >
          Download PDF Report
        </button>
      </div>
    </main>
  );
}
