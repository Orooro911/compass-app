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
    { type: "p", text: "The Compass is a structured framework for navigating life's most meaningful situations with clarity and agency." },
    { type: "p", text: "It rests on two foundational ideas." },
    { type: "ol", items: [
      "The Compass simplifies the complexity of the many situations we navigate in life into four universal postures of responsibility and contribution:",
    ]},
    { type: "ul", items: [
      "Achiever",
      "Leader",
      "Partner",
      "Follower",
    ], indent: true },
    { type: "p", text: "These are not titles or fixed identities. They are the functional postures people adopt when navigating situations with others—often without realizing it. Understanding the responsibility of each posture makes it possible to explore alternatives and consciously choose the one that best serves the moment.", indent: true },
    { type: "ol", items: [
      "The Compass provides a sequential architecture for intentional progress through nine principles arranged as a pyramid, with each level building on the one beneath it.",
    ], start: 2 },
    { type: "ul", items: [
      "The lower levels establish foundation and alignment.",
      "The middle levels strengthen systems and growth.",
      "The upper levels expand collaboration and execution.",
    ], indent: true },
    { type: "p", text: "Because the structure is sequential, higher levels depend on the stability of what sits below them. When the foundation is unclear, alignment weakens. When alignment weakens, systems strain. When lower levels fracture, execution loses durability.", indent: true },
    { type: "p", text: "For many people, simply internalizing these two foundational ideas can unlock an immediate shift in perspective. Once the relationship between posture of contribution and sequence of progress becomes visible, it often changes how situations are interpreted irrespective of whether the Compass is formally being used." },
    { type: "p", text: "The Compass does not provide answers on its own." },
    { type: "p", text: "Instead, it provides a structure for navigating complex situations deliberately. By examining real circumstances using the framework, you can explore where default postures between you and others may be conflicting, where priorities may be misaligned with the natural sequence of progress, and what forms of contribution might move the situation forward most constructively." },
    { type: "p", text: "In many cases, this exploration surfaces instability or misalignment that was not obvious at first. Through reflection and purposeful questioning, the framework helps bring those underlying dynamics into clearer view, revealing where purpose may be unclear, progress may be stalled, systems or growth may be limiting momentum, collaboration may be strained, or execution may lack focus." },
    { type: "p", text: "Used well, the Compass can become a repeatable architecture for navigating challenges, strengthening the roles we play with others, and building intentional progress in the areas of life that matter most." },
  ],
  inPracticeSubTabs: [
    {
      id: "compass-graphic",
      label: "Compass Graphic",
      blocks: [
        { type: "p", text: "The graphic on the left of the Compass Dashboard represents the visual and interactive structure of the Compass." },
        { type: "p", text: "The framework is organized around four Compass roles positioned at the four cardinal points of the graphic:" },
        { type: "ul", items: [
          { bold: "Achiever (North)", rest: " — Responsible for personal clarity, ownership, and execution. The Compass app loads with the Achiever at the top because meaningful agency begins with getting clear inside yourself first." },
          { bold: "Leader (East)", rest: " — Responsible for setting vision, direction, and guidance for others." },
          { bold: "Partner (West)", rest: " — Responsible for building trust, collaboration, and shared progress." },
          { bold: "Follower (South)", rest: " — Responsible for learning, support, and strengthening existing systems." },
        ]},
        { type: "p", text: "These are not job titles or identities. They are functional postures people adopt when navigating situations with others. In real life, we move between them constantly, often without noticing." },
        { type: "p", text: "Beneath each role sits the same pyramid of development: five levels supported by nine principles." },
        { type: "p", text: "The levels move from foundational clarity to focused execution:" },
        { type: "ul", items: [
          "Foundation",
          "Alignment",
          "Systems & Growth",
          "Collaboration",
          "Execution",
        ]},
        { type: "p", text: "Each level contains one or more principles that strengthen the role above it. Because the structure is sequential, higher levels depend on the stability of the ones below them." },
        { type: "p", text: "In the interactive graphic, the Compass rotates as different roles are explored. Clicking a principle box such as P1, P2, or P3 opens a detailed panel for that principle. Clicking an information icon opens a panel explaining the Compass role or Level it is attached to." },
        { type: "p", text: "Principle panels and Levels allow you to move across roles, levels, and principles without leaving the view. As you navigate, the Compass graphic rotates in the background to reflect the role perspective you are exploring." },
        { type: "p", text: "The graphic is designed to be explored freely. As you interact with it, the structure of the Compass becomes easier to understand and apply to real situations." },
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
        { type: "p", text: "The app organizes this work across three navigation panels containing five modules where the Compass can be applied." },
        { type: "pStrong", text: "Roles & Relationships" },
        { type: "p", text: "The Roles & Relationships tab contains:" },
        { type: "ul", items: [
          "Life Roles — The responsibilities or identities you carry in life—such as parent, friend, volunteer, or business owner.",
          "Shared Growth — The people connected to those responsibilities—partners, family members, colleagues, teammates, managers, or employees.",
        ]},
        { type: "p", text: "Within these modules, you can add the roles you carry in life and the people you share it with. Once added, you can then use the Compass as a thinking or mining tool to reflect on how you are showing up within those relationships." },
        { type: "p", text: 'Open the "i" icons in each module for deeper explanations.' },
        { type: "pStrong", text: "Meaningful Work" },
        { type: "p", text: "The Meaningful Work tab contains:" },
        { type: "ul", items: [
          "Situations — Circumstances that deserve attention because they contain meaningful opportunities or obstacles.",
          "Wants — Goals that require sustained effort to pursue, achieve, or resolve.",
          "Transformations — Major shifts in direction or perspective that emerge through sustained pursuit.",
        ]},
        { type: "p", text: "These modules follow a nesting structure:" },
        { type: "ul", items: [
          "Situations stand alone.",
          "Wants can contain multiple situations.",
          "Transformations can contain multiple wants.",
        ]},
        { type: "p", text: "This area allows the Compass to function as a thinking, mining, and action tool." },
        { type: "p", text: 'Open the "i" icons within each module to learn how they work.' },
        { type: "pStrong", text: "Total System View" },
        { type: "p", text: "The Total System View simply displays all five modules together." },
        { type: "p", text: "You can explore the Compass in any way that feels useful. Informational icons throughout the system provide deeper explanations of roles, levels, principles, and modules." },
        { type: "p", text: "Most people begin by defining their Life Roles, since these represent the areas of life where responsibility and attention naturally live. Would you like to add your life roles now or explore the app a little bit first?" },
      ],
    },
  ],
};
