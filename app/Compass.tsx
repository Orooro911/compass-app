"use client";

import { useState, useEffect, type ReactNode } from "react";

type Role = "Achiever" | "Leader" | "Follower" | "Partner";

const ROLE_ANGLE: Record<Role, number> = {
  Achiever: 0,
  Leader: -90,
  Follower: 180,
  Partner: 90,
};

// Choose the angle equivalent to target that is within ±180° of current for shortest rotation
function shortestPathAngle(currentDeg: number, targetDeg: number): number {
  let delta = targetDeg - currentDeg;
  while (delta > 180) delta -= 360;
  while (delta < -180) delta += 360;
  return currentDeg + delta;
}

// Content for each role's lightbox (opened by the "i" icon next to the role label)
const ROLE_LIGHTBOX: Record<Role, { title: string; body: ReactNode }> = {
  Achiever: {
    title: "Responsibility of the Achiever",
    body: (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", alignItems: "start", fontSize: 17, lineHeight: 1.5, marginBottom: -4 }}>
        <div>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.45 }}>The Achiever sits North on the Compass.</p>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.45 }}>North isn&apos;t a position of superiority—it&apos;s direction. It&apos;s where clarity turns into motion, where knowing becomes doing.</p>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.45 }}>This is the posture we step into when something meaningful calls us forward.</p>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.45 }}>Its truth is simple but non-negotiable: No one else can carry our clarity for us. And no one else can build our life.</p>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.45 }}>That&apos;s why orienting here comes first—not because we will always operate from this Compass Role, but because this is where we ask: What do I want? What&apos;s worth pursuing? What am I willing to carry?</p>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.45 }}>We have a responsibility to be in pursuit. Not in frantic motion. Not in endless striving. But in steady alignment with what matters most.</p>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.45 }}>Because the greatest way to honor being here isn&apos;t just to feel grateful for it—it&apos;s to live like it matters. To shape something. To stretch. To build.</p>
        </div>
        <div>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.45 }}>There will be seasons when we need to tend, recover, or care for others. That&apos;s part of being human. But when the space opens again, this is where we return—not just to rebuild energy, but to remember who we are and what we&apos;re here to make better.</p>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.45 }}>Others are navigating their own version of this role too. Their urgency, resistance, or confusion often trace back to wants they&apos;re pursuing—or ones they&apos;ve yet to claim.</p>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.45 }}>When we see that, we meet them with more grace. We become better collaborators, parents, and partners—not by solving their problems, but by holding space for their authorship to unfold. Because when people feel seen, they move differently.</p>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.45 }}>The Achiever role is where authorship lives. Not because it&apos;s loud. Not because it&apos;s always clear. But because it turns want into motion—and makes everything else more navigable.</p>
          <p style={{ margin: 0, lineHeight: 1.45 }}>Make space for what matters most. And take responsibility for moving toward it.</p>
        </div>
      </div>
    ),
  },
  Leader: {
    title: "Responsibility of the Leader",
    body: (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", alignItems: "start", fontSize: 17, lineHeight: 1.5, marginBottom: -4 }}>
        <div>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.45 }}>The Leader role exists to shape clarity—not just for ourselves, but for others.</p>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.45 }}>That clarity doesn&apos;t come from control. It comes from vision—the willingness to look ahead, hold the long arc in view, and help people align around where we&apos;re going and why it matters.</p>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.45 }}>The Leader sits East on the Compass—the direction of illumination and beginnings. That&apos;s what this role offers: the ability to bring light to the path. Not by knowing everything, but by seeing early, holding steady, and helping others move with confidence.</p>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.45 }}>We don&apos;t need a title to lead. Leadership isn&apos;t about being in charge—it&apos;s about carrying the weight of orientation on behalf of others.</p>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.45 }}>That weight is real. It includes holding ambiguity, modeling consistency, and naming what others aren&apos;t ready to say. The Leader role asks: Am I holding this role as it&apos;s meant to be held? Am I shaping clarity where it&apos;s needed most?</p>
        </div>
        <div>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.45 }}>When this role is lived with intention, things begin to organize. Vision strengthens. Momentum becomes clear. When it is neglected—when we drift, avoid, or defer—others feel that too. Rhythm fades. Energy fragments.</p>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.45 }}>When clarity is missing, step forward. Use the Leader lens. Create coherence.</p>
          <p style={{ margin: 0, lineHeight: 1.45 }}>The responsibility of the Leader isn&apos;t just to go first—it&apos;s to make it easier for others to grow, contribute, and lead in return.</p>
        </div>
      </div>
    ),
  },
  Follower: {
    title: "Responsibility of the Follower",
    body: (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", alignItems: "start", fontSize: 17, lineHeight: 1.5, marginBottom: -4 }}>
        <div>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.45 }}>Of all the Compass roles, the Follower is often the most misunderstood.</p>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.45 }}>The Follower role is where we align ourselves with something meaningful, even when we&apos;re not the one setting the direction. It&apos;s where we learn, support, adapt, and contribute—not passively, but with grounded intention.</p>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.45 }}>The Follower sits South on the Compass—the direction of grounding and support. That&apos;s what this role offers: a space to root. A posture of learning.</p>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.45 }}>We follow in more ways than we often recognize: when we lean into mentorship, support a partner&apos;s dream, walk beside a child through a tough season. Good followers don&apos;t disappear—they amplify. They give shape and rhythm to what matters.</p>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.45 }}>Whether we&apos;re a teammate, student, collaborator, or caregiver, the Follower lens helps us ask: Am I supporting what matters most here? Am I showing up in a way that strengthens the whole?</p>
        </div>
        <div>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.45 }}>When we resist this role, it shows. We grow impatient. We withdraw. We withhold our gifts—or worse, our presence. But when we hold it well, something steady comes online. We become a source of gravity. Of trust. Of momentum that doesn&apos;t burn out.</p>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.45 }}>The Follower role often shapes us the most. By following well, we learn to listen more deeply. We practice letting go. We develop strength without ego.</p>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.45 }}>When life invites us to contribute—not by steering, but by strengthening—we use the Follower lens. We measure ourselves against the role. We choose to support something we believe in.</p>
          <p style={{ margin: 0, lineHeight: 1.45 }}>Because the Follower isn&apos;t a background role. It&apos;s a backbone. And the world needs more people who know how to follow well—with presence, clarity, and grace.</p>
        </div>
      </div>
    ),
  },
  Partner: {
    title: "Responsibility of the Partner",
    body: (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", alignItems: "start", fontSize: 17, lineHeight: 1.5 }}>
        <div>
          <p style={{ margin: "0 0 0.6rem", lineHeight: 1.5 }}>The Partner role is where synergy begins. It&apos;s where two (or more) people commit to moving forward together—each bringing presence, honesty, and effort to a shared goal, life, or experience.</p>
          <p style={{ margin: "0 0 0.6rem", lineHeight: 1.5 }}>The Partner sits West on the Compass by default—the direction of reflection, endurance, and deepening alignment.</p>
          <p style={{ margin: "0 0 0.6rem", lineHeight: 1.5 }}>This is the role that stabilizes and amplifies everything else. When it&apos;s strong, it creates resilience. When it&apos;s neglected, things that once felt aligned begin to fray.</p>
          <p style={{ margin: "0 0 0.6rem", lineHeight: 1.5 }}>We live this role in our closest relationships: in marriage, parenting, friendship, and business.</p>
          <p style={{ margin: "0 0 0.6rem", lineHeight: 1.5 }}>It shows up in creative collaborations, long-term commitments, and everyday agreements that only work when people bring their full selves with care.</p>
          <p style={{ margin: "0 0 0.6rem", lineHeight: 1.5 }}>It means being honest when something isn&apos;t working—and generous when someone else is struggling.</p>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.5 }}>Sometimes it means leading.</p>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.5 }}>Sometimes it means following.</p>
          <p style={{ margin: "0 0 0.6rem", lineHeight: 1.5 }}>But most of the time, it means staying engaged. Staying invested. Staying in the process, even when it&apos;s hard.</p>
          <p style={{ margin: "0 0 0.6rem", lineHeight: 1.5 }}>Whether we&apos;re a spouse, parent, collaborator, or friend, the Partner lens helps us ask:</p>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.5 }}>Am I showing up with honesty and care?</p>
          <p style={{ margin: 0, lineHeight: 1.5 }}>Am I carrying my share of the emotional weight?</p>
        </div>
        <div>
          <p style={{ margin: "0 0 0.6rem", lineHeight: 1.5 }}>But real partnership isn&apos;t just about shared goals.</p>
          <p style={{ margin: "0 0 0.6rem", lineHeight: 1.5 }}>It&apos;s about shared responsibility. It requires emotional presence—not just physical proximity.</p>
          <p style={{ margin: "0 0 0.6rem", lineHeight: 1.5 }}>Great partners don&apos;t just divide tasks. They multiply energy. They speak truth without blame. They listen without retreating.</p>
          <p style={{ margin: "0 0 0.6rem", lineHeight: 1.5 }}>They protect each other&apos;s growth—and hold each other accountable to the bigger thing they&apos;ve agreed to pursue.</p>
          <p style={{ margin: "0 0 0.6rem", lineHeight: 1.5 }}>When this role is neglected, communication breaks down. Assumptions grow. Resentment replaces clarity.</p>
          <p style={{ margin: "0 0 0.6rem", lineHeight: 1.5 }}>The bond that once created momentum begins to create drag.</p>
          <p style={{ margin: "0 0 0.6rem", lineHeight: 1.5 }}>But when we bring this role to life—through humility, presence, and clarity—something powerful happens.</p>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.5 }}>Trust deepens. Collaboration sharpens.</p>
          <p style={{ margin: "0 0 0.6rem", lineHeight: 1.5 }}>Both people grow—not in spite of the relationship, but because of it.</p>
          <p style={{ margin: "0 0 0.6rem", lineHeight: 1.5 }}>Partnership isn&apos;t about always agreeing.</p>
          <p style={{ margin: "0 0 0.6rem", lineHeight: 1.5 }}>It&apos;s about always engaging.</p>
          <p style={{ margin: 0, lineHeight: 1.5 }}>And when that engagement is steady, the momentum created together becomes something neither person could have produced alone.</p>
        </div>
      </div>
    ),
  },
};

