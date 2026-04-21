"use client";

import { useState, useEffect, useRef, useCallback, type ReactNode } from "react";
import { ACHIEVER_OVERVIEW, ACHIEVER_IN_PRACTICE } from "./content/achieverRoleContent";
import { FOLLOWER_IN_PRACTICE, FOLLOWER_OVERVIEW } from "./content/followerRoleContent";
import { LEADER_IN_PRACTICE, LEADER_OVERVIEW } from "./content/leaderRoleContent";
import { PARTNER_IN_PRACTICE, PARTNER_OVERVIEW } from "./content/partnerRoleContent";
import { COMPASS_FRAMEWORK } from "./content/compassFrameworkContent";
import {
  getLevelInPracticeBlocks,
  getLevelOverviewBlocks,
  getLevelPerspective,
  getPrincipleContent,
  PRINCIPLE_IN_ACTION_PROMPT_BLOCKS,
  LEVEL_NAMES,
  levelToFirstPrinciple,
  PRINCIPLE_DISPLAY_NAMES,
  PRINCIPLE_IDS,
  principleToLevelIndex,
  ROLE_NAMES,
} from "./content/principleAndLevelContent";
import { renderBlocksToInline } from "./content/renderBlocks";
import { OnboardingProgressPreviewWithVariant } from "./dashboard/OnboardingProgressPreview";

type Role = "Achiever" | "Leader" | "Follower" | "Partner";

const ROLE_ANGLE: Record<Role, number> = {
  Achiever: 0,
  Leader: -90,
  Follower: 180,
  Partner: 90,
};

// Choose the angle equivalent to target that is within ±180° of current for shortest rotation
function shortestPathAngle(currentDeg: number, targetDeg: number): number {
  let delta = targetDeg - currentDeg;
  while (delta > 180) delta -= 360;
  while (delta < -180) delta += 360;
  return currentDeg + delta;
}

// Title and short description for each role lightbox (same structure as principle/level lightboxes).
const ROLE_TITLE_AND_SHORT: Record<Role, { title: string; shortDescription: string }> = {
  Achiever: { title: "Responsibility of the Achiever", shortDescription: "The posture of personal clarity, ownership, and pursuit." },
  Leader: { title: "Responsibility of the Leader", shortDescription: "The posture of vision, direction, and guidance for others." },
  Partner: { title: "Responsibility of the Partner", shortDescription: "The posture of trust, collaboration, and shared progress." },
  Follower: { title: "Responsibility of the Follower", shortDescription: "The posture of learning, support, and strengthening existing systems." },
};

// Body content for Leader, Partner, Follower (Achiever uses ACHIEVER_OVERVIEW / ACHIEVER_IN_PRACTICE).
const ROLE_LIGHTBOX: Record<Exclude<Role, "Achiever">, { body: ReactNode }> = {
  Leader: {
    body: (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", alignItems: "start", fontSize: 17, lineHeight: 1.5, marginBottom: -4 }}>
        <div>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.45 }}>The Leader role exists to shape clarity—not just for ourselves, but for others.</p>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.45 }}>That clarity doesn&apos;t come from control. It comes from vision—the willingness to look ahead, hold the long arc in view, and help people align around where we&apos;re going and why it matters.</p>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.45 }}>The Leader sits East on the Compass—the direction of illumination and beginnings. That&apos;s what this role offers: the ability to bring light to the path. Not by knowing everything, but by seeing early, holding steady, and helping others move with confidence.</p>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.45 }}>We don&apos;t need a title to lead. Leadership isn&apos;t about being in charge—it&apos;s about carrying the weight of orientation on behalf of others.</p>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.45 }}>That weight is real. It includes holding ambiguity, modeling consistency, and naming what others aren&apos;t ready to say. The Leader role asks: Am I holding this role as it&apos;s meant to be held? Am I shaping clarity where it&apos;s needed most?</p>
        </div>
        <div>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.45 }}>When this role is lived with intention, things begin to organize. Vision strengthens. Momentum becomes clear. When it is neglected—when we drift, avoid, or defer—others feel that too. Rhythm fades. Energy fragments.</p>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.45 }}>When clarity is missing, step forward. Use the Leader lens. Create coherence.</p>
          <p style={{ margin: 0, lineHeight: 1.45 }}>The responsibility of the Leader isn&apos;t just to go first—it&apos;s to make it easier for others to grow, contribute, and lead in return.</p>
        </div>
      </div>
    ),
  },
  Follower: {
    body: (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", alignItems: "start", fontSize: 17, lineHeight: 1.5, marginBottom: -4 }}>
        <div>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.45 }}>Of all the Compass roles, the Follower is often the most misunderstood.</p>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.45 }}>The Follower role is where we align ourselves with something meaningful, even when we&apos;re not the one setting the direction. It&apos;s where we learn, support, adapt, and contribute—not passively, but with grounded intention.</p>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.45 }}>The Follower sits South on the Compass—the direction of grounding and support. That&apos;s what this role offers: a space to root. A posture of learning.</p>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.45 }}>We follow in more ways than we often recognize: when we lean into mentorship, support a partner&apos;s dream, walk beside a child through a tough season. Good followers don&apos;t disappear—they amplify. They give shape and rhythm to what matters.</p>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.45 }}>Whether we&apos;re a teammate, student, collaborator, or caregiver, the Follower lens helps us ask: Am I supporting what matters most here? Am I showing up in a way that strengthens the whole?</p>
        </div>
        <div>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.45 }}>When we resist this role, it shows. We grow impatient. We withdraw. We withhold our gifts—or worse, our presence. But when we hold it well, something steady comes online. We become a source of gravity. Of trust. Of momentum that doesn&apos;t burn out.</p>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.45 }}>The Follower role often shapes us the most. By following well, we learn to listen more deeply. We practice letting go. We develop strength without ego.</p>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.45 }}>When life invites us to contribute—not by steering, but by strengthening—we use the Follower lens. We measure ourselves against the role. We choose to support something we believe in.</p>
          <p style={{ margin: 0, lineHeight: 1.45 }}>Because the Follower isn&apos;t a background role. It&apos;s a backbone. And the world needs more people who know how to follow well—with presence, clarity, and grace.</p>
        </div>
      </div>
    ),
  },
  Partner: {
    body: (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", alignItems: "start", fontSize: 17, lineHeight: 1.5 }}>
        <div>
          <p style={{ margin: "0 0 0.6rem", lineHeight: 1.5 }}>The Partner role is where synergy begins. It&apos;s where two (or more) people commit to moving forward together—each bringing presence, honesty, and effort to a shared goal, life, or experience.</p>
          <p style={{ margin: "0 0 0.6rem", lineHeight: 1.5 }}>The Partner sits West on the Compass by default—the direction of reflection, endurance, and deepening alignment.</p>
          <p style={{ margin: "0 0 0.6rem", lineHeight: 1.5 }}>This is the role that stabilizes and amplifies everything else. When it&apos;s strong, it creates resilience. When it&apos;s neglected, things that once felt aligned begin to fray.</p>
          <p style={{ margin: "0 0 0.6rem", lineHeight: 1.5 }}>We live this role in our closest relationships: in marriage, parenting, friendship, and business.</p>
          <p style={{ margin: "0 0 0.6rem", lineHeight: 1.5 }}>It shows up in creative collaborations, long-term commitments, and everyday agreements that only work when people bring their full selves with care.</p>
          <p style={{ margin: "0 0 0.6rem", lineHeight: 1.5 }}>It means being honest when something isn&apos;t working—and generous when someone else is struggling.</p>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.5 }}>Sometimes it means leading.</p>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.5 }}>Sometimes it means following.</p>
          <p style={{ margin: "0 0 0.6rem", lineHeight: 1.5 }}>But most of the time, it means staying engaged. Staying invested. Staying in the process, even when it&apos;s hard.</p>
          <p style={{ margin: "0 0 0.6rem", lineHeight: 1.5 }}>Whether we&apos;re a spouse, parent, collaborator, or friend, the Partner lens helps us ask:</p>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.5 }}>Am I showing up with honesty and care?</p>
          <p style={{ margin: 0, lineHeight: 1.5 }}>Am I carrying my share of the emotional weight?</p>
        </div>
        <div>
          <p style={{ margin: "0 0 0.6rem", lineHeight: 1.5 }}>But real partnership isn&apos;t just about shared goals.</p>
          <p style={{ margin: "0 0 0.6rem", lineHeight: 1.5 }}>It&apos;s about shared responsibility. It requires emotional presence—not just physical proximity.</p>
          <p style={{ margin: "0 0 0.6rem", lineHeight: 1.5 }}>Great partners don&apos;t just divide tasks. They multiply energy. They speak truth without blame. They listen without retreating.</p>
          <p style={{ margin: "0 0 0.6rem", lineHeight: 1.5 }}>They protect each other&apos;s growth—and hold each other accountable to the bigger thing they&apos;ve agreed to pursue.</p>
          <p style={{ margin: "0 0 0.6rem", lineHeight: 1.5 }}>When this role is neglected, communication breaks down. Assumptions grow. Resentment replaces clarity.</p>
          <p style={{ margin: "0 0 0.6rem", lineHeight: 1.5 }}>The bond that once created momentum begins to create drag.</p>
          <p style={{ margin: "0 0 0.6rem", lineHeight: 1.5 }}>But when we bring this role to life—through humility, presence, and clarity—something powerful happens.</p>
          <p style={{ margin: "0 0 0.4rem", lineHeight: 1.5 }}>Trust deepens. Collaboration sharpens.</p>
          <p style={{ margin: "0 0 0.6rem", lineHeight: 1.5 }}>Both people grow—not in spite of the relationship, but because of it.</p>
          <p style={{ margin: "0 0 0.6rem", lineHeight: 1.5 }}>Partnership isn&apos;t about always agreeing.</p>
          <p style={{ margin: "0 0 0.6rem", lineHeight: 1.5 }}>It&apos;s about always engaging.</p>
          <p style={{ margin: 0, lineHeight: 1.5 }}>And when that engagement is steady, the momentum created together becomes something neither person could have produced alone.</p>
        </div>
      </div>
    ),
  },
};

// Level content is in principleAndLevelContent.ts (LEVEL_PERSPECTIVE, LEVEL_OVERVIEW_BLOCKS, LEVEL_IN_PRACTICE_BLOCKS).

function frameworkProgressSubsteps(overviewRead: boolean, inPracticeRead: boolean): number {
  return (overviewRead ? 1 : 0) + (inPracticeRead ? 1 : 0);
}

