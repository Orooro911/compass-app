import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0b0c] text-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-semibold text-white/95 tracking-tight m-0">
            The Compass
          </h1>
          <p className="mt-2.5 m-0 text-[15px] md:text-base font-light text-white/65 tracking-wide italic">
            A companion app for navigating life's most meaningful pursuits
          </p>
        </div>
        <p className="text-base md:text-lg text-white/80 max-w-2xl mb-12 leading-relaxed">
          {
            "There's no formal training for navigating the endeavors in life that matter most. Those times when people are trying to find, improve, build, scale, or become something that truly defines their next chapter. Whether just beginning or already in motion, people risk losing their bearing or moving in the wrong direction without an effective system for navigating the terrain. The Compass changes that with two critical reference points that — once their relationship is understood — can guide any meaningful pursuit with clarity, intention, and agency."
          }
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
          <Link
            href="/auth/login?next=/dashboard&signup=1"
            className="rounded-lg border border-emerald-500/50 bg-emerald-500/20 px-8 py-3 text-base font-medium text-white transition-colors hover:bg-emerald-500/30 text-center"
          >
            Get started
          </Link>
          <Link
            href="/learn-more"
            className="rounded-lg border border-white/20 bg-transparent px-8 py-3 text-base font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white text-center"
          >
            Learn more
          </Link>
          <Link
            href="/auth/login?next=/dashboard"
            className="rounded-lg border border-white/30 bg-white/10 px-8 py-3 text-base font-medium text-white transition-colors hover:bg-white/20 text-center"
          >
            Sign in
          </Link>
        </div>
      </div>
      <footer className="py-6 text-center text-sm text-white/40">
        A companion for clarity and purpose.
      </footer>
    </main>
  );
}