// Content for each principle chip (P1–P9) per role — key: "Role-P1" etc. (opened by clicking P1, P2, … in a pyramid)
const PRINCIPLE_LIGHTBOX: Record<string, { title: string; body: ReactNode }> = {
  "Achiever-P1": { title: "Achiever Principle 1: Evaluate Opportunities and Obstacles", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Evaluate what&apos;s fueling or blocking momentum. Act to overcome obstacles with self-discipline.</p> },
  "Achiever-P2": { title: "Achiever Principle 2: Understand Style and Mindset", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Understand how beliefs drive performance. Act to strengthen focus and discipline under pressure.</p> },
  "Achiever-P3": { title: "Achiever Principle 3: Envision an Ideal Future", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Envision the future you want to build. Act with determination to turn vision into reality.</p> },
  "Achiever-P4": { title: "Achiever Principle 4: Set Measurable Objectives", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Sees the markers that show real advancement, and acts with discipline to reach them with consistency.</p> },
  "Achiever-P5": { title: "Achiever Principle 5: Prioritize What Matters", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Sees where energy creates progress or waste, and acts with discipline to protect focus on the highest-value actions.</p> },
  "Achiever-P6": { title: "Achiever Principle 6: Build Effective Systems", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Sees which routines sustain focus and energy, and acts to refine them for steady growth.</p> },
  "Achiever-P7": { title: "Achiever Principle 7: Invest in Personal Development", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Sees how new growth fuels progress, and acts with discipline to develop themselves and others.</p> },
  "Achiever-P8": { title: "Achiever Principle 8: Engage with Collaborators", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Sees how collaboration sharpens quality and reach, and acts to invite feedback and refine what&apos;s being built.</p> },
  "Achiever-P9": { title: "Achiever Principle 9: Maintain a Laser Focus on Execution", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Sees the gap between plan and outcome, and acts with urgency and precision to close it.</p> },
  "Leader-P1": { title: "Leader Principle 1: Evaluate Opportunities and Obstacles", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Look ahead to anticipate challenges and openings. Act to guide others toward a better way forward.</p> },
  "Leader-P2": { title: "Leader Principle 2: Understand Style and Mindset", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Understand how attitudes shape direction. Act to model the right mindset for the path ahead.</p> },
  "Leader-P3": { title: "Leader Principle 3: Envision an Ideal Future", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Envision what&apos;s possible beyond the present. Act to paint a clear picture that inspires others to believe in it.</p> },
  "Leader-P4": { title: "Leader Principle 4: Set Measurable Objectives", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Sees which aims best express an established vision, and acts to define clear markers that focus and unify effort.</p> },
  "Leader-P5": { title: "Leader Principle 5: Prioritize What Matters", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Sees which current priorities help or hinder key outcomes, and acts to eliminate drag and focus energy where it matters most.</p> },
  "Leader-P6": { title: "Leader Principle 6: Build Effective Systems", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Sees where structure or rhythm can strengthen progress, and acts to design systems that make success repeatable.</p> },
  "Leader-P7": { title: "Leader Principle 7: Invest in Personal Development", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Sees where growth will strengthen the path ahead, and acts to learn, improve, and model the same for others.</p> },
  "Leader-P8": { title: "Leader Principle 8: Engage with Collaborators", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Sees where alignment can expand, and acts to rally, inform, inspire, and recruit others to take part.</p> },
  "Leader-P9": { title: "Leader Principle 9: Maintain a Laser Focus on Execution", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Sees where momentum is drifting, and acts to realign focus and drive completion with clarity and consistency.</p> },
  "Follower-P1": { title: "Follower Principle 1: Evaluate Opportunities and Obstacles", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Evaluate what&apos;s helping or holding things back. Act to share what you notice so progress stays steady.</p> },
  "Follower-P2": { title: "Follower Principle 2: Understand Style and Mindset", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Understand how outlook influences stability. Act to stay grounded and positive through change.</p> },
  "Follower-P3": { title: "Follower Principle 3: Envision an Ideal Future", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Envision the larger vision taking shape. Act to align your effort and growth in that direction.</p> },
  "Follower-P4": { title: "Follower Principle 4: Set Measurable Objectives", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Sees how their contribution connects to an established vision, and acts to stay accountable to its progress.</p> },
  "Follower-P5": { title: "Follower Principle 5: Prioritize What Matters", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Sees which efforts support or distract from established goals, and acts to stay centered on what most advances them.</p> },
  "Follower-P6": { title: "Follower Principle 6: Build Effective Systems", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Sees how processes shape consistency, and acts to uphold habits and patterns that keep things running smoothly.</p> },
  "Follower-P7": { title: "Follower Principle 7: Invest in Personal Development", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Sees chances to grow in skill or understanding, and acts to apply learning and development to the benefit of the whole.</p> },
  "Follower-P8": { title: "Follower Principle 8: Engage with Collaborators", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Sees how shared effort strengthens results, and acts to expand contribution through themselves and others.</p> },
  "Follower-P9": { title: "Follower Principle 9: Maintain a Laser Focus on Execution", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Sees what&apos;s needed to finish well, and acts to stay dependable and deliver on the commitments at hand.</p> },
  "Partner-P1": { title: "Partner Principle 1: Evaluate Opportunities and Obstacles", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Evaluate shifts or tensions between people or priorities. Act to recalibrate for shared progress.</p> },
  "Partner-P2": { title: "Partner Principle 2: Understand Style and Mindset", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Understand how shared mindset affects connection. Act to restore balance and trust when it drifts.</p> },
  "Partner-P3": { title: "Partner Principle 3: Envision an Ideal Future", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Envision a shared future that balances needs and aspirations. Act to co-create a path forward for mutual gain.</p> },
  "Partner-P4": { title: "Partner Principle 4: Set Measurable Objectives", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Sees shared aims that bring a vision to life, and acts to pursue them for mutual gain.</p> },
  "Partner-P5": { title: "Partner Principle 5: Prioritize What Matters", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Sees where competing priorities cause friction or alignment, and acts to rebalance commitments for mutual progress.</p> },
  "Partner-P6": { title: "Partner Principle 6: Build Effective Systems", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Sees where shared systems can ease friction, and acts to build simple, reliable ways to make things better.</p> },
  "Partner-P7": { title: "Partner Principle 7: Invest in Personal Development", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Sees how shared growth builds trust and results, and acts to learn and improve together.</p> },
  "Partner-P8": { title: "Partner Principle 8: Engage with Collaborators", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Sees how trust and openness amplify impact, and acts to communicate, coordinate, and expand shared growth together.</p> },
  "Partner-P9": { title: "Partner Principle 9: Maintain a Laser Focus on Execution", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Sees how shared effort sustains results, and acts to stay coordinated and accountable until a shared vision is complete.</p> },
};
function getPrincipleLightbox(role: Role, principle: string) {
  const key = `${role}-${principle}`;
  return PRINCIPLE_LIGHTBOX[key] ?? { title: `${principle} — ${role}`, body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for {principle} ({role}) here.</p> };
}

