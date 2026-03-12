/**
 * Copy for the Dashboard "i" info lightboxes.
 * Edit the strings below to change what users see. Do not add or remove
 * type: "p" | "h3" | "ul" or change structure—only edit the text strings.
 */

export type UlListItem = string | { bold: string; rest: string };

export type InfoBlock =
  | { type: "p"; text: string; className?: string; indent?: boolean }
  | { type: "pStrong"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: UlListItem[]; indent?: boolean }
  | { type: "ol"; items: string[]; start?: number };

export type InfoSection = { title: string; blocks: InfoBlock[] };

export const DASHBOARD_INFO: InfoSection = {
  title: "My Compass Dashboard",
  blocks: [
    { type: "p", text: "The Compass App is a companion to Wayfinder, a book about navigating life's turning points—moments of change, growth, challenge, and possibility." },
    { type: "p", text: "At the heart of both is a framework called the Compass." },
    { type: "p", text: "The Compass is about direction. It helps you navigate the roles you carry, the situations you face, and the progress you want to make—revealing where purpose may be forming and where meaningful paths forward may exist. Over time, returning to the Compass can help you notice where alignment exists, where friction is forming, and where thoughtful attention could move the most meaningful parts of your life forward." },
    { type: "p", text: "The Compass does not provide answers." },
    { type: "p", text: "Instead, it offers a structure for interpreting what is happening around you and helps you decide how to respond." },
    { type: "p", text: 'To begin, click the "i" icon next to Compass Framework title in the top left corner of the Compass graphic.' },
    { type: "p", text: "If you haven't read the book, start with the Overview section to understand how the framework works. The rest of the app builds on this structure." },
    { type: "p", text: "Whether you've read the book or not, the In Practice section explains how the app is organized—including the interactive Compass graphic and the five modules where the framework can be explored and applied." },
  ],
};

export const LIFE_ROLES_INFO: InfoSection = {
  title: "Life Roles",
  blocks: [
    { type: "p", text: "Life Roles are the front lines of your life." },
    { type: "p", text: "They are not abstract titles. They are the identities you carry week after week — the places where responsibility lives and where your decisions shape real outcomes." },
    { type: "p", text: "These roles may include parent, spouse, caregiver, team leader, business owner, friend, volunteer, investor, or any identity that consistently carries weight in your life." },
    { type: "p", text: "Choose roles that genuinely require your time, energy, and attention. Aim for four to five to start. Too many, and the signal gets lost. Too few, and you may overlook meaningful areas of responsibility." },
    { type: "p", text: "Life Roles are not the same as Compass Roles." },
    { type: "p", text: "Your Life Roles are the vessels of your life." },
    { type: "p", text: "The Compass Roles (Achiever, Leader, Partner, Follower) are the lenses you use to navigate within those vessels." },
    { type: "p", text: "Once your Life Roles are defined, the Compass helps you evaluate how you're showing up inside each one — and where alignment, attention, or adjustment may be needed." },
    { type: "p", text: "This is your structural anchor." },
  ],
};

export const SHARED_GROWTH_INFO: InfoSection = {
  title: "Shared Growth",
  blocks: [
    { type: "p", text: "Shared Growth represents the people whose direction is meaningfully connected to yours." },
    { type: "p", text: "This is not a contact list. It is not a social graph." },
    { type: "p", text: "Only add individuals or groups whose growth, decisions, and trajectory are intertwined with your own — people where responsibility flows both ways." },
    { type: "p", text: "A relationship belongs here when:" },
    { type: "ul", items: ["It has enduring relevance", "Your choices affect one another", "You intend to invest in the relationship over time"] },
    { type: "p", text: "If the connection is temporary, purely transactional, or requires no ongoing coordination, it does not belong here." },
    { type: "p", text: "Shared Growth allows you to apply the Compass relationally — to reflect not only on how you are operating, but how you are aligning, supporting, or building alongside others." },
    { type: "p", text: "Start with a small number of meaningful connections. What matters is not quantity, but weight." },
  ],
};

