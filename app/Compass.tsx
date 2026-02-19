"use client";

import { useState, type ReactNode } from "react";

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

// Content for each role's lightbox (opened by the "i" icon next to the role label)
const ROLE_LIGHTBOX: Record<Role, { title: string; body: ReactNode }> = {
  Achiever: { title: "Achiever", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add more information about the Achiever role here.</p> },
  Leader:   { title: "Leader",   body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add more information about the Leader role here.</p> },
  Follower: { title: "Follower", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add more information about the Follower role here.</p> },
  Partner:  { title: "Partner",  body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add more information about the Partner role here.</p> },
};

// Content for each principle chip (P1–P9) per role — key: "Role-P1" etc. (opened by clicking P1, P2, … in a pyramid)
const PRINCIPLE_LIGHTBOX: Record<string, { title: string; body: ReactNode }> = {
  "Achiever-P1": { title: "P1 — Achiever", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for P1 (Achiever) here.</p> },
  "Achiever-P2": { title: "P2 — Achiever", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for P2 (Achiever) here.</p> },
  "Achiever-P3": { title: "P3 — Achiever", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for P3 (Achiever) here.</p> },
  "Achiever-P4": { title: "P4 — Achiever", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for P4 (Achiever) here.</p> },
  "Achiever-P5": { title: "P5 — Achiever", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for P5 (Achiever) here.</p> },
  "Achiever-P6": { title: "P6 — Achiever", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for P6 (Achiever) here.</p> },
  "Achiever-P7": { title: "P7 — Achiever", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for P7 (Achiever) here.</p> },
  "Achiever-P8": { title: "P8 — Achiever", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for P8 (Achiever) here.</p> },
  "Achiever-P9": { title: "P9 — Achiever", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for P9 (Achiever) here.</p> },
  "Leader-P1": { title: "P1 — Leader", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for P1 (Leader) here.</p> },
  "Leader-P2": { title: "P2 — Leader", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for P2 (Leader) here.</p> },
  "Leader-P3": { title: "P3 — Leader", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for P3 (Leader) here.</p> },
  "Leader-P4": { title: "P4 — Leader", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for P4 (Leader) here.</p> },
  "Leader-P5": { title: "P5 — Leader", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for P5 (Leader) here.</p> },
  "Leader-P6": { title: "P6 — Leader", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for P6 (Leader) here.</p> },
  "Leader-P7": { title: "P7 — Leader", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for P7 (Leader) here.</p> },
  "Leader-P8": { title: "P8 — Leader", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for P8 (Leader) here.</p> },
  "Leader-P9": { title: "P9 — Leader", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for P9 (Leader) here.</p> },
  "Follower-P1": { title: "P1 — Follower", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for P1 (Follower) here.</p> },
  "Follower-P2": { title: "P2 — Follower", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for P2 (Follower) here.</p> },
  "Follower-P3": { title: "P3 — Follower", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for P3 (Follower) here.</p> },
  "Follower-P4": { title: "P4 — Follower", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for P4 (Follower) here.</p> },
  "Follower-P5": { title: "P5 — Follower", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for P5 (Follower) here.</p> },
  "Follower-P6": { title: "P6 — Follower", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for P6 (Follower) here.</p> },
  "Follower-P7": { title: "P7 — Follower", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for P7 (Follower) here.</p> },
  "Follower-P8": { title: "P8 — Follower", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for P8 (Follower) here.</p> },
  "Follower-P9": { title: "P9 — Follower", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for P9 (Follower) here.</p> },
  "Partner-P1": { title: "P1 — Partner", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for P1 (Partner) here.</p> },
  "Partner-P2": { title: "P2 — Partner", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for P2 (Partner) here.</p> },
  "Partner-P3": { title: "P3 — Partner", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for P3 (Partner) here.</p> },
  "Partner-P4": { title: "P4 — Partner", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for P4 (Partner) here.</p> },
  "Partner-P5": { title: "P5 — Partner", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for P5 (Partner) here.</p> },
  "Partner-P6": { title: "P6 — Partner", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for P6 (Partner) here.</p> },
  "Partner-P7": { title: "P7 — Partner", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for P7 (Partner) here.</p> },
  "Partner-P8": { title: "P8 — Partner", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for P8 (Partner) here.</p> },
  "Partner-P9": { title: "P9 — Partner", body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for P9 (Partner) here.</p> },
};
function getPrincipleLightbox(role: Role, principle: string) {
  const key = `${role}-${principle}`;
  return PRINCIPLE_LIGHTBOX[key] ?? { title: `${principle} — ${role}`, body: <p style={{ margin: 0, lineHeight: 1.5 }}>Add content for {principle} ({role}) here.</p> };
}

