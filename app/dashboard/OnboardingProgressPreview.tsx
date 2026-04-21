/**
 * Layout-only preview for onboarding progress (demo completion values).
 * Iteration: edit `DEMO_STEPS` or the markup below — toggle via `onboardingPreviewConfig.ts`.
 */

type DemoStep = {
  label: string;
  substeps: number;
  /** How many substeps are complete (0 … substeps). Illustrates partial fills. */
  completed: number;
};

const DEMO_STEPS: DemoStep[] = [
  { label: "Framework", substeps: 2, completed: 0 },
  { label: "Postures", substeps: 4, completed: 0 },
  { label: "Life Roles", substeps: 1, completed: 0 },
  { label: "Connections", substeps: 1, completed: 0 },
  { label: "Situations", substeps: 1, completed: 0 },
];

/**
 * Bar + label share one column. Font size on the column sets `ch`; width ~10% above 11ch
 * (~“Connections” at this font size).
 */
const STEP_COLUMN =
  "shrink-0 flex flex-col items-stretch gap-1.5 text-[9px] sm:text-[10px] w-[12.1ch] min-w-[12.1ch] max-w-[12.1ch]";
const STEP_COLUMN_INLINE =
  "shrink-0 flex flex-col items-stretch gap-1 text-[8px] sm:text-[9px] w-[10.9ch] min-w-[10.9ch] max-w-[10.9ch]";

export function OnboardingProgressPreview({
  frameworkCompletedSubsteps = 0,
}: {
  frameworkCompletedSubsteps?: number;
}) {
  return <OnboardingProgressPreviewWithVariant variant="dashboard" frameworkCompletedSubsteps={frameworkCompletedSubsteps} />;
}

export function OnboardingProgressPreviewWithVariant({
  variant = "dashboard",
  frameworkCompletedSubsteps = 0,
  forceEmptyAll = false,
}: {
  variant?: "dashboard" | "inline" | "lightbox";
  frameworkCompletedSubsteps?: number;
  /** When true, every segment is empty (initial welcome before any checkboxes). */
  forceEmptyAll?: boolean;
}) {
  const isInline = variant === "inline";
  const isLightbox = variant === "lightbox";
  const frameworkCompleted = Math.max(0, Math.min(2, frameworkCompletedSubsteps));
  const steps: DemoStep[] = forceEmptyAll
    ? DEMO_STEPS.map((s) => ({ ...s, completed: 0 }))
    : [{ ...DEMO_STEPS[0], completed: frameworkCompleted }, ...DEMO_STEPS.slice(1)];
  return (
    <div
      className={`${isInline ? "w-max shrink-0 -mt-3" : isLightbox ? "w-full max-w-full mx-auto" : "w-max max-w-[calc(100vw-2rem)] mx-auto mb-3 lg:mb-5 shrink-0 px-1"}`}
    >
      {!isInline ? (
        <>
          <p
            className={`m-0 mb-2 text-center ${
              isLightbox
                ? "text-sm font-semibold tracking-tight text-white/90"
                : "text-[11px] uppercase tracking-[0.14em] text-white/45"
            }`}
          >
            Orientation Progress
            {!isLightbox ? (
              <span className="normal-case tracking-normal text-white/35"> (preview — sample fills)</span>
            ) : null}
          </p>
          {isLightbox ? (
            <p className="m-0 mb-2 text-center text-xs text-white/55">
              Framework → Postures → Life Roles → Connections → Situations
            </p>
          ) : null}
        </>
      ) : (
        <p className="m-0 mb-0 text-center text-[9px] uppercase tracking-[0.12em] text-white/45">
          Orientation progress
        </p>
      )}

      <div
        className={`flex max-w-full flex-nowrap justify-center gap-1 sm:gap-1.5 rounded-lg border border-white/12 bg-white/[0.04] w-max ${isInline ? "p-1 sm:p-1.5 mt-0 mb-0" : isLightbox ? "overflow-x-auto p-2 sm:p-2.5 mx-auto" : "overflow-x-auto p-2 sm:p-2.5 mx-auto"}`}
        role="img"
        aria-label="Orientation progress across Framework, Postures, Life Roles, Connections, and Situations"
      >
        {steps.flatMap((step, index) => {
          const pct = step.substeps > 0 ? Math.min(100, (step.completed / step.substeps) * 100) : 0;
          const column = (
            <div
              key={step.label}
              className={isInline ? STEP_COLUMN_INLINE : STEP_COLUMN}
              title={`${step.label}: ${step.completed}/${step.substeps}`}
            >
              <div className={`${isInline ? "h-1.5 sm:h-2" : "h-2 sm:h-2.5"} w-full rounded-md bg-white/10 overflow-hidden shrink-0`}>
                <div
                  className="h-full rounded-md bg-emerald-400/80 transition-[width] duration-300"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className={`m-0 block w-full text-center text-inherit text-white/60 ${isInline ? "leading-tight" : "leading-snug"} break-words`}>
                {step.label}
              </span>
            </div>
          );
          if (index >= steps.length - 1) return [column];
          return [
            column,
            <span
              key={`onboarding-arrow-${index}`}
              className="shrink-0 self-center px-0.5 text-[10px] sm:text-[11px] font-medium leading-none text-white/35"
              aria-hidden
            >
              →
            </span>,
          ];
        })}
      </div>
    </div>
  );
}
