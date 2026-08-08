"use client";

import * as React from "react";

/** Viewport width (px) below which the app switches to mobile layouts. */
const MOBILE_BREAKPOINT = 768;

const MOBILE_QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

function subscribe(callback: () => void) {
  const mql = window.matchMedia(MOBILE_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(MOBILE_QUERY).matches;
}

function getServerSnapshot() {
  // The server has no viewport; assume desktop and correct on hydration.
  return false;
}

/**
 * Returns `true` when the viewport is narrower than {@link MOBILE_BREAKPOINT}.
 *
 * Used by the sidebar to decide between the fixed desktop rail and the
 * mobile sheet (drawer). Implemented with `useSyncExternalStore` so the
 * value updates on breakpoint changes without effect-driven re-renders.
 */
export function useIsMobile() {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
