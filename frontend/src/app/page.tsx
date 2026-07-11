import Link from "next/link";

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100">
      <section className="relative py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-[1.25fr_0.85fr] lg:items-center">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-blue-600">
                Teacher Transfer System
              </p>
              <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
                Modern transfer management for West Gojjam schools.
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Manage teacher transfers, track requests, and generate PDF
                reports from one intuitive platform.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/transferform"
                  className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700"
                >
                  Start transfer form
                </Link>
                <Link
                  href="/result"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-900 transition hover:border-blue-600 hover:text-blue-600"
                >
                  View result
                </Link>
              </div>
            </div>
            <div className="rounded-[32px] border border-slate-200 bg-white/90 p-10 shadow-2xl shadow-slate-200/40 backdrop-blur-xl">
              <div className="space-y-6">
                <div className="rounded-3xl bg-blue-600 p-6 text-white shadow-lg shadow-blue-600/10">
                  <p className="text-sm uppercase tracking-[0.24em] text-blue-100">
                    Quick actions
                  </p>
                  <p className="mt-4 text-2xl font-semibold">
                    Login, submit requests, and export reports in seconds.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <p className="font-semibold text-slate-900">
                      Teacher Management
                    </p>
                    <p className="mt-2 text-sm text-slate-500">
                      Maintain teacher profiles and service records.
                    </p>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <p className="font-semibold text-slate-900">
                      Transfer Workflow
                    </p>
                    <p className="mt-2 text-sm text-slate-500">
                      Track requests through approval and assignment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900">Key Features</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
              <h3 className="text-xl font-semibold text-blue-600">
                Teacher Management
              </h3>
              <p className="mt-4 text-slate-600">
                Register and manage teacher information with confidence.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
              <h3 className="text-xl font-semibold text-blue-600">
                Transfer Requests
              </h3>
              <p className="mt-4 text-slate-600">
                Submit and monitor transfers with clear outcomes.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
              <h3 className="text-xl font-semibold text-blue-600">
                PDF Reports
              </h3>
              <p className="mt-4 text-slate-600">
                Export transfer summaries for offline sharing.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
