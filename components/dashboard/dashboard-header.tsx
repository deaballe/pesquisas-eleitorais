export function DashboardHeader() {
  return (
    <header className="relative w-full overflow-hidden border-b border-white/10">
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-red-600/25 via-transparent to-blue-600/25"
      />
      <div
        aria-hidden
        className="absolute -top-24 left-1/2 size-96 -translate-x-1/2 rounded-full bg-amber-400/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl px-6 py-10">
        <h1 className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Presidential Polls Brazil 2026{" "}
          <span className="bg-gradient-to-r from-amber-200 via-white to-sky-200 bg-clip-text font-semibold text-transparent">
            - Business Analysis
          </span>
        </h1>
      </div>
    </header>
  )
}
