/**
 * Copy for the Leader role lightbox (the "i" next to the Leader role on the Compass).
 * Overview and In Practice tab content.
 */

import type { InfoBlock } from "../dashboard/infoContent";
import { ROLE_PRINCIPLES_SHORT } from "./rolePrinciplesShort";

export const LEADER_OVERVIEW: InfoBlock[] = [
  { type: "p", text: "The Leader role exists to shape clarity — not just for yourself, but for others." },
  { type: "p", text: "That clarity doesn't come from control. It comes from vision — the willingness to look ahead, hold the long arc in view, and help people align around where we're going and why it matters." },
  { type: "p", text: "The Leader sits East on the Compass by default. This is the role that brings light to the path — not by knowing everything, but by seeing early, holding steady, and helping others move with confidence." },
  { type: "p", text: "You don't need a title to lead. Leadership isn't about being in charge — it's about carrying the weight of orientation on behalf of others." },
  { type: "p", text: "That weight is real. It includes holding ambiguity, modeling consistency, and naming what others aren't ready to say. The Leader role asks: Am I holding this role as it's meant to be held? Am I shaping clarity where it's needed most?" },
  { type: "p", text: "When this role is lived with intention, things begin to organize. Vision strengthens. Momentum becomes clear. When it is neglected — we tend to drift, avoid, or defer — others feel that too. Rhythm fades. Energy fragments." },
  { type: "p", text: "When clarity is missing, step forward. Use the Leader lens. Create coherence." },
  { type: "p", text: "The responsibility of the Leader isn't just to go first — it's to make it easier for others to grow, contribute, and lead in return." },
];

export const LEADER_IN_PRACTICE: InfoBlock[] = [
  { type: "p", text: "Leadership is a responsibility that gets placed on us — from our own life choices, by a team, a family, an organization, or a situation that needs someone to step forward and create clarity for others." },
  { type: "p", text: "When a life role places that responsibility on you — whether you're a manager, a parent, a coach, a founder, or simply the person in the room who sees what others can't yet see — that's when the Leader Role applies to the Compass." },
  { type: "p", text: "The sequence below outlines what navigating that responsibility with full intention looks like — from foundation to execution. Use it as a diagnostic: identify where you're currently operating, then check whether everything beneath that level is clear and stable for the people you're leading. If it isn't, that's where your focus belongs." },
  { type: "p", text: "The lower you start, the stronger everything above it becomes." },
  { type: "pStrong", text: "Level 1 — Foundation" },
  { type: "ul", items: [
    { bold: "P1 — Evaluate Opportunities & Obstacles", rest: " " + ROLE_PRINCIPLES_SHORT.Leader.P1 },
    { bold: "P2 — Understand Style & Mindset", rest: " " + ROLE_PRINCIPLES_SHORT.Leader.P2 },
    { bold: "P3 — Envision an Ideal Future", rest: " " + ROLE_PRINCIPLES_SHORT.Leader.P3 },
  ]},
  { type: "pStrong", text: "Level 2 — Alignment" },
  { type: "ul", items: [
    { bold: "P4 — Set Measurable Objectives", rest: " " + ROLE_PRINCIPLES_SHORT.Leader.P4 },
    { bold: "P5 — Prioritize What Matters", rest: " " + ROLE_PRINCIPLES_SHORT.Leader.P5 },
  ]},
  { type: "pStrong", text: "Level 3 — Systems & Growth" },
  { type: "ul", items: [
    { bold: "P6 — Build Effective Systems", rest: " " + ROLE_PRINCIPLES_SHORT.Leader.P6 },
    { bold: "P7 — Invest in Personal Development", rest: " " + ROLE_PRINCIPLES_SHORT.Leader.P7 },
  ]},
  { type: "pStrong", text: "Level 4 — Collaboration" },
  { type: "ul", items: [
    { bold: "P8 — Engage with Collaborators", rest: " " + ROLE_PRINCIPLES_SHORT.Leader.P8 },
  ]},
  { type: "pStrong", text: "Level 5 — Execution" },
  { type: "ul", items: [
    { bold: "P9 — Maintain a Laser Focus on Execution", rest: " " + ROLE_PRINCIPLES_SHORT.Leader.P9 },
  ]},
];
