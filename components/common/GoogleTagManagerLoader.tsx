"use client";

import { useEffect, useRef } from "react";

const GTM_ID = "GTM-K925B3FL";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

function runWhenIdle(callback: () => void) {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(callback, { timeout: 2000 });
    return;
  }

  window.setTimeout(callback, 0);
}

export default function GoogleTagManagerLoader() {
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    const loadGtm = () => {
      if (hasLoadedRef.current) {
        return;
      }

      hasLoadedRef.current = true;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        "gtm.start": new Date().getTime(),
        event: "gtm.js",
      });

      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
      script.setAttribute("data-cfasync", "false");
      document.head.appendChild(script);
    };

    const scheduleLoad = () => runWhenIdle(loadGtm);
    const interactionEvents: Array<keyof WindowEventMap> = [
      "pointerdown",
      "keydown",
      "touchstart",
      "scroll",
    ];

    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, scheduleLoad, {
        once: true,
        passive: true,
      });
    });

    const fallbackTimer = window.setTimeout(scheduleLoad, 8000);

    return () => {
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, scheduleLoad);
      });
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  return null;
}