// Content for each level icon (5 levels × 4 roles = 20). Key: "Role-LevelIndex" (LevelIndex 0–4).
const LEVEL_LIGHTBOX: Record<string, { title: string; body: ReactNode }> = {
  "Achiever-0": {
    title: "Achiever Level 1 — Foundation",
    body: (
      <>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}><strong>Principles 1–3</strong></p>
        <p style={{ margin: "0 0 0.5rem", lineHeight: 1.5 }}>P1 – Evaluate opportunities and obstacles</p>
        <p style={{ margin: "0 0 0.5rem", lineHeight: 1.5 }}>P2 – Understand mindset</p>
        <p style={{ margin: "0 0 1rem", lineHeight: 1.5 }}>P3 – Envision the ideal future</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>In the Achiever Role, the responsibility begins with you—clarify your interpretation of the situation and the future you intend to pursue.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>This level requires deliberate stabilization.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>If you have not clearly evaluated your situation, examined how your mindset is shaping it, and defined the future you actually want, your path forward will lack precision.</p>
        <p style={{ margin: "0 0 0.5rem", lineHeight: 1.5 }}>You may stay busy.</p>
        <p style={{ margin: "0 0 0.5rem", lineHeight: 1.5 }}>You may even make progress.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>But you will not have full agency over direction or outcome.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>Clarity here is not permanent. It reflects your most accurate interpretation based on the information available right now. It requires honest reflection and conscious choice.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>Whether you are pursuing something ambitious, improving what already exists, resolving a problem, pursuing an opportunity, or correcting drift, this work determines whether your progress is intentional or reactive.</p>
        <p style={{ margin: 0, lineHeight: 1.5 }}>Without stability here, control over the path ahead weakens or collapses.</p>
      </>
    ),
  },
  // ——— Achiever Level 2 content (P4–P5) ———
  "Achiever-1": {
    title: "Achiever — Level 2 Alignment",
    body: (
      <>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}><strong>Principles 4–5</strong></p>
        <p style={{ margin: "0 0 0.5rem", lineHeight: 1.5 }}>P4 – Set measurable objectives</p>
        <p style={{ margin: "0 0 1rem", lineHeight: 1.5 }}>P5 – Prioritize what matters</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>In the Achiever Role, alignment begins with defining how progress will be measured and where your energy will be focused.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>This level requires deliberate alignment.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>Once the situation is clearly understood and a future has been defined in Level 1, that vision must be translated into measurable objectives. Progress must have form. It must be observable. It must have markers that indicate whether movement is real.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>But measurement alone is not enough.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>Energy must be concentrated around what matters most. Competing priorities must be narrowed. Effort must be directed where it has the greatest impact.</p>
        <p style={{ margin: "0 0 0.5rem", lineHeight: 1.5 }}>If objectives are undefined, progress becomes subjective.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>If priorities are scattered, momentum weakens.</p>
        <p style={{ margin: "0 0 0.5rem", lineHeight: 1.5 }}>You may feel busy.</p>
        <p style={{ margin: "0 0 0.5rem", lineHeight: 1.5 }}>You may feel committed.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>But without clear measures and focused priorities, energy diffuses and results become inconsistent.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>Alignment here is not permanent. It depends on the stability of the foundation beneath it. If new information reshapes the situation or alters the vision, objectives and priorities must be recalibrated.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>Whether you are pursuing growth, improving performance, resolving friction, or correcting drift, this work determines whether effort compounds—or fragments.</p>
        <p style={{ margin: 0, lineHeight: 1.5 }}>Without stability in both Level 1 and Level 2, personal agency weakens and efficiency declines.</p>
      </>
    ),
  },
  "Achiever-2": { title: "Achiever Level 3", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for Achiever Level 3 here.</p> },
  "Achiever-3": { title: "Achiever Level 4", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for Achiever Level 4 here.</p> },
  "Achiever-4": { title: "Achiever Level 5", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for Achiever Level 5 here.</p> },
  "Leader-0": {
    title: "Leader Level 1 — Foundation",
    body: (
      <>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}><strong>Principles 1–3</strong></p>
        <p style={{ margin: "0 0 0.5rem", lineHeight: 1.5 }}>P1 – Evaluate opportunities and obstacles</p>
        <p style={{ margin: "0 0 0.5rem", lineHeight: 1.5 }}>P2 – Understand mindset</p>
        <p style={{ margin: "0 0 1rem", lineHeight: 1.5 }}>P3 – Envision the ideal future</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>In the Leader Role, the responsibility begins with you—clarify the situation and define a direction others can understand and align to.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>This level requires deliberate stabilization.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>If you have not clearly evaluated the terrain, examined how your and the mindset of others is shaping it, and defined a future that can be communicated and pursued together, alignment will be fragile.</p>
        <p style={{ margin: "0 0 0.5rem", lineHeight: 1.5 }}>You may move quickly.</p>
        <p style={{ margin: "0 0 0.5rem", lineHeight: 1.5 }}>You may issue direction.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>You may even see short-term progress.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>But without shared clarity, momentum will fracture and trust will strain.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>Clarity here is not permanent. It reflects your most accurate interpretation based on the information available right now. It requires disciplined reflection and intentional communication.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>Whether you are setting vision, correcting drift, pursuing opportunity, resolving tension, or strengthening what already exists, this work determines whether others can move with confidence—or merely react.</p>
        <p style={{ margin: 0, lineHeight: 1.5 }}>Without stability here, coordinated progress weakens or collapses.</p>
      </>
    ),
  },
  "Leader-1": {
    title: "Leader — Level 2 Alignment",
    body: (
      <>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}><strong>Principles 4–5</strong></p>
        <p style={{ margin: "0 0 0.5rem", lineHeight: 1.5 }}>P4 – Set measurable objectives</p>
        <p style={{ margin: "0 0 1rem", lineHeight: 1.5 }}>P5 – Prioritize what matters</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>In the Leader Role, alignment begins with defining measurable objectives and clarifying which priorities others must rally around.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>This level requires deliberate alignment.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>Once the situation is clearly understood and a future has been defined in Level 1, that vision must be translated into measurable objectives that others can see and align to. Progress must have form. It must be observable. It must have markers that indicate whether movement is real.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>But measurement alone is not enough.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>Energy must be concentrated around what matters most. Competing priorities must be narrowed so collective effort stays focused.</p>
        <p style={{ margin: "0 0 0.5rem", lineHeight: 1.5 }}>If objectives are undefined, direction becomes unclear.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>If priorities are scattered, alignment weakens.</p>
        <p style={{ margin: "0 0 0.5rem", lineHeight: 1.5 }}>You may move quickly.</p>
        <p style={{ margin: "0 0 0.5rem", lineHeight: 1.5 }}>You may issue direction.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>But without clear measures and disciplined priorities, coordinated effort fragments.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>Alignment here is not permanent. It depends on the stability of the foundation beneath it. If new information reshapes the situation or alters the vision, objectives and priorities must be realigned together.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>Whether you are setting vision, strengthening execution, resolving tension, or correcting drift, this work determines whether collective effort compounds—or disperses.</p>
        <p style={{ margin: 0, lineHeight: 1.5 }}>Without stability in both Level 1 and Level 2, cohesion weakens and momentum slows.</p>
      </>
    ),
  },
  "Leader-2": { title: "Leader Level 3", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for Leader Level 3 here.</p> },
  "Leader-3": { title: "Leader Level 4", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for Leader Level 4 here.</p> },
  "Leader-4": { title: "Leader Level 5", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for Leader Level 5 here.</p> },
  "Follower-0": {
    title: "Follower Level 1 — Foundation",
    body: (
      <>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}><strong>Principles 1–3</strong></p>
        <p style={{ margin: "0 0 0.5rem", lineHeight: 1.5 }}>P1 – Evaluate opportunities and obstacles</p>
        <p style={{ margin: "0 0 0.5rem", lineHeight: 1.5 }}>P2 – Understand mindset</p>
        <p style={{ margin: "0 0 1rem", lineHeight: 1.5 }}>P3 – Envision the ideal future</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>In the Follower Role, the responsibility begins with you—understand the situation clearly and align yourself with the direction being set.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>This level requires deliberate stabilization.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>If you have not clearly evaluated the terrain, examined how your mindset is shaping your response to it, and understood the future being pursued, your contribution will lack alignment.</p>
        <p style={{ margin: "0 0 0.5rem", lineHeight: 1.5 }}>You may stay active.</p>
        <p style={{ margin: "0 0 0.5rem", lineHeight: 1.5 }}>You may complete tasks.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>You may even appear supportive.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>But without grounded clarity, your effort may drift or reinforce the wrong priorities.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>Clarity here is not permanent. It reflects your most accurate interpretation based on the information available right now. It requires disciplined listening, honest reflection, and a willingness to adjust.</p>
        <p style={{ margin: 0, lineHeight: 1.5 }}>Whether you are supporting a vision, navigating change, strengthening what already exists, or walking through uncertainty, this work determines whether your presence stabilizes progress—or unintentionally destabilizes it.</p>
      </>
    ),
  },
  "Follower-1": {
    title: "Follower — Level 2 Alignment",
    body: (
      <>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}><strong>Principles 4–5</strong></p>
        <p style={{ margin: "0 0 0.5rem", lineHeight: 1.5 }}>P4 – Set measurable objectives</p>
        <p style={{ margin: "0 0 1rem", lineHeight: 1.5 }}>P5 – Prioritize what matters</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>In the Follower Role, alignment begins with understanding how progress is measured and focusing your contribution on what matters most.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>This level requires deliberate alignment.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>Once the situation is clearly understood and a future has been defined in Level 1, that vision must be translated into measurable objectives you can support with precision. Progress must have form. It must be observable. It must have markers that indicate whether movement is real.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>But measurement alone is not enough.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>Energy must be concentrated around what matters most. Competing priorities must be recognized so your effort reinforces what truly advances the direction being pursued.</p>
        <p style={{ margin: "0 0 0.5rem", lineHeight: 1.5 }}>If objectives are misunderstood, effort drifts.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>If priorities are misread, support weakens.</p>
        <p style={{ margin: "0 0 0.5rem", lineHeight: 1.5 }}>You may stay active.</p>
        <p style={{ margin: "0 0 0.5rem", lineHeight: 1.5 }}>You may stay committed.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>But without clear measures and focused priorities, your contribution may not strengthen the broader movement.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>Alignment here is not permanent. It depends on the stability of the foundation beneath it. If new information reshapes the situation or alters the vision, your focus must adjust accordingly.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>Whether you are supporting growth, navigating change, resolving friction, or correcting drift, this work determines whether your effort compounds—or unintentionally fragments.</p>
        <p style={{ margin: 0, lineHeight: 1.5 }}>Without stability in both Level 1 and Level 2, consistency declines and effectiveness weakens.</p>
      </>
    ),
  },
  "Follower-2": { title: "Follower Level 3", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for Follower Level 3 here.</p> },
  "Follower-3": { title: "Follower Level 4", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for Follower Level 4 here.</p> },
  "Follower-4": { title: "Follower Level 5", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for Follower Level 5 here.</p> },
  "Partner-0": {
    title: "Partner Level 1 — Foundation",
    body: (
      <>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}><strong>Principles 1–3</strong></p>
        <p style={{ margin: "0 0 0.5rem", lineHeight: 1.5 }}>P1 – Evaluate opportunities and obstacles</p>
        <p style={{ margin: "0 0 0.5rem", lineHeight: 1.5 }}>P2 – Understand mindset</p>
        <p style={{ margin: "0 0 1rem", lineHeight: 1.5 }}>P3 – Envision the ideal future</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>In the Partner Role, the responsibility begins with shared clarity—establish a mutual understanding of the situation and the future being pursued together.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>This level requires deliberate stabilization.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>If opportunities and obstacles have not been openly evaluated, if mindset and expectations have not been surfaced, and if the desired future has not been defined together, alignment will rest on assumption.</p>
        <p style={{ margin: "0 0 0.5rem", lineHeight: 1.5 }}>You may stay connected.</p>
        <p style={{ margin: "0 0 0.5rem", lineHeight: 1.5 }}>You may continue working side by side.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>You may even feel cooperative.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>But without shared clarity, tension builds quietly and progress loses cohesion.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>Clarity here is not permanent. It reflects your best collective interpretation based on the information available right now. It requires honesty, listening, and a willingness to recalibrate together.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>Whether you are navigating commitment, pursuing opportunity, resolving friction, or strengthening what already exists, this work determines whether momentum deepens—or slowly divides.</p>
        <p style={{ margin: 0, lineHeight: 1.5 }}>Without stability here, trust strains and shared progress weakens.</p>
      </>
    ),
  },
  "Partner-1": {
    title: "Partner — Level 2 Alignment",
    body: (
      <>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}><strong>Principles 4–5</strong></p>
        <p style={{ margin: "0 0 0.5rem", lineHeight: 1.5 }}>P4 – Set measurable objectives</p>
        <p style={{ margin: "0 0 1rem", lineHeight: 1.5 }}>P5 – Prioritize what matters</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>In the Partner Role, alignment begins with defining shared measures of progress and agreeing on what deserves collective focus.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>This level requires deliberate alignment.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>Once the situation is clearly understood and a future has been defined in Level 1, that vision must be translated into measurable objectives both parties recognize. Progress must have form. It must be observable. It must have markers that indicate whether movement is real.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>But measurement alone is not enough.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>Energy must be concentrated around what matters most. Competing priorities must be surfaced and narrowed so effort remains unified.</p>
        <p style={{ margin: "0 0 0.5rem", lineHeight: 1.5 }}>If objectives are assumed rather than defined, tension grows.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>If priorities are misaligned, momentum strains.</p>
        <p style={{ margin: "0 0 0.5rem", lineHeight: 1.5 }}>You may stay connected.</p>
        <p style={{ margin: "0 0 0.5rem", lineHeight: 1.5 }}>You may remain committed.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>But without shared measures and disciplined priorities, effort divides instead of compounds.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>Alignment here is not permanent. It depends on the stability of the foundation beneath it. If new information reshapes the situation or alters the vision, objectives and priorities must be recalibrated together.</p>
        <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>Whether you are strengthening a relationship, pursuing opportunity, resolving friction, or correcting drift, this work determines whether shared effort compounds—or fractures.</p>
        <p style={{ margin: 0, lineHeight: 1.5 }}>Without stability in both Level 1 and Level 2, trust weakens and efficiency declines.</p>
      </>
    ),
  },
  "Partner-2": { title: "Partner Level 3", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for Partner Level 3 here.</p> },
  "Partner-3": { title: "Partner Level 4", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for Partner Level 4 here.</p> },
  "Partner-4": { title: "Partner Level 5", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for Partner Level 5 here.</p> },
};
function getLevelLightbox(role: Role, levelIndex: number) {
  const key = `${role}-${levelIndex}`;
  return LEVEL_LIGHTBOX[key] ?? { title: `${role} Level ${levelIndex + 1}`, body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for {role} Level {levelIndex + 1} here.</p> };
}

