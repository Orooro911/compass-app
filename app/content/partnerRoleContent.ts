/**
 * Copy for the Partner role lightbox (the "i" next to the Partner role on the Compass).
 * Overview and In Practice tab content.
 */

import type { InfoBlock } from "../dashboard/infoContent";
import { ROLE_PRINCIPLES_SHORT } from "./rolePrinciplesShort";

export const PARTNER_OVERVIEW: InfoBlock[] = [
  { type: "p", text: "The Partner role is where synergy begins. It's where two or more people commit to moving forward together — each bringing presence, honesty, and effort to a shared goal, life, or experience." },
  { type: "p", text: "The Partner sits West on the Compass by default. This is the role that stabilizes and amplifies everything else. When it's strong, it creates resilience. When it's neglected, things that once felt aligned begin to fray." },
  { type: "p", text: "We live this role in our closest relationships — in marriage, parenting, friendship, and business. It shows up in creative collaborations, long-term commitments, and everyday agreements that only work when people bring their full selves with care." },
  { type: "p", text: "Real partnership isn't just about shared goals. It's about shared responsibility. It requires emotional presence — not just physical proximity. Whether you're a spouse, parent, collaborator, or friend, the Partner lens helps you ask: Am I showing up with honesty and care? Am I carrying my share of the emotional weight?" },
  { type: "p", text: "Great partners don't just divide tasks. They multiply energy. They speak truth without blame. They listen without retreating. They protect each other's growth — and hold each other accountable to the bigger thing they've agreed to pursue." },
  { type: "p", text: "It means being honest when something isn't working — and generous when someone else is struggling. Sometimes it means leading. Sometimes it means following. But most of the time it means staying engaged. Staying invested. Staying in the process, even when it's hard." },
  { type: "p", text: "When this role is neglected, communication breaks down. Assumptions grow. Resentment replaces clarity. The bond that once created momentum begins to create drag." },
  { type: "p", text: "But when this role is brought to life — through humility, presence, and clarity — something powerful happens. Trust deepens. Collaboration sharpens. People grow — not in spite of the relationship, but because of it." },
  { type: "p", text: "Partnership isn't about always agreeing. It's about always engaging. And when that engagement is steady, the momentum created together becomes something neither person could have produced alone." },
];

export const PARTNER_IN_PRACTICE: InfoBlock[] = [
  { type: "p", text: "Partnership is a responsibility that forms between people — in marriage, in business, in friendship, in collaboration — wherever two or more people commit to building or navigating something together that neither could do as well alone." },
  { type: "p", text: "When a life role places that responsibility on you — whether you're a spouse, a co-founder, a teammate, a parent building something with your child, or simply someone trying to move something forward with another person — that's when the Partner Role applies to the Compass." },
  { type: "p", text: "The sequence below outlines what navigating that responsibility with full intention looks like — from foundation to execution. Use it as a diagnostic: identify where you're currently operating, then check whether everything beneath that level is genuinely shared and stable between both parties. If it isn't, that's where your focus belongs." },
  { type: "p", text: "The lower you start, the stronger everything above it becomes." },
  { type: "pStrong", text: "Level 1 — Foundation" },
  { type: "ul", items: [
    { bold: "P1 — Evaluate Opportunities & Obstacles", rest: " " + ROLE_PRINCIPLES_SHORT.Partner.P1 },
    { bold: "P2 — Understand Style & Mindset", rest: " " + ROLE_PRINCIPLES_SHORT.Partner.P2 },
    { bold: "P3 — Envision an Ideal Future", rest: " " + ROLE_PRINCIPLES_SHORT.Partner.P3 },
  ]},
  { type: "pStrong", text: "Level 2 — Alignment" },
  { type: "ul", items: [
    { bold: "P4 — Set Measurable Objectives", rest: " " + ROLE_PRINCIPLES_SHORT.Partner.P4 },
    { bold: "P5 — Prioritize What Matters", rest: " " + ROLE_PRINCIPLES_SHORT.Partner.P5 },
  ]},
  { type: "pStrong", text: "Level 3 — Systems & Growth" },
  { type: "ul", items: [
    { bold: "P6 — Build Effective Systems", rest: " " + ROLE_PRINCIPLES_SHORT.Partner.P6 },
    { bold: "P7 — Invest in Personal Development", rest: " " + ROLE_PRINCIPLES_SHORT.Partner.P7 },
  ]},
  { type: "pStrong", text: "Level 4 — Collaboration" },
  { type: "ul", items: [
    { bold: "P8 — Engage with Collaborators", rest: " " + ROLE_PRINCIPLES_SHORT.Partner.P8 },
  ]},
  { type: "pStrong", text: "Level 5 — Execution" },
  { type: "ul", items: [
    { bold: "P9 — Maintain a Laser Focus on Execution", rest: " " + ROLE_PRINCIPLES_SHORT.Partner.P9 },
  ]},
];