function LightboxWithOverviewAndPractice({
  title,
  onClose,
  overviewContent,
  inPracticeContent,
  frameworkOverviewRead,
  onFrameworkOverviewReadChange,
  hideOverviewNextInstruction,
  onHideOverviewNextInstruction,
  frameworkInPracticeRead,
  onFrameworkInPracticeReadChange,
  hideInPracticeNextInstruction,
  onHideInPracticeNextInstruction,
  onOpenAchieverFromFrameworkOnboarding,
  maxWidth = 720,
  maxHeight = "85vh",
  initialTab = "overview",
}: {
  title: string;
  onClose: () => void;
  overviewContent: ReactNode;
  inPracticeContent?: ReactNode;
  frameworkOverviewRead: boolean;
  onFrameworkOverviewReadChange: (value: boolean) => void;
  hideOverviewNextInstruction: boolean;
  onHideOverviewNextInstruction: () => void;
  frameworkInPracticeRead: boolean;
  onFrameworkInPracticeReadChange: (value: boolean) => void;
  hideInPracticeNextInstruction: boolean;
  onHideInPracticeNextInstruction: () => void;
  /** Closes framework lightbox and opens the Achiever role panel. */
  onOpenAchieverFromFrameworkOnboarding: () => void;
  maxWidth?: number;
  maxHeight?: string | number;
  /** Tab to show when this lightbox instance mounts (remount via parent `key` when reopening). */
  initialTab?: "overview" | "in-practice";
}) {
  const [tab, setTab] = useState<"overview" | "in-practice">(initialTab);
  const inPracticeLocked = !frameworkOverviewRead;
  const contentScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inPracticeLocked && tab === "in-practice") {
      setTab("overview");
    }
  }, [inPracticeLocked, tab]);

  useEffect(() => {
    contentScrollRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [tab]);

  // After checking "I've read…", the next-step line mounts below the fold; scroll so it’s visible.
  // Runs after the tab scroll-to-top effect so switching tabs still ends at the right position when needed.
  useEffect(() => {
    const scroller = contentScrollRef.current;
    if (!scroller) return;
    const overviewNextVisible =
      tab === "overview" && frameworkOverviewRead && !hideOverviewNextInstruction;
    const inPracticeNextVisible =
      tab === "in-practice" && frameworkInPracticeRead && !hideInPracticeNextInstruction;
    if (!overviewNextVisible && !inPracticeNextVisible) return;
    requestAnimationFrame(() => {
      scroller.scrollTo({ top: scroller.scrollHeight, behavior: "smooth" });
    });
  }, [
    tab,
    frameworkOverviewRead,
    hideOverviewNextInstruction,
    frameworkInPracticeRead,
    hideInPracticeNextInstruction,
  ]);

  return (
    <Lightbox title={title} onClose={onClose} maxWidth={maxWidth} maxHeight={maxHeight}>
      <div>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginTop: -16, marginBottom: 6, borderBottom: "2px solid rgba(255,255,255,0.15)", paddingBottom: 6 }}>
          <div style={{ display: "flex", gap: 20 }}>
            <button
              type="button"
              onClick={() => {
                if (tab === "in-practice" && frameworkInPracticeRead && !hideInPracticeNextInstruction) {
                  onHideInPracticeNextInstruction();
                }
                setTab("overview");
              }}
              style={{
                background: tab === "overview" ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.22)",
                borderBottom: tab === "overview" ? "2px solid rgba(26,26,28,1)" : "1px solid rgba(255,255,255,0.22)",
                borderRadius: "10px 10px 0 0",
                color: tab === "overview" ? "#fff" : "rgba(255,255,255,0.72)",
                cursor: "pointer",
                fontSize: 16,
                fontWeight: tab === "overview" ? 700 : 600,
                padding: "7px 14px",
                marginBottom: -2,
              }}
            >
              Overview
            </button>
            <button
              type="button"
              onClick={() => {
                if (inPracticeLocked) return;
                if (!hideOverviewNextInstruction) onHideOverviewNextInstruction();
                setTab("in-practice");
              }}
              disabled={inPracticeLocked}
              aria-disabled={inPracticeLocked}
              title={inPracticeLocked ? "Complete Overview to unlock In Practice" : "In Practice"}
              style={{
                background: inPracticeLocked
                  ? "rgba(255,255,255,0.02)"
                  : tab === "in-practice"
                    ? "rgba(255,255,255,0.12)"
                    : "rgba(255,255,255,0.04)",
                border: inPracticeLocked ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(255,255,255,0.22)",
                borderBottom: tab === "in-practice" ? "2px solid rgba(26,26,28,1)" : inPracticeLocked ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(255,255,255,0.22)",
                borderRadius: "10px 10px 0 0",
                color: inPracticeLocked ? "rgba(255,255,255,0.45)" : tab === "in-practice" ? "#fff" : "rgba(255,255,255,0.72)",
                cursor: inPracticeLocked ? "not-allowed" : "pointer",
                fontSize: 16,
                fontWeight: tab === "in-practice" ? 700 : 600,
                padding: "7px 14px",
                marginBottom: -2,
              }}
            >
              {inPracticeLocked ? "🔒 In Practice" : "In Practice"}
            </button>
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "flex-start", minWidth: 0 }}>
            <OnboardingProgressPreviewWithVariant
              variant="inline"
              frameworkCompletedSubsteps={frameworkProgressSubsteps(frameworkOverviewRead, frameworkInPracticeRead)}
            />
          </div>
        </div>
        <div
          ref={contentScrollRef}
          style={{ padding: "0.5rem 0", height: "60vh", overflowY: "auto", color: "rgba(255,255,255,0.9)" }}
        >
          {tab === "overview" && (
            <>
              {overviewContent}
              <div style={{ marginTop: 14, marginBottom: 6 }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: "rgba(255,255,255,0.88)",
                    fontSize: 14.5,
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={frameworkOverviewRead}
                    onChange={(e) => onFrameworkOverviewReadChange(e.target.checked)}
                  />
                  I&apos;ve read the Overview.
                </label>
                {frameworkOverviewRead && !hideOverviewNextInstruction ? (
                  <p
                    style={{
                      margin: "10px 0 0",
                      fontSize: 17,
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.92)",
                      lineHeight: 1.45,
                    }}
                  >
                    Now review the In Practice tab above to continue your orientation.
                  </p>
                ) : null}
              </div>
            </>
          )}
          {tab === "in-practice" && (
            <>
              {inPracticeContent}
              <div style={{ marginTop: 14, marginBottom: 6 }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: "rgba(255,255,255,0.88)",
                    fontSize: 14.5,
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={frameworkInPracticeRead}
                    onChange={(e) => onFrameworkInPracticeReadChange(e.target.checked)}
                  />
                  I&apos;ve read the Compass Framework In Practice.
                </label>
                {frameworkInPracticeRead && !hideInPracticeNextInstruction ? (
                  <p
                    style={{
                      margin: "8px 0 0",
                      fontSize: 14,
                      color: "rgba(255,255,255,0.78)",
                      lineHeight: 1.45,
                    }}
                  >
                    Your next orientation step is the Achiever posture. Click the ⓘ icon next to Achiever at the top of the
                    Compass graphic — or{" "}
                    <button
                      type="button"
                      onClick={onOpenAchieverFromFrameworkOnboarding}
                      style={{
                        background: "none",
                        border: "none",
                        padding: 0,
                        color: "rgba(255,255,255,0.95)",
                        textDecoration: "underline",
                        cursor: "pointer",
                        fontSize: "inherit",
                        fontWeight: 600,
                      }}
                    >
                      click here
                    </button>{" "}
                    to open it now.
                  </p>
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>
    </Lightbox>
  );
}

const navLinkStyle = (active: boolean): React.CSSProperties => ({
  background: "none",
  border: "none",
  padding: 0,
  color: active ? "#fff" : "rgba(255,255,255,0.7)",
  fontWeight: active ? 700 : 400,
  cursor: "pointer",
  fontSize: 14,
});

function PrincipleLightboxWithTabs({
  title,
  onClose,
  role,
  principle,
  overviewShort,
  overviewContent,
  inPracticeContent,
  hasApplyTab,
  userContent,
  onUserContentChange,
  onNavigateToRole,
  onNavigateToLevel,
  onNavigateToPrinciple,
  onAddSituation,
  dbLastSavedAtMs,
}: {
  title: string;
  onClose: () => void;
  role: Role;
  principle: string;
  overviewShort: string;
  overviewContent: ReactNode;
  inPracticeContent: ReactNode;
  hasApplyTab: boolean;
  userContent: string;
  onUserContentChange: (value: string) => void;
  onNavigateToRole: (r: Role) => void;
  onNavigateToLevel: (levelIndex: number) => void;
  onNavigateToPrinciple: (p: string) => void;
  onAddSituation?: () => void;
  dbLastSavedAtMs?: number | null;
}) {
  const [tab, setTab] = useState<"overview" | "in-practice" | "apply">(hasApplyTab ? "apply" : "overview");
  const [overviewExpanded, setOverviewExpanded] = useState(false);
  const [inPracticeExpanded, setInPracticeExpanded] = useState(false);
  const [applyExpanded, setApplyExpanded] = useState(false);
  // Always show "In Action" so role-only contexts (e.g. Life Roles / Connections) still have a place to look.
  // When `hasApplyTab` is false, it renders read-only guidance (no editing).
  const tabs = [
    { id: "overview" as const, label: "Overview" },
    { id: "in-practice" as const, label: "In Practice" },
    { id: "apply" as const, label: "In Action" },
  ];
  const currentLevelIndex = principleToLevelIndex(principle);

  // P1 In Action (editable) needs two fields; we store them together as JSON in `userContent`.
  const [p1Obstacle, setP1Obstacle] = useState("");
  const [p1Opportunity, setP1Opportunity] = useState("");
  const [savedP1Obstacle, setSavedP1Obstacle] = useState("");
  const [savedP1Opportunity, setSavedP1Opportunity] = useState("");
  const [lastP1SavedAt, setLastP1SavedAt] = useState<number | null>(dbLastSavedAtMs ?? null);

  const p1IsDirty = p1Obstacle !== savedP1Obstacle || p1Opportunity !== savedP1Opportunity;
  const p1IsDirtyRef = useRef(false);
  useEffect(() => {
    p1IsDirtyRef.current = p1IsDirty;
  }, [p1IsDirty]);

  useEffect(() => {
    if (!(hasApplyTab && principle === "P1")) return;

    const raw = userContent ?? "";
    const trimmed = raw.trim();

    if (!trimmed) {
      setSavedP1Obstacle("");
      setSavedP1Opportunity("");
      if (!p1IsDirtyRef.current) {
        setP1Obstacle("");
        setP1Opportunity("");
      }
      return;
    }

    const tryParse = (s: string) => {
      try {
        return JSON.parse(s);
      } catch {
        return undefined;
      }
    };

    let obstacle = "";
    let opportunity = "";

    // Support: (1) the new `{ obstacle, opportunity }` JSON format
    // and (2) older/odd double-encoded cases by being defensive.
    let parsed: unknown = tryParse(trimmed);

    if (typeof parsed === "string") {
      const inner = parsed.trim();
      if (inner.startsWith("{") && inner.endsWith("}")) {
        parsed = tryParse(inner);
      }
    }

    const parsedObj = parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : null;
    const hasKeys = !!parsedObj && (Object.prototype.hasOwnProperty.call(parsedObj, "obstacle") || Object.prototype.hasOwnProperty.call(parsedObj, "opportunity"));

    if (parsedObj && hasKeys) {
      obstacle = typeof parsedObj.obstacle === "string" ? parsedObj.obstacle : "";
      opportunity = typeof parsedObj.opportunity === "string" ? parsedObj.opportunity : "";
    } else {
      // Back-compat: if older saves were a single textarea, treat it as the obstacle field.
      obstacle = trimmed;
      opportunity = "";
    }

    // Update the saved values always. Only overwrite the user's in-progress edits
    // when they don't currently have unsaved changes.
    setSavedP1Obstacle(obstacle);
    setSavedP1Opportunity(opportunity);
    if (!p1IsDirtyRef.current) {
      setP1Obstacle(obstacle);
      setP1Opportunity(opportunity);
    }

    // Persisted "last saved" comes from the outer component (Supabase `updated_at`).
    // Only update it when the user is not editing unsaved content.
    if (!p1IsDirtyRef.current) {
      setLastP1SavedAt(dbLastSavedAtMs ?? null);
    }
  }, [hasApplyTab, principle, userContent, dbLastSavedAtMs]);

  const persistP1Fields = (nextObstacle: string, nextOpportunity: string) => {
    onUserContentChange(JSON.stringify({ obstacle: nextObstacle, opportunity: nextOpportunity }));
  };

  const canSaveP1 =
    hasApplyTab &&
    principle === "P1" &&
    p1Obstacle.trim().length > 0 &&
    p1Opportunity.trim().length > 0 &&
    p1IsDirty;

  const p1ShouldWarnOnLeave = hasApplyTab && principle === "P1" && tab === "apply" && p1IsDirty;

  const attemptLeaveP1 = (proceed: () => void) => {
    if (!p1ShouldWarnOnLeave) {
      proceed();
      return;
    }

    const wantsToSave = window.confirm("You have unsaved changes in In Action. Save before leaving?");
    if (!wantsToSave) return;

    if (!canSaveP1) {
      window.alert("Please fill both fields (Obstacle * and Opportunity *) before saving.");
      return;
    }

    handleSaveP1();
    proceed();
  };

  const handleSaveP1 = () => {
    if (!canSaveP1) return;
    persistP1Fields(p1Obstacle, p1Opportunity);
    setSavedP1Obstacle(p1Obstacle);
    setSavedP1Opportunity(p1Opportunity);
    setLastP1SavedAt(Date.now());
  };

  const p1HasAnyInput = p1Obstacle.trim().length > 0 || p1Opportunity.trim().length > 0;

  return (
    <Lightbox
      title={title}
      onClose={() =>
        attemptLeaveP1(() => {
          onClose();
        })
      }
      maxWidth={720}
    >
      <div>
        <p style={{ margin: "0 0 0.35rem", fontSize: 19, fontWeight: 700, color: "#fff" }}>
          {role} Perspective:
        </p>
        <p style={{ margin: "0 0 1rem", fontSize: 18, lineHeight: 1.5, color: "rgba(255,255,255,0.98)", minHeight: "3em", fontWeight: 500 }}>
          {overviewShort}
        </p>
        <p style={{ margin: "0 0 0.5rem", fontSize: 15, fontWeight: 700, color: "rgba(255,255,255,0.75)" }}>
          Navigation:
        </p>
        <div style={{ marginBottom: 16, fontSize: 14, lineHeight: 1.8, color: "rgba(255,255,255,0.9)" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.25rem 0" }}>
            <span style={{ marginRight: 6 }}>Roles:</span>
            {ROLE_NAMES.map((r, i) => (
              <span key={r}>
                {i > 0 && " | "}
                <button type="button" style={navLinkStyle(role === r)} onClick={() => attemptLeaveP1(() => onNavigateToRole(r as Role))}>
                  {role === r ? `[${r}]` : r}
                </button>
              </span>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.25rem 0" }}>
            <span style={{ marginRight: 6 }}>Levels:</span>
            {LEVEL_NAMES.map((lev, i) => (
              <span key={lev}>
                {i > 0 && " | "}
                <button type="button" style={navLinkStyle(currentLevelIndex === i)} onClick={() => attemptLeaveP1(() => onNavigateToLevel(i))}>
                  {currentLevelIndex === i ? `[${lev}]` : lev}
                </button>
              </span>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.25rem 0" }}>
            <span style={{ marginRight: 6 }}>Principles:</span>
            {PRINCIPLE_IDS.map((p, i) => (
              <span key={p}>
                {i > 0 && " | "}
                <button type="button" style={navLinkStyle(principle === p)} onClick={() => attemptLeaveP1(() => onNavigateToPrinciple(p))}>
                  {principle === p ? `[${p}]` : p}
                </button>
              </span>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 12, marginBottom: 12 }}>
          <div style={{ display: "flex", gap: 20, marginBottom: 12, borderBottom: "2px solid rgba(255,255,255,0.15)", paddingBottom: 0 }}>
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  const nextTab = t.id;
                  if (nextTab !== "apply") {
                    attemptLeaveP1(() => {
                      setTab(nextTab);
                      setOverviewExpanded(false);
                      setInPracticeExpanded(false);
                      setApplyExpanded(false);
                    });
                  } else {
                    setTab(nextTab);
                    setOverviewExpanded(false);
                    setInPracticeExpanded(false);
                    setApplyExpanded(false);
                  }
                }}
                style={{
                  background: "none",
                  border: "none",
                  borderBottom: tab === t.id ? "3px solid white" : "3px solid transparent",
                  color: tab === t.id ? "#fff" : "rgba(255,255,255,0.65)",
                  cursor: "pointer",
                  fontSize: 17,
                  fontWeight: tab === t.id ? 700 : 600,
                  padding: "10px 0",
                  marginBottom: -2,
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div style={{ padding: "0.5rem 0", minHeight: 120, color: "rgba(255,255,255,0.9)" }}>
            {tab === "overview" && (
              <>
                <div
                  style={{
                    maxHeight: overviewExpanded ? "none" : "13.5rem",
                    overflow: overviewExpanded ? "visible" : "hidden",
                    transition: "max-height 0.25s ease-out",
                  }}
                >
                  {overviewContent}
                </div>
                {!overviewExpanded && (
                  <button
                    type="button"
                    onClick={() => setOverviewExpanded(true)}
                    style={{
                      display: "block",
                      width: "100%",
                      marginTop: 10,
                      padding: 4,
                      background: "none",
                      border: "none",
                      color: "rgba(255,255,255,0.8)",
                      fontSize: 14,
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    <span style={{ display: "block" }}>Show More</span>
                    <span style={{ display: "block", fontSize: 22, lineHeight: 1.2, marginTop: 2 }}>↓</span>
                  </button>
                )}
                {overviewExpanded && (
                  <button
                    type="button"
                    onClick={() => setOverviewExpanded(false)}
                    style={{
                      display: "block",
                      width: "100%",
                      marginTop: 10,
                      padding: 4,
                      background: "none",
                      border: "none",
                      color: "rgba(255,255,255,0.7)",
                      fontSize: 14,
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    <span style={{ display: "block" }}>Show Less</span>
                    <span style={{ display: "block", fontSize: 22, lineHeight: 1.2, marginTop: 2 }}>↑</span>
                  </button>
                )}
              </>
            )}
            {tab === "in-practice" && (
              <>
                <div
                  style={{
                    maxHeight: inPracticeExpanded ? "none" : "13.5rem",
                    overflow: inPracticeExpanded ? "visible" : "hidden",
                    transition: "max-height 0.25s ease-out",
                  }}
                >
                  {inPracticeContent}
                </div>
                {!inPracticeExpanded && (
                  <button
                    type="button"
                    onClick={() => setInPracticeExpanded(true)}
                    style={{
                      display: "block",
                      width: "100%",
                      marginTop: 10,
                      padding: 4,
                      background: "none",
                      border: "none",
                      color: "rgba(255,255,255,0.8)",
                      fontSize: 14,
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    <span style={{ display: "block" }}>Show More</span>
                    <span style={{ display: "block", fontSize: 22, lineHeight: 1.2, marginTop: 2 }}>↓</span>
                  </button>
                )}
                {inPracticeExpanded && (
                  <button
                    type="button"
                    onClick={() => setInPracticeExpanded(false)}
                    style={{
                      display: "block",
                      width: "100%",
                      marginTop: 10,
                      padding: 4,
                      background: "none",
                      border: "none",
                      color: "rgba(255,255,255,0.7)",
                      fontSize: 14,
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    <span style={{ display: "block" }}>Show Less</span>
                    <span style={{ display: "block", fontSize: 22, lineHeight: 1.2, marginTop: 2 }}>↑</span>
                  </button>
                )}
              </>
            )}
            {tab === "apply" && (
              <>
                <div
                  style={{
                    maxHeight:
                      applyExpanded
                        ? "none"
                        : hasApplyTab && principle === "P1"
                          ? "20rem"
                          : "13.5rem",
                    overflow: applyExpanded ? "visible" : "hidden",
                    transition: "max-height 0.25s ease-out",
                  }}
                >
                  {hasApplyTab && principle === "P1" ? (
                    <div>
                      {!p1HasAnyInput && (
                        <>
                          <p style={{ margin: "0 0 0.75rem", lineHeight: 1.6, fontSize: 15 }}>
                            Every meaningful situation contains both an obstacle and an opportunity. Name both — not one or the other.
                          </p>
                          <p style={{ margin: "0 0 0.75rem", lineHeight: 1.6, fontSize: 15 }}>
                            Naming only the obstacle keeps you mired in the problem. Naming only the opportunity blinds you to what&apos;s in the way. Seeing
                            both honestly at the same time is what makes intentional progress possible.
                          </p>

                          <p style={{ margin: "0 0 0.5rem", lineHeight: 1.6, fontSize: 15, fontWeight: 700, color: "rgba(255,255,255,0.95)" }}>How to name them well:</p>
                          <ul style={{ margin: "0 0 0.75rem", paddingLeft: "1.2rem", lineHeight: 1.5, color: "rgba(255,255,255,0.92)" }}>
                            <li style={{ marginBottom: 6 }}>
                              State each one as a simple fact — not a story, not a judgment, not an explanation.
                            </li>
                            <li style={{ marginBottom: 6 }}>Use as few words as possible — clarity matters more than completeness.</li>
                            <li style={{ marginBottom: 6 }}>
                              Go as deep as the moment honestly allows — surface observations are a starting point, not a destination.
                            </li>
                          </ul>

                          <p style={{ margin: "0 0 1rem", lineHeight: 1.6, fontSize: 15 }}>
                            You don&apos;t need to get this perfect. Future exercises will prompt you to revisit and refine both as your understanding of the
                            situation deepens.
                          </p>
                        </>
                      )}

                      <p style={{ margin: "0 0 0.15rem", lineHeight: 1.6, fontSize: 15, fontWeight: 700 }}>
                        Obstacle <span style={{ color: "rgba(255,255,255,0.9)" }}>*</span>
                      </p>
                      <p style={{ margin: "0 0 0.4rem", lineHeight: 1.6, fontSize: 15, color: "rgba(255,255,255,0.92)" }}>
                        What is genuinely in the way? Name the real constraint, not the surface frustration.
                      </p>
                      <textarea
                        value={p1Obstacle}
                        onChange={(e) => {
                          const next = e.target.value;
                          setP1Obstacle(next);
                        }}
                        placeholder="Type the real constraint (not the surface frustration)…"
                        style={{
                          width: "100%",
                          minHeight: 18,
                          padding: 8,
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.2)",
                          borderRadius: 8,
                          color: "#fff",
                          fontSize: 14,
                          lineHeight: 1.4,
                          resize: "none",
                          overflowY: "auto",
                        }}
                      />

                      <div style={{ height: 4 }} />

                      <p style={{ margin: "0 0 0.15rem", lineHeight: 1.6, fontSize: 15, fontWeight: 700 }}>
                        Opportunity <span style={{ color: "rgba(255,255,255,0.9)" }}>*</span>
                      </p>
                      <p style={{ margin: "0 0 0.4rem", lineHeight: 1.6, fontSize: 15, color: "rgba(255,255,255,0.92)" }}>
                        What is genuinely possible here? Name the real upside, not the optimistic hope.
                      </p>
                      <textarea
                        value={p1Opportunity}
                        onChange={(e) => {
                          const next = e.target.value;
                          setP1Opportunity(next);
                        }}
                        placeholder="Type the real upside (not the optimistic hope)…"
                        style={{
                          width: "100%",
                          minHeight: 18,
                          padding: 8,
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.2)",
                          borderRadius: 8,
                          color: "#fff",
                          fontSize: 14,
                          lineHeight: 1.4,
                          resize: "none",
                          overflowY: "auto",
                        }}
                      />

                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", marginTop: 10 }}>
                        <button
                          type="button"
                          onClick={handleSaveP1}
                          disabled={!canSaveP1}
                          style={{
                            width: 132,
                            padding: "7px 10px",
                            borderRadius: 10,
                            border: "1px solid rgba(255,255,255,0.2)",
                            background: canSaveP1 ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.05)",
                            color: canSaveP1 ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.45)",
                            cursor: canSaveP1 ? "pointer" : "not-allowed",
                            fontWeight: 700,
                            fontSize: 13.5,
                          }}
                        >
                          Save
                        </button>

                        <p style={{ margin: "8px 0 0", fontSize: 12.5, color: "rgba(255,255,255,0.65)", width: 132, textAlign: "left" }}>
                          Last saved:{" "}
                          {lastP1SavedAt ? new Date(lastP1SavedAt).toLocaleString() : "—"}
                        </p>
                      </div>

                      {applyExpanded && p1HasAnyInput && (
                        <>
                          <p style={{ margin: "0.85rem 0 0.75rem", lineHeight: 1.6, fontSize: 15 }}>
                            Every meaningful situation contains both an obstacle and an opportunity. Name both — not one or the other.
                          </p>
                          <p style={{ margin: "0 0 0.75rem", lineHeight: 1.6, fontSize: 15 }}>
                            Naming only the obstacle keeps you mired in the problem. Naming only the opportunity blinds you to what&apos;s in the way. Seeing
                            both honestly at the same time is what makes intentional progress possible.
                          </p>

                          <p style={{ margin: "0 0 0.5rem", lineHeight: 1.6, fontSize: 15, fontWeight: 700, color: "rgba(255,255,255,0.95)" }}>How to name them well:</p>
                          <ul style={{ margin: "0 0 0.75rem", paddingLeft: "1.2rem", lineHeight: 1.5, color: "rgba(255,255,255,0.92)" }}>
                            <li style={{ marginBottom: 6 }}>
                              State each one as a simple fact — not a story, not a judgment, not an explanation.
                            </li>
                            <li style={{ marginBottom: 6 }}>Use as few words as possible — clarity matters more than completeness.</li>
                            <li style={{ marginBottom: 6 }}>
                              Go as deep as the moment honestly allows — surface observations are a starting point, not a destination.
                            </li>
                          </ul>

                          <p style={{ margin: "0 0 1rem", lineHeight: 1.6, fontSize: 15 }}>
                            You don&apos;t need to get this perfect. Future exercises will prompt you to revisit and refine both as your understanding of the
                            situation deepens.
                          </p>
                        </>
                      )}

                    </div>
                  ) : (
                    <>
                      {PRINCIPLE_IN_ACTION_PROMPT_BLOCKS[principle] ? (
                        <div style={{ marginBottom: 12, color: "rgba(255,255,255,0.92)" }}>
                          {renderBlocksToInline(PRINCIPLE_IN_ACTION_PROMPT_BLOCKS[principle])}
                        </div>
                      ) : null}
                      {hasApplyTab ? (
                        <textarea
                          value={userContent}
                          onChange={(e) => onUserContentChange(e.target.value)}
                          placeholder="Add your notes, opportunities, obstacles, or action items here…"
                          style={{
                            width: "100%",
                            minHeight: 180,
                            padding: 12,
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.2)",
                            borderRadius: 8,
                            color: "#fff",
                            fontSize: 15,
                            lineHeight: 1.5,
                            resize: "vertical",
                          }}
                        />
                      ) : null}
                    </>
                  )}
                </div>

                {!applyExpanded && (
                  <button
                    type="button"
                    onClick={() => setApplyExpanded(true)}
                    style={{
                      display: "block",
                      width: "100%",
                      marginTop: 10,
                      padding: 4,
                      background: "none",
                      border: "none",
                      color: "rgba(255,255,255,0.8)",
                      fontSize: 14,
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    <span style={{ display: "block" }}>Show More</span>
                    <span style={{ display: "block", fontSize: 22, lineHeight: 1.2, marginTop: 2 }}>↓</span>
                  </button>
                )}

                {applyExpanded && (
                  <button
                    type="button"
                    onClick={() => setApplyExpanded(false)}
                    style={{
                      display: "block",
                      width: "100%",
                      marginTop: 10,
                      padding: 4,
                      background: "none",
                      border: "none",
                      color: "rgba(255,255,255,0.7)",
                      fontSize: 14,
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    <span style={{ display: "block" }}>Show Less</span>
                    <span style={{ display: "block", fontSize: 22, lineHeight: 1.2, marginTop: 2 }}>↑</span>
                  </button>
                )}

                {!hasApplyTab && principle === "P1" && onAddSituation ? (
                  <button
                    type="button"
                    onClick={onAddSituation}
                    style={{
                      display: "block",
                      width: "100%",
                      marginTop: 10,
                      padding: 0,
                      background: "none",
                      border: "none",
                      color: "rgba(255,255,255,0.95)",
                      textDecoration: "underline",
                      cursor: "pointer",
                      fontSize: 15,
                      fontWeight: 600,
                      textAlign: "left",
                    }}
                  >
                    Add a Situation
                  </button>
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>
    </Lightbox>
  );
}

function LevelLightboxWithTabs({
  title,
  onClose,
  role,
  levelIndex,
  perspectiveShort,
  overviewContent,
  inPracticeContent,
  onNavigateToRole,
  onNavigateToLevel,
  onNavigateToPrinciple,
}: {
  title: string;
  onClose: () => void;
  role: Role;
  levelIndex: number;
  perspectiveShort: string;
  overviewContent: ReactNode;
  inPracticeContent: ReactNode;
  onNavigateToRole: (r: Role) => void;
  onNavigateToLevel: (idx: number) => void;
  onNavigateToPrinciple: (p: string) => void;
}) {
  const [tab, setTab] = useState<"overview" | "in-practice">("overview");
  const [overviewExpanded, setOverviewExpanded] = useState(false);
  const [inPracticeExpanded, setInPracticeExpanded] = useState(false);
  const highlightedPrinciple = levelToFirstPrinciple(levelIndex);
  return (
    <Lightbox title={title} onClose={onClose} maxWidth={720}>
      <div>
        <p style={{ margin: "0 0 0.35rem", fontSize: 19, fontWeight: 700, color: "#fff" }}>
          {role} Perspective:
        </p>
        <p style={{ margin: "0 0 1rem", fontSize: 18, lineHeight: 1.5, color: "rgba(255,255,255,0.98)", minHeight: "3em", fontWeight: 500 }}>
          {perspectiveShort}
        </p>
        <p style={{ margin: "0 0 0.5rem", fontSize: 15, fontWeight: 700, color: "rgba(255,255,255,0.75)" }}>
          Navigation:
        </p>
        <div style={{ marginBottom: 16, fontSize: 14, lineHeight: 1.8, color: "rgba(255,255,255,0.9)" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.25rem 0" }}>
            <span style={{ marginRight: 6 }}>Roles:</span>
            {ROLE_NAMES.map((r, i) => (
              <span key={r}>
                {i > 0 && " | "}
                <button type="button" style={navLinkStyle(role === r)} onClick={() => onNavigateToRole(r as Role)}>
                  {role === r ? `[${r}]` : r}
                </button>
              </span>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.25rem 0" }}>
            <span style={{ marginRight: 6 }}>Levels:</span>
            {LEVEL_NAMES.map((lev, i) => (
              <span key={lev}>
                {i > 0 && " | "}
                <button type="button" style={navLinkStyle(levelIndex === i)} onClick={() => onNavigateToLevel(i)}>
                  {levelIndex === i ? `[${lev}]` : lev}
                </button>
              </span>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.25rem 0" }}>
            <span style={{ marginRight: 6 }}>Principles:</span>
            {PRINCIPLE_IDS.map((p, i) => (
              <span key={p}>
                {i > 0 && " | "}
                <button type="button" style={navLinkStyle(highlightedPrinciple === p)} onClick={() => onNavigateToPrinciple(p)}>
                  {highlightedPrinciple === p ? `[${p}]` : p}
                </button>
              </span>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 12, marginBottom: 12 }}>
          <div style={{ display: "flex", gap: 20, marginBottom: 12, borderBottom: "2px solid rgba(255,255,255,0.15)", paddingBottom: 0 }}>
            {[
              { id: "overview" as const, label: "Overview" },
              { id: "in-practice" as const, label: "In Practice" },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setTab(t.id);
                  setOverviewExpanded(false);
                  setInPracticeExpanded(false);
                }}
                style={{
                  background: "none",
                  border: "none",
                  borderBottom: tab === t.id ? "3px solid white" : "3px solid transparent",
                  color: tab === t.id ? "#fff" : "rgba(255,255,255,0.65)",
                  cursor: "pointer",
                  fontSize: 17,
                  fontWeight: tab === t.id ? 700 : 600,
                  padding: "10px 0",
                  marginBottom: -2,
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div style={{ padding: "0.5rem 0", minHeight: 120, color: "rgba(255,255,255,0.9)" }}>
            {tab === "overview" && (
              <>
                <div
                  style={{
                    maxHeight: overviewExpanded ? "none" : "13.5rem",
                    overflow: overviewExpanded ? "visible" : "hidden",
                    transition: "max-height 0.25s ease-out",
                  }}
                >
                  {overviewContent}
                </div>
                {!overviewExpanded && (
                  <button
                    type="button"
                    onClick={() => setOverviewExpanded(true)}
                    style={{
                      display: "block",
                      width: "100%",
                      marginTop: 10,
                      padding: 4,
                      background: "none",
                      border: "none",
                      color: "rgba(255,255,255,0.8)",
                      fontSize: 14,
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    <span style={{ display: "block" }}>Show More</span>
                    <span style={{ display: "block", fontSize: 22, lineHeight: 1.2, marginTop: 2 }}>↓</span>
                  </button>
                )}
                {overviewExpanded && (
                  <button
                    type="button"
                    onClick={() => setOverviewExpanded(false)}
                    style={{
                      display: "block",
                      width: "100%",
                      marginTop: 10,
                      padding: 4,
                      background: "none",
                      border: "none",
                      color: "rgba(255,255,255,0.7)",
                      fontSize: 14,
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    <span style={{ display: "block" }}>Show Less</span>
                    <span style={{ display: "block", fontSize: 22, lineHeight: 1.2, marginTop: 2 }}>↑</span>
                  </button>
                )}
              </>
            )}
            {tab === "in-practice" && (
              <>
                <div
                  style={{
                    maxHeight: inPracticeExpanded ? "none" : "13.5rem",
                    overflow: inPracticeExpanded ? "visible" : "hidden",
                    transition: "max-height 0.25s ease-out",
                  }}
                >
                  {inPracticeContent}
                </div>
                {!inPracticeExpanded && (
                  <button
                    type="button"
                    onClick={() => setInPracticeExpanded(true)}
                    style={{
                      display: "block",
                      width: "100%",
                      marginTop: 10,
                      padding: 4,
                      background: "none",
                      border: "none",
                      color: "rgba(255,255,255,0.8)",
                      fontSize: 14,
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    <span style={{ display: "block" }}>Show More</span>
                    <span style={{ display: "block", fontSize: 22, lineHeight: 1.2, marginTop: 2 }}>↓</span>
                  </button>
                )}
                {inPracticeExpanded && (
                  <button
                    type="button"
                    onClick={() => setInPracticeExpanded(false)}
                    style={{
                      display: "block",
                      width: "100%",
                      marginTop: 10,
                      padding: 4,
                      background: "none",
                      border: "none",
                      color: "rgba(255,255,255,0.7)",
                      fontSize: 14,
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    <span style={{ display: "block" }}>Show Less</span>
                    <span style={{ display: "block", fontSize: 22, lineHeight: 1.2, marginTop: 2 }}>↑</span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Lightbox>
  );
}

function RoleLightboxWithTabs({
  title,
  onClose,
  role,
  shortDescription,
  overviewContent,
  inPracticeContent,
  onNavigateToRole,
  onNavigateToLevel,
  onNavigateToPrinciple,
}: {
  title: string;
  onClose: () => void;
  role: Role;
  shortDescription: string;
  overviewContent: ReactNode;
  inPracticeContent: ReactNode;
  onNavigateToRole: (r: Role) => void;
  onNavigateToLevel: (levelIndex: number) => void;
  onNavigateToPrinciple: (p: string) => void;
}) {
  const [tab, setTab] = useState<"overview" | "in-practice">("overview");
  const [overviewExpanded, setOverviewExpanded] = useState(false);
  const [inPracticeExpanded, setInPracticeExpanded] = useState(false);
  return (
    <Lightbox title={title} onClose={onClose} maxWidth={720}>
      <div>
        <p style={{ margin: "0 0 1rem", fontSize: 18, lineHeight: 1.5, color: "rgba(255,255,255,0.98)", minHeight: "3em", fontWeight: 500 }}>
          {shortDescription}
        </p>
        <p style={{ margin: "0 0 0.5rem", fontSize: 15, fontWeight: 700, color: "rgba(255,255,255,0.75)" }}>
          Navigation:
        </p>
        <div style={{ marginBottom: 16, fontSize: 14, lineHeight: 1.8, color: "rgba(255,255,255,0.9)" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.25rem 0" }}>
            <span style={{ marginRight: 6 }}>Roles:</span>
            {ROLE_NAMES.map((r, i) => (
              <span key={r}>
                {i > 0 && " | "}
                <button type="button" style={navLinkStyle(role === r)} onClick={() => onNavigateToRole(r as Role)}>
                  {role === r ? `[${r}]` : r}
                </button>
              </span>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.25rem 0" }}>
            <span style={{ marginRight: 6 }}>Levels:</span>
            {LEVEL_NAMES.map((lev, i) => (
              <span key={lev}>
                {i > 0 && " | "}
                <button type="button" style={navLinkStyle(false)} onClick={() => onNavigateToLevel(i)}>
                  {lev}
                </button>
              </span>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.25rem 0" }}>
            <span style={{ marginRight: 6 }}>Principles:</span>
            {PRINCIPLE_IDS.map((p, i) => (
              <span key={p}>
                {i > 0 && " | "}
                <button type="button" style={navLinkStyle(false)} onClick={() => onNavigateToPrinciple(p)}>
                  {p}
                </button>
              </span>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 12, marginBottom: 12 }}>
          <div style={{ display: "flex", gap: 20, marginBottom: 12, borderBottom: "2px solid rgba(255,255,255,0.15)", paddingBottom: 0 }}>
            {[
              { id: "overview" as const, label: "Overview" },
              { id: "in-practice" as const, label: "In Practice" },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setTab(t.id);
                  setOverviewExpanded(false);
                  setInPracticeExpanded(false);
                }}
                style={{
                  background: "none",
                  border: "none",
                  borderBottom: tab === t.id ? "3px solid white" : "3px solid transparent",
                  color: tab === t.id ? "#fff" : "rgba(255,255,255,0.65)",
                  cursor: "pointer",
                  fontSize: 17,
                  fontWeight: tab === t.id ? 700 : 600,
                  padding: "10px 0",
                  marginBottom: -2,
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div style={{ padding: "0.5rem 0", minHeight: 120, color: "rgba(255,255,255,0.9)" }}>
            {tab === "overview" && (
              <>
                <div
                  style={{
                    maxHeight: overviewExpanded ? "none" : "13.5rem",
                    overflow: overviewExpanded ? "visible" : "hidden",
                    transition: "max-height 0.25s ease-out",
                  }}
                >
                  {overviewContent}
                </div>
                {!overviewExpanded && (
                  <button
                    type="button"
                    onClick={() => setOverviewExpanded(true)}
                    style={{
                      display: "block",
                      width: "100%",
                      marginTop: 10,
                      padding: 4,
                      background: "none",
                      border: "none",
                      color: "rgba(255,255,255,0.8)",
                      fontSize: 14,
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    <span style={{ display: "block" }}>Show More</span>
                    <span style={{ display: "block", fontSize: 22, lineHeight: 1.2, marginTop: 2 }}>↓</span>
                  </button>
                )}
                {overviewExpanded && (
                  <button
                    type="button"
                    onClick={() => setOverviewExpanded(false)}
                    style={{
                      display: "block",
                      width: "100%",
                      marginTop: 10,
                      padding: 4,
                      background: "none",
                      border: "none",
                      color: "rgba(255,255,255,0.7)",
                      fontSize: 14,
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    <span style={{ display: "block" }}>Show Less</span>
                    <span style={{ display: "block", fontSize: 22, lineHeight: 1.2, marginTop: 2 }}>↑</span>
                  </button>
                )}
              </>
            )}
            {tab === "in-practice" && (
              <>
                <div
                  style={{
                    maxHeight: inPracticeExpanded ? "none" : "13.5rem",
                    overflow: inPracticeExpanded ? "visible" : "hidden",
                    transition: "max-height 0.25s ease-out",
                  }}
                >
                  {inPracticeContent}
                </div>
                {!inPracticeExpanded && (
                  <button
                    type="button"
                    onClick={() => setInPracticeExpanded(true)}
                    style={{
                      display: "block",
                      width: "100%",
                      marginTop: 10,
                      padding: 4,
                      background: "none",
                      border: "none",
                      color: "rgba(255,255,255,0.8)",
                      fontSize: 14,
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    <span style={{ display: "block" }}>Show More</span>
                    <span style={{ display: "block", fontSize: 22, lineHeight: 1.2, marginTop: 2 }}>↓</span>
                  </button>
                )}
                {inPracticeExpanded && (
                  <button
                    type="button"
                    onClick={() => setInPracticeExpanded(false)}
                    style={{
                      display: "block",
                      width: "100%",
                      marginTop: 10,
                      padding: 4,
                      background: "none",
                      border: "none",
                      color: "rgba(255,255,255,0.7)",
                      fontSize: 14,
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    <span style={{ display: "block" }}>Show Less</span>
                    <span style={{ display: "block", fontSize: 22, lineHeight: 1.2, marginTop: 2 }}>↑</span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Lightbox>
  );
}

type CompassProps = {
  compact?: boolean;
  /** Active item (situation, want, or transformation) for principle content editing */
  activePrincipleItem?: { moduleId: string; name: string } | null;
  /** @deprecated Use activePrincipleItem with moduleId "situations" */
  activeSituation?: string | null;
  /** Principle content keyed by "moduleId|name|principle" */
  itemPrincipleContent?: Record<string, string>;
  /** @deprecated Use itemPrincipleContent */
  situationPrincipleContent?: Record<string, string>;
  onPrincipleContentChange?: (moduleId: string, name: string, principle: string, content: string) => void;
  /** @deprecated Use onPrincipleContentChange */
  onSituationPrincipleContentChange?: (situation: string, principle: string, content: string) => void;
  openPrincipleId?: string | null;
  onPrincipleLightboxClose?: () => void;
  /** Optional per-principle last-saved timestamp (typically Supabase `updated_at`) keyed by `${moduleId}|${name}|${principle}` */
  itemPrincipleUpdatedAt?: Record<string, string>;
  /** When this value increments, the Compass Framework info lightbox opens (e.g. from dashboard CTA). */
  openCompassFrameworkTrigger?: number;
  /** Tab to select when opening via `openCompassFrameworkTrigger` (Overview ⓘ always opens Overview). */
  openCompassFrameworkInitialTab?: "overview" | "in-practice";
  /** Called when the Principle lightbox wants to start adding a Situation. */
  onAddSituation?: () => void;
  /** Persisted onboarding checkpoint: true once user checks "I've read the Overview." */
  frameworkOverviewRead?: boolean;
  onFrameworkOverviewReadChange?: (value: boolean) => void;
  /** Hide "Now review In Practice..." after user leaves Overview once. */
  frameworkOverviewInstructionHidden?: boolean;
  onFrameworkOverviewInstructionHiddenChange?: (value: boolean) => void;
  /** Persisted: user checked "I've read the Compass Framework In Practice." */
  frameworkInPracticeRead?: boolean;
  onFrameworkInPracticeReadChange?: (value: boolean) => void;
  /** Hide Achiever next-step instruction after user leaves In Practice tab once. */
  frameworkInPracticeInstructionHidden?: boolean;
  onFrameworkInPracticeInstructionHiddenChange?: (value: boolean) => void;
  /** When true, opening role / principle / level lightboxes from the SVG is disabled (rotation + Compass Framework ⓘ still work). */
  navigationLocked?: boolean;
  /** Called when the user activates a graphic control that would open role / principle / level content but navigation is locked. */
  onNavigationLockedInteract?: () => void;
};

export default function Compass({
  compact = false,
  activePrincipleItem = null,
  activeSituation = null,
  itemPrincipleContent = {},
  situationPrincipleContent = {},
  itemPrincipleUpdatedAt = {},
  onPrincipleContentChange,
  onSituationPrincipleContentChange,
  openPrincipleId = null,
  onPrincipleLightboxClose,
  openCompassFrameworkTrigger,
  openCompassFrameworkInitialTab = "overview",
  onAddSituation,
  frameworkOverviewRead,
  onFrameworkOverviewReadChange,
  frameworkOverviewInstructionHidden,
  onFrameworkOverviewInstructionHiddenChange,
  frameworkInPracticeRead,
  onFrameworkInPracticeReadChange,
  frameworkInPracticeInstructionHidden,
  onFrameworkInPracticeInstructionHiddenChange,
  navigationLocked = false,
  onNavigationLockedInteract,
}: CompassProps) {
  const [frameworkOverviewReadLocal, setFrameworkOverviewReadLocal] = useState(false);
  const [frameworkOverviewInstructionHiddenLocal, setFrameworkOverviewInstructionHiddenLocal] = useState(false);
  const [frameworkInPracticeReadLocal, setFrameworkInPracticeReadLocal] = useState(false);
  const [frameworkInPracticeInstructionHiddenLocal, setFrameworkInPracticeInstructionHiddenLocal] = useState(false);
  const effectiveFrameworkOverviewRead = frameworkOverviewRead ?? frameworkOverviewReadLocal;
  const setEffectiveFrameworkOverviewRead = onFrameworkOverviewReadChange ?? setFrameworkOverviewReadLocal;
  const effectiveFrameworkOverviewInstructionHidden = frameworkOverviewInstructionHidden ?? frameworkOverviewInstructionHiddenLocal;
  const setEffectiveFrameworkOverviewInstructionHidden =
    onFrameworkOverviewInstructionHiddenChange ?? setFrameworkOverviewInstructionHiddenLocal;
  const effectiveFrameworkInPracticeRead = frameworkInPracticeRead ?? frameworkInPracticeReadLocal;
  const setEffectiveFrameworkInPracticeRead = onFrameworkInPracticeReadChange ?? setFrameworkInPracticeReadLocal;
  const effectiveFrameworkInPracticeInstructionHidden =
    frameworkInPracticeInstructionHidden ?? frameworkInPracticeInstructionHiddenLocal;
  const setEffectiveFrameworkInPracticeInstructionHidden =
    onFrameworkInPracticeInstructionHiddenChange ?? setFrameworkInPracticeInstructionHiddenLocal;

  const effectiveActive = activePrincipleItem ?? (activeSituation ? { moduleId: "situations" as const, name: activeSituation } : null);
  // `effectiveActive` is derived from props and may be recreated on every render
  // (e.g. when callers pass an inline object literal). Use a stable string key
  // so we don't reset the lightbox while the user is typing.
  const effectiveActiveKey = effectiveActive ? `${effectiveActive.moduleId}|${effectiveActive.name}` : null;
  const content = Object.keys(itemPrincipleContent).length > 0 ? itemPrincipleContent : situationPrincipleContent;
  const lookupContent = (principle: string) =>
    effectiveActive ? (content[`${effectiveActive.moduleId}|${effectiveActive.name}|${principle}`] ?? "") : "";
  const handleContentChange = effectiveActive && (onPrincipleContentChange ?? ((_m: string, n: string, p: string, v: string) => onSituationPrincipleContentChange?.(n, p, v)));
  const [rotation, setRotation] = useState(0);
  const [lightboxCompassTitle, setLightboxCompassTitle] = useState(false);
  const [lightboxRole, setLightboxRole] = useState<Role | null>(null);
  const [lightboxPrinciple, setLightboxPrinciple] = useState<{ role: Role; principle: string } | null>(null);
  const [lightboxLevel, setLightboxLevel] = useState<{ role: Role; levelIndex: number } | null>(null);
  const [frameworkLightboxKey, setFrameworkLightboxKey] = useState(0);
  const [frameworkLightboxInitialTab, setFrameworkLightboxInitialTab] = useState<"overview" | "in-practice">("overview");

  const openCompassFrameworkLightbox = useCallback((tab: "overview" | "in-practice") => {
    setFrameworkLightboxInitialTab(tab);
    setFrameworkLightboxKey((k) => k + 1);
    setLightboxRole(null);
    setLightboxPrinciple(null);
    setLightboxLevel(null);
    setLightboxCompassTitle(true);
  }, []);

  useEffect(() => {
    if (navigationLocked) return;
    if (openPrincipleId && effectiveActiveKey) {
      setLightboxCompassTitle(false);
      setLightboxRole(null);
      setLightboxLevel(null);
      setLightboxPrinciple({ role: "Achiever", principle: openPrincipleId });
    }
  }, [openPrincipleId, effectiveActiveKey, navigationLocked]);

  const openCompassFrameworkTriggerPrev = useRef(0);
  useEffect(() => {
    if (openCompassFrameworkTrigger != null && openCompassFrameworkTrigger > openCompassFrameworkTriggerPrev.current) {
      openCompassFrameworkTriggerPrev.current = openCompassFrameworkTrigger;
      openCompassFrameworkLightbox(openCompassFrameworkInitialTab);
    }
  }, [openCompassFrameworkTrigger, openCompassFrameworkInitialTab, openCompassFrameworkLightbox]);

  const openCompassTitleLightbox = () => {
    openCompassFrameworkLightbox("overview");
  };
  const openRoleLightbox = (role: Role) => {
    if (navigationLocked) {
      onNavigationLockedInteract?.();
      return;
    }
    setLightboxCompassTitle(false);
    setLightboxPrinciple(null);
    setLightboxLevel(null);
    setLightboxRole(role);
  };
  const openPrincipleLightbox = (role: Role, principle: string) => {
    if (navigationLocked) {
      onNavigationLockedInteract?.();
      return;
    }
    const targetAngle = ROLE_ANGLE[role];
    setRotation((current) => shortestPathAngle(current, targetAngle));
    setLightboxCompassTitle(false);
    setLightboxRole(null);
    setLightboxLevel(null);
    setLightboxPrinciple({ role, principle });
  };
  const openLevelLightbox = (role: Role, levelIndex: number) => {
    if (navigationLocked) {
      onNavigationLockedInteract?.();
      return;
    }
    const targetAngle = ROLE_ANGLE[role];
    setRotation((current) => shortestPathAngle(current, targetAngle));
    setLightboxCompassTitle(false);
    setLightboxRole(null);
    setLightboxPrinciple(null);
    setLightboxLevel({ role, levelIndex });
  };

  const handleRoleClick = (role: Role) => {
    const targetAngle = ROLE_ANGLE[role];
    setRotation((current) => shortestPathAngle(current, targetAngle));
  };

  // Level "i" icons: all positions fixed.
  const fixedNorthEastPositions: Record<string, { x: number; y: number }> = {
    "level-north-0": { x: 33.33583450317383, y: -74.1065444946289 },
    "level-north-1": { x: 25.697223663330078, y: -94.6097183227539 },
    "level-north-2": { x: 17.2623291015625, y: -115.89116668701172 },
    "level-north-3": { x: 9.535283088684082, y: -135.90589904785156 },
    "level-north-4": { x: 41.475440979003906, y: -53.97695541381836 },
    "level-east-0": { x: 52.59510040283203, y: 41.84819412231445 },
    "level-east-1": { x: 73.6377182006836, y: 33.86787414550781 },
    "level-east-2": { x: 94.69247436523438, y: 24.34634017944336 },
    "level-east-3": { x: 114.27848052978516, y: 18.035808563232422 },
    "level-east-4": { x: 135.71705627441406, y: 9.568385124206543 },
  };

  const getDefaultSouthWestPositions = (): Record<string, { x: number; y: number }> => ({
    "level-south-0": { x: -40.4945, y: 53.307 },
    "level-south-1": { x: -32.5065, y: 75.3658 },
    "level-south-2": { x: -24.825, y: 95.2807 },
    "level-south-3": { x: -17.9462, y: 114.69 },
    "level-south-4": { x: -9.4985, y: 136.087 },
    "level-west-0": { x: -54.244, y: -40.531 },
    "level-west-1": { x: -73.548, y: -33.574 },
    "level-west-2": { x: -95.019, y: -25.184 },
    "level-west-3": { x: -114.918, y: -16.721 },
    "level-west-4": { x: -135.883, y: -10.381 },
  });

  const levelIconPositions = { ...fixedNorthEastPositions, ...getDefaultSouthWestPositions() };

  const levelIdToRoleAndIndex = (id: string): { role: Role; levelIndex: number } => {
    if (id.startsWith("level-north-")) return { role: "Achiever", levelIndex: parseInt(id.slice(-1), 10) };
    if (id.startsWith("level-east-")) return { role: "Leader", levelIndex: parseInt(id.slice(-1), 10) };
    if (id.startsWith("level-south-")) return { role: "Follower", levelIndex: parseInt(id.slice(-1), 10) };
    return { role: "Partner", levelIndex: parseInt(id.slice(-1), 10) };
  };

  const levelIcon = (id: string) => {
    const pos = levelIconPositions[id] ?? fixedNorthEastPositions[id] ?? getDefaultSouthWestPositions()[id];
    const { role, levelIndex } = levelIdToRoleAndIndex(id);
    const contentLevelIndex = role === "Achiever" ? (levelIndex + 1) % 5 : levelIndex;
    const icon = <InfoIcon key={id} x={pos.x} y={pos.y} scale={0.7} onClick={() => openLevelLightbox(role, contentLevelIndex)} />;

    let iconNode: React.ReactNode;
    if (id.startsWith("level-east-")) {
      iconNode = <g key={id} transform={`rotate(90, ${pos.x}, ${pos.y})`}>{icon}</g>;
    } else if (id.startsWith("level-south-")) {
      iconNode = <g key={id} transform={`rotate(180, ${pos.x}, ${pos.y})`}>{icon}</g>;
    } else if (id.startsWith("level-west-")) {
      iconNode = id === "level-west-4" ? <g key={id} transform={`rotate(90, ${pos.x}, ${pos.y})`}>{icon}</g> : <g key={id} transform={`rotate(-90, ${pos.x}, ${pos.y})`}>{icon}</g>;
    } else {
      iconNode = icon;
    }

    return iconNode;
  };

  return (
    <>
    <div
      style={{
        width: compact ? "min(420px, 45vw, 55vh)" : "min(900px, 92vw, 82vh)",
        borderRadius: 18,
        border: "1px solid rgba(255,255,255,0.18)",
        background: "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.06), rgba(0,0,0,0))",
        boxShadow: "0 20px 70px rgba(0,0,0,0.6)",
        position: "relative",
        padding: 18,
        paddingTop: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-start", alignSelf: "flex-start", gap: 6 }}>
        <h1
          style={{
            margin: 0,
            fontSize: "clamp(18px, 2.5vw, 22px)",
            fontWeight: 600,
            color: "rgba(255,255,255,0.95)",
            letterSpacing: "0.02em",
          }}
        >
          Compass Framework
        </h1>
        <button
          type="button"
          onClick={openCompassTitleLightbox}
          aria-label="More information about Compass Framework"
          style={{
            width: 14,
            height: 14,
            marginTop: 4,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.4)",
            background: "white",
            color: "#111",
            fontSize: 10,
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            padding: 0,
            lineHeight: 1,
          }}
        >
          i
        </button>
      </div>
      <div style={{ width: "100%", aspectRatio: "1 / 1", flexShrink: 0 }}>
      {/* The Compass Drawing (SVG) — click role labels in the graphic to rotate */}
      <svg
        viewBox="-220 -195 440 415"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          overflow: "visible",
        }}
      >
        {/* Rotate everything as a group */}
        <g transform={`rotate(${rotation})`} style={{ transition: "transform 250ms ease" }}>
          {/* Center box: perfect square, side = Achiever base width (96.46), centered */}
          <rect
            x={-48.23}
            y={-48.23}
            width={96.46}
            height={96.46}
            fill="rgba(255,255,255,0.07)"
            stroke="rgba(255,255,255,0.22)"
          />
          {/* Center content counter-rotated — one per line, spaced across the square */}
          <g transform={`rotate(${-rotation}, 0, 0)`} style={{ transition: "transform 250ms ease" }}>
            <text x="0" y="-30" textAnchor="middle" fill="rgba(255,255,255,0.95)" fontSize="9" fontWeight="600">
              Active Listening
            </text>
            <text x="0" y="-10" textAnchor="middle" fill="rgba(255,255,255,0.95)" fontSize="9" fontWeight="600">
              Empathy
            </text>
            <text x="0" y="10" textAnchor="middle" fill="rgba(255,255,255,0.95)" fontSize="9" fontWeight="600">
              Synergy
            </text>
            <text x="0" y="30" textAnchor="middle" fill="rgba(255,255,255,0.95)" fontSize="9" fontWeight="600">
              Integration
            </text>
          </g>

          {/* Triangles — same size, each base flush with one side of the square */}
          <polygon points="0,-169.78 -48.23,-48.23 48.23,-48.23" fill="rgba(120,200,255,0.18)" stroke="rgba(255,255,255,0.22)" />
          <polygon points="169.78,0 48.23,-48.23 48.23,48.23" fill="rgba(255,160,120,0.16)" stroke="rgba(255,255,255,0.22)" />
          <polygon points="0,169.78 -48.23,48.23 48.23,48.23" fill="rgba(250,220,140,0.16)" stroke="rgba(255,255,255,0.22)" />
          <polygon points="-169.78,0 -48.23,-48.23 -48.23,48.23" fill="rgba(170,255,170,0.16)" stroke="rgba(255,255,255,0.22)" />

          {/* Flow circle: long arcs; by Leader, end at 345° / 15° (outside triangle), arrows point at triangle */}
          <path
            d="M 31 -139.9 A 143.39 143.39 0 0 1 138.5 -37 M 138.5 37 A 143.39 143.39 0 0 1 31 139.9 M -31 139.9 A 143.39 143.39 0 0 1 -139.9 31 M -139.9 -31 A 143.39 143.39 0 0 1 -31 -139.9"
            fill="none"
            stroke="rgba(255,255,255,0.28)"
            strokeWidth={1.5}
            strokeDasharray="6 4"
          />
          {/* Arrows at both ends of each arc: base on line end, tip toward P9 */}
          <FlowArrow baseX={138.5} baseY={-37} tipTowardX={143} tipTowardY={0} />
          <FlowArrow baseX={31} baseY={-139.9} tipTowardX={0} tipTowardY={-143} />
          {/* Leader–Follower */}
          <FlowArrow baseX={138.5} baseY={37} tipTowardX={143} tipTowardY={0} />
          <FlowArrow baseX={31} baseY={139.9} tipTowardX={0} tipTowardY={143} />
          {/* Follower–Partner */}
          <FlowArrow baseX={-31} baseY={139.9} tipTowardX={0} tipTowardY={143} />
          <FlowArrow baseX={-139.9} baseY={31} tipTowardX={-143} tipTowardY={0} />
          {/* Partner–Achiever */}
          <FlowArrow baseX={-139.9} baseY={-31} tipTowardX={-143} tipTowardY={0} />
          <FlowArrow baseX={-31} baseY={-139.9} tipTowardX={0} tipTowardY={-143} />
          {/* Iterate (above) and Adjust (below) — text on arc, smaller and lighter */}
          <defs>
            <path id="iterate-arc" d="M 75 -106 A 132 132 0 0 1 106 -75" fill="none" />
            <path id="adjust-arc" d="M 90 -124 A 155 155 0 0 1 124 -90" fill="none" />
            {/* Partner–Follower: Adjust on inner arc (132), Iterate on outer arc (175) so Iterate is further toward corner; same angular span, spacing preserved */}
            <path id="iterate-arc-pf" d="M -106 75 A 132 132 0 0 1 -75 106" fill="none" />
            <path id="adjust-arc-pf" d="M -124 90 A 155 155 0 0 1 -90 124" fill="none" />
            <path id="iterate-arc-pf-outer" d="M -124 90 A 155 155 0 0 1 -90 124" fill="none" />
            {/* Achiever–Partner (top-left) and Leader–Follower (bottom-right): outer arc for Variety (same as Iterate) */}
            <path id="seek-variety-arc-ap" d="M -90 -124 A 155 155 0 0 1 -124 -90" fill="none" />
            <path id="seek-variety-arc-lf" d="M 90 124 A 155 155 0 0 1 124 90" fill="none" />
            {/* Inner arcs for Pursuit; pathLength so full text fits on curve without clipping */}
            <path id="pursue-passions-arc-ap" d="M -106 -75 A 132 132 0 0 1 -75 -106" fill="none" pathLength="280" />
            <path id="pursue-passions-arc-lf" d="M 106 75 A 132 132 0 0 1 75 106" fill="none" pathLength="280" />
          </defs>
          {/* Role labels; "i" icon only when that role is in the top position (normalize rotation for 270 vs -90 etc.) */}
          {(() => {
            const topAngle = ((rotation % 360) + 360) % 360; // 0–360 so 270 and -90 both mean Leader at top
            return (
              <>
                <g onClick={() => handleRoleClick("Achiever")} style={{ cursor: "pointer" }}>
                  <text x="0" y="-185" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="12">Achiever</text>
                  {topAngle === 0 && <InfoIcon x={30} y={-192} onClick={() => openRoleLightbox("Achiever")} />}
                </g>
                <g transform="rotate(90, 185, 0)" onClick={() => handleRoleClick("Leader")} style={{ cursor: "pointer" }}>
                  <text x="185" y="0" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="12">Leader</text>
                  {topAngle === 270 && <InfoIcon x={215} y={-7} onClick={() => openRoleLightbox("Leader")} />}
                </g>
                <g transform="rotate(180, 0, 193)" onClick={() => handleRoleClick("Follower")} style={{ cursor: "pointer" }}>
                  <text x="0" y="193" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="12">Follower</text>
                  {topAngle === 180 && <InfoIcon x={30} y={186} onClick={() => openRoleLightbox("Follower")} />}
                </g>
                <g transform="rotate(-90, -185, 0)" onClick={() => handleRoleClick("Partner")} style={{ cursor: "pointer" }}>
                  <text x="-185" y="0" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="12">Partner</text>
                  {topAngle === 90 && <InfoIcon x={-155} y={-7} onClick={() => openRoleLightbox("Partner")} />}
                </g>
              </>
            );
          })()}
          <text fill="rgba(255,255,255,0.85)" fontSize="9" fontWeight="400">
            <textPath href="#adjust-arc" startOffset="50%" textAnchor="middle">
              Iterate
            </textPath>
          </text>
          <text fill="rgba(255,255,255,0.85)" fontSize="9" fontWeight="400">
            <textPath href="#iterate-arc" startOffset="50%" textAnchor="middle">
              Adjust
            </textPath>
          </text>
          {/* Partner–Follower: 180° around each label’s position on path so text faces center, stays in place */}
          <g transform="rotate(180, -107, 107)">
            <text fill="rgba(255,255,255,0.85)" fontSize="9" fontWeight="400">
              <textPath href="#iterate-arc-pf-outer" startOffset="50%" textAnchor="middle">
                Iterate
              </textPath>
            </text>
          </g>
          <g transform="rotate(180, -90.5, 90.5)">
            <text fill="rgba(255,255,255,0.85)" fontSize="9" fontWeight="400">
              <textPath href="#iterate-arc-pf" startOffset="50%" textAnchor="middle">
                Adjust
              </textPath>
            </text>
          </g>
          {/* Variety: top-left (Achiever–Partner) and bottom-right (Leader–Follower), same position as Iterate, 180° so faces center */}
          <g transform="rotate(180, -107, -107)">
            <text fill="rgba(255,255,255,0.85)" fontSize="9" fontWeight="400">
              <textPath href="#seek-variety-arc-ap" startOffset="50%" textAnchor="middle">
                Variety
              </textPath>
            </text>
          </g>
          <g transform="rotate(180, 107, 107)">
            <text fill="rgba(255,255,255,0.85)" fontSize="9" fontWeight="400">
              <textPath href="#seek-variety-arc-lf" startOffset="50%" textAnchor="middle">
                Variety
              </textPath>
            </text>
          </g>

          {/* North triangle level lines */}
          <LevelLine y={-69} />
          <LevelLine y={-90} />
          <LevelLine y={-111} />
          <LevelLine y={-132} />
          {/* North: level "i" icons (draggable, positions in localStorage) */}
          {levelIcon("level-north-0")}
          {levelIcon("level-north-1")}
          {levelIcon("level-north-2")}
          {levelIcon("level-north-3")}
          {levelIcon("level-north-4")}

          {/* North principle chips — P1 opens lightbox */}
          <PrincipleChip x={-26} y={-59} label="P1" onClick={() => openPrincipleLightbox("Achiever", "P1")} />
          <PrincipleChip x={0} y={-59} label="P2" onClick={() => openPrincipleLightbox("Achiever", "P2")} />
          <PrincipleChip x={26} y={-59} label="P3" onClick={() => openPrincipleLightbox("Achiever", "P3")} />
          <PrincipleChip x={-14} y={-80} label="P4" onClick={() => openPrincipleLightbox("Achiever", "P4")} />
          <PrincipleChip x={14} y={-80} label="P5" onClick={() => openPrincipleLightbox("Achiever", "P5")} />
          <PrincipleChip x={-10} y={-101} label="P6" onClick={() => openPrincipleLightbox("Achiever", "P6")} />
          <PrincipleChip x={10} y={-101} label="P7" onClick={() => openPrincipleLightbox("Achiever", "P7")} />
          <PrincipleChip x={0} y={-122} label="P8" onClick={() => openPrincipleLightbox("Achiever", "P8")} />
          <PrincipleChip x={0} y={-143} label="P9" onClick={() => openPrincipleLightbox("Achiever", "P9")} />

          {/* East (Leader) triangle: same levels and chip layout, rotated 90° */}
          <EastLevelLine x={69} />
          <EastLevelLine x={90} />
          <EastLevelLine x={111} />
          <EastLevelLine x={132} />
          {/* East: level "i" icons (draggable) */}
          {levelIcon("level-east-0")}
          {levelIcon("level-east-1")}
          {levelIcon("level-east-2")}
          {levelIcon("level-east-3")}
          {levelIcon("level-east-4")}

          <g transform="rotate(90, 59, -26)">
            <PrincipleChip x={59} y={-26} label="P1" onClick={() => openPrincipleLightbox("Leader", "P1")} />
          </g>
          <g transform="rotate(90, 59, 0)">
            <PrincipleChip x={59} y={0} label="P2" onClick={() => openPrincipleLightbox("Leader", "P2")} />
          </g>
          <g transform="rotate(90, 59, 26)">
            <PrincipleChip x={59} y={26} label="P3" onClick={() => openPrincipleLightbox("Leader", "P3")} />
          </g>
          <g transform="rotate(90, 80, -14)">
            <PrincipleChip x={80} y={-14} label="P4" onClick={() => openPrincipleLightbox("Leader", "P4")} />
          </g>
          <g transform="rotate(90, 80, 14)">
            <PrincipleChip x={80} y={14} label="P5" onClick={() => openPrincipleLightbox("Leader", "P5")} />
          </g>
          <g transform="rotate(90, 101, -10)">
            <PrincipleChip x={101} y={-10} label="P6" onClick={() => openPrincipleLightbox("Leader", "P6")} />
          </g>
          <g transform="rotate(90, 101, 10)">
            <PrincipleChip x={101} y={10} label="P7" onClick={() => openPrincipleLightbox("Leader", "P7")} />
          </g>
          <g transform="rotate(90, 122, 0)">
            <PrincipleChip x={122} y={0} label="P8" onClick={() => openPrincipleLightbox("Leader", "P8")} />
          </g>
          <g transform="rotate(90, 143, 0)">
            <PrincipleChip x={143} y={0} label="P9" onClick={() => openPrincipleLightbox("Leader", "P9")} />
          </g>

          {/* South (Follower) triangle: chip order flipped so after 180° rotation labels read left-to-right */}
          <SouthLevelLine y={69} />
          <SouthLevelLine y={90} />
          <SouthLevelLine y={111} />
          <SouthLevelLine y={132} />
          {/* South: level "i" icons (draggable) */}
          {levelIcon("level-south-0")}
          {levelIcon("level-south-1")}
          {levelIcon("level-south-2")}
          {levelIcon("level-south-3")}
          {levelIcon("level-south-4")}

          <g transform="rotate(180, 26, 59)">
            <PrincipleChip x={26} y={59} label="P1" onClick={() => openPrincipleLightbox("Follower", "P1")} />
          </g>
          <g transform="rotate(180, 0, 59)">
            <PrincipleChip x={0} y={59} label="P2" onClick={() => openPrincipleLightbox("Follower", "P2")} />
          </g>
          <g transform="rotate(180, -26, 59)">
            <PrincipleChip x={-26} y={59} label="P3" onClick={() => openPrincipleLightbox("Follower", "P3")} />
          </g>
          <g transform="rotate(180, 14, 80)">
            <PrincipleChip x={14} y={80} label="P4" onClick={() => openPrincipleLightbox("Follower", "P4")} />
          </g>
          <g transform="rotate(180, -14, 80)">
            <PrincipleChip x={-14} y={80} label="P5" onClick={() => openPrincipleLightbox("Follower", "P5")} />
          </g>
          <g transform="rotate(180, 10, 101)">
            <PrincipleChip x={10} y={101} label="P6" onClick={() => openPrincipleLightbox("Follower", "P6")} />
          </g>
          <g transform="rotate(180, -10, 101)">
            <PrincipleChip x={-10} y={101} label="P7" onClick={() => openPrincipleLightbox("Follower", "P7")} />
          </g>
          <g transform="rotate(180, 0, 122)">
            <PrincipleChip x={0} y={122} label="P8" onClick={() => openPrincipleLightbox("Follower", "P8")} />
          </g>
          <g transform="rotate(180, 0, 143)">
            <PrincipleChip x={0} y={143} label="P9" onClick={() => openPrincipleLightbox("Follower", "P9")} />
          </g>

          {/* West (Partner) triangle: chip order flipped so after -90° rotation labels read left-to-right */}
          <WestLevelLine x={-69} />
          <WestLevelLine x={-90} />
          <WestLevelLine x={-111} />
          <WestLevelLine x={-132} />
          {/* West: level "i" icons (draggable) */}
          {levelIcon("level-west-0")}
          {levelIcon("level-west-1")}
          {levelIcon("level-west-2")}
          {levelIcon("level-west-3")}
          {levelIcon("level-west-4")}

          <g transform="rotate(-90, -59, 26)">
            <PrincipleChip x={-59} y={26} label="P1" onClick={() => openPrincipleLightbox("Partner", "P1")} />
          </g>
          <g transform="rotate(-90, -59, 0)">
            <PrincipleChip x={-59} y={0} label="P2" onClick={() => openPrincipleLightbox("Partner", "P2")} />
          </g>
          <g transform="rotate(-90, -59, -26)">
            <PrincipleChip x={-59} y={-26} label="P3" onClick={() => openPrincipleLightbox("Partner", "P3")} />
          </g>
          <g transform="rotate(-90, -80, 14)">
            <PrincipleChip x={-80} y={14} label="P4" onClick={() => openPrincipleLightbox("Partner", "P4")} />
          </g>
          <g transform="rotate(-90, -80, -14)">
            <PrincipleChip x={-80} y={-14} label="P5" onClick={() => openPrincipleLightbox("Partner", "P5")} />
          </g>
          <g transform="rotate(-90, -101, 10)">
            <PrincipleChip x={-101} y={10} label="P6" onClick={() => openPrincipleLightbox("Partner", "P6")} />
          </g>
          <g transform="rotate(-90, -101, -10)">
            <PrincipleChip x={-101} y={-10} label="P7" onClick={() => openPrincipleLightbox("Partner", "P7")} />
          </g>
          <g transform="rotate(-90, -122, 0)">
            <PrincipleChip x={-122} y={0} label="P8" onClick={() => openPrincipleLightbox("Partner", "P8")} />
          </g>
          <g transform="rotate(-90, -143, 0)">
            <PrincipleChip x={-143} y={0} label="P9" onClick={() => openPrincipleLightbox("Partner", "P9")} />
          </g>

        </g>
        {/* Pursuit: curved on path; top-left 180° so faces center like Variety */}
        <g transform={`rotate(${-rotation})`} style={{ transition: "transform 250ms ease" }}>
          <g transform="rotate(360, -90.5, -90.5)">
            <text fill="rgba(255,255,255,0.85)" fontSize="9" fontWeight="400">
              <textPath href="#pursue-passions-arc-ap" startOffset="50%" textAnchor="middle">
                Pursuit
              </textPath>
            </text>
          </g>
          <text fill="rgba(255,255,255,0.85)" fontSize="9" fontWeight="400">
            <textPath href="#pursue-passions-arc-lf" startOffset="50%" textAnchor="middle">
              Pursuit
            </textPath>
          </text>
        </g>
      </svg>
      </div>
    </div>

    {lightboxCompassTitle && (
      <LightboxWithOverviewAndPractice
        key={frameworkLightboxKey}
        initialTab={frameworkLightboxInitialTab}
        title={COMPASS_FRAMEWORK.title}
        onClose={() => setLightboxCompassTitle(false)}
        overviewContent={renderBlocksToInline(COMPASS_FRAMEWORK.overview)}
        frameworkOverviewRead={effectiveFrameworkOverviewRead}
        onFrameworkOverviewReadChange={setEffectiveFrameworkOverviewRead}
        hideOverviewNextInstruction={effectiveFrameworkOverviewInstructionHidden}
        onHideOverviewNextInstruction={() => setEffectiveFrameworkOverviewInstructionHidden(true)}
        inPracticeContent={renderBlocksToInline(COMPASS_FRAMEWORK.inPractice)}
        frameworkInPracticeRead={effectiveFrameworkInPracticeRead}
        onFrameworkInPracticeReadChange={setEffectiveFrameworkInPracticeRead}
        hideInPracticeNextInstruction={effectiveFrameworkInPracticeInstructionHidden}
        onHideInPracticeNextInstruction={() => setEffectiveFrameworkInPracticeInstructionHidden(true)}
        onOpenAchieverFromFrameworkOnboarding={() => {
          setLightboxCompassTitle(false);
          setLightboxRole("Achiever");
          setEffectiveFrameworkInPracticeInstructionHidden(true);
        }}
        maxWidth={1200}
        maxHeight="95vh"
      />
    )}

    {lightboxRole && (() => {
      const { title: roleTitle, shortDescription } = ROLE_TITLE_AND_SHORT[lightboxRole];
      const overviewContent = lightboxRole === "Achiever"
        ? renderBlocksToInline(ACHIEVER_OVERVIEW)
        : lightboxRole === "Leader"
          ? renderBlocksToInline(LEADER_OVERVIEW)
          : lightboxRole === "Follower"
            ? renderBlocksToInline(FOLLOWER_OVERVIEW)
            : renderBlocksToInline(PARTNER_OVERVIEW);
      const inPracticeContent = lightboxRole === "Achiever"
        ? renderBlocksToInline(ACHIEVER_IN_PRACTICE)
        : lightboxRole === "Leader"
          ? renderBlocksToInline(LEADER_IN_PRACTICE)
          : lightboxRole === "Partner"
            ? renderBlocksToInline(PARTNER_IN_PRACTICE)
            : renderBlocksToInline(FOLLOWER_IN_PRACTICE);
      return (
        <RoleLightboxWithTabs
          title={roleTitle}
          onClose={() => setLightboxRole(null)}
          role={lightboxRole}
          shortDescription={shortDescription}
          overviewContent={overviewContent}
          inPracticeContent={inPracticeContent}
          onNavigateToRole={(r) => {
            setLightboxRole(r);
            setRotation((current) => shortestPathAngle(current, ROLE_ANGLE[r]));
          }}
          onNavigateToLevel={(levelIndex) => {
            setLightboxRole(null);
            setLightboxLevel({ role: lightboxRole, levelIndex });
          }}
          onNavigateToPrinciple={(p) => {
            setLightboxRole(null);
            setLightboxPrinciple({ role: lightboxRole, principle: p });
          }}
        />
      );
    })()}

    {lightboxPrinciple && (() => {
      const { role, principle } = lightboxPrinciple;
      const { perspectiveDescription, inPractice, overviewBlocks, inPracticeBlocks } = getPrincipleContent(role, principle);
      const title = PRINCIPLE_DISPLAY_NAMES[principle] ?? `${principle}`;
      const hasApplyTab = !!effectiveActive && !!(onPrincipleContentChange ?? onSituationPrincipleContentChange);
      const userContent = lookupContent(principle);
      const paragraphStyle = { margin: "0 0 0.5rem", lineHeight: 1.5 as const };

      const handleClose = () => {
        setLightboxPrinciple(null);
        onPrincipleLightboxClose?.();
      };

      return (
        <PrincipleLightboxWithTabs
          title={title}
          onClose={handleClose}
          role={role}
          principle={principle}
          overviewShort={perspectiveDescription}
          overviewContent={renderBlocksToInline(overviewBlocks)}
          inPracticeContent={inPracticeBlocks ? renderBlocksToInline(inPracticeBlocks) : <p style={paragraphStyle}>{inPractice}</p>}
          hasApplyTab={hasApplyTab}
          userContent={userContent}
          onUserContentChange={(v) => effectiveActive && handleContentChange?.(effectiveActive.moduleId, effectiveActive.name, principle, v)}
          onNavigateToRole={(r) => {
            setLightboxPrinciple({ role: r, principle });
            setRotation((current) => shortestPathAngle(current, ROLE_ANGLE[r]));
          }}
          onNavigateToLevel={(levelIndex) => {
            setLightboxPrinciple(null);
            setLightboxLevel({ role, levelIndex });
          }}
          onNavigateToPrinciple={(p) => setLightboxPrinciple({ role, principle: p })}
          onAddSituation={
            onAddSituation
              ? () => {
                  handleClose();
                  onAddSituation();
                }
              : undefined
          }
          dbLastSavedAtMs={
            hasApplyTab
              ? (() => {
                  const key = effectiveActive ? `${effectiveActive.moduleId}|${effectiveActive.name}|${principle}` : "";
                  const v = key ? itemPrincipleUpdatedAt[key] : undefined;
                  return v ? new Date(v).getTime() : null;
                })()
              : null
          }
        />
      );
    })()}

    {lightboxLevel && (() => {
      const { role, levelIndex } = lightboxLevel;
      const title = `Level ${levelIndex + 1} — ${LEVEL_NAMES[levelIndex]}`;
      const perspectiveShort = getLevelPerspective(role, levelIndex);
      const overviewBlocks = getLevelOverviewBlocks(levelIndex);
      const inPracticeBlocks = getLevelInPracticeBlocks(levelIndex);
      return (
        <LevelLightboxWithTabs
          title={title}
          onClose={() => setLightboxLevel(null)}
          role={role}
          levelIndex={levelIndex}
          perspectiveShort={perspectiveShort}
          overviewContent={renderBlocksToInline(overviewBlocks)}
          inPracticeContent={renderBlocksToInline(inPracticeBlocks)}
          onNavigateToRole={(r) => {
            setLightboxLevel({ role: r, levelIndex });
            setRotation((current) => shortestPathAngle(current, ROLE_ANGLE[r]));
          }}
          onNavigateToLevel={(idx) => setLightboxLevel({ role, levelIndex: idx })}
          onNavigateToPrinciple={(p) => {
            setLightboxLevel(null);
            setLightboxPrinciple({ role, principle: p });
          }}
        />
      );
    })()}
    </>
  );
}

// Square and triangles: square side = Achiever base width = 96.46 (half 48.23), triangle height 121.55
const NORTH_APEX_Y = -169.78; // -48.23 - 121.55
const NORTH_BASE_Y = -48.23;
const NORTH_HALF_BASE = 48.23;

const EAST_TIP_X = 169.78; // 48.23 + 121.55
const EAST_BASE_X = 48.23;
const EAST_HALF_BASE = 48.23;

// South (Follower): apex 169.78, base y=48.23
const SOUTH_APEX_Y = 169.78;
const SOUTH_BASE_Y = 48.23;

// West (Partner): tip -169.78, base x=-48.23
const WEST_TIP_X = -169.78;
const WEST_BASE_X = -48.23;

function levelLineHalfWidth(y: number) {
  return (NORTH_HALF_BASE * (y - NORTH_APEX_Y)) / (NORTH_BASE_Y - NORTH_APEX_Y);
}

function levelLineHalfHeight(x: number) {
  return (EAST_HALF_BASE * (EAST_TIP_X - x)) / (EAST_TIP_X - EAST_BASE_X);
}

function southLevelLineHalfWidth(y: number) {
  return (NORTH_HALF_BASE * (SOUTH_APEX_Y - y)) / (SOUTH_APEX_Y - SOUTH_BASE_Y);
}

function westLevelLineHalfHeight(x: number) {
  return (EAST_HALF_BASE * (x - WEST_TIP_X)) / (WEST_BASE_X - WEST_TIP_X);
}

function LevelLine({ y }: { y: number }) {
  const hw = levelLineHalfWidth(y);
  return (
    <line
      x1={-hw}
      y1={y}
      x2={hw}
      y2={y}
      stroke="rgba(255,255,255,0.22)"
      strokeWidth={1}
    />
  );
}

function EastLevelLine({ x }: { x: number }) {
  const hh = levelLineHalfHeight(x);
  return (
    <line
      x1={x}
      y1={-hh}
      x2={x}
      y2={hh}
      stroke="rgba(255,255,255,0.22)"
      strokeWidth={1}
    />
  );
}

function SouthLevelLine({ y }: { y: number }) {
  const hw = southLevelLineHalfWidth(y);
  return (
    <line
      x1={-hw}
      y1={y}
      x2={hw}
      y2={y}
      stroke="rgba(255,255,255,0.22)"
      strokeWidth={1}
    />
  );
}

function WestLevelLine({ x }: { x: number }) {
  const hh = westLevelLineHalfHeight(x);
  return (
    <line
      x1={x}
      y1={-hh}
      x2={x}
      y2={hh}
      stroke="rgba(255,255,255,0.22)"
      strokeWidth={1}
    />
  );
}

function Lightbox({
  title,
  onClose,
  children,
  maxWidth = 720,
  maxHeight = "85vh",
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: number;
  maxHeight?: string | number;
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "24px 16px",
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
        overflowY: "auto",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#1a1a1c",
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.18)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
          maxWidth,
          width: "100%",
          maxHeight: "calc(100vh - 48px)",
          overflow: "auto",
          flexShrink: 0,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600, color: "white" }}>{title}</h2>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "rgba(255,255,255,0.7)",
              cursor: "pointer",
              fontSize: 24,
              lineHeight: 1,
              padding: "0 4px",
            }}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div style={{ padding: "32px 56px 40px", fontSize: 17, lineHeight: 1.6 }}>{children}</div>
      </div>
    </div>
  );
}

// Reusable "more info" icon: white circle, black "i" — use throughout the app for info actions. Optional scale (e.g. 0.7) for smaller icons (e.g. level icons).
function InfoIcon({ x, y, onClick, scale = 1 }: { x: number; y: number; onClick?: (e: React.MouseEvent) => void; scale?: number }) {
  const r = 4.2 * scale;
  const fontSize = 6 * scale;
  const strokeWidth = 0.5 * scale;
  return (
    <g
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      style={{ cursor: "pointer" }}
      aria-label="More information"
    >
      <circle cx={x} cy={y} r={r} fill="white" stroke="rgba(255,255,255,0.4)" strokeWidth={strokeWidth} />
      <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fill="#111" fontSize={fontSize} fontWeight="700">
        i
      </text>
    </g>
  );
}

// Arrow with base (tail) centered at (baseX, baseY), tip pointing toward (tipTowardX, tipTowardY)
function FlowArrow({
  baseX,
  baseY,
  tipTowardX,
  tipTowardY,
}: {
  baseX: number;
  baseY: number;
  tipTowardX: number;
  tipTowardY: number;
}) {
  const angle = Math.atan2(tipTowardY - baseY, tipTowardX - baseX);
  const tipLen = 12;
  const tipX = baseX + tipLen * Math.cos(angle);
  const tipY = baseY + tipLen * Math.sin(angle);
  const deg = (angle * 180) / Math.PI;
  return (
    <g transform={`translate(${tipX}, ${tipY}) rotate(${deg})`}>
      <path d="M -12 -4.5 L 0 0 L -12 4.5 Z" fill="rgba(255,255,255,0.5)" />
    </g>
  );
}

function PrincipleChip({ x, y, label, onClick }: { x: number; y: number; label: string; onClick?: () => void }) {
  return (
    <g
      onClick={onClick ?? (() => alert(`${label} clicked (we’ll make this open a panel next)`))}
      style={{ cursor: "pointer" }}
    >
      <rect
        x={x - 7}
        y={y - 5}
        width={14}
        height={11}
        rx={2.5}
        fill="rgba(0,0,0,0.35)"
        stroke="rgba(255,255,255,0.35)"
      />
      <text x={x} y={y + 2.5} textAnchor="middle" fill="white" fontSize="6" fontWeight="700">
        {label}
      </text>
    </g>
  );
}