const COMPASS_TITLE_LIGHTBOX = {
  title: "The Compass",
  body: (
    <>
      <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>The Compass is a structured framework for navigating life&apos;s most meaningful situations with clarity and agency.</p>
      <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>It rests on two foundational ideas.</p>
      <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>First, it reduces the complexity of our many life roles into four universal postures of responsibility and contribution: Achiever, Leader, Partner, and Follower. These are not titles or fixed identities. They are functional lenses for understanding how we are showing up in a given moment and what that moment requires.</p>
      <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>Second, it provides a sequential architecture for strengthening those roles through nine principles arranged as a pyramid, with each level building on the one beneath it.</p>
      <p style={{ margin: "0 0 0.5rem", lineHeight: 1.5 }}>The lower levels establish foundation and alignment.</p>
      <p style={{ margin: "0 0 0.5rem", lineHeight: 1.5 }}>The middle levels strengthen systems and growth.</p>
      <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>The upper levels expand collaboration and execution.</p>
      <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>Because the structure is sequential, higher levels depend on the stability of what sits below them. When the foundation is unclear, alignment weakens. When alignment weakens, systems strain. When lower levels fracture, execution loses durability.</p>
      <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>The Compass makes this structure visible.</p>
      <p style={{ margin: "0 0 0.75rem", lineHeight: 1.5 }}>It does not remove complexity from life. It organizes it into something workable so progress can be built intentionally rather than reactively.</p>
      <p style={{ margin: 0, lineHeight: 1.5 }}>Used well, the Compass becomes a repeatable architecture for strengthening or building the areas of life where productivity matters most and where transformation becomes essential.</p>
    </>
  ),
};

