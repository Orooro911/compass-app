/**
 * Copy for Principles (P1–P9) and Levels inside each role's pyramid on the Compass.
 * Each principle has a Perspective Description (short blurb under the header), Overview tab (full block content), and In Practice tab.
 * Apply is the user-editable tab (in the UI only).
 *
 * Keys: "Role-P1" … "Role-P9" for principles; "Role-0" … "Role-4" for levels (0 = Level 1 Foundation).
 * Edit only the text strings.
 */

import type { InfoBlock } from "../dashboard/infoContent";
import { ROLE_PRINCIPLES_SHORT } from "./rolePrinciplesShort";

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
    { type: "p", text: "Principle 1 sits at the far bottom left of the Compass Pyramid for a reason." },
    { type: "p", text: "Nothing meaningful moves until this step is clear." },
    { type: "ul", items: ["Not momentum.", "Not alignment.", "Not execution."] },
    { type: "p", text: "Everything that follows depends on how honestly we assess what is actually in front of us." },
    { type: "p", text: "Most obstacles and opportunities that shape our lives aren't obvious at first glance. They sit just beneath the surface — patterns we haven't named, friction we've normalized, emotional reactions we keep rationalizing, opportunities we sense but haven't clearly articulated. That's what makes P1 harder than it looks." },
    { type: "p", text: "It doesn't just ask what's in front of you. It asks whether you're willing to tell the truth about it — even when it's uncomfortable, uncertain, or inconvenient." },
    { type: "p", text: "When we don't do this well, three things tend to happen:" },
    { type: "ul", items: ["We drift — carried by circumstances, expectations, or someone else's priorities.", "We aim at the wrong thing — investing real effort in outcomes that never quite deliver.", "We move forward by happenstance — mistaking motion for direction."] },
    { type: "p", text: "In all three cases, agency is missing." },
    { type: "p", text: "P1 is where agency begins. It replaces chance with choice." },
  ],
};

/** Full In Practice tab content by principle ID. When missing, the string from PRINCIPLE_CONTENT.inPractice is used. */
export const PRINCIPLE_IN_PRACTICE_BLOCKS: Record<string, InfoBlock[]> = {
  P1: [
    { type: "p", text: "Working with P1 in any circumstance starts with a simple but demanding discipline: name both the obstacle and the opportunity at the same time." },
    { type: "p", text: "Not just the obstacle — where most people stop, getting mired in the problem longer than is useful. And not just the opportunity — where optimists run, moving fast without accounting for what's in the way." },
    { type: "p", text: "Both have to be named together. A situation without an honest obstacle is wishful thinking. A situation without a genuine opportunity isn't worth navigating." },
    { type: "p", text: "When using the Compass, P1 asks you to pause on any life role, relationship, or circumstance and ask:" },
    {
      type: "ul",
      items: [
        "What is genuinely in the way here — not the surface frustration, but the real constraint?",
        "What is genuinely possible here — not the optimistic hope, but the real upside?",
      ],
    },
    { type: "p", text: "The goal isn't a perfect answer. It's an honest one. The more honestly both are named, the more clearly everything above P1 can be built." },
    { type: "p", text: "As you work with this principle, consider which Compass role most honestly reflects your responsibility in this situation — and let that posture shape how you apply it." },
  ],
};

/** In Action tab prompt content by principle ID (read-only guidance). */
export const PRINCIPLE_IN_ACTION_PROMPT_BLOCKS: Record<string, InfoBlock[]> = {
  P1: [
    { type: "p", text: "Often, the obstacles and opportunities that shape us most are the ones we haven’t yet recognized or identified." },
    { type: "p", text: "As you think through the meaningful roles, relationships, and circumstances in your life — from any Compass perspective — consider:" },
    {
      type: "ul",
      items: [
        "Is there something significant in the way that you've been working around rather than addressing directly?",
        "Is there a meaningful opportunity forming that you've sensed but haven't clearly articulated?",
        "Is there a situation someone else is navigating where you can see something they might not?",
      ],
    },
    { type: "p", text: "If something surfaces that feels real and worth understanding more clearly, that's a signal worth following." },
    { type: "p", text: "Name it as a Situation within the Compass and move it through P1, P2, and P3. Even if it never becomes something worth navigation long-term, the clarity alone is worth it." },
  ],
};

export const PRINCIPLE_CONTENT: Record<string, PrincipleContent> = (() => {
  const out: Record<string, PrincipleContent> = {};
  for (const role of ROLE_NAMES) {
    for (const principle of PRINCIPLE_IDS) {
      const key = `${role}-${principle}`;
      out[key] = {
        title: `${role} ${PRINCIPLE_DISPLAY_NAMES[principle] ?? principle}`,
        perspectiveDescription: ROLE_PRINCIPLES_SHORT[role][principle],
        inPractice: DEFAULT_IN_PRACTICE,
      };
    }
  }
  return out;
})();

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
