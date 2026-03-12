/**
 * Copy for Principles (P1–P9) and Levels inside each role's pyramid on the Compass.
 * Each principle has a Perspective Description (short blurb under the header), Overview tab (full block content), and In Practice tab.
 * Apply is the user-editable tab (in the UI only).
 *
 * Keys: "Role-P1" … "Role-P9" for principles; "Role-0" … "Role-4" for levels (0 = Level 1 Foundation).
 * Edit only the text strings.
 */

import type { InfoBlock } from "../dashboard/infoContent";

/** Role-agnostic display title for each principle (used in lightbox title and header). */
export const PRINCIPLE_DISPLAY_NAMES: Record<string, string> = {
  P1: "Principle 1 — Evaluate Opportunities & Obstacles",
  P2: "Principle 2 — Understand Style and Mindset",
  P3: "Principle 3 — Envision an Ideal Future",
  P4: "Principle 4 — Set Measurable Objectives",
  P5: "Principle 5 — Prioritize What Matters",
  P6: "Principle 6 — Build Effective Systems",
  P7: "Principle 7 — Invest in Personal Development",
  P8: "Principle 8 — Engage with Collaborators",
  P9: "Principle 9 — Maintain a Laser Focus on Execution",
};

/** Level names for Navigation (index 0–4). */
export const LEVEL_NAMES = ["Foundation", "Alignment", "Systems & Growth", "Collaboration", "Execution"] as const;

/** Principle IDs in order for Navigation. */
export const PRINCIPLE_IDS = ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9"] as const;

/** Role labels for Navigation. */
export const ROLE_NAMES = ["Achiever", "Leader", "Partner", "Follower"] as const;

/** Which level index (0–4) a principle belongs to. */
export function principleToLevelIndex(principle: string): number {
  if (["P1", "P2", "P3"].includes(principle)) return 0;
  if (["P4", "P5"].includes(principle)) return 1;
  if (["P6", "P7"].includes(principle)) return 2;
  if (principle === "P8") return 3;
  if (principle === "P9") return 4;
  return 0;
}

/** First principle in each level (for highlighting in Level lightbox). */
export function levelToFirstPrinciple(levelIndex: number): string {
  const first: Record<number, string> = { 0: "P1", 1: "P4", 2: "P6", 3: "P8", 4: "P9" };
  return first[levelIndex] ?? "P1";
}

export type PrincipleContent = {
  title: string;
  /** Short blurb shown under "Perspective Description" in the lightbox header. */
  perspectiveDescription: string;
  inPractice: string;
};

const DEFAULT_IN_PRACTICE = "Reflect on how this principle applies to your situation. What would it look like to embody it? What might get in the way?";

/** Full Overview tab content by principle ID (P1–P9). When missing, a short fallback is used. */
export const PRINCIPLE_OVERVIEW_BLOCKS: Record<string, InfoBlock[]> = {
  P1: [
    { type: "p", text: "Principle 1 sits at the far left of the Compass Pyramid for a reason." },
    { type: "p", text: "Nothing meaningful moves until this step is clear." },
    { type: "ul", items: [
      "Not momentum.",
      "Not alignment.",
      "Not execution.",
    ]},
    { type: "p", text: "Everything that follows depends on how honestly we assess what is actually in front of us." },
    { type: "p", text: "At its simplest, P1 asks two questions:" },
    { type: "ul", items: [
      "What obstacles are we facing?",
      "What opportunities are in front of us?",
    ]},
    { type: "p", text: "But beneath those questions is something more fundamental: our willingness to tell the truth about our situation — even when it's uncomfortable, uncertain, or inconvenient." },
    { type: "p", text: "When we don't do this well, three things tend to happen." },
    { type: "ol", items: [
      "We drift — carried by circumstances, expectations, or someone else's priorities.",
      "We aim at the wrong thing — investing real effort in outcomes that never quite deliver.",
      "Or we move forward by happenstance — mistaking motion for direction.",
    ]},
    { type: "p", text: "In all three cases, agency is missing." },
    { type: "p", text: "P1 is where agency begins. It replaces chance with choice." },
  ],
};