export default function Compass() {
  const [rotation, setRotation] = useState(0);
  const [lightboxRole, setLightboxRole] = useState<Role | null>(null);
  const [lightboxPrinciple, setLightboxPrinciple] = useState<{ role: Role; principle: string } | null>(null);

  const openRoleLightbox = (role: Role) => {
    setLightboxPrinciple(null);
    setLightboxRole(role);
  };
  const openPrincipleLightbox = (role: Role, principle: string) => {
    // Rotate so this Compass Role moves to the top (same as clicking the role label), then open the principle lightbox
    const targetAngle = ROLE_ANGLE[role];
    setRotation((current) => shortestPathAngle(current, targetAngle));
    setLightboxRole(null);
    setLightboxPrinciple({ role, principle });
  };

  const handleRoleClick = (role: Role) => {
    const targetAngle = ROLE_ANGLE[role];
    setRotation((current) => shortestPathAngle(current, targetAngle));
  };

  return (
    <>
    <div
      style={{
        width: "min(900px, 92vw, 82vh)",
        aspectRatio: "1 / 1",
        borderRadius: 18,
        border: "1px solid rgba(255,255,255,0.18)",
        background: "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.06), rgba(0,0,0,0))",
        boxShadow: "0 20px 70px rgba(0,0,0,0.6)",
        position: "relative",
        padding: 18,
      }}
    >
      {/* The Compass Drawing (SVG) — click role labels in the graphic to rotate */}
      <svg
        viewBox="-220 -220 440 440"
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

    {lightboxRole && (
      <Lightbox
        title={ROLE_LIGHTBOX[lightboxRole].title}
        onClose={() => setLightboxRole(null)}
      >
        <div style={{ padding: "1rem 0", minHeight: 120, color: "rgba(255,255,255,0.9)" }}>
          {ROLE_LIGHTBOX[lightboxRole].body}
        </div>
      </Lightbox>
    )}

    {lightboxPrinciple && (() => {
      const { title, body } = getPrincipleLightbox(lightboxPrinciple.role, lightboxPrinciple.principle);
      return (
        <Lightbox title={title} onClose={() => setLightboxPrinciple(null)}>
          <div style={{ padding: "1rem 0", minHeight: 120, color: "rgba(255,255,255,0.9)" }}>
            {body}
          </div>
        </Lightbox>
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
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#1a1a1c",
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.18)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
          maxWidth: 480,
          width: "100%",
          maxHeight: "85vh",
          overflow: "auto",
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
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "white" }}>{title}</h2>
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
        <div style={{ padding: "20px 20px 24px" }}>{children}</div>
      </div>
    </div>
  );
}

// Reusable "more info" icon: white circle, black "i" — use throughout the app for info actions
function InfoIcon({ x, y, onClick }: { x: number; y: number; onClick?: (e: React.MouseEvent) => void }) {
  const r = 4.2; // 60% of 7
  return (
    <g
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      style={{ cursor: "pointer" }}
      aria-label="More information"
    >
      <circle cx={x} cy={y} r={r} fill="white" stroke="rgba(255,255,255,0.4)" strokeWidth={0.5} />
      <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fill="#111" fontSize="6" fontWeight="700">
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