function PrincipleLightboxWithTabs({
  title,
  onClose,
  body,
  hasSituationTab,
  userContent,
  onUserContentChange,
}: {
  title: string;
  onClose: () => void;
  body: ReactNode;
  hasSituationTab: boolean;
  userContent: string;
  onUserContentChange: (value: string) => void;
}) {
  const [tab, setTab] = useState<"content" | "think" | "entered">(hasSituationTab ? "entered" : "content");
  const tabs = hasSituationTab
    ? [
        { id: "content" as const, label: "Content" },
        { id: "think" as const, label: "How to think" },
        { id: "entered" as const, label: "What I entered" },
      ]
    : [
        { id: "content" as const, label: "Content" },
        { id: "think" as const, label: "How to think" },
      ];

  return (
    <Lightbox title={title} onClose={onClose}>
      <div>
        <div style={{ display: "flex", gap: 12, marginBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.12)", paddingBottom: 8 }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              style={{
                background: "none",
                border: "none",
                color: tab === t.id ? "#fff" : "rgba(255,255,255,0.6)",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: tab === t.id ? 600 : 400,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div style={{ padding: "0.5rem 0", minHeight: 120, color: "rgba(255,255,255,0.9)" }}>
          {tab === "content" && body}
          {tab === "think" && (
            <p style={{ margin: 0, lineHeight: 1.5 }}>Reflect on how this principle applies to your situation. What would it look like to embody it? What might get in the way?</p>
          )}
          {tab === "entered" && (
            <textarea
              value={userContent}
              onChange={(e) => onUserContentChange(e.target.value)}
              placeholder="Add your notes, opportunities, obstacles, or action items here…"
              style={{
                width: "100%",
                minHeight: 180,
                padding: 12,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 8,
                color: "#fff",
                fontSize: 15,
                lineHeight: 1.5,
                resize: "vertical",
              }}
            />
          )}
        </div>
      </div>
    </Lightbox>
  );
}

type CompassProps = {
  compact?: boolean;
  activeSituation?: string | null;
  situationPrincipleContent?: Record<string, string>;
  onSituationPrincipleContentChange?: (situation: string, principle: string, content: string) => void;
  openPrincipleId?: string | null;
  onPrincipleLightboxClose?: () => void;
};

export default function Compass({
  compact = false,
  activeSituation = null,
  situationPrincipleContent = {},
  onSituationPrincipleContentChange,
  openPrincipleId = null,
  onPrincipleLightboxClose,
}: CompassProps) {
  const [rotation, setRotation] = useState(0);
  const [lightboxCompassTitle, setLightboxCompassTitle] = useState(false);
  const [lightboxRole, setLightboxRole] = useState<Role | null>(null);
  const [lightboxPrinciple, setLightboxPrinciple] = useState<{ role: Role; principle: string } | null>(null);
  const [lightboxLevel, setLightboxLevel] = useState<{ role: Role; levelIndex: number } | null>(null);

  useEffect(() => {
    if (openPrincipleId && activeSituation) {
      setLightboxCompassTitle(false);
      setLightboxRole(null);
      setLightboxLevel(null);
      setLightboxPrinciple({ role: "Achiever", principle: openPrincipleId });
    }
  }, [openPrincipleId, activeSituation]);

  const openCompassTitleLightbox = () => {
    setLightboxRole(null);
    setLightboxPrinciple(null);
    setLightboxLevel(null);
    setLightboxCompassTitle(true);
  };
  const openRoleLightbox = (role: Role) => {
    setLightboxCompassTitle(false);
    setLightboxPrinciple(null);
    setLightboxLevel(null);
    setLightboxRole(role);
  };
  const openPrincipleLightbox = (role: Role, principle: string) => {
    const targetAngle = ROLE_ANGLE[role];
    setRotation((current) => shortestPathAngle(current, targetAngle));
    setLightboxCompassTitle(false);
    setLightboxRole(null);
    setLightboxLevel(null);
    setLightboxPrinciple({ role, principle });
  };
  const openLevelLightbox = (role: Role, levelIndex: number) => {
    const targetAngle = ROLE_ANGLE[role];
    setRotation((current) => shortestPathAngle(current, targetAngle));
    setLightboxCompassTitle(false);
    setLightboxRole(null);
    setLightboxPrinciple(null);
    setLightboxLevel({ role, levelIndex });
  };

  const handleRoleClick = (role: Role) => {
    const targetAngle = ROLE_ANGLE[role];
    setRotation((current) => shortestPathAngle(current, targetAngle));
  };

  // Level "i" icons: all positions fixed.
  const fixedNorthEastPositions: Record<string, { x: number; y: number }> = {
    "level-north-0": { x: 33.33583450317383, y: -74.1065444946289 },
    "level-north-1": { x: 25.697223663330078, y: -94.6097183227539 },
    "level-north-2": { x: 17.2623291015625, y: -115.89116668701172 },
    "level-north-3": { x: 9.535283088684082, y: -135.90589904785156 },
    "level-north-4": { x: 41.475440979003906, y: -53.97695541381836 },
    "level-east-0": { x: 52.59510040283203, y: 41.84819412231445 },
    "level-east-1": { x: 73.6377182006836, y: 33.86787414550781 },
    "level-east-2": { x: 94.69247436523438, y: 24.34634017944336 },
    "level-east-3": { x: 114.27848052978516, y: 18.035808563232422 },
    "level-east-4": { x: 135.71705627441406, y: 9.568385124206543 },
  };

  const getDefaultSouthWestPositions = (): Record<string, { x: number; y: number }> => ({
    "level-south-0": { x: -40.4945, y: 53.307 },
    "level-south-1": { x: -32.5065, y: 75.3658 },
    "level-south-2": { x: -24.825, y: 95.2807 },
    "level-south-3": { x: -17.9462, y: 114.69 },
    "level-south-4": { x: -9.4985, y: 136.087 },
    "level-west-0": { x: -54.244, y: -40.531 },
    "level-west-1": { x: -73.548, y: -33.574 },
    "level-west-2": { x: -95.019, y: -25.184 },
    "level-west-3": { x: -114.918, y: -16.721 },
    "level-west-4": { x: -135.883, y: -10.381 },
  });

  const levelIconPositions = { ...fixedNorthEastPositions, ...getDefaultSouthWestPositions() };

  const levelIdToRoleAndIndex = (id: string): { role: Role; levelIndex: number } => {
    if (id.startsWith("level-north-")) return { role: "Achiever", levelIndex: parseInt(id.slice(-1), 10) };
    if (id.startsWith("level-east-")) return { role: "Leader", levelIndex: parseInt(id.slice(-1), 10) };
    if (id.startsWith("level-south-")) return { role: "Follower", levelIndex: parseInt(id.slice(-1), 10) };
    return { role: "Partner", levelIndex: parseInt(id.slice(-1), 10) };
  };

  const levelIcon = (id: string) => {
    const pos = levelIconPositions[id] ?? fixedNorthEastPositions[id] ?? getDefaultSouthWestPositions()[id];
    const { role, levelIndex } = levelIdToRoleAndIndex(id);
    const contentLevelIndex = role === "Achiever" ? (levelIndex + 1) % 5 : levelIndex;
    const icon = <InfoIcon key={id} x={pos.x} y={pos.y} scale={0.7} onClick={() => openLevelLightbox(role, contentLevelIndex)} />;

    let iconNode: React.ReactNode;
    if (id.startsWith("level-east-")) {
      iconNode = <g key={id} transform={`rotate(90, ${pos.x}, ${pos.y})`}>{icon}</g>;
    } else if (id.startsWith("level-south-")) {
      iconNode = <g key={id} transform={`rotate(180, ${pos.x}, ${pos.y})`}>{icon}</g>;
    } else if (id.startsWith("level-west-")) {
      iconNode = id === "level-west-4" ? <g key={id} transform={`rotate(90, ${pos.x}, ${pos.y})`}>{icon}</g> : <g key={id} transform={`rotate(-90, ${pos.x}, ${pos.y})`}>{icon}</g>;
    } else {
      iconNode = icon;
    }

    return iconNode;
  };

  return (
    <>
    <div
      style={{
        width: compact ? "min(420px, 45vw, 55vh)" : "min(900px, 92vw, 82vh)",
        borderRadius: 18,
        border: "1px solid rgba(255,255,255,0.18)",
        background: "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.06), rgba(0,0,0,0))",
        boxShadow: "0 20px 70px rgba(0,0,0,0.6)",
        position: "relative",
        padding: 18,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 8 }}>
        <h1
          style={{
            margin: 0,
            fontSize: "clamp(28px, 4.5vw, 36px)",
            fontWeight: 600,
            color: "rgba(255,255,255,0.95)",
            letterSpacing: "0.02em",
          }}
        >
          The Compass
        </h1>
        <button
          type="button"
          onClick={openCompassTitleLightbox}
          aria-label="More information about The Compass"
          style={{
            width: 20,
            height: 20,
            marginTop: 6,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.4)",
            background: "white",
            color: "#111",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            padding: 0,
            lineHeight: 1,
          }}
        >
          i
        </button>
      </div>
      <div style={{ width: "100%", aspectRatio: "1 / 1", flexShrink: 0 }}>
      {/* The Compass Drawing (SVG) — click role labels in the graphic to rotate */}
      <svg
        viewBox="-220 -220 440 440"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          overflow: "visible",
        }}
      >
        {/* Rotate everything as a group */}
        <g transform={`rotate(${rotation})`} style={{ transition: "transform 250ms ease" }}>
          {/* Center box: perfect square, side = Achiever base width (96.46), centered */}
          <rect
            x={-48.23}
            y={-48.23}
            width={96.46}
            height={96.46}
            fill="rgba(255,255,255,0.07)"
            stroke="rgba(255,255,255,0.22)"
          />
          {/* Center content counter-rotated — one per line, spaced across the square */}
          <g transform={`rotate(${-rotation}, 0, 0)`} style={{ transition: "transform 250ms ease" }}>
            <text x="0" y="-30" textAnchor="middle" fill="rgba(255,255,255,0.95)" fontSize="9" fontWeight="600">
              Active Listening
            </text>
            <text x="0" y="-10" textAnchor="middle" fill="rgba(255,255,255,0.95)" fontSize="9" fontWeight="600">
              Empathy
            </text>
            <text x="0" y="10" textAnchor="middle" fill="rgba(255,255,255,0.95)" fontSize="9" fontWeight="600">
              Synergy
            </text>
            <text x="0" y="30" textAnchor="middle" fill="rgba(255,255,255,0.95)" fontSize="9" fontWeight="600">
              Integration
            </text>
          </g>

          {/* Triangles — same size, each base flush with one side of the square */}
          <polygon points="0,-169.78 -48.23,-48.23 48.23,-48.23" fill="rgba(120,200,255,0.18)" stroke="rgba(255,255,255,0.22)" />
          <polygon points="169.78,0 48.23,-48.23 48.23,48.23" fill="rgba(255,160,120,0.16)" stroke="rgba(255,255,255,0.22)" />
          <polygon points="0,169.78 -48.23,48.23 48.23,48.23" fill="rgba(250,220,140,0.16)" stroke="rgba(255,255,255,0.22)" />
          <polygon points="-169.78,0 -48.23,-48.23 -48.23,48.23" fill="rgba(170,255,170,0.16)" stroke="rgba(255,255,255,0.22)" />

          {/* Flow circle: long arcs; by Leader, end at 345° / 15° (outside triangle), arrows point at triangle */}
          <path
            d="M 31 -139.9 A 143.39 143.39 0 0 1 138.5 -37 M 138.5 37 A 143.39 143.39 0 0 1 31 139.9 M -31 139.9 A 143.39 143.39 0 0 1 -139.9 31 M -139.9 -31 A 143.39 143.39 0 0 1 -31 -139.9"
            fill="none"
            stroke="rgba(255,255,255,0.28)"
            strokeWidth={1.5}
            strokeDasharray="6 4"
          />
          {/* Arrows at both ends of each arc: base on line end, tip toward P9 */}
          <FlowArrow baseX={138.5} baseY={-37} tipTowardX={143} tipTowardY={0} />
          <FlowArrow baseX={31} baseY={-139.9} tipTowardX={0} tipTowardY={-143} />
          {/* Leader–Follower */}
          <FlowArrow baseX={138.5} baseY={37} tipTowardX={143} tipTowardY={0} />
          <FlowArrow baseX={31} baseY={139.9} tipTowardX={0} tipTowardY={143} />
          {/* Follower–Partner */}
          <FlowArrow baseX={-31} baseY={139.9} tipTowardX={0} tipTowardY={143} />
          <FlowArrow baseX={-139.9} baseY={31} tipTowardX={-143} tipTowardY={0} />
          {/* Partner–Achiever */}
          <FlowArrow baseX={-139.9} baseY={-31} tipTowardX={-143} tipTowardY={0} />
          <FlowArrow baseX={-31} baseY={-139.9} tipTowardX={0} tipTowardY={-143} />
          {/* Iterate (above) and Adjust (below) — text on arc, smaller and lighter */}
          <defs>
            <path id="iterate-arc" d="M 75 -106 A 132 132 0 0 1 106 -75" fill="none" />
            <path id="adjust-arc" d="M 90 -124 A 155 155 0 0 1 124 -90" fill="none" />
            {/* Partner–Follower: Adjust on inner arc (132), Iterate on outer arc (175) so Iterate is further toward corner; same angular span, spacing preserved */}
            <path id="iterate-arc-pf" d="M -106 75 A 132 132 0 0 1 -75 106" fill="none" />
            <path id="adjust-arc-pf" d="M -124 90 A 155 155 0 0 1 -90 124" fill="none" />
            <path id="iterate-arc-pf-outer" d="M -124 90 A 155 155 0 0 1 -90 124" fill="none" />
            {/* Achiever–Partner (top-left) and Leader–Follower (bottom-right): outer arc for Variety (same as Iterate) */}
            <path id="seek-variety-arc-ap" d="M -90 -124 A 155 155 0 0 1 -124 -90" fill="none" />
            <path id="seek-variety-arc-lf" d="M 90 124 A 155 155 0 0 1 124 90" fill="none" />
            {/* Inner arcs for Pursuit; pathLength so full text fits on curve without clipping */}
            <path id="pursue-passions-arc-ap" d="M -106 -75 A 132 132 0 0 1 -75 -106" fill="none" pathLength="280" />
            <path id="pursue-passions-arc-lf" d="M 106 75 A 132 132 0 0 1 75 106" fill="none" pathLength="280" />
          </defs>
          {/* Role labels; "i" icon only when that role is in the top position (normalize rotation for 270 vs -90 etc.) */}
          {(() => {
            const topAngle = ((rotation % 360) + 360) % 360; // 0–360 so 270 and -90 both mean Leader at top
            return (
              <>
                <g onClick={() => handleRoleClick("Achiever")} style={{ cursor: "pointer" }}>
                  <text x="0" y="-185" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="12">Achiever</text>
                  {topAngle === 0 && <InfoIcon x={30} y={-192} onClick={() => openRoleLightbox("Achiever")} />}
                </g>
                <g transform="rotate(90, 185, 0)" onClick={() => handleRoleClick("Leader")} style={{ cursor: "pointer" }}>
                  <text x="185" y="0" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="12">Leader</text>
                  {topAngle === 270 && <InfoIcon x={215} y={-7} onClick={() => openRoleLightbox("Leader")} />}
                </g>
                <g transform="rotate(180, 0, 193)" onClick={() => handleRoleClick("Follower")} style={{ cursor: "pointer" }}>
                  <text x="0" y="193" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="12">Follower</text>
                  {topAngle === 180 && <InfoIcon x={30} y={186} onClick={() => openRoleLightbox("Follower")} />}
                </g>
                <g transform="rotate(-90, -185, 0)" onClick={() => handleRoleClick("Partner")} style={{ cursor: "pointer" }}>
                  <text x="-185" y="0" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="12">Partner</text>
                  {topAngle === 90 && <InfoIcon x={-155} y={-7} onClick={() => openRoleLightbox("Partner")} />}
                </g>
              </>
            );
          })()}
          <text fill="rgba(255,255,255,0.85)" fontSize="9" fontWeight="400">
            <textPath href="#adjust-arc" startOffset="50%" textAnchor="middle">
              Iterate
            </textPath>
          </text>
          <text fill="rgba(255,255,255,0.85)" fontSize="9" fontWeight="400">
            <textPath href="#iterate-arc" startOffset="50%" textAnchor="middle">
              Adjust
            </textPath>
          </text>
          {/* Partner–Follower: 180° around each label’s position on path so text faces center, stays in place */}
          <g transform="rotate(180, -107, 107)">
            <text fill="rgba(255,255,255,0.85)" fontSize="9" fontWeight="400">
              <textPath href="#iterate-arc-pf-outer" startOffset="50%" textAnchor="middle">
                Iterate
              </textPath>
            </text>
          </g>
          <g transform="rotate(180, -90.5, 90.5)">
            <text fill="rgba(255,255,255,0.85)" fontSize="9" fontWeight="400">
              <textPath href="#iterate-arc-pf" startOffset="50%" textAnchor="middle">
                Adjust
              </textPath>
            </text>
          </g>
          {/* Variety: top-left (Achiever–Partner) and bottom-right (Leader–Follower), same position as Iterate, 180° so faces center */}
          <g transform="rotate(180, -107, -107)">
            <text fill="rgba(255,255,255,0.85)" fontSize="9" fontWeight="400">
              <textPath href="#seek-variety-arc-ap" startOffset="50%" textAnchor="middle">
                Variety
              </textPath>
            </text>
          </g>
          <g transform="rotate(180, 107, 107)">
            <text fill="rgba(255,255,255,0.85)" fontSize="9" fontWeight="400">
              <textPath href="#seek-variety-arc-lf" startOffset="50%" textAnchor="middle">
                Variety
              </textPath>
            </text>
          </g>

          {/* North triangle level lines */}
          <LevelLine y={-69} />
          <LevelLine y={-90} />
          <LevelLine y={-111} />
          <LevelLine y={-132} />
          {/* North: level "i" icons (draggable, positions in localStorage) */}
          {levelIcon("level-north-0")}
          {levelIcon("level-north-1")}
          {levelIcon("level-north-2")}
          {levelIcon("level-north-3")}
          {levelIcon("level-north-4")}

          {/* North principle chips — P1 opens lightbox */}
          <PrincipleChip x={-26} y={-59} label="P1" onClick={() => openPrincipleLightbox("Achiever", "P1")} />
          <PrincipleChip x={0} y={-59} label="P2" onClick={() => openPrincipleLightbox("Achiever", "P2")} />
          <PrincipleChip x={26} y={-59} label="P3" onClick={() => openPrincipleLightbox("Achiever", "P3")} />
          <PrincipleChip x={-14} y={-80} label="P4" onClick={() => openPrincipleLightbox("Achiever", "P4")} />
          <PrincipleChip x={14} y={-80} label="P5" onClick={() => openPrincipleLightbox("Achiever", "P5")} />
          <PrincipleChip x={-10} y={-101} label="P6" onClick={() => openPrincipleLightbox("Achiever", "P6")} />
          <PrincipleChip x={10} y={-101} label="P7" onClick={() => openPrincipleLightbox("Achiever", "P7")} />
          <PrincipleChip x={0} y={-122} label="P8" onClick={() => openPrincipleLightbox("Achiever", "P8")} />
          <PrincipleChip x={0} y={-143} label="P9" onClick={() => openPrincipleLightbox("Achiever", "P9")} />

          {/* East (Leader) triangle: same levels and chip layout, rotated 90° */}
          <EastLevelLine x={69} />
          <EastLevelLine x={90} />
          <EastLevelLine x={111} />
          <EastLevelLine x={132} />
          {/* East: level "i" icons (draggable) */}
          {levelIcon("level-east-0")}
          {levelIcon("level-east-1")}
          {levelIcon("level-east-2")}
          {levelIcon("level-east-3")}
          {levelIcon("level-east-4")}

          <g transform="rotate(90, 59, -26)">
            <PrincipleChip x={59} y={-26} label="P1" onClick={() => openPrincipleLightbox("Leader", "P1")} />
          </g>
          <g transform="rotate(90, 59, 0)">
            <PrincipleChip x={59} y={0} label="P2" onClick={() => openPrincipleLightbox("Leader", "P2")} />
          </g>
          <g transform="rotate(90, 59, 26)">
            <PrincipleChip x={59} y={26} label="P3" onClick={() => openPrincipleLightbox("Leader", "P3")} />
          </g>
          <g transform="rotate(90, 80, -14)">
            <PrincipleChip x={80} y={-14} label="P4" onClick={() => openPrincipleLightbox("Leader", "P4")} />
          </g>
          <g transform="rotate(90, 80, 14)">
            <PrincipleChip x={80} y={14} label="P5" onClick={() => openPrincipleLightbox("Leader", "P5")} />
          </g>
          <g transform="rotate(90, 101, -10)">
            <PrincipleChip x={101} y={-10} label="P6" onClick={() => openPrincipleLightbox("Leader", "P6")} />
          </g>
          <g transform="rotate(90, 101, 10)">
            <PrincipleChip x={101} y={10} label="P7" onClick={() => openPrincipleLightbox("Leader", "P7")} />
          </g>
          <g transform="rotate(90, 122, 0)">
            <PrincipleChip x={122} y={0} label="P8" onClick={() => openPrincipleLightbox("Leader", "P8")} />
          </g>
          <g transform="rotate(90, 143, 0)">
            <PrincipleChip x={143} y={0} label="P9" onClick={() => openPrincipleLightbox("Leader", "P9")} />
          </g>

          {/* South (Follower) triangle: chip order flipped so after 180° rotation labels read left-to-right */}
          <SouthLevelLine y={69} />
          <SouthLevelLine y={90} />
          <SouthLevelLine y={111} />
          <SouthLevelLine y={132} />
          {/* South: level "i" icons (draggable) */}
          {levelIcon("level-south-0")}
          {levelIcon("level-south-1")}
          {levelIcon("level-south-2")}
          {levelIcon("level-south-3")}
          {levelIcon("level-south-4")}

          <g transform="rotate(180, 26, 59)">
            <PrincipleChip x={26} y={59} label="P1" onClick={() => openPrincipleLightbox("Follower", "P1")} />
          </g>
          <g transform="rotate(180, 0, 59)">
            <PrincipleChip x={0} y={59} label="P2" onClick={() => openPrincipleLightbox("Follower", "P2")} />
          </g>
          <g transform="rotate(180, -26, 59)">
            <PrincipleChip x={-26} y={59} label="P3" onClick={() => openPrincipleLightbox("Follower", "P3")} />
          </g>
          <g transform="rotate(180, 14, 80)">
            <PrincipleChip x={14} y={80} label="P4" onClick={() => openPrincipleLightbox("Follower", "P4")} />
          </g>
          <g transform="rotate(180, -14, 80)">
            <PrincipleChip x={-14} y={80} label="P5" onClick={() => openPrincipleLightbox("Follower", "P5")} />
          </g>
          <g transform="rotate(180, 10, 101)">
            <PrincipleChip x={10} y={101} label="P6" onClick={() => openPrincipleLightbox("Follower", "P6")} />
          </g>
          <g transform="rotate(180, -10, 101)">
            <PrincipleChip x={-10} y={101} label="P7" onClick={() => openPrincipleLightbox("Follower", "P7")} />
          </g>
          <g transform="rotate(180, 0, 122)">
            <PrincipleChip x={0} y={122} label="P8" onClick={() => openPrincipleLightbox("Follower", "P8")} />
          </g>
          <g transform="rotate(180, 0, 143)">
            <PrincipleChip x={0} y={143} label="P9" onClick={() => openPrincipleLightbox("Follower", "P9")} />
          </g>

          {/* West (Partner) triangle: chip order flipped so after -90° rotation labels read left-to-right */}
          <WestLevelLine x={-69} />
          <WestLevelLine x={-90} />
          <WestLevelLine x={-111} />
          <WestLevelLine x={-132} />
          {/* West: level "i" icons (draggable) */}
          {levelIcon("level-west-0")}
          {levelIcon("level-west-1")}
          {levelIcon("level-west-2")}
          {levelIcon("level-west-3")}
          {levelIcon("level-west-4")}

          <g transform="rotate(-90, -59, 26)">
            <PrincipleChip x={-59} y={26} label="P1" onClick={() => openPrincipleLightbox("Partner", "P1")} />
          </g>
          <g transform="rotate(-90, -59, 0)">
            <PrincipleChip x={-59} y={0} label="P2" onClick={() => openPrincipleLightbox("Partner", "P2")} />
          </g>
          <g transform="rotate(-90, -59, -26)">
            <PrincipleChip x={-59} y={-26} label="P3" onClick={() => openPrincipleLightbox("Partner", "P3")} />
          </g>
          <g transform="rotate(-90, -80, 14)">
            <PrincipleChip x={-80} y={14} label="P4" onClick={() => openPrincipleLightbox("Partner", "P4")} />
          </g>
          <g transform="rotate(-90, -80, -14)">
            <PrincipleChip x={-80} y={-14} label="P5" onClick={() => openPrincipleLightbox("Partner", "P5")} />
          </g>
          <g transform="rotate(-90, -101, 10)">
            <PrincipleChip x={-101} y={10} label="P6" onClick={() => openPrincipleLightbox("Partner", "P6")} />
          </g>
          <g transform="rotate(-90, -101, -10)">
            <PrincipleChip x={-101} y={-10} label="P7" onClick={() => openPrincipleLightbox("Partner", "P7")} />
          </g>
          <g transform="rotate(-90, -122, 0)">
            <PrincipleChip x={-122} y={0} label="P8" onClick={() => openPrincipleLightbox("Partner", "P8")} />
          </g>
          <g transform="rotate(-90, -143, 0)">
            <PrincipleChip x={-143} y={0} label="P9" onClick={() => openPrincipleLightbox("Partner", "P9")} />
          </g>

        </g>
        {/* Pursuit: curved on path; top-left 180° so faces center like Variety */}
        <g transform={`rotate(${-rotation})`} style={{ transition: "transform 250ms ease" }}>
          <g transform="rotate(360, -90.5, -90.5)">
            <text fill="rgba(255,255,255,0.85)" fontSize="9" fontWeight="400">
              <textPath href="#pursue-passions-arc-ap" startOffset="50%" textAnchor="middle">
                Pursuit
              </textPath>
            </text>
          </g>
          <text fill="rgba(255,255,255,0.85)" fontSize="9" fontWeight="400">
            <textPath href="#pursue-passions-arc-lf" startOffset="50%" textAnchor="middle">
              Pursuit
            </textPath>
          </text>
        </g>
      </svg>
      </div>
    </div>

    {lightboxCompassTitle && (
      <Lightbox title={COMPASS_TITLE_LIGHTBOX.title} onClose={() => setLightboxCompassTitle(false)} maxWidth={720}>
        <div style={{ padding: "1rem 0", minHeight: 120, color: "rgba(255,255,255,0.9)" }}>
          {COMPASS_TITLE_LIGHTBOX.body}
        </div>
      </Lightbox>
    )}

    {lightboxRole && (
      <Lightbox
        title={ROLE_LIGHTBOX[lightboxRole].title}
        onClose={() => setLightboxRole(null)}
        maxWidth={720}
      >
        <div style={{ padding: "1rem 0", minHeight: 120, color: "rgba(255,255,255,0.9)" }}>
          {ROLE_LIGHTBOX[lightboxRole].body}
        </div>
      </Lightbox>
    )}

    {lightboxPrinciple && (() => {
      const { title, body } = getPrincipleLightbox(lightboxPrinciple.role, lightboxPrinciple.principle);
      const hasSituationTab = !!activeSituation && !!onSituationPrincipleContentChange;
      const contentKey = activeSituation ? `${activeSituation}|${lightboxPrinciple.principle}` : "";
      const userContent = (activeSituation && situationPrincipleContent?.[contentKey]) ?? "";

      const handleClose = () => {
        setLightboxPrinciple(null);
        onPrincipleLightboxClose?.();
      };

      return (
        <PrincipleLightboxWithTabs
          title={title}
          onClose={handleClose}
          body={body}
          hasSituationTab={hasSituationTab}
          userContent={userContent}
          onUserContentChange={(v) => activeSituation && onSituationPrincipleContentChange?.(activeSituation, lightboxPrinciple.principle, v)}
        />
      );
    })()}

    {lightboxLevel && (() => {
      const { title, body } = getLevelLightbox(lightboxLevel.role, lightboxLevel.levelIndex);
      return (
        <Lightbox title={title} onClose={() => setLightboxLevel(null)}>
          <div style={{ padding: "1rem 0", minHeight: 120, color: "rgba(255,255,255,0.9)" }}>
            {body}
          </div>
        </Lightbox>
      );
    })()}
    </>
  );
}

