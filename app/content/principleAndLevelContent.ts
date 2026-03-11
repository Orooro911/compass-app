/**
 * Copy for Principles (P1–P9) and Levels inside each role's pyramid on the Compass.
 * Each principle has Overview and In Practice tabs; Apply is the user-editable tab (in the UI only).
 *
 * Keys: "Role-P1" … "Role-P9" for principles; "Role-0" … "Role-4" for levels (0 = Level 1 Foundation).
 * Edit only the text strings.
 */

export type PrincipleContent = {
  title: string;
  overview: string;
  inPractice: string;
};

const DEFAULT_IN_PRACTICE = "Reflect on how this principle applies to your situation. What would it look like to embody it? What might get in the way?";

export const PRINCIPLE_CONTENT: Record<string, PrincipleContent> = {
  "Achiever-P1": { title: "Achiever Principle 1: Evaluate Opportunities and Obstacles", overview: "Evaluate what's fueling or blocking momentum. Act to overcome obstacles with self-discipline.", inPractice: DEFAULT_IN_PRACTICE },
  "Achiever-P2": { title: "Achiever Principle 2: Understand Style and Mindset", overview: "Understand how beliefs drive performance. Act to strengthen focus and discipline under pressure.", inPractice: DEFAULT_IN_PRACTICE },
  "Achiever-P3": { title: "Achiever Principle 3: Envision an Ideal Future", overview: "Envision the future you want to build. Act with determination to turn vision into reality.", inPractice: DEFAULT_IN_PRACTICE },
  "Achiever-P4": { title: "Achiever Principle 4: Set Measurable Objectives", overview: "Sees the markers that show real advancement, and acts with discipline to reach them with consistency.", inPractice: DEFAULT_IN_PRACTICE },
  "Achiever-P5": { title: "Achiever Principle 5: Prioritize What Matters", overview: "Sees where energy creates progress or waste, and acts with discipline to protect focus on the highest-value actions.", inPractice: DEFAULT_IN_PRACTICE },
  "Achiever-P6": { title: "Achiever Principle 6: Build Effective Systems", overview: "Sees which routines sustain focus and energy, and acts to refine them for steady growth.", inPractice: DEFAULT_IN_PRACTICE },
  "Achiever-P7": { title: "Achiever Principle 7: Invest in Personal Development", overview: "Sees how new growth fuels progress, and acts with discipline to develop themselves and others.", inPractice: DEFAULT_IN_PRACTICE },
  "Achiever-P8": { title: "Achiever Principle 8: Engage with Collaborators", overview: "Sees how collaboration sharpens quality and reach, and acts to invite feedback and refine what's being built.", inPractice: DEFAULT_IN_PRACTICE },
  "Achiever-P9": { title: "Achiever Principle 9: Maintain a Laser Focus on Execution", overview: "Sees the gap between plan and outcome, and acts with urgency and precision to close it.", inPractice: DEFAULT_IN_PRACTICE },
  "Leader-P1": { title: "Leader Principle 1: Evaluate Opportunities and Obstacles", overview: "Look ahead to anticipate challenges and openings. Act to guide others toward a better way forward.", inPractice: DEFAULT_IN_PRACTICE },
  "Leader-P2": { title: "Leader Principle 2: Understand Style and Mindset", overview: "Understand how attitudes shape direction. Act to model the right mindset for the path ahead.", inPractice: DEFAULT_IN_PRACTICE },
  "Leader-P3": { title: "Leader Principle 3: Envision an Ideal Future", overview: "Envision what's possible beyond the present. Act to paint a clear picture that inspires others to believe in it.", inPractice: DEFAULT_IN_PRACTICE },
  "Leader-P4": { title: "Leader Principle 4: Set Measurable Objectives", overview: "Sees which aims best express an established vision, and acts to define clear markers that focus and unify effort.", inPractice: DEFAULT_IN_PRACTICE },
  "Leader-P5": { title: "Leader Principle 5: Prioritize What Matters", overview: "Sees which current priorities help or hinder key outcomes, and acts to eliminate drag and focus energy where it matters most.", inPractice: DEFAULT_IN_PRACTICE },
  "Leader-P6": { title: "Leader Principle 6: Build Effective Systems", overview: "Sees where structure or rhythm can strengthen progress, and acts to design systems that make success repeatable.", inPractice: DEFAULT_IN_PRACTICE },
  "Leader-P7": { title: "Leader Principle 7: Invest in Personal Development", overview: "Sees where growth will strengthen the path ahead, and acts to learn, improve, and model the same for others.", inPractice: DEFAULT_IN_PRACTICE },
  "Leader-P8": { title: "Leader Principle 8: Engage with Collaborators", overview: "Sees where alignment can expand, and acts to rally, inform, inspire, and recruit others to take part.", inPractice: DEFAULT_IN_PRACTICE },
  "Leader-P9": { title: "Leader Principle 9: Maintain a Laser Focus on Execution", overview: "Sees where momentum is drifting, and acts to realign focus and drive completion with clarity and consistency.", inPractice: DEFAULT_IN_PRACTICE },
  "Follower-P1": { title: "Follower Principle 1: Evaluate Opportunities and Obstacles", overview: "Evaluate what's helping or holding things back. Act to share what you notice so progress stays steady.", inPractice: DEFAULT_IN_PRACTICE },
  "Follower-P2": { title: "Follower Principle 2: Understand Style and Mindset", overview: "Understand how outlook influences stability. Act to stay grounded and positive through change.", inPractice: DEFAULT_IN_PRACTICE },
  "Follower-P3": { title: "Follower Principle 3: Envision an Ideal Future", overview: "Envision the larger vision taking shape. Act to align your effort and growth in that direction.", inPractice: DEFAULT_IN_PRACTICE },
  "Follower-P4": { title: "Follower Principle 4: Set Measurable Objectives", overview: "Sees how their contribution connects to an established vision, and acts to stay accountable to its progress.", inPractice: DEFAULT_IN_PRACTICE },
  "Follower-P5": { title: "Follower Principle 5: Prioritize What Matters", overview: "Sees which efforts support or distract from established goals, and acts to stay centered on what most advances them.", inPractice: DEFAULT_IN_PRACTICE },
  "Follower-P6": { title: "Follower Principle 6: Build Effective Systems", overview: "Sees how processes shape consistency, and acts to uphold habits and patterns that keep things running smoothly.", inPractice: DEFAULT_IN_PRACTICE },
  "Follower-P7": { title: "Follower Principle 7: Invest in Personal Development", overview: "Sees chances to grow in skill or understanding, and acts to apply learning and development to the benefit of the whole.", inPractice: DEFAULT_IN_PRACTICE },
  "Follower-P8": { title: "Follower Principle 8: Engage with Collaborators", overview: "Sees how shared effort strengthens results, and acts to expand contribution through themselves and others.", inPractice: DEFAULT_IN_PRACTICE },
  "Follower-P9": { title: "Follower Principle 9: Maintain a Laser Focus on Execution", overview: "Sees what's needed to finish well, and acts to stay dependable and deliver on the commitments at hand.", inPractice: DEFAULT_IN_PRACTICE },
  "Partner-P1": { title: "Partner Principle 1: Evaluate Opportunities and Obstacles", overview: "Evaluate shifts or tensions between people or priorities. Act to recalibrate for shared progress.", inPractice: DEFAULT_IN_PRACTICE },
  "Partner-P2": { title: "Partner Principle 2: Understand Style and Mindset", overview: "Understand how shared mindset affects connection. Act to restore balance and trust when it drifts.", inPractice: DEFAULT_IN_PRACTICE },
  "Partner-P3": { title: "Partner Principle 3: Envision an Ideal Future", overview: "Envision a shared future that balances needs and aspirations. Act to co-create a path forward for mutual gain.", inPractice: DEFAULT_IN_PRACTICE },
  "Partner-P4": { title: "Partner Principle 4: Set Measurable Objectives", overview: "Sees shared aims that bring a vision to life, and acts to pursue them for mutual gain.", inPractice: DEFAULT_IN_PRACTICE },
  "Partner-P5": { title: "Partner Principle 5: Prioritize What Matters", overview: "Sees where competing priorities cause friction or alignment, and acts to rebalance commitments for mutual progress.", inPractice: DEFAULT_IN_PRACTICE },
  "Partner-P6": { title: "Partner Principle 6: Build Effective Systems", overview: "Sees where shared systems can ease friction, and acts to build simple, reliable ways to make things better.", inPractice: DEFAULT_IN_PRACTICE },
  "Partner-P7": { title: "Partner Principle 7: Invest in Personal Development", overview: "Sees how shared growth builds trust and results, and acts to learn and improve together.", inPractice: DEFAULT_IN_PRACTICE },
  "Partner-P8": { title: "Partner Principle 8: Engage with Collaborators", overview: "Sees how trust and openness amplify impact, and acts to communicate, coordinate, and expand shared growth together.", inPractice: DEFAULT_IN_PRACTICE },
  "Partner-P9": { title: "Partner Principle 9: Maintain a Laser Focus on Execution", overview: "Sees how shared effort sustains results, and acts to stay coordinated and accountable until a shared vision is complete.", inPractice: DEFAULT_IN_PRACTICE },
};

export function getPrincipleContent(role: string, principle: string): PrincipleContent {
  const key = `${role}-${principle}`;
  const c = PRINCIPLE_CONTENT[key];
  if (c) return c;
  return {
    title: `${principle} — ${role}`,
    overview: `Add content for ${principle} (${role}) here.`,
    inPractice: DEFAULT_IN_PRACTICE,
  };
}
