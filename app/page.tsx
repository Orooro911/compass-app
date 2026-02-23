import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0b0c] text-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold text-white/95 tracking-tight mb-4">
          The Compass
        </h1>
        <p className="text-lg md:text-xl text-white/80 max-w-xl mb-2 leading-relaxed">
          Your personal dashboard for life roles, shared growth, and meaningful situations.
        </p>
        <p className="text-base text-white/60 max-w-lg mb-12">
          Map your identities, link what matters, and work through challenges with clarity.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/auth/login?next=/dashboard"
            className="rounded-lg border border-white/30 bg-white/10 px-8 py-3 text-base font-medium text-white transition-colors hover:bg-white/20"
          >
            Sign in
          </Link>
          <Link
            href="/auth/login?next=/dashboard"
            className="rounded-lg border border-emerald-500/50 bg-emerald-500/20 px-8 py-3 text-base font-medium text-white transition-colors hover:bg-emerald-500/30"
          >
            Get started
          </Link>
        </div>
      </div>
      <footer className="py-6 text-center text-sm text-white/40">
        A companion for clarity and purpose.
      </footer>
    </main>
  );
}