/** Full In Practice tab content by principle ID. When missing, the string from PRINCIPLE_CONTENT.inPractice is used. */
export const PRINCIPLE_IN_PRACTICE_BLOCKS: Record<string, InfoBlock[]> = {
  P1: [
    { type: "p", text: "Most obstacles and opportunities that shape our lives aren't obvious at first glance." },
    { type: "p", text: "They often sit just beneath the surface:" },
    { type: "ul", items: [
      "patterns we haven't named",
      "friction we've normalized",
      "emotional reactions we keep rationalizing",
      "opportunities we sense but haven't clearly articulated",
    ]},
    { type: "p", text: "Principle 1 helps bring these into view." },
    { type: "p", text: "In practice, P1 develops three essential skills:" },
    { type: "ul", items: [
      "recognizing which situations actually matter",
      "prioritizing the few worth navigating intentionally",
      "evaluating them clearly enough to move forward with purpose",
    ]},
    { type: "p", text: "Without this step, even disciplined people can end up working hard toward the wrong targets." },
    { type: "ul", items: [
      "Effort increases.",
      "Activity expands.",
      "But progress remains inconsistent.",
    ]},
    { type: "p", text: "That's why P1 always comes first." },
    { type: "p", text: "It ensures the effort that follows is aimed at the right terrain." },
  ],
};

