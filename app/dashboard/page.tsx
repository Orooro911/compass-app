"use client";

import Compass from "../Compass";
import { useState, useEffect, useMemo, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import {
  DASHBOARD_INFO,
  LIFE_ROLES_INFO,
  SHARED_GROWTH_INFO,
  SITUATIONS_INFO,
  WANTS_INFO,
  TRANSFORMATIONS_INFO,
  type InfoBlock,
} from "./infoContent";
const MODULES = [
  { id: "life-roles", title: "Life Roles", description: "Your fixed identities—job title, parent, friend, volunteer, business owner.", items: ["Parent", "Software Engineer", "Volunteer", "Friend", "Mentor"] },
  { id: "shared-growth", title: "Shared Growth", description: "The people you share your life with—partner, family, colleagues.", items: ["Partner", "Team", "Kids", "Manager", "Direct reports"] },
  { id: "situations", title: "Situations", description: "Meaningful situations to work through strategically with the Compass.", items: ["Career transition", "Difficult conversation", "New project", "Feedback session", "Conflict resolution", "Team restructure", "Salary negotiation", "Onboarding"] },
  { id: "wants", title: "Wants", description: "What you want to pursue—each can nest situations underneath.", items: [] },
  { id: "transformations", title: "Transformations", description: "Major shifts or builds—each can nest wants, which nest situations.", items: [] },
];

const LIFE_ROLES_GROUPED: Record<string, string[]> = {
  "Personal Roles": [
    "Parent", "Father", "Mother", "Spouse", "Partner", "Co-Parent", "Son", "Daughter", "Sibling",
    "Grandparent", "Extended Family Member", "Caregiver", "Close Friend", "Mentor", "Mentee",
  ],
  "Professional Roles": [
    "Founder", "Business Owner", "Executive", "Manager", "Team Leader", "Individual Contributor",
    "Employee", "Consultant", "Entrepreneur", "Board Member", "Advisor", "Creative Professional",
    "Developer / Engineer", "Sales Professional", "Teacher / Educator", "Coach", "Healthcare Professional",
    "Public Servant",
  ],
  "Personal Development & Health": [
    "Health Steward (Physical Health)", "Mental Health Steward", "Spiritual Practitioner", "Athlete",
    "Student", "Lifelong Learner", "Researcher", "Creator", "Writer", "Artist",
  ],
  "Financial & Structural Roles": [
    "Investor", "Wealth Manager", "Budget Manager", "Property Owner", "Landlord", "Estate Planner",
    "Financial Provider",
  ],
  "Community & Contribution": [
    "Community Member", "Volunteer", "Church / Faith Member", "Organizer", "Advocate", "Neighbor",
    "Civic Participant",
  ],
  "Household & Domestic Roles": [
    "Household Manager", "Homeowner", "Property Steward", "Primary Organizer", "Family Logistics Lead",
  ],
  "Creative & Personal Pursuits": [
    "Builder", "Inventor", "Musician", "Designer", "Content Creator", "Hobbyist", "Engineer",
    "Craftsperson",
  ],
};

const LIFE_ROLES_FLAT = Object.values(LIFE_ROLES_GROUPED).flat();

/** Default life role always present at top of list; excluded from add/suggestions. */
const DEFAULT_LIFE_ROLE_NAME = "Personal Growth";

const SHARED_GROWTH_GROUPED: Record<string, string[]> = {
  "Core Relationships": [
    "Spouse", "Partner", "Wife", "Husband", "Child", "Parent", "Sibling", "Extended Family",
    "Close Friend", "Inner Circle Friend",
  ],
  "Work & Professional": [
    "Business Partner", "Co-Founder", "Manager", "Direct Report", "Teammate", "Client",
    "Mentor", "Mentee", "Advisor",
  ],
  "Growth & Development": [
    "Coach", "Therapist", "Spiritual Guide", "Instructor", "Accountability Partner",
    "Creative Collaborator",
  ],
  "Community": [
    "Neighbor", "Volunteer Partner", "Faith Community Member", "Community Leader",
  ],
};

const SHARED_GROWTH_FLAT = Object.values(SHARED_GROWTH_GROUPED).flat();

const SITUATIONS_GROUPED: Record<string, string[]> = {
  "Long-Term Build & Advancement": [
    "Long-term goal", "Major project", "Strategic initiative", "Business build",
    "Health transformation", "Personal transformation", "Financial objective", "Creative build",
  ],
  "Direction & Identity": [
    "Career transition", "Life transition", "Big decision", "New direction", "Identity shift",
  ],
  "Relationships & Communication": [
    "Difficult conversation", "Conflict", "Relationship tension", "Misalignment", "Boundary issue",
  ],
  "Growth & Expansion": [
    "Scaling / expansion", "Skill development", "Leadership growth", "Stepping into new responsibility",
  ],
  "Performance & Execution": [
    "Performance plateau", "Loss of momentum", "Accountability gap", "Focus problem",
  ],
  "Structure & Systems": [
    "System breakdown", "Role overload", "Priority misalignment", "Time pressure",
  ],
  "Energy & Stability": [
    "Burnout", "Stress overload", "Energy imbalance",
  ],
};

const SITUATIONS_FLAT = Object.values(SITUATIONS_GROUPED).flat();

const SUGGESTIONS: Record<string, string[]> = {
  "life-roles": LIFE_ROLES_FLAT.filter((n) => n !== DEFAULT_LIFE_ROLE_NAME),
  "shared-growth": SHARED_GROWTH_FLAT,
  "situations": SITUATIONS_FLAT,
  "wants": SITUATIONS_FLAT,
  "transformations": SITUATIONS_FLAT,
};

const CONTENT_ONLY_MODULES = ["life-roles", "shared-growth", "situations", "wants", "transformations"];

const PRINCIPLE_CONTENT_MODULES = ["situations", "wants", "transformations"];

const LINK_TARGETS: Record<string, string[]> = {
  "life-roles": ["shared-growth", "situations", "wants", "transformations"],
  "shared-growth": ["life-roles", "situations", "wants", "transformations"],
  "situations": ["life-roles", "shared-growth", "wants", "transformations"],
  "wants": ["life-roles", "shared-growth", "situations", "transformations"],
  "transformations": ["life-roles", "shared-growth", "situations", "wants"],
};

const PRINCIPLES_BY_LEVEL: { level: string; principles: { id: string; label: string }[] }[] = [
  { level: "Level 1 — Foundation", principles: [
    { id: "P1", label: "Evaluate opportunities and obstacles" },
    { id: "P2", label: "Understand style and mindset" },
    { id: "P3", label: "Envision an ideal future" },
  ]},
  { level: "Level 2 — Alignment", principles: [
    { id: "P4", label: "Set measurable objectives" },
    { id: "P5", label: "Prioritize what matters" },
  ]},
  { level: "Level 3", principles: [
    { id: "P6", label: "Build effective systems" },
    { id: "P7", label: "Invest in personal development" },
  ]},
  { level: "Level 4", principles: [
    { id: "P8", label: "Engage with collaborators" },
  ]},
  { level: "Level 5", principles: [
    { id: "P9", label: "Maintain a laser focus on execution" },
  ]},
];

function Lightbox({
  title,
  onClose,
  children,
  maxWidth = 480,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: number;
}) {
  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-6"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="rounded-xl border border-white/20 max-h-[85vh] w-full overflow-auto"
        style={{ background: "#1a1a1c", boxShadow: "0 24px 80px rgba(0,0,0,0.5)", maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/12 px-5 py-4">
          <h2 className="m-0 text-lg font-semibold text-white">{title}</h2>
          <button type="button" onClick={onClose} className="border-none bg-transparent p-1 text-2xl leading-none text-white/70 hover:text-white" aria-label="Close">
            ×
          </button>
        </div>
        <div className="px-10 py-6">{children}</div>
      </div>
    </div>
  );
}

function renderInfoBlocks(blocks: InfoBlock[]) {
  return (
    <div className="space-y-5 text-[17px] text-white/90 leading-[1.6]">
      {blocks.map((block, i) => {
        if (block.type === "p") {
          return (
            <p key={i} className={block.className ?? "m-0"}>
              {block.text}
            </p>
          );
        }
        if (block.type === "pStrong") {
          return (
            <p key={i} className="m-0 font-semibold text-white/95">
              {block.text}
            </p>
          );
        }
        if (block.type === "h3") {
          return (
            <h3 key={i} className="text-white font-semibold mt-6 mb-2">
              {block.text}
            </h3>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={i} className="list-disc pl-5 space-y-1 my-3">
              {block.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          );
        }
        return null;
      })}
    </div>
  );
}

function LinkSection({
  title,
  moduleId,
  items,
  isLinked,
  toggleLink,
  onAdd,
}: {
  title: string;
  moduleId: string;
  items: string[];
  isLinked: (mod: string, item: string) => boolean;
  toggleLink: (mod: string, item: string) => void;
  onAdd?: (moduleId: string) => void;
}) {
  const linked = items.filter((i) => isLinked(moduleId, i));
  const notLinked = items.filter((i) => !isLinked(moduleId, i));

  const pill = (item: string, linked: boolean) => (
    <button
      key={item}
      type="button"
      onClick={() => toggleLink(moduleId, item)}
      className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
        linked
          ? "border-emerald-500/50 bg-emerald-500/20 text-white hover:bg-emerald-500/30"
          : "border-white/20 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white/90"
      }`}
    >
      {item} {linked && "✓"}
    </button>
  );

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium text-white/90">{title}</h3>
        {onAdd && (
          <button
            type="button"
            onClick={() => onAdd(moduleId)}
            className="text-xs text-white/60 hover:text-white"
          >
            + Add
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
          <div className="mb-2 text-xs font-medium uppercase tracking-wider text-emerald-400/80">Linked</div>
          <div className="flex flex-wrap gap-2">
            {linked.length > 0 ? linked.map((i) => pill(i, true)) : <span className="text-sm text-white/40">—</span>}
          </div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-3">
          <div className="mb-2 text-xs font-medium uppercase tracking-wider text-white/50">Not linked</div>
          <div className="flex flex-wrap gap-2">
            {notLinked.length > 0 ? notLinked.map((i) => pill(i, false)) : <span className="text-sm text-white/40">—</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

function PrinciplesByLevel({
  moduleId,
  itemName,
  itemPrincipleContent,
  onEditPrinciple,
}: {
  moduleId: string;
  itemName: string;
  itemPrincipleContent: Record<string, string>;
  onEditPrinciple: (principleId: string) => void;
}) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-4 pt-4 border-t border-white/10">
      <h3 className="text-sm font-medium text-white/90">Principles</h3>
      {PRINCIPLES_BY_LEVEL.map(({ level, principles }) => (
        <div key={level}>
          <div className="mb-2 text-xs font-medium uppercase tracking-wider text-white/50">{level}</div>
          <div className="space-y-1">
            {principles.map(({ id, label }) => {
              const contentKey = `${moduleId}|${itemName}|${id}`;
              const userContent = itemPrincipleContent[contentKey] ?? "";
              const isExpanded = expanded.has(id);
              return (
                <div key={id} className="rounded-lg border border-white/10 overflow-hidden">
                  <div className="flex items-center px-3 py-2">
                    <button
                      type="button"
                      onClick={() => toggle(id)}
                      className="flex flex-1 items-center text-left text-sm hover:bg-white/5 -mx-2 px-2 py-1 rounded"
                    >
                      <span className="font-medium text-white/70 shrink-0">{id}</span>
                      <span className="flex-1 ml-2 text-white/90 truncate">{label}</span>
                      <span className="text-white/40 text-xs ml-2 shrink-0">{userContent ? "•" : "—"}</span>
                      <span className="ml-2 text-white/50 shrink-0">{isExpanded ? "▼" : "▶"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); onEditPrinciple(id); }}
                      className="text-xs text-white/50 hover:text-white shrink-0 ml-1"
                    >
                      Edit
                    </button>
                  </div>
                  {isExpanded && (
                    <div className="px-3 py-2 border-t border-white/10 bg-white/5 text-sm text-white/80 whitespace-pre-wrap">
                      {userContent || <span className="text-white/40">No notes yet.</span>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function FullPlanSection({
  itemName,
  itemPrincipleContent,
  moduleId,
  onEditPrinciple,
}: {
  itemName: string;
  itemPrincipleContent: Record<string, string>;
  moduleId: string;
  onEditPrinciple: (principleId: string) => void;
}) {
  return (
    <div className="mt-12 w-full max-w-2xl mx-auto px-4 pb-12 print:mt-0" id="action-plan">
      <h2 className="text-xl font-semibold text-white mb-6">{itemName} — Action Plan</h2>
      <div className="space-y-6">
        {PRINCIPLES_BY_LEVEL.map(({ level, principles }) => (
          <div key={level}>
            <h3 className="text-sm font-medium text-white/80 mb-3">{level}</h3>
            <div className="space-y-4">
              {principles.map(({ id, label }) => {
                const contentKey = `${moduleId}|${itemName}|${id}`;
                const userContent = itemPrincipleContent[contentKey] ?? "";
                return (
                  <div key={id} className="rounded-lg border border-white/15 bg-white/5 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white/90">{id}</span>
                      <span className="text-sm text-white/70">{label}</span>
                      <button
                        type="button"
                        onClick={() => onEditPrinciple(id)}
                        className="text-xs text-white/50 hover:text-white"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="text-sm text-white/80 whitespace-pre-wrap min-h-[2em]">
                      {userContent || <span className="text-white/40 italic">No notes yet.</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-8 text-xs text-white/50">You can print this page to save or share your action plan.</p>
    </div>
  );
}

function LinkedSummary({
  activeItem,
  moduleItems,
  isLinked,
}: {
  activeItem: { moduleId: string; item: string };
  moduleItems: Record<string, ModuleItem[]>;
  isLinked: (targetModuleId: string, targetItem: string) => boolean;
}) {
  const getLinkedFor = (targetModuleId: string) =>
    (moduleItems[targetModuleId] ?? []).filter((tgtItem) => isLinked(targetModuleId, tgtItem.name));

  const sections = (LINK_TARGETS[activeItem.moduleId] ?? []).map((targetModuleId) => {
    const targetModule = MODULES.find((m) => m.id === targetModuleId);
    const linked = getLinkedFor(targetModuleId);
    return { targetModule, linked };
  }).filter((s) => s.targetModule && s.linked.length > 0);

  if (sections.length === 0) {
    return (
      <p className="text-sm text-white/60">No links yet. Click Edit links to add Life Roles, Shared Growth, or Situations.</p>
    );
  }

  return (
    <div className="space-y-4">
      {sections.map(({ targetModule, linked }) => (
        <div key={targetModule!.id}>
          <h3 className="mb-2 text-sm font-medium text-white/90">{targetModule!.title}</h3>
          <div className="flex flex-wrap gap-2">
            {linked.map((item) => (
              <span
                key={item.id}
                className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-sm text-white"
              >
                {item.name} ✓
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function RightPanel({
  title,
  onBack,
  children,
}: {
  title: string;
  onBack: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col rounded-xl border border-white/20 bg-white/5 overflow-hidden max-h-[85vh]">
      <div className="flex items-center justify-between border-b border-white/12 px-5 py-4 shrink-0">
        <h2 className="m-0 text-lg font-semibold text-white">{title}</h2>
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border border-white/20 px-3 py-1.5 text-sm text-white/80 hover:bg-white/10 hover:text-white"
        >
          Back to dashboard
        </button>
      </div>
      <div className="flex-1 overflow-auto px-6 py-5 text-[17px] leading-relaxed">{children}</div>
    </div>
  );
}

function ItemList({
  items,
  maxCount,
  onItemClick,
}: {
  items: string[];
  maxCount: number;
  onItemClick?: (item: string) => void;
}) {
  const shown = items.slice(0, maxCount);
  const leftItems = shown.filter((_, i) => i % 2 === 0);
  const rightItems = shown.filter((_, i) => i % 2 === 1);
  const renderItem = (item: string) =>
    onItemClick ? (
      <button
        type="button"
        onClick={() => onItemClick(item)}
        className="w-full text-left text-sm text-white/90 hover:text-white"
      >
        {item}
      </button>
    ) : (
      <span className="text-sm text-white/90">{item}</span>
    );
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
      <ul className="space-y-1.5">
        {leftItems.map((item) => (
          <li key={item}>{renderItem(item)}</li>
        ))}
      </ul>
      <ul className="space-y-1.5">
        {rightItems.map((item) => (
          <li key={item}>{renderItem(item)}</li>
        ))}
      </ul>
    </div>
  );
}

function AddLightbox({
  moduleTitle,
  currentItems,
  suggestions,
  groupedSuggestions,
  onAdd,
  onClose,
}: {
  moduleTitle: string;
  currentItems: string[];
  suggestions: string[];
  groupedSuggestions?: Record<string, string[]>;
  onAdd: (item: string) => void;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");

  const trimmed = query.trim().toLowerCase();
  const matchesFilter = (s: string) =>
    !currentItems.includes(s) && (!trimmed || s.toLowerCase().includes(trimmed));
  const exactMatchInSuggestions = trimmed && suggestions.some((s) => s.toLowerCase() === trimmed);
  const canAddNew = query.trim() && !currentItems.includes(query.trim()) && !exactMatchInSuggestions;

  const handleSelect = (item: string) => {
    onAdd(item);
    onClose();
  };

  const renderMatches = () => {
    if (groupedSuggestions) {
      return Object.entries(groupedSuggestions).map(([groupName, items]) => {
        const groupMatches = items.filter(matchesFilter);
        if (groupMatches.length === 0) return null;
        return (
          <div key={groupName}>
            <div className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-white/50 bg-white/5">
              {groupName}
            </div>
            {groupMatches.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => handleSelect(s)}
                className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-white/90 hover:bg-white/10 hover:text-white"
              >
                {s}
              </button>
            ))}
          </div>
        );
      });
    }
    const flatMatches = suggestions.filter(matchesFilter);
    return flatMatches.map((s) => (
      <button
        key={s}
        type="button"
        onClick={() => handleSelect(s)}
        className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-white/90 hover:bg-white/10 hover:text-white"
      >
        {s}
      </button>
    ));
  };

  const hasMatches = groupedSuggestions
    ? Object.values(groupedSuggestions).some((items) => items.some(matchesFilter))
    : suggestions.some(matchesFilter);

  return (
    <Lightbox title={`Add ${moduleTitle}`} onClose={onClose} maxWidth={400}>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type to search or add new…"
          className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white placeholder:text-white/40"
        />
        <div className="max-h-80 overflow-auto rounded-lg border border-white/10">
          <div className="divide-y divide-white/10">
            {canAddNew && (
              <button
                type="button"
                onClick={() => handleSelect(query.trim())}
                className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-emerald-400 hover:bg-white/10"
              >
                + Add new: {query.trim()}
              </button>
            )}
            {renderMatches()}
            {!hasMatches && !canAddNew && !trimmed && (
              <div className="px-3 py-4 text-center text-sm text-white/50">Type to search or add a new role</div>
            )}
          </div>
        </div>
      </div>
    </Lightbox>
  );
}

function ModuleCard({
  moduleId,
  title,
  description,
  items,
  onItemClick,
  onAdd,
  onInfoClick,
}: {
  moduleId: string;
  title: string;
  description: string;
  items: string[];
  onItemClick?: (item: string) => void;
  onAdd: () => void;
  onInfoClick?: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = items.length > 6;

  return (
    <div className="rounded-xl border border-white/20 bg-white/5 p-5 text-left transition-colors hover:bg-white/5 hover:border-white/30">
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          {onInfoClick != null && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onInfoClick(); }}
              className="shrink-0 w-[15px] h-[15px] rounded-full border border-white/40 bg-white text-black flex items-center justify-center text-[10px] font-semibold leading-none hover:bg-white/90"
              aria-label="More information"
            >
              i
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="shrink-0 rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
        >
          + Add
        </button>
      </div>
      <p className="text-sm text-white/80 leading-relaxed mb-3">{description}</p>
      <ItemList
        items={items}
        maxCount={hasMore && !expanded ? 6 : items.length}
        onItemClick={CONTENT_ONLY_MODULES.includes(moduleId) ? onItemClick : undefined}
      />
      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="mt-3 flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors"
          aria-expanded={expanded}
        >
          {expanded ? (
            <>
              <span className="inline-block rotate-180">▼</span>
              Show less
            </>
          ) : (
            <>
              <span>▼</span>
              Expand ({items.length - 6} more)
            </>
          )}
        </button>
      )}
    </div>
  );
}

type ModuleItem = { id: string; name: string; parent_item_id?: string | null };

function NestingModuleCard({
  moduleId,
  title,
  description,
  topLevelItems,
  getChildren,
  onItemClick,
  onAdd,
  onInfoClick,
}: {
  moduleId: "wants" | "transformations";
  title: string;
  description: string;
  topLevelItems: ModuleItem[];
  getChildren: (parentId: string, childModuleId: string) => ModuleItem[];
  onItemClick: (item: string, moduleId: string) => void;
  onAdd?: () => void;
  onInfoClick?: () => void;
}) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const renderRow = (item: ModuleItem, itemModuleId: string, depth: number) => {
    const childMod = CHILD_MODULE[itemModuleId];
    const children = childMod ? getChildren(item.id, childMod) : [];
    const hasChildren = children.length > 0;
    const isExpanded = expandedIds.has(item.id);

    return (
      <div key={item.id} className={depth > 0 ? "pl-4" : ""}>
        <div className="flex items-center gap-1.5 py-1">
          {hasChildren ? (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); toggleExpanded(item.id); }}
              className="shrink-0 text-white/60 hover:text-white p-0.5 leading-none"
              aria-expanded={isExpanded}
            >
              {isExpanded ? "▼" : "▶"}
            </button>
          ) : (
            <span className="w-4 shrink-0 inline-block" aria-hidden />
          )}
          <button
            type="button"
            onClick={() => onItemClick(item.name, itemModuleId)}
            className="text-left text-sm text-white/90 hover:text-white flex-1 min-w-0 truncate"
          >
            {item.name}
          </button>
        </div>
        {hasChildren && isExpanded && (
          <div className="space-y-0">
            {children.map((child) => renderRow(child, childMod, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="rounded-xl border border-white/20 bg-white/5 p-5 text-left transition-colors hover:bg-white/5 hover:border-white/30">
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          {onInfoClick != null && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onInfoClick(); }}
              className="shrink-0 w-[15px] h-[15px] rounded-full border border-white/40 bg-white text-black flex items-center justify-center text-[10px] font-semibold leading-none hover:bg-white/90"
              aria-label="More information"
            >
              i
            </button>
          )}
        </div>
        {onAdd != null && (
          <button
            type="button"
            onClick={onAdd}
            className="shrink-0 rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
          >
            + Add
          </button>
        )}
      </div>
      <p className="text-sm text-white/80 leading-relaxed mb-3">{description}</p>
      <div className="space-y-0">
        {topLevelItems.length === 0 ? (
          <p className="text-sm text-white/50">None yet.{onAdd != null ? " Add one above." : " Promote a situation to add one."}</p>
        ) : (
          topLevelItems.map((item) => renderRow(item, moduleId, 0))
        )}
      </div>
    </div>
  );
}

const emptyModuleItems: Record<string, ModuleItem[]> = {
  "life-roles": [],
  "shared-growth": [],
  "situations": [],
  "wants": [],
  "transformations": [],
};

const CHILD_MODULE: Record<string, string> = {
  wants: "situations",
  transformations: "wants",
};

type ModulesTabId = "roles" | "work" | "all";

const MODULES_TABS: { id: ModulesTabId; label: string; moduleIds: string[] }[] = [
  { id: "roles", label: "Roles & Relationships", moduleIds: ["life-roles", "shared-growth"] },
  { id: "work", label: "Meaningful Work", moduleIds: ["situations", "wants", "transformations"] },
  { id: "all", label: "Total System View", moduleIds: ["life-roles", "shared-growth", "situations", "wants", "transformations"] },
];

type RightPanelView =
  | { type: "dashboard" }
  | { type: "item-detail"; item: string; moduleId: string; mode: "editing" | "summary" }
  | { type: "add-item"; moduleId: "life-roles" | "shared-growth" | "situations" | "wants" | "transformations" };

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loadKey, setLoadKey] = useState(0);
  const [moduleItems, setModuleItems] = useState<Record<string, ModuleItem[]>>(emptyModuleItems);
  const [rightPanel, setRightPanel] = useState<RightPanelView>({ type: "dashboard" });
  const [addUnderParentId, setAddUnderParentId] = useState<string | null>(null);
  const [showMoveModal, setShowMoveModal] = useState(false);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [links, setLinks] = useState<Set<string>>(new Set());
  const [itemPrincipleContent, setItemPrincipleContentState] = useState<Record<string, string>>({});
  const [openPrincipleId, setOpenPrincipleId] = useState<string | null>(null);
  const [modulesTab, setModulesTab] = useState<ModulesTabId>("work");
  const [addItemDraft, setAddItemDraft] = useState("");
  const [linkNewItemTo, setLinkNewItemTo] = useState<{ moduleId: string; item: string } | null>(null);
  const [showSituationsInfo, setShowSituationsInfo] = useState(false);
  const [showWantsInfo, setShowWantsInfo] = useState(false);
  const [showTransformationsInfo, setShowTransformationsInfo] = useState(false);
  const [showLifeRolesInfo, setShowLifeRolesInfo] = useState(false);
  const [showSharedGrowthInfo, setShowSharedGrowthInfo] = useState(false);
  const [showDashboardInfo, setShowDashboardInfo] = useState(false);
  const [dashboardInfoDontShowAgain, setDashboardInfoDontShowAgain] = useState(false);
  const [openCompassFrameworkTrigger, setOpenCompassFrameworkTrigger] = useState(0);

  /** Debounce timeouts for principle content: only persist after user stops typing so out-of-order upserts don't truncate content. */
  const principleContentSaveTimeouts = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const getItemId = (moduleId: string, name: string) =>
    (moduleItems[moduleId] ?? []).find((i) => i.name === name)?.id;

  const linkKey = (srcMod: string, srcItem: string, tgtMod: string, tgtItem: string) => {
    const fromId = getItemId(srcMod, srcItem);
    const toId = getItemId(tgtMod, tgtItem);
    if (!fromId || !toId) return "";
    return `${fromId}|${toId}`;
  };

  useEffect(() => {
    setLoadError(null);
    const supabase = createClient();
    (async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.replace("/auth/login?next=/dashboard");
          setLoading(false);
          return;
        }
        const { data: itemsRows } = await supabase
          .from("module_items")
          .select("id, module_id, name, sort_order, parent_item_id")
          .eq("user_id", user.id)
          .order("sort_order");
        const { data: linksRows } = await supabase
          .from("links")
          .select("from_item_id, to_item_id")
          .eq("user_id", user.id);
        const { data: spcRows } = await supabase
          .from("item_principle_content")
          .select("item_id, principle_id, content")
          .eq("user_id", user.id);

        const itemsByModule: Record<string, ModuleItem[]> = {
          "life-roles": [],
          "shared-growth": [],
          "situations": [],
          "wants": [],
          "transformations": [],
        };
        const idToModuleAndName: Record<string, { moduleId: string; name: string }> = {};
        (itemsRows ?? []).forEach((r) => {
          const moduleId = r.module_id as string;
          const arr = itemsByModule[moduleId] ?? [];
          arr.push({
            id: r.id,
            name: r.name,
            parent_item_id: r.parent_item_id ?? undefined,
          });
          itemsByModule[moduleId] = arr;
          idToModuleAndName[r.id] = { moduleId, name: r.name };
        });

        // Ensure default life role "Personal Growth" exists and is first
        const lifeRoles = itemsByModule["life-roles"] ?? [];
        if (!lifeRoles.some((i) => i.name === DEFAULT_LIFE_ROLE_NAME)) {
          const { data: inserted } = await supabase
            .from("module_items")
            .insert({
              user_id: user.id,
              module_id: "life-roles",
              name: DEFAULT_LIFE_ROLE_NAME,
              sort_order: -1,
            })
            .select("id, name, parent_item_id")
            .single();
          if (inserted) {
            const defaultItem: ModuleItem = {
              id: inserted.id,
              name: inserted.name,
              parent_item_id: inserted.parent_item_id ?? undefined,
            };
            itemsByModule["life-roles"] = [defaultItem, ...lifeRoles];
            idToModuleAndName[inserted.id] = { moduleId: "life-roles", name: inserted.name };
          }
        }

        setModuleItems(itemsByModule);

        const linkSet = new Set<string>();
        (linksRows ?? []).forEach((r) => linkSet.add(`${r.from_item_id}|${r.to_item_id}`));
        setLinks(linkSet);

        const itemContent: Record<string, string> = {};
        (spcRows ?? []).forEach((r) => {
          const meta = idToModuleAndName[r.item_id];
          if (meta) itemContent[`${meta.moduleId}|${meta.name}|${r.principle_id}`] = r.content ?? "";
        });
        setItemPrincipleContentState(itemContent);
      } catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        setLoadError(message);
        console.error("Dashboard load error:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, [router, loadKey]);

  const DASHBOARD_INFO_STORAGE_KEY = "compass-dashboard-info";
  const DASHBOARD_INFO_MAX_AUTO_OPENS = 4;

  useEffect(() => {
    if (loading || typeof window === "undefined") return;
    const raw = localStorage.getItem(DASHBOARD_INFO_STORAGE_KEY);
    const data = raw ? JSON.parse(raw) : { dismissed: false, autoOpenCount: 0 };
    if (data.dismissed || (data.autoOpenCount ?? 0) >= DASHBOARD_INFO_MAX_AUTO_OPENS) return;
    const t = setTimeout(() => {
      setDashboardInfoDontShowAgain(false);
      setShowDashboardInfo(true);
      localStorage.setItem(
        DASHBOARD_INFO_STORAGE_KEY,
        JSON.stringify({ ...data, autoOpenCount: (data.autoOpenCount ?? 0) + 1 })
      );
    }, 400);
    return () => clearTimeout(t);
  }, [loading]);

  const setItemPrincipleContent = (moduleId: string, itemName: string, principle: string, content: string) => {
    const key = `${moduleId}|${itemName}|${principle}`;
    setItemPrincipleContentState((prev) => ({ ...prev, [key]: content }));

    const doPersist = async () => {
      const itemId = getItemId(moduleId, itemName);
      if (!itemId) return;
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      await supabase
        .from("item_principle_content")
        .upsert(
          { user_id: user.id, item_id: itemId, principle_id: principle, content },
          { onConflict: "user_id,item_id,principle_id" }
        );
    };

    const t = principleContentSaveTimeouts.current[key];
    if (t) clearTimeout(t);
    principleContentSaveTimeouts.current[key] = setTimeout(() => {
      delete principleContentSaveTimeouts.current[key];
      doPersist();
    }, 500);
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/");
    router.refresh();
  };

  const activeItem = rightPanel.type === "item-detail" ? rightPanel : null;

  const addItem = async (moduleId: string, item: string, parentItemId?: string | null) => {
    const list = moduleItems[moduleId] ?? [];
    if (list.some((i) => i.name === item)) return;
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const payload: Record<string, unknown> = {
      user_id: user.id,
      module_id: moduleId,
      name: item,
      sort_order: list.length,
    };
    if (parentItemId) payload.parent_item_id = parentItemId;
    const { data: inserted, error } = await supabase
      .from("module_items")
      .insert(payload)
      .select("id, name, parent_item_id")
      .single();
    if (error) return undefined;
    setModuleItems((prev) => ({
      ...prev,
      [moduleId]: [
        ...(prev[moduleId] ?? []),
        { id: inserted.id, name: inserted.name, parent_item_id: inserted.parent_item_id ?? undefined },
      ],
    }));
    return inserted.id as string;
  };

  const handleItemClick = (item: string, moduleId: string) => {
    setRightPanel({ type: "item-detail", item, moduleId, mode: "editing" });
    setEditedName(item);
  };

  const backToDashboard = () => setRightPanel({ type: "dashboard" });

  const setItemDetailMode = (mode: "editing" | "summary") => {
    setRightPanel((prev) =>
      prev.type === "item-detail" ? { ...prev, mode } : prev
    );
  };

  const hasLinkBetween = (id1: string, id2: string) =>
    links.has(`${id1}|${id2}`) || links.has(`${id2}|${id1}`);

  const idToMeta = useMemo(() => {
    const m: Record<string, { moduleId: string; name: string }> = {};
    Object.entries(moduleItems).forEach(([mod, arr]) =>
      arr.forEach((i) => { m[i.id] = { moduleId: mod, name: i.name }; })
    );
    return m;
  }, [moduleItems]);

  const getLinkedIds = (itemId: string): string[] => {
    const out: string[] = [];
    links.forEach((key) => {
      const [a, b] = key.split("|");
      if (a === itemId) out.push(b);
      else if (b === itemId) out.push(a);
    });
    return out;
  };

  /** True when the item has content in all three Level 1 principles (P1, P2, P3). Used to gate promotion to Want/Transformation. */
  const hasCompletedLevel1 = (moduleId: string, itemName: string): boolean => {
    const p1 = (itemPrincipleContent[`${moduleId}|${itemName}|P1`] ?? "").trim();
    const p2 = (itemPrincipleContent[`${moduleId}|${itemName}|P2`] ?? "").trim();
    const p3 = (itemPrincipleContent[`${moduleId}|${itemName}|P3`] ?? "").trim();
    return p1.length > 0 && p2.length > 0 && p3.length > 0;
  };

  const getAllItemIds = () => {
    const ids: string[] = [];
    Object.values(moduleItems).forEach((arr) => arr.forEach((i) => ids.push(i.id)));
    return ids;
  };

  const isLinked = (targetModuleId: string, targetItem: string) => {
    if (!activeItem) return false;
    const activeId = getItemId(activeItem.moduleId, activeItem.item);
    const targetId = getItemId(targetModuleId, targetItem);
    if (!activeId || !targetId) return false;
    if (hasLinkBetween(activeId, targetId)) return true;
    const directlyLinkedIds = getAllItemIds().filter((id) => hasLinkBetween(activeId, id));
    return directlyLinkedIds.some((midId) => hasLinkBetween(midId, targetId));
  };

  const toggleLink = async (targetModuleId: string, targetItem: string) => {
    if (!activeItem) return;
    const fromId = getItemId(activeItem.moduleId, activeItem.item);
    const toId = getItemId(targetModuleId, targetItem);
    if (!fromId || !toId) return;
    const key1 = `${fromId}|${toId}`;
    const key2 = `${toId}|${fromId}`;
    const linked = hasLinkBetween(fromId, toId);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    if (linked) {
      await supabase.from("links").delete().eq("user_id", user.id).eq("from_item_id", fromId).eq("to_item_id", toId);
      await supabase.from("links").delete().eq("user_id", user.id).eq("from_item_id", toId).eq("to_item_id", fromId);
    } else {
      await supabase.from("links").insert({
        user_id: user.id,
        from_item_id: fromId,
        to_item_id: toId,
      });
    }
    setLinks((prev) => {
      const next = new Set(prev);
      next.delete(key1);
      next.delete(key2);
      if (!linked) next.add(key1);
      return next;
    });
  };

  const ensureLink = async (fromModuleId: string, fromItem: string, toModuleId: string, toItem: string) => {
    const fromId = getItemId(fromModuleId, fromItem);
    const toId = getItemId(toModuleId, toItem);
    if (!fromId || !toId || hasLinkBetween(fromId, toId)) return;
    await ensureLinkById(fromId, toId);
  };

  const ensureLinkById = async (fromId: string, toId: string) => {
    if (!fromId || !toId || hasLinkBetween(fromId, toId)) return;
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("links").insert({
      user_id: user.id,
      from_item_id: fromId,
      to_item_id: toId,
    });
    setLinks((prev) => new Set(prev).add(`${fromId}|${toId}`));
  };

  const updateItemName = async (moduleId: string, currentName: string, newName: string) => {
    if (moduleId === "life-roles" && currentName === DEFAULT_LIFE_ROLE_NAME) return;
    const trimmed = newName.trim();
    if (!trimmed || trimmed === currentName) return;
    const itemObj = (moduleItems[moduleId] ?? []).find((i) => i.name === currentName);
    if (!itemObj) return;
    const supabase = createClient();
    await supabase.from("module_items").update({ name: trimmed }).eq("id", itemObj.id);
    setModuleItems((prev) => ({
      ...prev,
      [moduleId]: (prev[moduleId] ?? []).map((i) =>
        i.id === itemObj.id ? { ...i, name: trimmed } : i
      ),
    }));
    setRightPanel((prev) =>
      prev.type === "item-detail" && prev.item === currentName ? { ...prev, item: trimmed } : prev
    );
    if (PRINCIPLE_CONTENT_MODULES.includes(moduleId)) {
      setItemPrincipleContentState((prev) => {
        const prefix = `${moduleId}|${currentName}|`;
        const newPrefix = `${moduleId}|${trimmed}|`;
        const next = { ...prev };
        Object.keys(prev).forEach((k) => {
          if (k.startsWith(prefix)) {
            const principle = k.slice(prefix.length);
            next[newPrefix + principle] = prev[k];
            delete next[k];
          }
        });
        return next;
      });
    }
  };

  const getChildren = (parentId: string, childModuleId: string) =>
    (moduleItems[childModuleId] ?? []).filter((i) => i.parent_item_id === parentId);

  const promoteItem = async (moduleId: string, itemName: string) => {
    const itemObj = (moduleItems[moduleId] ?? []).find((i) => i.name === itemName);
    if (!itemObj) return;
    const supabase = createClient();
    let newModuleId: string;
    let newParentId: string | null = null;
    if (moduleId === "situations") newModuleId = "wants";
    else if (moduleId === "wants") newModuleId = "transformations";
    else return;
    if (moduleId === "situations" && itemObj.parent_item_id) {
      const parentWant = (moduleItems["wants"] ?? []).find((i) => i.id === itemObj.parent_item_id);
      newParentId = parentWant?.parent_item_id ?? null;
    }
    if (moduleId === "wants") {
      const children = getChildren(itemObj.id, "situations");
      for (const c of children) {
        await supabase.from("module_items").update({ parent_item_id: null }).eq("id", c.id);
      }
      setModuleItems((prev) => ({
        ...prev,
        situations: (prev.situations ?? []).map((i) =>
          i.parent_item_id === itemObj.id ? { ...i, parent_item_id: undefined } : i
        ),
      }));
    }
    await supabase.from("module_items").update({ module_id: newModuleId, parent_item_id: newParentId }).eq("id", itemObj.id);
    setModuleItems((prev) => ({
      ...prev,
      [moduleId]: (prev[moduleId] ?? []).filter((i) => i.id !== itemObj.id),
      [newModuleId]: [
        ...(prev[newModuleId] ?? []).filter((i) => i.id !== itemObj.id),
        { ...itemObj, name: itemObj.name, parent_item_id: newParentId ?? undefined },
      ],
    }));
    setRightPanel((prev) => (prev.type === "item-detail" && prev.item === itemName ? { ...prev, moduleId: newModuleId } : prev));
  };

  const demoteItem = async (moduleId: string, itemName: string) => {
    const itemObj = (moduleItems[moduleId] ?? []).find((i) => i.name === itemName);
    if (!itemObj) return;
    const supabase = createClient();
    let newModuleId: string;
    if (moduleId === "transformations") newModuleId = "wants";
    else if (moduleId === "wants") newModuleId = "situations";
    else return;
    const childModuleId = CHILD_MODULE[moduleId];
    const children = getChildren(itemObj.id, childModuleId);
    for (const c of children) {
      await supabase.from("module_items").update({ parent_item_id: null }).eq("id", c.id);
    }
    setModuleItems((prev) => ({
      ...prev,
      [childModuleId]: (prev[childModuleId] ?? []).map((i) =>
        i.parent_item_id === itemObj.id ? { ...i, parent_item_id: undefined } : i
      ),
    }));
    await supabase.from("module_items").update({ module_id: newModuleId, parent_item_id: null }).eq("id", itemObj.id);
    setModuleItems((prev) => ({
      ...prev,
      [moduleId]: (prev[moduleId] ?? []).filter((i) => i.id !== itemObj.id),
      [newModuleId]: [...(prev[newModuleId] ?? []).filter((i) => i.id !== itemObj.id), { ...itemObj, parent_item_id: undefined }],
    }));
    setRightPanel((prev) => (prev.type === "item-detail" && prev.item === itemName ? { ...prev, moduleId: newModuleId } : prev));
  };

  const moveItem = async (moduleId: string, itemName: string, newParentId: string | null) => {
    const itemObj = (moduleItems[moduleId] ?? []).find((i) => i.name === itemName);
    if (!itemObj) return;
    const supabase = createClient();
    await supabase.from("module_items").update({ parent_item_id: newParentId }).eq("id", itemObj.id);
    setModuleItems((prev) => ({
      ...prev,
      [moduleId]: (prev[moduleId] ?? []).map((i) =>
        i.id === itemObj.id ? { ...i, parent_item_id: newParentId ?? undefined } : i
      ),
    }));
  };

  const handleRemoveConfirm = () => {
    if (rightPanel.type === "item-detail") {
      if (rightPanel.moduleId === "life-roles" && rightPanel.item === DEFAULT_LIFE_ROLE_NAME) return;
      removeItem(rightPanel.moduleId, rightPanel.item);
      setShowRemoveConfirm(false);
    }
  };

  const removeItem = async (moduleId: string, item: string) => {
    const itemObj = (moduleItems[moduleId] ?? []).find((i) => i.name === item);
    if (!itemObj) return;
    const supabase = createClient();
    await supabase.from("module_items").delete().eq("id", itemObj.id);
    setModuleItems((prev) => ({
      ...prev,
      [moduleId]: (prev[moduleId] ?? []).filter((i) => i.id !== itemObj.id),
    }));
    setLinks((prev) => {
      const next = new Set<string>();
      prev.forEach((key) => {
        const [fromId, toId] = key.split("|");
        if (fromId === itemObj.id || toId === itemObj.id) return;
        next.add(key);
      });
      return next;
    });
    if (PRINCIPLE_CONTENT_MODULES.includes(moduleId)) {
      setItemPrincipleContentState((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((k) => {
          if (k.startsWith(`${moduleId}|${item}|`)) delete next[k];
        });
        return next;
      });
    }
    backToDashboard();
  };

  const showFullPlan = rightPanel.type === "item-detail" && PRINCIPLE_CONTENT_MODULES.includes(rightPanel.moduleId);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0b0b0c] flex items-center justify-center">
        <p className="text-white/70">Loading…</p>
      </main>
    );
  }

  if (loadError) {
    return (
      <main className="min-h-screen bg-[#0b0b0c] flex flex-col items-center justify-center gap-4 p-6">
        <p className="text-white/90 text-center max-w-md">
          Couldn&apos;t load your dashboard. This often happens when Supabase is still restoring or the connection fails.
        </p>
        <p className="text-white/50 text-sm text-center max-w-md font-mono">{loadError}</p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => { setLoadError(null); setLoading(true); setLoadKey((k) => k + 1); }}
            className="rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20"
          >
            Retry
          </button>
          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20"
          >
            Sign out
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#0b0b0c] text-white flex flex-col">
      <div
        className="flex flex-1 flex-col lg:flex-row lg:justify-center lg:items-start"
        style={{ padding: "min(2vh, 24px)", paddingTop: "min(12vh, 88px)" }}
      >
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <h1 className="font-semibold text-white/95 tracking-wide m-0" style={{ fontSize: "clamp(28px, 4.5vw, 36px)" }}>My Compass Dashboard</h1>
        <button
          type="button"
          onClick={() => { setDashboardInfoDontShowAgain(false); setShowDashboardInfo(true); }}
          className="shrink-0 w-[15px] h-[15px] rounded-full border border-white/40 bg-white text-black flex items-center justify-center text-[10px] font-semibold leading-none hover:bg-white/90"
          aria-label="More information"
        >
          i
        </button>
      </div>
      <div className="absolute top-6 right-6">
        <button
          type="button"
          onClick={handleSignOut}
          className="text-sm text-white/60 hover:text-white"
        >
          Sign out
        </button>
      </div>
      {/* Left: Compass (desktop) | Top (mobile) */}
      <div className="flex-none flex items-center justify-center lg:min-w-0">
        <div className="w-full max-w-full flex justify-center">
          <Compass
            activePrincipleItem={rightPanel.type === "item-detail" && PRINCIPLE_CONTENT_MODULES.includes(rightPanel.moduleId) ? { moduleId: rightPanel.moduleId, name: rightPanel.item } : null}
            itemPrincipleContent={itemPrincipleContent}
            onPrincipleContentChange={setItemPrincipleContent}
            openPrincipleId={openPrincipleId}
            onPrincipleLightboxClose={() => setOpenPrincipleId(null)}
            openCompassFrameworkTrigger={openCompassFrameworkTrigger}
            onOpenLifeRolesInfo={() => setShowLifeRolesInfo(true)}
          />
        </div>
      </div>

      {/* Spacer — desktop only */}
      <div className="hidden lg:block flex-none w-[200px] shrink-0" />

      {/* Right: Tabs + module cards or detail/add panel — top-aligned with compass */}
      <div className="flex-none flex flex-col justify-start pt-6 lg:pt-0 lg:max-w-md w-full">
        {rightPanel.type === "dashboard" && (
          <>
            <div className="flex border-b border-white/20 mb-4" role="tablist" aria-label="Module views">
              {MODULES_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={modulesTab === tab.id}
                  onClick={() => setModulesTab(tab.id)}
                  className={`flex-1 min-w-0 px-2 py-2.5 font-semibold transition-colors border-b-2 -mb-px ${
                    modulesTab === tab.id
                      ? "text-white border-white/80"
                      : "text-white/60 border-transparent hover:text-white/80"
                  }`}
                style={{ fontSize: "clamp(18px, 2.5vw, 22px)" }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              {(MODULES_TABS.find((t) => t.id === modulesTab)?.moduleIds ?? []).map((moduleId) => {
                const m = MODULES.find((mod) => mod.id === moduleId);
                if (!m) return null;
                return m.id === "wants" || m.id === "transformations" ? (
                  <NestingModuleCard
                    key={m.id}
                    moduleId={m.id}
                    title={m.title}
                    description={m.description}
                    topLevelItems={(moduleItems[m.id] ?? []).filter((i) => !i.parent_item_id)}
                    getChildren={getChildren}
                    onItemClick={handleItemClick}
                    onInfoClick={m.id === "wants" ? () => setShowWantsInfo(true) : m.id === "transformations" ? () => setShowTransformationsInfo(true) : undefined}
                  />
                ) : (
                  <ModuleCard
                    key={m.id}
                    moduleId={m.id}
                    title={m.title}
                    description={m.description}
                    items={(moduleItems[m.id] ?? [])
                      .filter((i) => !i.parent_item_id)
                      .sort((a, b) => {
                        if (m.id !== "life-roles") return 0;
                        if (a.name === DEFAULT_LIFE_ROLE_NAME) return -1;
                        if (b.name === DEFAULT_LIFE_ROLE_NAME) return 1;
                        return 0;
                      })
                      .map((i) => i.name)}
                    onItemClick={CONTENT_ONLY_MODULES.includes(m.id) ? (item) => handleItemClick(item, m.id) : undefined}
                    onAdd={() => {
                      setAddUnderParentId(null);
                      setLinkNewItemTo(null);
                      setAddItemDraft("");
                      setRightPanel({ type: "add-item", moduleId: m.id } as RightPanelView);
                    }}
                    onInfoClick={m.id === "life-roles" ? () => setShowLifeRolesInfo(true) : m.id === "shared-growth" ? () => setShowSharedGrowthInfo(true) : m.id === "situations" ? () => setShowSituationsInfo(true) : undefined}
                  />
                );
              })}
            </div>
          </>
        )}

        {rightPanel.type === "add-item" && (() => {
          const moduleId = rightPanel.moduleId;
          const moduleTitles: Record<string, string> = {
            "life-roles": "Life Role",
            "shared-growth": "Shared Growth",
            situations: "Situation",
            wants: "Want",
            transformations: "Transformation",
          };
          const moduleTitle = moduleTitles[moduleId] ?? moduleId;
          const currentItems = (moduleItems[moduleId] ?? []).map((i) => i.name);
          const grouped = moduleId === "life-roles" ? LIFE_ROLES_GROUPED : moduleId === "shared-growth" ? SHARED_GROWTH_GROUPED : SITUATIONS_GROUPED;
          const suggestions = (SUGGESTIONS[moduleId] ?? []) as string[];
          const trimmed = addItemDraft.trim().toLowerCase();
          const matchesFilter = (s: string) =>
            !currentItems.includes(s) && (!trimmed || s.toLowerCase().includes(trimmed));
          const exactMatch = trimmed && suggestions.some((s) => s.toLowerCase() === trimmed);
          const canAddNew = addItemDraft.trim() && !currentItems.includes(addItemDraft.trim()) && !exactMatch;

          const handleAddSelect = async (name: string) => {
            const newId = await addItem(moduleId, name, addUnderParentId ?? undefined);
            if (linkNewItemTo && newId) {
              const fromId = getItemId(linkNewItemTo.moduleId, linkNewItemTo.item);
              if (fromId) await ensureLinkById(fromId, newId);
              setLinkNewItemTo(null);
            }
            setAddUnderParentId(null);
            setEditedName(name);
            setRightPanel({ type: "item-detail", item: name, moduleId, mode: "editing" });
            setAddItemDraft("");
          };

          return (
            <RightPanel
              title={`Add ${moduleTitle}`}
              onBack={() => { setRightPanel({ type: "dashboard" }); setAddItemDraft(""); setAddUnderParentId(null); setLinkNewItemTo(null); }}
            >
              <div className="flex flex-col gap-4">
                <label className="text-sm text-white/80">
                  Name
                  <input
                    type="text"
                    value={addItemDraft}
                    onChange={(e) => setAddItemDraft(e.target.value)}
                    placeholder="Type to search or add new…"
                    className="mt-1 block w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white placeholder:text-white/40"
                  />
                </label>
                <div className="max-h-72 overflow-auto rounded-lg border border-white/10 divide-y divide-white/10">
                  {canAddNew && (
                    <button
                      type="button"
                      onClick={() => handleAddSelect(addItemDraft.trim())}
                      className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-emerald-400 hover:bg-white/10"
                    >
                      + Add new: {addItemDraft.trim()}
                    </button>
                  )}
                  {Object.entries(grouped).map(([groupName, items]) => {
                    const groupMatches = items.filter(matchesFilter);
                    if (groupMatches.length === 0) return null;
                    return (
                      <div key={groupName}>
                        <div className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-white/50 bg-white/5 sticky top-0">
                          {groupName}
                        </div>
                        {groupMatches.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => handleAddSelect(s)}
                            className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-white/90 hover:bg-white/10 hover:text-white"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    );
                  })}
                  {!Object.values(grouped).some((items) => items.some(matchesFilter)) && !canAddNew && !trimmed && (
                    <div className="px-3 py-4 text-center text-sm text-white/50">
                      Type to search or add a new {moduleId === "life-roles" ? "role" : moduleId === "shared-growth" ? "person" : "situation, want, or transformation"}
                    </div>
                  )}
                </div>
              </div>
            </RightPanel>
          );
        })()}

        {rightPanel.type === "item-detail" && (
          <RightPanel title={rightPanel.item} onBack={backToDashboard}>
            <div className="flex flex-col gap-6">
              <div className="relative">
                <label className="text-sm text-white/80">
                  Name
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    onBlur={() => updateItemName(rightPanel.moduleId, rightPanel.item, editedName)}
                    readOnly={rightPanel.moduleId === "life-roles" && rightPanel.item === DEFAULT_LIFE_ROLE_NAME}
                    className="mt-1 block w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 pr-8 text-white disabled:opacity-80 disabled:cursor-default"
                  />
                </label>
                {rightPanel.moduleId === "life-roles" && rightPanel.item === DEFAULT_LIFE_ROLE_NAME && (
                  <p className="mt-1 text-xs text-white/50">This default role stays as &quot;Personal Growth&quot; as a reminder to keep something in this area.</p>
                )}
                {!(rightPanel.moduleId === "life-roles" && rightPanel.item === DEFAULT_LIFE_ROLE_NAME) && (
                  <button
                    type="button"
                    onClick={() => setShowRemoveConfirm(true)}
                    className="absolute bottom-2 right-2 text-red-400 hover:text-red-300 text-lg leading-none"
                    aria-label="Remove"
                  >
                    ×
                  </button>
                )}
              </div>

              {(rightPanel.moduleId === "life-roles" || rightPanel.moduleId === "shared-growth") ? (() => {
                const itemId = getItemId(rightPanel.moduleId, rightPanel.item);
                const linkedIds = itemId ? getLinkedIds(itemId) : [];
                const linkedItems = linkedIds.map((id) => ({ id, ...idToMeta[id] })).filter((x) => x.moduleId);
                const swt = linkedItems.filter((x) => ["situations", "wants", "transformations"].includes(x.moduleId));
                const byModule = { situations: swt.filter((x) => x.moduleId === "situations"), wants: swt.filter((x) => x.moduleId === "wants"), transformations: swt.filter((x) => x.moduleId === "transformations") };
                const addFromSummary = (moduleId: "situations" | "wants" | "transformations") => {
                  setLinkNewItemTo({ moduleId: rightPanel.moduleId, item: rightPanel.item });
                  setAddUnderParentId(null);
                  setAddItemDraft("");
                  setRightPanel({ type: "add-item", moduleId });
                };
                const Section = ({ title, items, addModuleId, addLabel, showAddButton, onInfoClick }: { title: string; items: { id: string; moduleId: string; name: string }[]; addModuleId: "situations" | "wants" | "transformations"; addLabel: string; showAddButton: boolean; onInfoClick?: () => void }) => (
                  <div className="rounded-lg border border-white/10 p-4">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <h3 className="text-sm font-medium text-white/90">{title}</h3>
                        {onInfoClick != null && (
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); onInfoClick(); }}
                            className="shrink-0 w-[15px] h-[15px] rounded-full border border-white/40 bg-white text-black flex items-center justify-center text-[10px] font-semibold leading-none hover:bg-white/90"
                            aria-label="More information"
                          >
                            i
                          </button>
                        )}
                      </div>
                      {showAddButton && (
                        <button
                          type="button"
                          onClick={() => addFromSummary(addModuleId)}
                          className="text-xs text-white/60 hover:text-white whitespace-nowrap"
                        >
                          + Add {addLabel}
                        </button>
                      )}
                    </div>
                    {items.length === 0 ? (
                      <p className="text-sm text-white/50">None yet.</p>
                    ) : (
                      <ul className="space-y-3">
                        {items.map(({ id, name, moduleId }) => {
                          const otherIds = getLinkedIds(id);
                          const others = otherIds.map((oid) => idToMeta[oid]).filter(Boolean);
                          const lr = others.filter((m) => m.moduleId === "life-roles").map((m) => m.name);
                          const sg = others.filter((m) => m.moduleId === "shared-growth").map((m) => m.name);
                          return (
                            <li key={id} className="border-b border-white/10 pb-3 last:border-0 last:pb-0">
                              <button type="button" onClick={() => handleItemClick(name, moduleId)} className="text-left text-white/95 font-medium hover:text-white hover:underline">
                                {name}
                              </button>
                              <div className="mt-1.5 pl-0 text-sm text-white/70 space-y-0.5">
                                {lr.length > 0 && <div>Connected Life Roles: {lr.join(", ")}</div>}
                                {sg.length > 0 && <div>Shared Growth: {sg.join(", ")}</div>}
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                );
                return (
                  <div className="flex flex-col gap-4">
                    <Section title="Situations" items={byModule.situations} addModuleId="situations" addLabel="situation" showAddButton onInfoClick={() => setShowSituationsInfo(true)} />
                    <Section title="Wants" items={byModule.wants} addModuleId="wants" addLabel="want" showAddButton={false} onInfoClick={() => setShowWantsInfo(true)} />
                    <Section title="Transformations" items={byModule.transformations} addModuleId="transformations" addLabel="transformation" showAddButton={false} onInfoClick={() => setShowTransformationsInfo(true)} />
                    {swt.length === 0 && (
                      <p className="text-sm text-white/60 rounded-lg border border-white/10 p-4">
                        Add above and they’ll be linked to this {rightPanel.moduleId === "life-roles" ? "role" : "person"}.
                      </p>
                    )}
                  </div>
                );
              })() : rightPanel.mode === "editing" ? (
                <>
                  {(rightPanel.moduleId === "wants" || rightPanel.moduleId === "transformations") && (() => {
                    const childModuleId = CHILD_MODULE[rightPanel.moduleId];
                    const childModule = MODULES.find((m) => m.id === childModuleId);
                    const currentItem = (moduleItems[rightPanel.moduleId] ?? []).find((i) => i.name === rightPanel.item);
                    const children = currentItem ? getChildren(currentItem.id, childModuleId) : [];
                    return (
                      <div className="rounded-lg border border-white/10 p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <h3 className="text-sm font-medium text-white/90">Nested {childModule?.title ?? ""}</h3>
                          <button
                            type="button"
                            onClick={() => { setAddUnderParentId(currentItem!.id); setLinkNewItemTo(null); setAddItemDraft(""); setRightPanel({ type: "add-item", moduleId: childModuleId } as RightPanelView); }}
                            className="text-xs text-white/60 hover:text-white"
                          >
                            + Add {childModuleId === "situations" ? "situation" : "want"} under this
                          </button>
                        </div>
                        {children.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {children.map((c) => (
                              <button
                                key={c.id}
                                type="button"
                                onClick={() => handleItemClick(c.name, childModuleId)}
                                className="rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-white/90 hover:bg-white/10"
                              >
                                {c.name}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-white/50">None yet. Add {childModuleId === "situations" ? "situations" : "wants"} to nest under this.</p>
                        )}
                      </div>
                    );
                  })()}
                  {(["situations", "wants"].includes(rightPanel.moduleId)) && (
                    <div className="flex flex-wrap gap-2 items-center">
                      {rightPanel.moduleId === "situations" && (() => {
                        const canPromote = hasCompletedLevel1("situations", rightPanel.item);
                        return (
                          <button
                            type="button"
                            onClick={() => canPromote && promoteItem(rightPanel.moduleId, rightPanel.item)}
                            disabled={!canPromote}
                            title={!canPromote ? "Add content in P1, P2, and P3 to promote." : undefined}
                            className="rounded-lg border border-white/20 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                          >
                            Promote to Want
                          </button>
                        );
                      })()}
                      {rightPanel.moduleId === "wants" && (() => {
                        const canPromote = hasCompletedLevel1("wants", rightPanel.item);
                        return (
                        <>
                          <button type="button" onClick={() => canPromote && promoteItem(rightPanel.moduleId, rightPanel.item)} disabled={!canPromote} title={!canPromote ? "Add content in P1, P2, and P3 to promote." : undefined} className="rounded-lg border border-white/20 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent">Promote to Transformation</button>
                          <button type="button" onClick={() => demoteItem(rightPanel.moduleId, rightPanel.item)} className="rounded-lg border border-white/20 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10">Demote to Situation</button>
                          <button type="button" onClick={() => setShowMoveModal(true)} className="rounded-lg border border-white/20 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10">Move to…</button>
                        </>
                        );
                      })()}
                      {rightPanel.moduleId === "transformations" && (
                        <button type="button" onClick={() => demoteItem(rightPanel.moduleId, rightPanel.item)} className="rounded-lg border border-white/20 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10">Demote to Want</button>
                      )}
                      {rightPanel.moduleId === "situations" && (
                        <button type="button" onClick={() => setShowMoveModal(true)} className="rounded-lg border border-white/20 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10">Move to…</button>
                      )}
                    </div>
                  )}
                  {(LINK_TARGETS[rightPanel.moduleId] ?? []).map((targetModuleId) => {
                    const targetModule = MODULES.find((m) => m.id === targetModuleId);
                    const items = (moduleItems[targetModuleId] ?? []).map((i) => i.name);
                    if (!targetModule) return null;
                    return (
                      <LinkSection
                        key={targetModuleId}
                        title={targetModule.title}
                        moduleId={targetModuleId}
                        items={items}
                        isLinked={isLinked}
                        toggleLink={toggleLink}
                        onAdd={(targetModuleId === "wants" || targetModuleId === "transformations") ? undefined : (id) => {
                          setLinkNewItemTo(rightPanel.type === "item-detail" ? { moduleId: rightPanel.moduleId, item: rightPanel.item } : null);
                          setAddUnderParentId(null);
                          setAddItemDraft("");
                          setRightPanel({ type: "add-item", moduleId: id } as RightPanelView);
                        }}
                      />
                    );
                  })}

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setItemDetailMode("summary")}
                      className="rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
                    >
                      Done
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <LinkedSummary
                    activeItem={rightPanel}
                    moduleItems={moduleItems}
                    isLinked={isLinked}
                  />
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setItemDetailMode("editing")}
                      className="rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
                    >
                      Edit links
                    </button>
                  </div>
                </>
              )}

              {PRINCIPLE_CONTENT_MODULES.includes(rightPanel.moduleId) && (
                <PrinciplesByLevel
                  moduleId={rightPanel.moduleId}
                  itemName={rightPanel.item}
                  itemPrincipleContent={itemPrincipleContent}
                  onEditPrinciple={setOpenPrincipleId}
                />
              )}
            </div>
          </RightPanel>
        )}
      </div>

      {showDashboardInfo && (
        <Lightbox
          title={DASHBOARD_INFO.title}
          onClose={() => {
            if (dashboardInfoDontShowAgain && typeof window !== "undefined") {
              const raw = localStorage.getItem(DASHBOARD_INFO_STORAGE_KEY);
              const data = raw ? JSON.parse(raw) : { dismissed: false, autoOpenCount: 0 };
              localStorage.setItem(DASHBOARD_INFO_STORAGE_KEY, JSON.stringify({ ...data, dismissed: true }));
            }
            setShowDashboardInfo(false);
          }}
          maxWidth={720}
        >
          {renderInfoBlocks(DASHBOARD_INFO.blocks)}
          <p className="m-0 mt-6 text-[17px] text-white/90">
            <button
              type="button"
              onClick={() => {
                setShowDashboardInfo(false);
                setOpenCompassFrameworkTrigger((t) => t + 1);
              }}
              className="border-none bg-transparent p-0 text-inherit font-medium text-white/95 hover:text-white underline underline-offset-2 cursor-pointer"
            >
              Explore the Compass Framework Info Icon Now →
            </button>
          </p>
          <div className="mt-6 pt-4 border-t border-white/12 flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-white/70 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={dashboardInfoDontShowAgain}
                onChange={(e) => setDashboardInfoDontShowAgain(e.target.checked)}
                className="rounded border-white/30"
              />
              Don&apos;t show this again automatically
            </label>
          </div>
        </Lightbox>
      )}

      {showLifeRolesInfo && (
        <Lightbox title={LIFE_ROLES_INFO.title} onClose={() => setShowLifeRolesInfo(false)} maxWidth={720}>
          {renderInfoBlocks(LIFE_ROLES_INFO.blocks)}
        </Lightbox>
      )}

      {showSharedGrowthInfo && (
        <Lightbox title={SHARED_GROWTH_INFO.title} onClose={() => setShowSharedGrowthInfo(false)} maxWidth={720}>
          {renderInfoBlocks(SHARED_GROWTH_INFO.blocks)}
        </Lightbox>
      )}

      {showSituationsInfo && (
        <Lightbox title={SITUATIONS_INFO.title} onClose={() => setShowSituationsInfo(false)} maxWidth={720}>
          {renderInfoBlocks(SITUATIONS_INFO.blocks)}
        </Lightbox>
      )}

      {showWantsInfo && (
        <Lightbox title={WANTS_INFO.title} onClose={() => setShowWantsInfo(false)} maxWidth={720}>
          {renderInfoBlocks(WANTS_INFO.blocks)}
        </Lightbox>
      )}

      {showTransformationsInfo && (
        <Lightbox title={TRANSFORMATIONS_INFO.title} onClose={() => setShowTransformationsInfo(false)} maxWidth={720}>
          {renderInfoBlocks(TRANSFORMATIONS_INFO.blocks)}
        </Lightbox>
      )}

      {showMoveModal && rightPanel.type === "item-detail" && (() => {
        const currentItem = (moduleItems[rightPanel.moduleId] ?? []).find((i) => i.name === rightPanel.item);
        const validParents: { id: string | null; label: string }[] = [{ id: null, label: "Top level" }];
        if (rightPanel.moduleId === "situations") {
          (moduleItems["wants"] ?? []).filter((i) => !i.parent_item_id).forEach((w) => validParents.push({ id: w.id, label: w.name }));
        } else if (rightPanel.moduleId === "wants") {
          (moduleItems["transformations"] ?? []).forEach((t) => validParents.push({ id: t.id, label: t.name }));
        }
        return (
          <Lightbox title="Move to" onClose={() => setShowMoveModal(false)} maxWidth={360}>
            <div className="space-y-2">
              {validParents.map(({ id, label }) => (
                <button
                  key={id ?? "top"}
                  type="button"
                  onClick={() => {
                    if (currentItem) moveItem(rightPanel.moduleId, rightPanel.item, id);
                    setShowMoveModal(false);
                  }}
                  className="block w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-left text-sm text-white hover:bg-white/10"
                >
                  {label}
                </button>
              ))}
            </div>
          </Lightbox>
        );
      })()}

      {showRemoveConfirm && rightPanel.type === "item-detail" && (
        <Lightbox
          title="Remove"
          onClose={() => setShowRemoveConfirm(false)}
          maxWidth={420}
        >
          <div className="flex flex-col gap-4">
            <p className="text-sm text-white/90 leading-relaxed">
              {PRINCIPLE_CONTENT_MODULES.includes(rightPanel.moduleId)
                ? "Removing this will remove any links, nested items, and permanently delete all notes and content you've added."
                : "Removing this will remove any linked items."}
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowRemoveConfirm(false)}
                className="rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRemoveConfirm}
                className="rounded-lg border border-red-500/50 bg-red-500/20 px-4 py-2 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/30"
              >
                Remove
              </button>
            </div>
          </div>
        </Lightbox>
      )}
      </div>

      {showFullPlan && (
        <FullPlanSection
          itemName={rightPanel.item}
          itemPrincipleContent={itemPrincipleContent}
          moduleId={rightPanel.moduleId}
          onEditPrinciple={setOpenPrincipleId}
        />
      )}
    </main>
  );
}