// Square and triangles: square side = Achiever base width = 96.46 (half 48.23), triangle height 121.55
const NORTH_APEX_Y = -169.78; // -48.23 - 121.55
const NORTH_BASE_Y = -48.23;
const NORTH_HALF_BASE = 48.23;

const EAST_TIP_X = 169.78; // 48.23 + 121.55
const EAST_BASE_X = 48.23;
const EAST_HALF_BASE = 48.23;

// South (Follower): apex 169.78, base y=48.23
const SOUTH_APEX_Y = 169.78;
const SOUTH_BASE_Y = 48.23;

// West (Partner): tip -169.78, base x=-48.23
const WEST_TIP_X = -169.78;
const WEST_BASE_X = -48.23;

function levelLineHalfWidth(y: number) {
  return (NORTH_HALF_BASE * (y - NORTH_APEX_Y)) / (NORTH_BASE_Y - NORTH_APEX_Y);
}

function levelLineHalfHeight(x: number) {
  return (EAST_HALF_BASE * (EAST_TIP_X - x)) / (EAST_TIP_X - EAST_BASE_X);
}

function southLevelLineHalfWidth(y: number) {
  return (NORTH_HALF_BASE * (SOUTH_APEX_Y - y)) / (SOUTH_APEX_Y - SOUTH_BASE_Y);
}

