"use client";

import Compass from "../Compass";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
const MODULES = [
  { id: "life-roles", title: "Life Roles", description: "Your fixed identities—job title, parent, friend, volunteer, business owner.", items: ["Parent", "Software Engineer", "Volunteer", "Friend", "Mentor"] },
  { id: "shared-growth", title: "Shared Growth", description: "The people you share your life with—partner, family, colleagues.", items: ["Partner", "Team", "Kids", "Manager", "Direct reports"] },
  { id: "situations", title: "Situations", description: "Meaningful situations to work through strategically with the Compass.", items: ["Career transition", "Difficult conversation", "New project", "Feedback session", "Conflict resolution", "Team restructure", "Salary negotiation", "Onboarding"] },
];

const SUGGESTIONS: Record<string, string[]> = {
  "life-roles": ["Parent", "Software Engineer", "Volunteer", "Friend", "Mentor", "Manager", "Teacher", "Coach", "Entrepreneur", "Student", "Caregiver", "Spouse"],
  "shared-growth": ["Partner", "Team", "Kids", "Manager", "Direct reports", "Colleagues", "Mentor", "Family", "Friends", "Client", "Stakeholder"],
  "situations": ["Career transition", "Difficult conversation", "New project", "Feedback session", "Conflict resolution", "Team restructure", "Salary negotiation", "Onboarding", "Performance review", "Project deadline", "Remote work", "New role"],
};

const CONTENT_ONLY_MODULES = ["life-roles", "shared-growth", "situations"];

