/**
 * Copy for the Achiever role lightbox (the "i" next to the Achiever role on the Compass).
 * Two tabs: Overview and In Practice.
 * Edit only the text strings; keep the structure (block types) unchanged.
 */

import type { InfoBlock } from "../dashboard/infoContent";
import { ROLE_PRINCIPLES_SHORT } from "./rolePrinciplesShort";

export const ACHIEVER_OVERVIEW: InfoBlock[] = [
  { type: "p", text: "The Achiever defaults to North on the Compass— not as a position of superiority, but as direction. It's where clarity turns into motion, where knowing becomes doing." },
  { type: "p", text: "This is the posture you step into when something meaningful calls you forward. And its truth is simple but non-negotiable: no one else can carry your clarity for you. No one else can build your life." },
  { type: "p", text: "That's why orienting here comes first — not because you will always operate from this role, but because this is where you ask:" },
  { type: "ul", items: [
    "What do I want?",
    "What's worth pursuing?",
    "What am I willing to carry?",
  ]},
  { type: "p", text: "You have a responsibility to be in pursuit. Not in frantic motion. Not in endless striving. But in steady alignment with what matters most. The greatest way to honor being here isn't just to feel grateful for it — it's to live like it matters. To shape something. To stretch. To build." },
  { type: "p", text: "There will be seasons when you need to tend, recover, or care for others. That's part of being human. But when space opens again, this is where you return — not just to rebuild energy, but to remember who you are and what you want to make better." },
  { type: "p", text: "It's also worth remembering that the people around you are navigating their own version of this role too. Their urgency, resistance, or confusion will often trace back to wants they're pursuing — or ones they've yet to claim. When you can see that, you meet them with more grace. You become a better collaborator, parent, or partner — not by solving their problems, but by holding space for their authorship to unfold." },
  { type: "p", text: "The Achiever is where authorship begins. It turns want into motion — and makes everything else more navigable." },
];

export const ACHIEVER_IN_PRACTICE: InfoBlock[] = [
  { type: "p", text: "Nobody carries an Achiever title in real life. But most life roles carry moments — or entire seasons — where this is the responsibility that matters most. You're the one who needs to get clear. You're the one who needs to own it. You're the one who needs to move it forward." },
  { type: "p", text: "When a life role places that responsibility on you — whether you're a business owner, an athlete, an artist, a student, or simply someone with something meaningful to pursue — that's when the Achiever Role applies to the Compass." },
  { type: "p", text: "The sequence below outlines what navigating that responsibility with full intention looks like — from foundation to execution. Use it as a diagnostic: identify where you're currently operating, then check whether everything beneath that level is clear and stable. If it isn't, that's where your focus belongs." },
  { type: "p", text: "The lower you start, the stronger everything above it becomes." },
  { type: "pStrong", text: "Level 1 — Foundation" },
  { type: "ul", items: [
    { bold: "P1 — Evaluate Opportunities & Obstacles", rest: " " + ROLE_PRINCIPLES_SHORT.Achiever.P1 },
    { bold: "P2 — Understand Style & Mindset", rest: " " + ROLE_PRINCIPLES_SHORT.Achiever.P2 },
    { bold: "P3 — Envision an Ideal Future", rest: " " + ROLE_PRINCIPLES_SHORT.Achiever.P3 },
  ]},
  { type: "pStrong", text: "Level 2 — Alignment" },
  { type: "ul", items: [
    { bold: "P4 — Set Measurable Objectives", rest: " " + ROLE_PRINCIPLES_SHORT.Achiever.P4 },
    { bold: "P5 — Prioritize What Matters", rest: " " + ROLE_PRINCIPLES_SHORT.Achiever.P5 },
  ]},
  { type: "pStrong", text: "Level 3 — Systems & Growth" },
  { type: "ul", items: [
    { bold: "P6 — Build Effective Systems", rest: " " + ROLE_PRINCIPLES_SHORT.Achiever.P6 },
    { bold: "P7 — Invest in Personal Development", rest: " " + ROLE_PRINCIPLES_SHORT.Achiever.P7 },
  ]},
  { type: "pStrong", text: "Level 4 — Collaboration" },
  { type: "ul", items: [
    { bold: "P8 — Engage with Collaborators", rest: " " + ROLE_PRINCIPLES_SHORT.Achiever.P8 },
  ]},
  { type: "pStrong", text: "Level 5 — Execution" },
  { type: "ul", items: [
    { bold: "P9 — Maintain a Laser Focus on Execution", rest: " " + ROLE_PRINCIPLES_SHORT.Achiever.P9 },
  ]},
];
