/**
 * Canonical “Role Perspective” short principle text for each role + P1–P9.
 *
 * This is the single source of truth for:
 * - The P1–P9 list shown in each Compass role lightbox (In Practice tab)
 * - The “Role Perspective” short description in each individual principle lightbox
 *
 * The Principle lightbox In Practice tab is intentionally NOT driven by this file.
 */

export type CompassRole = "Achiever" | "Leader" | "Partner" | "Follower";
export type PrincipleId = "P1" | "P2" | "P3" | "P4" | "P5" | "P6" | "P7" | "P8" | "P9";

export const ROLE_PRINCIPLES_SHORT: Record<CompassRole, Record<PrincipleId, string>> = {
  Achiever: {
    P1: "Sees what's fueling or blocking momentum, and acts to pursue opportunities and overcome obstacles with self-discipline.",
    P2: "Sees how beliefs drive performance, and acts to choose and strengthen mindset under pressure.",
    P3: "Sees a  clearly defined future that is theirs to build, and acts with personal determination to make it real.",
    P4: "Sees the markers that show real advancement, and acts with discipline to reach them with consistency.",
    P5: "Sees where energy creates progress or waste, and acts with discipline to protect focus on the highest-value actions.",
    P6: "Sees which personal routines and structures sustain focus and energy, and acts to build and refine them for steady, self-directed growth.",
    P7: "Sees how personal growth fuels pursuit, and acts with discipline to develop the skills, knowledge, and capacity needed to move forward.",
    P8: "Sees how collaboration sharpens quality and reach, and acts to invite feedback and refine what's being built.",
    P9: "Sees the gap between plan and outcome, and acts with urgency and precision to close it.",
  },
  Leader: {
    P1: "Sees ahead to anticipate challenges or openings, and acts to guide others toward a better way forward.",
    P2: "Sees how attitudes shape direction, and acts to model the right mindset for the path ahead.",
    P3: "Sees what's possible beyond the present, and acts to paint a clear picture that inspires others to believe in it.",
    P4: "Sees which aims best express an established vision, and acts to define clear markers that focus and unify effort.",
    P5: "Sees which priorities protect or undermine the direction set for others, and acts to eliminate drag and keep collective energy focused on what advances it most.",
    P6: "Sees where structure or rhythm can strengthen progress, and acts to design systems that make success repeatable.",
    P7: "Sees where growth will strengthen the path ahead, and acts to learn, improve, and model the same for others.",
    P8: "Sees where alignment can expand, and acts to rally, inform, inspire, and recruit others to take part.",
    P9: "Sees where momentum is drifting across the people and priorities they lead, and acts to realign focus and drive completion with clarity and consistency.",
  },
  Partner: {
    P1: "Sees the obstacles and opportunities that are moving the partnership — honestly and from both sides — and acts to name and address them together before anything else can be built.",
    P2: "Sees how each person's mindset and style is shaping what they see and how they're responding, and acts to establish a shared lens that serves the partnership rather than just one side of it.",
    P3: "Sees a shared future that balances both people's needs and aspirations, and acts to co-create a path forward that both are genuinely committed to.",
    P4: "Sees the specific objectives that translate shared vision into measurable progress, and acts to define and commit to them together with clear mutual accountability.",
    P5: "Sees where competing priorities are pulling the partnership in different directions, and acts to rebalance commitments so shared progress remains the center.",
    P6: "Sees where shared structures and rhythms can sustain the partnership, and acts to build reliable systems that both parties own and operate within together.",
    P7: "Sees how shared growth builds trust and results, and acts to learn and improve together.",
    P8: "Sees where the partnership can expand its reach and impact, and acts to bring others into the shared effort in ways that strengthen rather than dilute what's been built.",
    P9: "Sees how shared effort sustains results, and acts to stay coordinated and accountable until a shared vision is complete.",
  },
  Follower: {
    P1: "Sees the obstacles and opportunities affecting the larger effort they're part of, and acts to surface what they notice clearly so those leading and partnering can respond with better information.",
    P2: "Sees how their own outlook and attitude are affecting the effort they're part of, and acts to choose a mindset that strengthens their contribution and supports the direction being set.",
    P3: "Sees the larger vision taking shape, and acts to align their effort and growth in that direction.",
    P4: "Sees how their contribution connects to an established vision, and acts to stay accountable to its progress.",
    P5: "Sees which efforts support or distract from established goals, and acts to stay centered on what most advances the direction they've committed to.",
    P6: "Sees how processes shape consistency, and acts to uphold habits and patterns that keep things running smoothly.",
    P7: "Sees chances to grow in skill or understanding, and acts to apply learning and development to the benefit of the whole.",
    P8: "Sees how their full presence and contribution strengthens the collective effort, and acts to show up completely and encourage the same in those around them.",
    P9: "Sees what's needed to finish well, and acts to stay dependable and deliver on the commitments at hand.",
  },
};

