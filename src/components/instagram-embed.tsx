"use client";

import { useEffect, useRef } from "react";

/**
 * InstagramEmbed — loads the official Instagram embed.js script lazily on
 * mount, then re-runs `instgrm.Embeds.process()` to hydrate any
 * `<blockquote class="instagram-media">` blocks on the page.
 *
 * The script is served from the Instagram CDN (per the official embed
 * pattern). We mark the wrapper with `data-protect` so SecurityGate also
 * blocks right-click/drag inside the embed.
 */
export function InstagramEmbed({
  permalink,
  children,
}: {
  permalink: string;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Inject the script if not already present
    const existing = document.getElementById("instagram-embed-script");
    if (!existing) {
      const s = document.createElement("script");
      s.id = "instagram-embed-script";
      s.src = "https://www.instagram.com/embed.js";
      s.async = true;
      s.defer = true;
      document.body.appendChild(s);
    }
    // Wait until window.instgrm is available, then process embeds
    const tryProcess = () => {
      // @ts-expect-error - third-party global
      if (window.instgrm && window.instgrm.Embeds) {
        // @ts-expect-error - third-party global
        window.instgrm.Embeds.process();
        return true;
      }
      return false;
    };
    if (!tryProcess()) {
      const iv = window.setInterval(() => {
        if (tryProcess()) {
          window.clearInterval(iv);
        }
      }, 600);
      // Safety cleanup after 30s
      const timeout = window.setTimeout(() => window.clearInterval(iv), 30000);
      return () => {
        window.clearInterval(iv);
        window.clearTimeout(timeout);
      };
    }
  }, []);

  return (
    <div ref={ref} data-protect className="contents">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={permalink}
        data-instgrm-version="14"
        style={{ width: "100%" }}
      >
        {children}
      </blockquote>
    </div>
  );
}
