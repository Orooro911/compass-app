/**
 * Copy for the Follower role lightbox (the "i" next to the Follower role on the Compass).
 * Overview and In Practice tab content.
 */

import type { InfoBlock } from "../dashboard/infoContent";
import { ROLE_PRINCIPLES_SHORT } from "./rolePrinciplesShort";

export const FOLLOWER_OVERVIEW: InfoBlock[] = [
  { type: "p", text: "Of all the Compass roles, the Follower is often the most misunderstood." },
  { type: "p", text: "The Follower role is where you align yourself with something meaningful, even when you're not the one setting the direction. It's where you learn, support, adapt, and contribute — not passively, but with grounded intention." },
  { type: "p", text: "The Follower sits South on the Compass by default. This is the role that grounds and supports — a posture of learning, presence, and deliberate contribution." },
  { type: "p", text: "We follow in more ways than we often recognize: when we lean into mentorship, support a partner's dream, walk beside a child through a tough season. Good followers don't disappear — they amplify. They give shape and rhythm to what matters." },
  { type: "p", text: "Whether you're a teammate, student, collaborator, or caregiver, the Follower lens helps you ask: Am I supporting what matters most here? Am I showing up in a way that strengthens the whole?" },
  { type: "p", text: "When we resist this role, it shows. We grow impatient. We withdraw. We withhold our gifts — or worse, our presence. But when we hold it well, something steady comes online. We become a source of gravity. Of trust. Of momentum that doesn't burn out." },
  { type: "p", text: "The Follower role often shapes us the most. By following well, we learn to listen more deeply. We practice letting go. We develop strength without ego." },
  { type: "p", text: "When life invites you to contribute — not by steering, but by strengthening — use the Follower lens. Measure yourself against the role. Choose to support something you believe in." },
  { type: "p", text: "Because the Follower isn't a background role. It's a backbone. And the world needs more people who know how to follow well — with presence, clarity, and grace." },
];

export const FOLLOWER_IN_PRACTICE: InfoBlock[] = [
  { type: "p", text: "Following is a responsibility that forms when you commit to something meaningful that someone else is leading — and you choose to strengthen it rather than steer it." },
  { type: "p", text: "When a life role places that responsibility on you — whether you're an employee, a teammate, a student, a volunteer, or simply someone who has chosen to support a direction someone else has set — that's when the Follower Role applies to the Compass." },
  { type: "p", text: "The sequence below outlines what navigating that responsibility with full intention looks like — from foundation to execution. Use it as a diagnostic: identify where you're currently operating, then check whether everything beneath that level is genuinely shared and stable between both parties. If it isn't, that's where your focus belongs." },
  { type: "p", text: "The lower you start, the stronger everything above it becomes." },
  { type: "pStrong", text: "Level 1 — Foundation" },
  { type: "ul", items: [
    { bold: "P1 — Evaluate Opportunities & Obstacles", rest: " " + ROLE_PRINCIPLES_SHORT.Follower.P1 },
    { bold: "P2 — Understand Style & Mindset", rest: " " + ROLE_PRINCIPLES_SHORT.Follower.P2 },
    { bold: "P3 — Envision an Ideal Future", rest: " " + ROLE_PRINCIPLES_SHORT.Follower.P3 },
  ]},
  { type: "pStrong", text: "Level 2 — Alignment" },
  { type: "ul", items: [
    { bold: "P4 — Set Measurable Objectives", rest: " " + ROLE_PRINCIPLES_SHORT.Follower.P4 },
    { bold: "P5 — Prioritize What Matters", rest: " " + ROLE_PRINCIPLES_SHORT.Follower.P5 },
  ]},
  { type: "pStrong", text: "Level 3 — Systems & Growth" },
  { type: "ul", items: [
    { bold: "P6 — Build Effective Systems", rest: " " + ROLE_PRINCIPLES_SHORT.Follower.P6 },
    { bold: "P7 — Invest in Personal Development", rest: " " + ROLE_PRINCIPLES_SHORT.Follower.P7 },
  ]},
  { type: "pStrong", text: "Level 4 — Collaboration" },
  { type: "ul", items: [
    { bold: "P8 — Engage with Collaborators", rest: " " + ROLE_PRINCIPLES_SHORT.Follower.P8 },
  ]},
  { type: "pStrong", text: "Level 5 — Execution" },
  { type: "ul", items: [
    { bold: "P9 — Maintain a Laser Focus on Execution", rest: " " + ROLE_PRINCIPLES_SHORT.Follower.P9 },
  ]},
];
