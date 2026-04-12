/**
 * Copy for the Compass Framework lightbox (the "i" next to "Compass Framework" on the graphic).
 * This lightbox has two main tabs: Overview and In Practice.
 * In Practice is a single body (formerly the "Compass Graphic" sub-tab). Archived module copy lives in
 * compassFrameworkInPracticeModulesArchive.ts.
 *
 * Edit only the text strings. Keep the structure (tabs, block types) unchanged.
 */

import type { InfoBlock } from "../dashboard/infoContent";

export type CompassFrameworkContent = {
  title: string;
  overview: InfoBlock[];
  inPractice: InfoBlock[];
};

export const COMPASS_FRAMEWORK: CompassFrameworkContent = {
  title: "Compass Framework",
  overview: [
    { type: "p", text: "The Compass framework is for intentional progress, and it rests on two foundational ideas. Together they form a mental model that — once internalized — makes everything in the app and everything in life more navigable." },
    { type: "ol", items: [
      { bold: "Meaningful progress follows a sequence.", rest: "" },
    ]},
    { type: "p", text: "The Compass organizes intentional progress through nine principles arranged as a pyramid, with each level building on the one beneath it.", indent: true },
    { type: "ul", items: [
      "The lower levels establish foundation and alignment.",
      "The middle levels strengthen systems and growth.",
      "The upper levels expand collaboration and execution.",
    ], indent: true },
    { type: "p", text: "Because the structure is sequential, higher levels depend on the stability of what sits below them. When the foundation is unclear, alignment weakens. When alignment weakens, systems strain. When lower levels fracture, execution loses durability.", indent: true },
    { type: "ol", items: [
      { bold: "Every role in life can be navigated through one of four universal postures.", rest: "" },
    ], start: 2 },
    { type: "p", text: "All of life's roles and responsibilities can be reduced into four universal postures of contribution:", indent: true },
    { type: "ul", items: [
      { bold: "Achiever", rest: " — responsible for personal clarity, ownership, and execution" },
      { bold: "Leader", rest: " — responsible for setting vision, direction, and guidance for others" },
      { bold: "Partner", rest: " — responsible for building trust, collaboration, and shared progress" },
      { bold: "Follower", rest: " — responsible for learning, support, and strengthening existing systems" },
    ], indent: true },
    { type: "p", text: "These are not titles or fixed identities. They represent the primary responsibility a person carries in a given context — and that responsibility must be navigated with intention. At the same time, any posture can be consciously chosen or shifted in the moment when a situation calls for it.", indent: true },
    { type: "pStrong", text: "When these two ideas work together, something shifts." },
    { type: "p", text: "Once the relationship between posture and sequence becomes visible, it changes how any meaningful endeavor is interpreted — even before the Compass is formally being used. It becomes easier to see whether a situation or pursuit is being navigated from the right posture, whether the sequence beneath it is stable, and where a single adjustment in either could restore clarity or momentum." },
    { type: "p", text: "The Compass does not provide answers. It provides orientation — a way of seeing what is actually happening and navigating forward with intention. Once that orientation becomes instinctive, any meaningful situation becomes readable." },
  ],
  inPractice: [
    { type: "p", text: "The large interactive graphic in the left center of the dashboard is the visual structure of the Compass." },
    { type: "p", text: "The four Compass postures sit at the cardinal points of the graphic:" },
    { type: "ul", items: [
      { bold: "Achiever (North)", rest: " — Responsible for personal clarity, ownership, and execution. The Achiever posture defaults to the top because meaningful agency always begins with clarity within yourself first." },
      { bold: "Leader (East)", rest: " — Responsible for vision, direction, and guidance for others." },
      { bold: "Partner (West)", rest: " — Responsible for trust, collaboration, and shared progress." },
      { bold: "Follower (South)", rest: " — Responsible for learning, support, and strengthening existing systems." },
    ]},
    { type: "p", text: "Beneath each posture sits a pyramid of nine principles organized across five levels:" },
    { type: "h3", text: "Foundation" },
    { type: "ol", items: [
      "Evaluate Opportunities & Obstacles",
      "Understand Style & Mindset",
      "Envision an Ideal Future",
    ], start: 1 },
    { type: "h3", text: "Alignment" },
    { type: "ol", items: [
      "Set Measurable Objectives",
      "Prioritize What Matters",
    ], start: 4 },
    { type: "h3", text: "Systems & Growth" },
    { type: "ol", items: [
      "Build Effective Systems",
      "Invest in Personal Development",
    ], start: 6 },
    { type: "h3", text: "Collaboration" },
    { type: "ol", items: [
      "Engage with Collaborators",
    ], start: 8 },
    { type: "h3", text: "Execution" },
    { type: "ol", items: [
      "Maintain a Laser Focus on Execution",
    ], start: 9 },
    { type: "p", text: "The levels build from the base up — each one depending on the stability of the one beneath it. The same nine principles appear within every posture, rising from the bottom left as the levels build upward — but each is interpreted through the specific responsibility of the posture being navigated." },
    { type: "p", text: "Once your orientation is complete, the graphic can be explored in two ways:" },
    { type: "ol", items: [
      { bold: "From the graphic itself", rest: " — click any ⓘ icon attached to a posture, level, or principle to open its infromation panel. Each panel includes a short takeaway followed by Overview and In Practice tabs — and where the Compass is being actively used, an In Action tab where your work is saved." },
      { bold: "From inside any panel", rest: " — the navigation area lets you move directly to any other posture, level, or principle without closing and reopening — keeping the full framework within reach at all times." },
    ], start: 1 },
    { type: "p", text: "As you move between postures, the Compass graphic rotates to reflect the posture of contribution you're currently exploring." },
  ],
};