export const PRINCIPLE_CONTENT: Record<string, PrincipleContent> = {
  "Achiever-P1": { title: "Achiever Principle 1: Evaluate Opportunities and Obstacles", perspectiveDescription: "Evaluate what's fueling or blocking momentum. Act to proactively pursue opportunities and overcome obstacles with self-discipline.", inPractice: DEFAULT_IN_PRACTICE },
  "Achiever-P2": { title: "Achiever Principle 2: Understand Style and Mindset", perspectiveDescription: "Understand how beliefs drive performance. Act to strengthen focus and discipline under pressure.", inPractice: DEFAULT_IN_PRACTICE },
  "Achiever-P3": { title: "Achiever Principle 3: Envision an Ideal Future", perspectiveDescription: "Envision the future you want to build. Act with determination to turn vision into reality.", inPractice: DEFAULT_IN_PRACTICE },
  "Achiever-P4": { title: "Achiever Principle 4: Set Measurable Objectives", perspectiveDescription: "Sees the markers that show real advancement, and acts with discipline to reach them with consistency.", inPractice: DEFAULT_IN_PRACTICE },
  "Achiever-P5": { title: "Achiever Principle 5: Prioritize What Matters", perspectiveDescription: "Sees where energy creates progress or waste, and acts with discipline to protect focus on the highest-value actions.", inPractice: DEFAULT_IN_PRACTICE },
  "Achiever-P6": { title: "Achiever Principle 6: Build Effective Systems", perspectiveDescription: "Sees which routines sustain focus and energy, and acts to refine them for steady growth.", inPractice: DEFAULT_IN_PRACTICE },
  "Achiever-P7": { title: "Achiever Principle 7: Invest in Personal Development", perspectiveDescription: "Sees how new growth fuels progress, and acts with discipline to develop themselves and others.", inPractice: DEFAULT_IN_PRACTICE },
  "Achiever-P8": { title: "Achiever Principle 8: Engage with Collaborators", perspectiveDescription: "Sees how collaboration sharpens quality and reach, and acts to invite feedback and refine what's being built.", inPractice: DEFAULT_IN_PRACTICE },
  "Achiever-P9": { title: "Achiever Principle 9: Maintain a Laser Focus on Execution", perspectiveDescription: "Sees the gap between plan and outcome, and acts with urgency and precision to close it.", inPractice: DEFAULT_IN_PRACTICE },
  "Leader-P1": { title: "Leader Principle 1: Evaluate Opportunities and Obstacles", perspectiveDescription: "Look ahead to anticipate, evaluate, and communicate challenges and openings. Act to guide others toward a better way forward.", inPractice: DEFAULT_IN_PRACTICE },
  "Leader-P2": { title: "Leader Principle 2: Understand Style and Mindset", perspectiveDescription: "Understand how attitudes shape direction. Act to model the right mindset for the path ahead.", inPractice: DEFAULT_IN_PRACTICE },
  "Leader-P3": { title: "Leader Principle 3: Envision an Ideal Future", perspectiveDescription: "Envision what's possible beyond the present. Act to paint a clear picture that inspires others to believe in it.", inPractice: DEFAULT_IN_PRACTICE },
  "Leader-P4": { title: "Leader Principle 4: Set Measurable Objectives", perspectiveDescription: "Sees which aims best express an established vision, and acts to define clear markers that focus and unify effort.", inPractice: DEFAULT_IN_PRACTICE },
  "Leader-P5": { title: "Leader Principle 5: Prioritize What Matters", perspectiveDescription: "Sees which current priorities help or hinder key outcomes, and acts to eliminate drag and focus energy where it matters most.", inPractice: DEFAULT_IN_PRACTICE },
  "Leader-P6": { title: "Leader Principle 6: Build Effective Systems", perspectiveDescription: "Sees where structure or rhythm can strengthen progress, and acts to design systems that make success repeatable.", inPractice: DEFAULT_IN_PRACTICE },
  "Leader-P7": { title: "Leader Principle 7: Invest in Personal Development", perspectiveDescription: "Sees where growth will strengthen the path ahead, and acts to learn, improve, and model the same for others.", inPractice: DEFAULT_IN_PRACTICE },
  "Leader-P8": { title: "Leader Principle 8: Engage with Collaborators", perspectiveDescription: "Sees where alignment can expand, and acts to rally, inform, inspire, and recruit others to take part.", inPractice: DEFAULT_IN_PRACTICE },
  "Leader-P9": { title: "Leader Principle 9: Maintain a Laser Focus on Execution", perspectiveDescription: "Sees where momentum is drifting, and acts to realign focus and drive completion with clarity and consistency.", inPractice: DEFAULT_IN_PRACTICE },
  "Follower-P1": { title: "Follower Principle 1: Evaluate Opportunities and Obstacles", perspectiveDescription: "Evaluate what's helping or holding things back. Act to share what you notice so progress stays steady.", inPractice: DEFAULT_IN_PRACTICE },
  "Follower-P2": { title: "Follower Principle 2: Understand Style and Mindset", perspectiveDescription: "Understand how outlook influences stability. Act to stay grounded and positive through change.", inPractice: DEFAULT_IN_PRACTICE },
  "Follower-P3": { title: "Follower Principle 3: Envision an Ideal Future", perspectiveDescription: "Envision the larger vision taking shape. Act to align your effort and growth in that direction.", inPractice: DEFAULT_IN_PRACTICE },
  "Follower-P4": { title: "Follower Principle 4: Set Measurable Objectives", perspectiveDescription: "Sees how their contribution connects to an established vision, and acts to stay accountable to its progress.", inPractice: DEFAULT_IN_PRACTICE },
  "Follower-P5": { title: "Follower Principle 5: Prioritize What Matters", perspectiveDescription: "Sees which efforts support or distract from established goals, and acts to stay centered on what most advances them.", inPractice: DEFAULT_IN_PRACTICE },
  "Follower-P6": { title: "Follower Principle 6: Build Effective Systems", perspectiveDescription: "Sees how processes shape consistency, and acts to uphold habits and patterns that keep things running smoothly.", inPractice: DEFAULT_IN_PRACTICE },
  "Follower-P7": { title: "Follower Principle 7: Invest in Personal Development", perspectiveDescription: "Sees chances to grow in skill or understanding, and acts to apply learning and development to the benefit of the whole.", inPractice: DEFAULT_IN_PRACTICE },
  "Follower-P8": { title: "Follower Principle 8: Engage with Collaborators", perspectiveDescription: "Sees how shared effort strengthens results, and acts to expand contribution through themselves and others.", inPractice: DEFAULT_IN_PRACTICE },
  "Follower-P9": { title: "Follower Principle 9: Maintain a Laser Focus on Execution", perspectiveDescription: "Sees what's needed to finish well, and acts to stay dependable and deliver on the commitments at hand.", inPractice: DEFAULT_IN_PRACTICE },
  "Partner-P1": { title: "Partner Principle 1: Evaluate Opportunities and Obstacles", perspectiveDescription: "Evaluate shifts or tensions between people or priorities. Act to recalibrate for shared progress.", inPractice: DEFAULT_IN_PRACTICE },
  "Partner-P2": { title: "Partner Principle 2: Understand Style and Mindset", perspectiveDescription: "Understand how shared mindset affects connection. Act to restore balance and trust when it drifts.", inPractice: DEFAULT_IN_PRACTICE },
  "Partner-P3": { title: "Partner Principle 3: Envision an Ideal Future", perspectiveDescription: "Envision a shared future that balances needs and aspirations. Act to co-create a path forward for mutual gain.", inPractice: DEFAULT_IN_PRACTICE },
  "Partner-P4": { title: "Partner Principle 4: Set Measurable Objectives", perspectiveDescription: "Sees shared aims that bring a vision to life, and acts to pursue them for mutual gain.", inPractice: DEFAULT_IN_PRACTICE },
  "Partner-P5": { title: "Partner Principle 5: Prioritize What Matters", perspectiveDescription: "Sees where competing priorities cause friction or alignment, and acts to rebalance commitments for mutual progress.", inPractice: DEFAULT_IN_PRACTICE },
  "Partner-P6": { title: "Partner Principle 6: Build Effective Systems", perspectiveDescription: "Sees where shared systems can ease friction, and acts to build simple, reliable ways to make things better.", inPractice: DEFAULT_IN_PRACTICE },
  "Partner-P7": { title: "Partner Principle 7: Invest in Personal Development", perspectiveDescription: "Sees how shared growth builds trust and results, and acts to learn and improve together.", inPractice: DEFAULT_IN_PRACTICE },
  "Partner-P8": { title: "Partner Principle 8: Engage with Collaborators", perspectiveDescription: "Sees how trust and openness amplify impact, and acts to communicate, coordinate, and expand shared growth together.", inPractice: DEFAULT_IN_PRACTICE },
  "Partner-P9": { title: "Partner Principle 9: Maintain a Laser Focus on Execution", perspectiveDescription: "Sees how shared effort sustains results, and acts to stay coordinated and accountable until a shared vision is complete.", inPractice: DEFAULT_IN_PRACTICE },
};

