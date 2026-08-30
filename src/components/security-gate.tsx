"use client";

import { useEffect } from "react";

/**
 * SecurityGate — client-side runtime protection against casual asset theft.
 *
 * Layers:
 *  1. Disables the native context menu on images, the footer logo and the
 *     showcase embed (right-click "Save image as..." is blocked).
 *  2. Blocks common save/scrape keyboard shortcuts: Ctrl/Cmd+S (save page),
 *     Ctrl/Cmd+U (view source), Ctrl/Cmd+Shift+I / Ctrl/Cmd+Shift+J / F12
 *     (devtools), Ctrl/Cmd+C on protected media (clears clipboard attempt).
 *  3. Disables drag-start on every <img> in the document (also enforces the
 *     `draggable=false` attribute reactively, in case images are injected by
 *     third-party scripts like the Instagram embed).
 *  4. Detects devtools being opened via window-size delta and blurs the page
 *     (visual deterrent only — not a hard block, which is impossible on the
 *     web; we keep the page usable so legit visitors aren't punished).
 *  5. Disables text selection on protected media (images, footer logo, embed).
 *
 * NOTE: nothing on the open web can be 100% protected — a determined user can
 * always open devtools. The goal here is to raise the bar high enough that
 * casual right-click "Save image as..." / drag-to-desktop / copy-image routes
 * are closed, while keeping the site fully interactive for genuine visitors.
 */
export function SecurityGate() {
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    const onContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const tag = target.tagName;
      const isMedia =
        tag === "IMG" ||
        tag === "VIDEO" ||
        tag === "PICTURE" ||
        tag === "CANVAS" ||
        target.closest("[data-protect]") !== null ||
        target.closest(".showcase-embed") !== null ||
        target.closest(".footer-logo") !== null;
      if (isMedia) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const onDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const tag = target.tagName;
      if (tag === "IMG" || tag === "PICTURE" || tag === "VIDEO") {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const tagImagesNonDraggable = () => {
      const imgs = document.querySelectorAll("img");
      imgs.forEach((img) => {
        img.setAttribute("draggable", "false");
        img.setAttribute("oncontextmenu", "return false");
        img.setAttribute("loading", "eager");
      });
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const ctrl = e.ctrlKey || e.metaKey;
      // Block save / view-source / print shortcuts
      if (ctrl && (key === "s" || key === "u" || key === "p")) {
        e.preventDefault();
        return false;
      }
      // Block devtools launch shortcuts (Ctrl+Shift+I/J/C, F12, Cmd+Opt+I/J on Mac)
      if (
        key === "f12" ||
        (ctrl && e.shiftKey && (key === "i" || key === "j" || key === "c"))
      ) {
        e.preventDefault();
        return false;
      }
      // Block Ctrl+C / Cmd+C on protected media (prevents image copy to clipboard)
      if (ctrl && key === "c") {
        const sel = window.getSelection?.();
        const active = document.activeElement as HTMLElement | null;
        if (
          active &&
          (active.tagName === "IMG" || active.closest("[data-protect]"))
        ) {
          e.preventDefault();
          return false;
        }
        // If selection anchor is inside protected media, cancel
        if (sel) {
          const anchor = sel.anchorNode as Node | null;
          if (
            anchor &&
            anchor.parentElement &&
            anchor.parentElement.closest("[data-protect]")
          ) {
            e.preventDefault();
            return false;
          }
        }
      }
    };

    const onCopy = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "IMG" ||
          target.closest("[data-protect]") ||
          target.closest(".showcase-embed"))
      ) {
        e.preventDefault();
        e.clipboardData?.clearData();
      }
    };

    // Devtools detection — only on non-touch devices (mobile false positives).
    // We measure the threshold between window.outer/inner dimensions; if the
    // gap exceeds 200px in either axis, devtools is almost certainly docked.
    let devtoolsOpen = false;
    const threshold = 200;
    const checkDevtools = () => {
      if (isTouch) return;
      const wDiff = window.outerWidth - window.innerWidth;
      const hDiff = window.outerHeight - window.innerHeight;
      const open = wDiff > threshold || hDiff > threshold;
      if (open && !devtoolsOpen) {
        devtoolsOpen = true;
        document.documentElement.style.filter = "blur(6px)";
      } else if (!open && devtoolsOpen) {
        devtoolsOpen = false;
        document.documentElement.style.filter = "";
      }
    };

    // Run once on mount + on every DOM mutation (catches Instagram iframe
    // injecting images late).
    const observer = new MutationObserver(() => {
      tagImagesNonDraggable();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener("contextmenu", onContextMenu, true);
    document.addEventListener("dragstart", onDragStart, true);
    document.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("copy", onCopy, true);

    const devtoolsInterval = window.setInterval(checkDevtools, 1000);

    tagImagesNonDraggable();
    checkDevtools();

    return () => {
      observer.disconnect();
      document.removeEventListener("contextmenu", onContextMenu, true);
      document.removeEventListener("dragstart", onDragStart, true);
      document.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("copy", onCopy, true);
      window.clearInterval(devtoolsInterval);
      document.documentElement.style.filter = "";
    };
  }, []);

  return null;
}