function westLevelLineHalfHeight(x: number) {
  return (EAST_HALF_BASE * (x - WEST_TIP_X)) / (WEST_BASE_X - WEST_TIP_X);
}

function LevelLine({ y }: { y: number }) {
  const hw = levelLineHalfWidth(y);
  return (
    <line
      x1={-hw}
      y1={y}
      x2={hw}
      y2={y}
      stroke="rgba(255,255,255,0.22)"
      strokeWidth={1}
    />
  );
}

function EastLevelLine({ x }: { x: number }) {
  const hh = levelLineHalfHeight(x);
  return (
    <line
      x1={x}
      y1={-hh}
      x2={x}
      y2={hh}
      stroke="rgba(255,255,255,0.22)"
      strokeWidth={1}
    />
  );
}

function SouthLevelLine({ y }: { y: number }) {
  const hw = southLevelLineHalfWidth(y);
  return (
    <line
      x1={-hw}
      y1={y}
      x2={hw}
      y2={y}
      stroke="rgba(255,255,255,0.22)"
      strokeWidth={1}
    />
  );
}

function WestLevelLine({ x }: { x: number }) {
  const hh = westLevelLineHalfHeight(x);
  return (
    <line
      x1={x}
      y1={-hh}
      x2={x}
      y2={hh}
      stroke="rgba(255,255,255,0.22)"
      strokeWidth={1}
    />
  );
}