const DEFAULT_OVERVIEW_BLOCKS: (principle: string) => InfoBlock[] = (principle) => [
  { type: "p", text: `Content for ${principle} is being developed. Use the Perspective Description above and the In Practice tab for now.` },
];

export function getPrincipleContent(role: string, principle: string): PrincipleContent & { overviewBlocks: InfoBlock[]; inPracticeBlocks: InfoBlock[] | null } {
  const key = `${role}-${principle}`;
  const c = PRINCIPLE_CONTENT[key];
  const base = c ?? {
    title: `${principle} — ${role}`,
    perspectiveDescription: `Add content for ${principle} (${role}) here.`,
    inPractice: DEFAULT_IN_PRACTICE,
  };
  const overviewBlocks = PRINCIPLE_OVERVIEW_BLOCKS[principle] ?? DEFAULT_OVERVIEW_BLOCKS(principle);
  const inPracticeBlocks = PRINCIPLE_IN_PRACTICE_BLOCKS[principle] ?? null;
  return { ...base, overviewBlocks, inPracticeBlocks };
}

// --- Level content (for Level i lightboxes) ---

/** Role-specific perspective description for each level (index 0–4). Same Overview/In Practice blocks for all roles. */
export const LEVEL_PERSPECTIVE: Record<number, Record<string, string>> = {
  0: {
    Achiever: "When the moment calls for achievement, your responsibility is to recognize the obstacles and opportunities in front of you, adopt the mindset best suited for shaping your response, and intentionally choose the future you are pursuing—revisiting that clarity as the situation evolves.",
    Leader: "When the moment calls for Leadership, your responsibility is to understand the reality of the situation, model the mindset needed for the path ahead, and define and communicate a meaningful future others can align around—revisiting that clarity as conditions change.",
    Partner: "When the moment calls for Partnership, your responsibility is to build shared clarity about the situation, contribute a mindset that strengthens trust and collaboration, and work with others to define a future worth committing to together—revisiting that understanding as the relationship and circumstances evolve.",
    Follower: "When the moment calls for the Follower role, your responsibility is to seek to understand the situation and communicate what you see from your unique perspective, adopt a mindset of learning and alignment, and support the future being pursued—continually reassessing and adapting as the situation evolves.",
  },
  // Levels 1–4: placeholder until content is added
  1: { Achiever: "Content for this level is being developed.", Leader: "Content for this level is being developed.", Partner: "Content for this level is being developed.", Follower: "Content for this level is being developed." },
  2: { Achiever: "Content for this level is being developed.", Leader: "Content for this level is being developed.", Partner: "Content for this level is being developed.", Follower: "Content for this level is being developed." },
  3: { Achiever: "Content for this level is being developed.", Leader: "Content for this level is being developed.", Partner: "Content for this level is being developed.", Follower: "Content for this level is being developed." },
  4: { Achiever: "Content for this level is being developed.", Leader: "Content for this level is being developed.", Partner: "Content for this level is being developed.", Follower: "Content for this level is being developed." },
};

