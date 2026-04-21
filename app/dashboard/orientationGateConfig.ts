/**
 * Orientation gating: most navigation is off until the full sequence is done.
 *
 * Development: set NEXT_PUBLIC_ORIENTATION_GATE_OFF=1 in .env.local to use the app without gates.
 */

export function isOrientationComplete(): boolean {
  // TODO: return true when every orientation step is finished (persisted).
  return false;
}

/** When true, block module UI and compass graphic lightbox entry points (except rotation + Framework ⓘ). */
export function isOrientationNavigationLocked(): boolean {
  if (process.env.NEXT_PUBLIC_ORIENTATION_GATE_OFF === "1") {
    return false;
  }
  return !isOrientationComplete();
}