const LINK_TARGETS: Record<string, string[]> = {
  "life-roles": ["shared-growth", "situations"],
  "shared-growth": ["life-roles", "situations"],
  "situations": ["life-roles", "shared-growth"],
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
        <div className="px-6 py-5">{children}</div>
      </div>
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
  situationName,
  situationPrincipleContent,
  onEditPrinciple,
}: {
  situationName: string;
  situationPrincipleContent: Record<string, string>;
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
              const contentKey = `${situationName}|${id}`;
              const userContent = situationPrincipleContent[contentKey] ?? "";
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
  situationName,
  situationPrincipleContent,
  onEditPrinciple,
}: {
  situationName: string;
  situationPrincipleContent: Record<string, string>;
  onEditPrinciple: (principleId: string) => void;
}) {
  return (
    <div className="mt-12 w-full max-w-2xl mx-auto px-4 pb-12 print:mt-0" id="action-plan">
      <h2 className="text-xl font-semibold text-white mb-6">{situationName} — Action Plan</h2>
      <div className="space-y-6">
        {PRINCIPLES_BY_LEVEL.map(({ level, principles }) => (
          <div key={level}>
            <h3 className="text-sm font-medium text-white/80 mb-3">{level}</h3>
            <div className="space-y-4">
              {principles.map(({ id, label }) => {
                const contentKey = `${situationName}|${id}`;
                const userContent = situationPrincipleContent[contentKey] ?? "";
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
  links,
  moduleItems,
  linkKey,
}: {
  activeItem: { moduleId: string; item: string };
  links: Set<string>;
  moduleItems: Record<string, string[]>;
  linkKey: (srcMod: string, srcItem: string, tgtMod: string, tgtItem: string) => string;
}) {
  const getLinkedFor = (targetModuleId: string) =>
    (moduleItems[targetModuleId] ?? []).filter((tgtItem) =>
      links.has(linkKey(activeItem.moduleId, activeItem.item, targetModuleId, tgtItem))
    );

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
                key={item}
                className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-sm text-white"
              >
                {item} ✓
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
  const leftItems = shown.filter((_, i) => i % 6 < 3);
  const rightItems = shown.filter((_, i) => i % 6 >= 3);
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
  onAdd,
  onClose,
}: {
  moduleTitle: string;
  currentItems: string[];
  suggestions: string[];
  onAdd: (item: string) => void;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");

  const trimmed = query.trim();
  const matches = suggestions.filter(
    (s) => !currentItems.includes(s) && (!trimmed || s.toLowerCase().includes(trimmed.toLowerCase()))
  );
  const exactMatchInSuggestions = trimmed && suggestions.some((s) => s.toLowerCase() === trimmed.toLowerCase());
  const canAddNew = trimmed && !currentItems.includes(trimmed) && !exactMatchInSuggestions;

  const handleSelect = (item: string) => {
    onAdd(item);
    onClose();
  };

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
        <div className="max-h-64 overflow-auto rounded-lg border border-white/10">
          <div className="divide-y divide-white/10">
            {canAddNew && (
              <button
                type="button"
                onClick={() => handleSelect(trimmed)}
                className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-emerald-400 hover:bg-white/10"
              >
                + Add new: {trimmed}
              </button>
            )}
            {matches.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => handleSelect(s)}
                className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-white/90 hover:bg-white/10 hover:text-white"
              >
                {s}
              </button>
            ))}
            {matches.length === 0 && !canAddNew && !trimmed && (
              <div className="px-3 py-4 text-center text-sm text-white/50">Type to search suggestions</div>
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
}: {
  moduleId: string;
  title: string;
  description: string;
  items: string[];
  onItemClick?: (item: string) => void;
  onAdd: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = items.length > 6;

  return (
    <div className="rounded-xl border border-white/20 bg-white/5 p-5 text-left transition-colors hover:bg-white/5 hover:border-white/30">
      <h2 className="text-lg font-semibold text-white mb-2">{title}</h2>
      <p className="text-sm text-white/80 leading-relaxed mb-3">{description}</p>
      <button
        type="button"
        onClick={onAdd}
        className="inline-block rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20 mb-4"
      >
        + Add
      </button>
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

const initialItems = Object.fromEntries(MODULES.map((m) => [m.id, [...m.items]]));

type RightPanelView =
  | { type: "dashboard" }
  | { type: "item-detail"; item: string; moduleId: string; mode: "editing" | "summary" };

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [moduleItems, setModuleItems] = useState<Record<string, string[]>>(initialItems);
  const [rightPanel, setRightPanel] = useState<RightPanelView>({ type: "dashboard" });
  const [addLightboxModuleId, setAddLightboxModuleId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState("");
  const [links, setLinks] = useState<Set<string>>(new Set());
  const [situationPrincipleContent, setSituationPrincipleContentState] = useState<Record<string, string>>({});
  const [openPrincipleId, setOpenPrincipleId] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.replace("/auth/login?next=/dashboard");
      }
      setLoading(false);
    });
  }, [router]);

  const setSituationPrincipleContent = (situation: string, principle: string, content: string) => {
    setSituationPrincipleContentState((prev) => ({ ...prev, [`${situation}|${principle}`]: content }));
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/");
    router.refresh();
  };

  const activeItem = rightPanel.type === "item-detail" ? rightPanel : null;

  const addItem = (moduleId: string, item: string) => {
    setModuleItems((prev) => {
      const list = prev[moduleId] ?? [];
      if (list.includes(item)) return prev;
      return { ...prev, [moduleId]: [...list, item] };
    });
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

  const linkKey = (srcMod: string, srcItem: string, tgtMod: string, tgtItem: string) =>
    `${srcMod}|${srcItem}|${tgtMod}|${tgtItem}`;

  const isLinked = (targetModuleId: string, targetItem: string) =>
    !!activeItem && links.has(linkKey(activeItem.moduleId, activeItem.item, targetModuleId, targetItem));

  const toggleLink = (targetModuleId: string, targetItem: string) => {
    if (!activeItem) return;
    const key = linkKey(activeItem.moduleId, activeItem.item, targetModuleId, targetItem);
    setLinks((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const showFullPlan = rightPanel.type === "item-detail" && rightPanel.moduleId === "situations";

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0b0b0c] flex items-center justify-center">
        <p className="text-white/70">Loading…</p>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#0b0b0c] text-white flex flex-col">
      <div
        className="flex flex-1 flex-col lg:flex-row lg:justify-center lg:items-center"
        style={{ padding: "min(2vh, 24px)", paddingTop: "min(6vh, 56px)" }}
      >
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <h1 className="font-semibold text-white/95 tracking-wide m-0" style={{ fontSize: "clamp(28px, 4.5vw, 36px)" }}>My Dashboard</h1>
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
            activeSituation={rightPanel.type === "item-detail" && rightPanel.moduleId === "situations" ? rightPanel.item : null}
            situationPrincipleContent={situationPrincipleContent}
            onSituationPrincipleContentChange={setSituationPrincipleContent}
            openPrincipleId={openPrincipleId}
            onPrincipleLightboxClose={() => setOpenPrincipleId(null)}
          />
        </div>
      </div>

      {/* Spacer — desktop only */}
      <div className="hidden lg:block flex-none w-[200px] shrink-0" />

      {/* Right: Module cards or detail/add panel */}
      <div className="flex-none flex flex-col justify-center pt-6 lg:pt-0 lg:max-w-md">
        {rightPanel.type === "dashboard" && (
          <div className="flex flex-col gap-4">
            {MODULES.map((m) => (
              <ModuleCard
                key={m.id}
                moduleId={m.id}
                title={m.title}
                description={m.description}
                items={moduleItems[m.id] ?? []}
                onItemClick={CONTENT_ONLY_MODULES.includes(m.id) ? (item) => handleItemClick(item, m.id) : undefined}
                onAdd={() => setAddLightboxModuleId(m.id)}
              />
            ))}
          </div>
        )}

        {rightPanel.type === "item-detail" && (
          <RightPanel title={rightPanel.item} onBack={backToDashboard}>
            <div className="flex flex-col gap-6">
              <label className="text-sm text-white/80">
                Name
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white"
                />
              </label>

              {rightPanel.mode === "editing" ? (
                <>
                  {(LINK_TARGETS[rightPanel.moduleId] ?? []).map((targetModuleId) => {
                    const targetModule = MODULES.find((m) => m.id === targetModuleId);
                    const items = moduleItems[targetModuleId] ?? [];
                    if (!targetModule) return null;
                    return (
                      <LinkSection
                        key={targetModuleId}
                        title={targetModule.title}
                        moduleId={targetModuleId}
                        items={items}
                        isLinked={isLinked}
                        toggleLink={toggleLink}
                        onAdd={(id) => setAddLightboxModuleId(id)}
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
                    links={links}
                    moduleItems={moduleItems}
                    linkKey={linkKey}
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

              {rightPanel.moduleId === "situations" && (
                <PrinciplesByLevel
                  situationName={rightPanel.item}
                  situationPrincipleContent={situationPrincipleContent}
                  onEditPrinciple={setOpenPrincipleId}
                />
              )}
            </div>
          </RightPanel>
        )}
      </div>

      {addLightboxModuleId && (
        <AddLightbox
          moduleTitle={MODULES.find((m) => m.id === addLightboxModuleId)?.title ?? ""}
          currentItems={moduleItems[addLightboxModuleId] ?? []}
          suggestions={SUGGESTIONS[addLightboxModuleId] ?? []}
          onAdd={(item) => addItem(addLightboxModuleId, item)}
          onClose={() => setAddLightboxModuleId(null)}
        />
      )}
      </div>

      {showFullPlan && (
        <FullPlanSection
          situationName={rightPanel.item}
          situationPrincipleContent={situationPrincipleContent}
          onEditPrinciple={setOpenPrincipleId}
        />
      )}
    </main>
  );
}
