import Link from "next/link";

const body = "text-[17px] text-white/90 leading-[1.6]";
const sectionRule = "mt-8 pt-6 border-t border-white/10";

export default function LearnMorePage() {
  return (
    <main className="min-h-screen bg-[#0b0b0c] text-white flex flex-col">
      <div className="flex-1 max-w-2xl mx-auto w-full px-6 py-12 md:py-16">
        <Link href="/" className="text-sm text-white/60 hover:text-white mb-10 inline-block">
          ← Back
        </Link>

        <header className="text-center sm:text-left">
          <h1 className="text-3xl md:text-4xl font-semibold text-white/95 tracking-tight m-0">
            The Compass
          </h1>
          <p className="mt-2.5 m-0 text-[15px] md:text-base font-light text-white/65 tracking-wide italic">
            {"A companion app for navigating life's most meaningful pursuits"}
          </p>
        </header>

        <section className={sectionRule} aria-labelledby="learn-problem">
          <h2 id="learn-problem" className="text-lg md:text-xl font-semibold text-white/95 tracking-tight m-0 mb-4">
            What Nobody Taught
          </h2>
          <div className={`${body} space-y-4`}>
            <p className="m-0">
              {
                "There are critical times in everyone's life when they face a deep-rooted pull or drive to find, improve, build, scale, or become something that truly defines the next chapter of their life. The problem is that there's no formal training to fall back on when it's all on the line. Whether starting something new or advancing something already underway, people can lose momentum, build on unstable foundations, or even advance in the wrong direction if they don't have a system for effectively navigating the terrain. And if that persists around something deeply meaningful, confidence can erode and fulfillment and agency can quietly slip away — without even knowing why."
              }
            </p>
            <p className="m-0">
              {
                "The bottom line is this — people at these critical junctures deserve to navigate what matters most with purpose and intention."
              }
            </p>
          </div>
        </section>

        <section className={sectionRule} aria-labelledby="learn-compass">
          <h2 id="learn-compass" className="text-lg md:text-xl font-semibold text-white/95 tracking-tight m-0 mb-4">
            What Changes Everything
          </h2>
          <div className={`${body} space-y-4`}>
            <p className="m-0">
              {
                "The Compass is a framework for navigating life's most meaningful pursuits with clarity and direction — and it rests on two foundational ideas:"
              }
            </p>
            <ol className="m-0 list-decimal pl-8 space-y-3 my-1">
              <li>
                {
                  "All of life's roles and responsibilities can be reduced into four universal postures of contribution. Each one carries a clear and distinct responsibility for how to show up."
                }
              </li>
              <li>
                Meaningful progress always follows a specific sequence that must be built and stabilized from the ground up.
              </li>
            </ol>
            <p className="m-0">
              {
                "While the sequence is always the same, the responsibility for how to navigate it shifts depending on which of the four postures is best suited for the pursuit. Once the relationship between posture and sequence becomes visible — for yourself and for others — any journey becomes navigable with greater intention."
              }
            </p>
          </div>
        </section>

        <section className={sectionRule} aria-labelledby="learn-getting-started">
          <h2 id="learn-getting-started" className="text-lg md:text-xl font-semibold text-white/95 tracking-tight m-0 mb-4">
            Getting Started
          </h2>
          <div className={`${body} space-y-4`}>
            <p className="m-0">
              {
                "To try The Compass for yourself, register or sign in and take fifteen minutes to understand how it works. Once the mental model clicks, the complexity of what you're navigating will intantly become more readable."
              }
            </p>
            <p className="m-0">
              {
                "Then use the Compass consistently — as a working plan and stability check as the path evolves beneath you."
              }
            </p>
            <p className="m-0 mt-6 pt-6 border-t border-white/10">
              {
                "If you're trying to find, improve, build, scale, or become anything meaningful — don't try to navigate it without the right orientation. Use the Compass and build the next chapter of your life around what matters most with clarity, confidence, intention, and agency."
              }
            </p>
          </div>
        </section>

        <div className="mt-12 flex flex-col sm:flex-row flex-wrap gap-4">
          <Link
            href="/auth/login?next=/dashboard&signup=1&return=%2Flearn-more"
            className="rounded-lg border border-emerald-500/50 bg-emerald-500/20 px-8 py-3 text-base font-medium text-white transition-colors hover:bg-emerald-500/30 text-center"
          >
            Get started
          </Link>
          <Link
            href="/auth/login?next=/dashboard&return=%2Flearn-more"
            className="rounded-lg border border-white/30 bg-white/10 px-8 py-3 text-base font-medium text-white transition-colors hover:bg-white/20 text-center"
          >
            Sign in
          </Link>
        </div>
      </div>
    </main>
  );
}