function Lightbox({
  title,
  onClose,
  children,
  maxWidth = 720,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: number;
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#1a1a1c",
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.18)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
          maxWidth,
          width: "100%",
          maxHeight: "85vh",
          overflow: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "white" }}>{title}</h2>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "rgba(255,255,255,0.7)",
              cursor: "pointer",
              fontSize: 24,
              lineHeight: 1,
              padding: "0 4px",
            }}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div style={{ padding: "24px 40px 32px", fontSize: 17, lineHeight: 1.6 }}>{children}</div>
      </div>
    </div>
  );
}

// Reusable "more info" icon: white circle, black "i" — use throughout the app for info actions. Optional scale (e.g. 0.7) for smaller icons (e.g. level icons).
function InfoIcon({ x, y, onClick, scale = 1 }: { x: number; y: number; onClick?: (e: React.MouseEvent) => void; scale?: number }) {
  const r = 4.2 * scale;
  const fontSize = 6 * scale;
  const strokeWidth = 0.5 * scale;
  return (
    <g
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      style={{ cursor: "pointer" }}
      aria-label="More information"
    >
      <circle cx={x} cy={y} r={r} fill="white" stroke="rgba(255,255,255,0.4)" strokeWidth={strokeWidth} />
      <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fill="#111" fontSize={fontSize} fontWeight="700">
        i
      </text>
    </g>
  );
}

// Arrow with base (tail) centered at (baseX, baseY), tip pointing toward (tipTowardX, tipTowardY)
function FlowArrow({
  baseX,
  baseY,
  tipTowardX,
  tipTowardY,
}: {
  baseX: number;
  baseY: number;
  tipTowardX: number;
  tipTowardY: number;
}) {
  const angle = Math.atan2(tipTowardY - baseY, tipTowardX - baseX);
  const tipLen = 12;
  const tipX = baseX + tipLen * Math.cos(angle);
  const tipY = baseY + tipLen * Math.sin(angle);
  const deg = (angle * 180) / Math.PI;
  return (
    <g transform={`translate(${tipX}, ${tipY}) rotate(${deg})`}>
      <path d="M -12 -4.5 L 0 0 L -12 4.5 Z" fill="rgba(255,255,255,0.5)" />
    </g>
  );
}

function PrincipleChip({ x, y, label, onClick }: { x: number; y: number; label: string; onClick?: () => void }) {
  return (
    <g
      onClick={onClick ?? (() => alert(`${label} clicked (we’ll make this open a panel next)`))}
      style={{ cursor: "pointer" }}
    >
      <rect
        x={x - 7}
        y={y - 5}
        width={14}
        height={11}
        rx={2.5}
        fill="rgba(0,0,0,0.35)"
        stroke="rgba(255,255,255,0.35)"
      />
      <text x={x} y={y + 2.5} textAnchor="middle" fill="white" fontSize="6" fontWeight="700">
        {label}
      </text>
    </g>
  );
}
