import Link from "next/link";

export default function ResultPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="mx-auto max-w-5xl rounded-[32px] border border-slate-200 bg-white p-10 shadow-xl">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600">
            TTMS Transfer Result
          </p>
          <h1 className="mt-4 text-4xl font-bold text-slate-900">
            Your transfer result is ready
          </h1>
          <p className="mt-3 text-slate-600 max-w-2xl leading-7">
            Check the latest transfer decision, assigned school details, and
            next steps for your teacher transfer request.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2 mb-10">
          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-semibold text-slate-900">Decision</h2>
            <p className="mt-4 text-slate-600">Approved</p>
            <p className="mt-2 text-sm text-slate-500">
              The transfer request has been approved by the relevant MERSU
              officer.
            </p>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-semibold text-slate-900">
              Assigned Location
            </h2>
            <p className="mt-4 text-slate-600">Gojjam Secondary School</p>
            <p className="mt-2 text-sm text-slate-500">
              Woreda: Finote Selam | Zone: West Gojjam
            </p>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3 mb-10">
          <div className="rounded-[28px] border border-slate-200 p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-500">
              Teacher
            </p>
            <p className="mt-3 text-lg font-semibold text-slate-900">
              Amanuel Bekele
            </p>
          </div>
          <div className="rounded-[28px] border border-slate-200 p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-500">
              Service years
            </p>
            <p className="mt-3 text-lg font-semibold text-slate-900">4 years</p>
          </div>
          <div className="rounded-[28px] border border-slate-200 p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-500">
              Transfer type
            </p>
            <p className="mt-3 text-lg font-semibold text-slate-900">
              School-to-School
            </p>
          </div>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-slate-50 p-8">
          <h2 className="text-2xl font-semibold text-slate-900">Next Steps</h2>
          <ul className="mt-4 space-y-3 text-slate-600 list-disc list-inside leading-7">
            <li>Review your report and assigned school information.</li>
            <li>
              Contact the receiving school director to coordinate your arrival.
            </li>
            <li>Confirm your transfer date with the Woreda office.</li>
          </ul>
        </section>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/pdf-report"
            className="inline-flex rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Download result as PDF
          </Link>
          <Link
            href="/login"
            className="inline-flex rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Back to login
          </Link>
        </div>
      </div>
    </main>
  );
}