export const SITUATIONS_INFO: InfoSection = {
  title: "Situations",
  blocks: [
    { type: "p", text: "Every meaningful pursuit begins as a Situation." },
    { type: "p", text: "A Situation is not just a problem to fix. It is layered with obstacles, opportunities, decisions, or ambition that deserves clarity." },
    { type: "p", text: "Even if what we're pursuing feels large—a long-term goal, a major want, or something transformational—the Compass recommends starting here." },
    { type: "h3", text: "Why start here?" },
    { type: "p", text: "Because we often misread what we want." },
    { type: "p", text: "Before labeling something a meaningful want or transformation, the Compass guides you through Level 1 situationally:" },
    { type: "ul", items: ["What is the real opportunity or obstacle? What's the truth?", "What mindset is shaping how you see it and would a different approach add more value?", "What would an ideal outcome actually look like?"] },
    { type: "p", text: "Going through this process acts as a filter." },
    { type: "h3", text: "What happens next?" },
    { type: "p", text: "Some Situations resolve quickly—perhaps through a single conversation or by working through higher principles in the pyramid." },
    { type: "p", text: "But other situations reveal a deeper direction we may want to build. In the Compass framework, these may be promoted to a Want, where multiple related Situations can be organized and pursued over time." },
    { type: "p", text: "Occasionally, a Situation uncovers something more structural—an identity-level shift that reshapes multiple areas of life. These may be promoted to a Transformation, where multiple Wants can live beneath a larger arc of what we're becoming." },
    { type: "p", text: "But every meaningful shift starts here." },
    { type: "p", text: "Clarity first. Structure second. Progress after that.", className: "font-medium text-white mt-4" },
  ],
};

export const WANTS_INFO: InfoSection = {
  title: "Wants",
  blocks: [
    { type: "p", text: "A Want is something you intend to pursue over time." },
    { type: "p", text: "While a Situation captures a specific moment, tension, or decision, a Want represents a broader direction you are choosing to build." },
    { type: "p", text: "Every entry begins as a Situation. After you've worked through Level 1 of the Compass—clarifying the opportunity or obstacle, examining your mindset, and envisioning an ideal outcome—the system gives you the option to promote it." },
    { type: "p", text: "If what you've uncovered requires sustained effort rather than a single move, it may belong here." },
    { type: "p", text: "A Want provides structure for ongoing progress. It allows you to organize multiple related Situations beneath a single pursuit, so your effort remains coordinated rather than scattered." },
    { type: "p", text: "If a Situation feels less like something to resolve and more like something to build, it is ready to become a Want." },
  ],
};

export const TRANSFORMATIONS_INFO: InfoSection = {
  title: "Transformations",
  blocks: [
    { type: "p", text: "A Transformation represents a structural shift in who you are becoming." },
    { type: "p", text: "Unlike a Want—which organizes effort around a chosen direction—a Transformation reshapes multiple areas of your life. It reflects a deeper change in identity, posture, or long-term trajectory." },
    { type: "p", text: "Every entry begins as a Situation. After working through Level 1 of the Compass—clarifying the true opportunity or obstacle, examining mindset, and envisioning an ideal outcome—you may discover that what you're facing is not just something to build, but something that changes you." },
    { type: "p", text: "That is when promotion becomes available." },
    { type: "p", text: "A Transformation is appropriate when:" },
    { type: "ul", items: ["The change affects multiple life roles", "It requires sustained effort across time", "It reorganizes priorities, systems, or relationships", "It reflects a meaningful shift in how you operate"] },
    { type: "p", text: "Structurally, a Transformation can contain multiple Wants. Each Want may contain multiple Situations. This allows complex, long-term change to be organized without losing clarity at the ground level." },
    { type: "p", text: "But even the most significant shifts begin as Situations." },
  ],
};
