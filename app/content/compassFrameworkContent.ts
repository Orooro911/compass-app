/**
 * Copy for the Compass Framework lightbox (the "i" next to "Compass Framework" on the graphic).
 * This lightbox has two main tabs: Overview and In Practice.
 * In Practice has sub-tabs: Compass Graphic, Compass Modules.
 *
 * Edit only the text strings. Keep the structure (tabs, sub-tabs, block types) unchanged.
 */

import type { InfoBlock } from "../dashboard/infoContent";

export type CompassFrameworkContent = {
  title: string;
  overview: InfoBlock[];
  inPracticeSubTabs: { id: string; label: string; blocks: InfoBlock[] }[];
};

export const COMPASS_FRAMEWORK: CompassFrameworkContent = {
  title: "Compass Framework",
  overview: [
    { type: "p", text: "The Compass is a structured framework for navigating life's most meaningful pursuits with clarity and agency." },
    { type: "p", text: "It rests on two foundational ideas." },
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
    { type: "p", text: "The Compass reduces the complexity of life's many roles and responsibilities into four functional postures of contribution:", indent: true },
    { type: "ul", items: [
      { bold: "Achiever", rest: " — responsible for personal clarity, ownership, and execution" },
      { bold: "Leader", rest: " — responsible for setting vision, direction, and guidance for others" },
      { bold: "Partner", rest: " — responsible for building trust, collaboration, and shared progress" },
      { bold: "Follower", rest: " — responsible for learning, support, and strengthening existing systems" },
    ], indent: true },
    { type: "p", text: "These are not titles or fixed identities. They represent the primary responsibility a person carries in a given context — and that responsibility must be navigated with intention. At the same time, any posture can be consciously chosen or shifted in the moment when a situation calls for it.", indent: true },
    { type: "pStrong", text: "When these two ideas work together, something shifts." },
    { type: "p", text: "Once the relationship between posture and sequence becomes visible, it changes how situations are interpreted — even before the Compass is formally being used. It becomes easier to see where a role is being carried without the sequence beneath it, where progress may be breaking down, and where a single adjustment in either could restore momentum." },
    { type: "p", text: "The Compass does not provide answers. It offers a structure for seeing what is actually happening and navigating forward with intention." },
    { type: "p", text: "Used well, it becomes a repeatable architecture for navigating challenges, strengthening the roles we play with others, and building intentional progress in the areas of life that matter most." },
  ],
  inPracticeSubTabs: [
    {
      id: "compass-graphic",
      label: "Compass Graphic",
      blocks: [
        { type: "p", text: "The interactive graphic on the left of the dashboard is the visual structure of the Compass." },
        { type: "p", text: "The four Compass roles sit at the cardinal points of the graphic:" },
        { type: "ul", items: [
          { bold: "Achiever (North)", rest: " — personal clarity, ownership, and execution. The app loads here because meaningful agency begins with getting clear inside yourself first." },
          { bold: "Leader (East)", rest: " — vision, direction, and guidance for others." },
          { bold: "Partner (West)", rest: " — trust, collaboration, and shared progress." },
          { bold: "Follower (South)", rest: " — learning, support, and strengthening existing systems." },
        ]},
        { type: "p", text: "Beneath each Compass role sits a pyramid of nine principles organized across five levels:" },
        { type: "ul", items: [
          "Foundation — P1, P2, P3",
          "Alignment — P4, P5",
          "Systems & Growth — P6, P7",
          "Collaboration — P8",
          "Execution — P9",
        ]},
        { type: "p", text: "The levels build from the base up — each one depending on the stability of the one beneath it. The same nine principles appear within every Compass role, but each is interpreted through the specific responsibility of the role being navigated." },
        { type: "p", text: "The graphic can be explored in two ways. From the graphic itself, click any ⓘ icon attached to a role, level, or principle to open its panel. Each panel opens with a short takeaway followed by Overview and In Practice tabs — and where the Compass is being actively used, an In Action tab where your work is saved." },
        { type: "p", text: "Once inside a panel, the navigation area lets you move directly to any other role, level, or principle without closing and reopening — keeping the full framework within reach at all times. As you move between roles, the Compass graphic rotates in the background to reflect the perspective you're currently exploring." },
      ],
    },
    {
      id: "compass-module",
      label: "Compass Modules",
      blocks: [
        { type: "p", text: "While the Compass is a framework, it's also an interactive tool that works in three powerful ways." },
        { type: "ul", items: [
          "Thinking tool — Reflect on how you are showing up within the responsibilities and relationships that shape your life.",
          "Mining tool — Uncover meaningful situations that may not be immediately visible.",
          "Action tool — Work through situations, pursue meaningful wants, and track larger transformations over time.",
        ]},
        { type: "p", text: "The app organizes this work across three tabs containing five modules where the Compass can be applied." },
        { type: "pStrong", text: "Roles & Relationships" },
        { type: "p", text: "The Roles & Relationships tab contains:" },
        { type: "ul", items: [
          "Life Roles — The real responsibilities or identities you carry in life — such as parent, friend, volunteer, or business owner.",
          "Shared Growth — The people connected to those responsibilities — partners, family members, colleagues, teammates, managers, or employees.",
        ]},
        { type: "p", text: "Within these modules, you can add the roles you carry in life and the people you share it with. Once added, you can use the Compass as a thinking or mining tool to reflect on how you are showing up within those relationships." },
        { type: "pStrong", text: "Meaningful Work" },
        { type: "p", text: "The Meaningful Work tab contains:" },
        { type: "ul", items: [
          "Situations — Circumstances that deserve attention because they contain meaningful opportunities or obstacles.",
          "Wants — Proactive pursuits that require sustained effort to achieve, or resolve.",
          "Transformations — Major shifts in direction or perspective that emerge through sustained effort.",
        ]},
        { type: "p", text: "These modules follow a nesting structure — Situations stand alone, Wants can contain multiple Situations, and Transformations can contain multiple Wants. This is where the Compass functions as a thinking, mining, and action tool." },
        { type: "pStrong", text: "Total System View" },
        { type: "p", text: "The Total System View tab displays all five modules together in a single view — a useful reference once your roles, people, and situations are in place." },
        { type: "p", text: "Open the ⓘ icons within any module for deeper explanations of how each one works." },
      ],
    },
  ],
};
