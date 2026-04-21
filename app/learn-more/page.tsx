import Link from "next/link";

const body = "text-[17px] text-white/90 leading-[1.6]";

export default function LearnMorePage() {
  return (
    <main className="min-h-screen bg-[#0b0b0c] text-white flex flex-col">
      <div className="flex-1 max-w-2xl mx-auto w-full px-6 py-12 md:py-16">
        <Link href="/" className="text-sm text-white/60 hover:text-white mb-10 inline-block">
          ← Back
        </Link>

        <header className="text-center sm:text-left mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-white/95 tracking-tight m-0">
            The Compass
          </h1>
        </header>

        <article className={`${body} flex flex-col gap-6`}>
          <p className="m-0">Some pursuits in life carry more weight than others.</p>
          <p className="m-0">
            They&apos;re the ones where something meaningful is genuinely at stake — where the outcome doesn&apos;t
            just affect a season of life but defines it. These are the times where confidence is built, purpose gets
            clarified, and the life someone actually wants either comes clearly into focus — or drifts further from
            reach. What makes them so defining is that they&apos;re deeply personal — driven by underlying motivations
            that most people never stop to name but will recognize the moment they see them. Most can be traced to one or
            more of six orientations.
          </p>
          <ul className="m-0 pl-6 list-disc space-y-1 leading-snug">
            <li>
              <span className="font-bold text-white/95">The Builder</span>
              {" — "}Someone energized with ideas and wanting to construct something new from the start.
            </li>
            <li>
              <span className="font-bold text-white/95">The Tuner</span>
              {" — "}Someone doing fine on the surface but wanting refinement and alignment to feel whole.
            </li>
            <li>
              <span className="font-bold text-white/95">The Seeker</span>
              {" — "}Someone searching for clarity, grounding, or meaning before their next move.
            </li>
            <li>
              <span className="font-bold text-white/95">The Burner</span>
              {" — "}Someone who has outgrown an old version of life and is looking to reset completely.
            </li>
            <li>
              <span className="font-bold text-white/95">The Scaler</span>
              {" — "}Someone already in motion and looking for the foundation that will support growth without
              sacrificing current momentum.
            </li>
            <li>
              <span className="font-bold text-white/95">The Becomer</span>
              {" — "}Someone early in their journey and still exploring identity and direction.
            </li>
          </ul>
          <p className="m-0">
            Most people will face several of these in a lifetime. Many are facing one right now.
          </p>
          <p className="m-0">
            But recognizing the underlying motivation is the easy part. The harder part is navigating it well. And the
            reason has nothing to do with capability, experience, or how hard someone is willing to work.
          </p>
          <p className="m-0">It&apos;s structural.</p>
          <p className="m-0">
            The moment something becomes meaningful — when the stakes are real and other people are involved —
            perspective gets compromised. Not because something is wrong. But because proximity and stakes are the two
            things that most reliably obscure the view. Everyone inside something that matters is structurally
            disadvantaged by that fact alone. And when the view is obscured, the source of what&apos;s truly driving the
            pursuit becomes harder to see clearly — which means everything external starts to carry more weight than it
            should. Timing, circumstances, and narrative fill the space that intention and clarity would otherwise
            occupy.
          </p>
          <p className="m-0">When that happens, the risks are predictable.</p>
          <ul className="m-0 pl-6 list-disc space-y-1 leading-snug">
            <li>Too much time and energy spent moving in the wrong direction.</li>
            <li>Too much effort placed on the wrong problems.</li>
            <li>Progress that feels real but sits on unstable ground.</li>
          </ul>
          <p className="m-0">
            None of that is permanent. But it costs more than it should — in time, in effort, and in the confidence
            and fulfillment that quietly erode when something this important doesn&apos;t go the way it should.
          </p>
          <p className="m-0">
            That&apos;s not a personal failing. It&apos;s just what happens when the terrain is complex and there&apos;s
            nothing reliable to navigate by.
          </p>

          <p className="m-0 py-2 font-bold text-white text-lg md:text-xl text-center sm:text-left">
            The Compass was built for exactly this.
          </p>

          <p className="m-0">
            A navigation system built around two frames of reference that — once each is understood and their
            relationship becomes clear — provides the orientation that any terrain demands. No matter the complexity. No
            matter the motivation. No matter the direction. A simple, repeatable framework that can bring clarity,
            intention, and agency to the pursuits that deserve it most.
          </p>
        </article>

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