/** Overview tab blocks by level index (0–4). Same for all roles. */
export const LEVEL_OVERVIEW_BLOCKS: Record<number, InfoBlock[]> = {
  0: [
    { type: "p", text: "Level 1 forms the foundation of the Compass Pyramid." },
    { type: "p", text: "Before alignment, systems, collaboration, or execution can gain traction, the foundational level must be understood clearly." },
    { type: "p", text: "This level brings together three principles:" },
    { type: "ul", items: [
      "P1 – Evaluate opportunities and obstacles",
      "P2 – Understand mindset",
      "P3 – Envision the ideal future",
    ]},
    { type: "p", text: "Together, these principles align three essential elements of any situation:" },
    { type: "ul", items: [
      "what is actually happening",
      "the mindset shaping how it is being interpreted",
      "the direction worth pursuing",
    ]},
    { type: "p", text: "When the foundation is unclear, effort often becomes reactive, scattered, or unstable." },
    { type: "p", text: "When it is clear, progress in the situation begins to gain traction." },
    { type: "p", text: "In the Compass structure itself, higher levels depend on the strength of this foundation. But the purpose of Level 1 is not to stabilize the framework. It is to stabilize the meaningful situation you are navigating so progress above it can move with intention." },
  ],
  1: [{ type: "p", text: "Content for this level is being developed." }],
  2: [{ type: "p", text: "Content for this level is being developed." }],
  3: [{ type: "p", text: "Content for this level is being developed." }],
  4: [{ type: "p", text: "Content for this level is being developed." }],
};

/** In Practice tab blocks by level index (0–4). Same for all roles. */
export const LEVEL_IN_PRACTICE_BLOCKS: Record<number, InfoBlock[]> = {
  0: [
    { type: "p", text: "Level 1 is where meaningful situations are examined honestly before action begins." },
    { type: "p", text: "Every principle that follows builds on it, and every meaningful check-in returns to it. It is both the structural starting point and the structural reset for intentional progress." },
    { type: "p", text: "At this stage the goal is not immediate movement, but accurate interpretation." },
    { type: "p", text: "You are asking questions such as:" },
    { type: "ul", items: [
      "What obstacles are shaping this situation?",
      "What opportunities may exist here?",
      "How might my current mindset be influencing how I see it?",
      "What future is actually worth pursuing?",
    ]},
    { type: "p", text: "Clarity at this level is never permanent." },
    { type: "p", text: "It reflects your best interpretation based on the information available right now. As new information appears, that understanding may evolve." },
    { type: "p", text: "This is why every Compass check-in returns here." },
    { type: "ul", items: [
      "Contexts change.",
      "Clarity erodes.",
      "Alignment drifts.",
    ]},
    { type: "p", text: "Returning to Foundation is how stability is re-established before moving upward again." },
    { type: "p", text: "When this level is strong, effort in higher levels begins to align naturally." },
    { type: "p", text: "When it is weak, even disciplined effort can drift, reinforce the wrong priorities, or lose direction." },
    { type: "p", text: "This is where intentional progress begins—by understanding the terrain well enough to decide what truly deserves your time, attention, and energy." },
  ],
  1: [{ type: "p", text: "Content for this level is being developed." }],
  2: [{ type: "p", text: "Content for this level is being developed." }],
  3: [{ type: "p", text: "Content for this level is being developed." }],
  4: [{ type: "p", text: "Content for this level is being developed." }],
};

export function getLevelPerspective(role: string, levelIndex: number): string {
  const byLevel = LEVEL_PERSPECTIVE[levelIndex];
  const text = byLevel?.[role];
  return text ?? `Content for ${LEVEL_NAMES[levelIndex] ?? "this level"} (${role}) is being developed.`;
}

export function getLevelOverviewBlocks(levelIndex: number): InfoBlock[] {
  return LEVEL_OVERVIEW_BLOCKS[levelIndex] ?? [{ type: "p", text: "Content for this level is being developed." }];
}

export function getLevelInPracticeBlocks(levelIndex: number): InfoBlock[] {
  return LEVEL_IN_PRACTICE_BLOCKS[levelIndex] ?? [{ type: "p", text: "Content for this level is being developed." }];
}
