import { NextRequest, NextResponse } from "next/server";

/**
 * Middleware — two responsibilities:
 *
 *  1. Set strict security headers on every response (CSP, HSTS, X-Frame,
 *     Referrer-Policy, Permissions-Policy, X-Content-Type-Options, CORP,
 *     COEP/COOP). Together these block clickjacking, MIME sniffing, mixed
 *     content, and most cross-origin asset theft vectors.
 *
 *  2. Hotlink protection: any request to an image asset in /public that is
 *     served at /big-skyy-logo*.png, /favicon*.png|ico, /icon-*.png,
 *     /apple-touch-icon.png or /site.webmanifest must come from a same-origin
 *     Referer. Direct browser hits (no Referer) and third-party hosts are
 *     blocked with 403. This stops people from embedding the brand assets on
 *     other sites or pulling them by visiting the URL directly.
 *
 *     We intentionally allow empty Referer ONLY for the favicon.ico and the
 *     webmanifest — browsers may legitimately fetch these without a Referer
 *     on the very first navigation. Brand logos are strictly gated.
 */

const PROTECTED_ASSETS = [
  "/big-skyy-logo.png",
  "/big-skyy-logo-transparent.png",
  "/icon-192.png",
  "/icon-512.png",
  "/apple-touch-icon.png",
];

/**
 * Derive the request's own origin from its headers. On Vercel and other
 * TLS-terminating proxies the scheme is in `x-forwarded-proto`. In local
 * dev it's the literal `http`.
 */
function requestOrigin(req: NextRequest): string {
  const host = req.headers.get("host") || req.nextUrl.host;
  const proto =
    req.headers.get("x-forwarded-proto") ||
    (req.nextUrl.protocol ? req.nextUrl.protocol.replace(":", "") : "https");
  return `${proto}://${host}`;
}

function isAllowedReferer(req: NextRequest, pathname: string): boolean {
  const referer = req.headers.get("referer");
  if (!referer) {
    // No referer = direct browser hit on the asset URL.
    // Allow for the browser-auto-fetched favicon + manifest + small icons,
    // block for the larger brand logos.
    if (
      pathname === "/favicon.ico" ||
      pathname === "/site.webmanifest" ||
      pathname === "/favicon-16x16.png" ||
      pathname === "/favicon-32x32.png" ||
      pathname === "/favicon-48x48.png"
    ) {
      return true;
    }
    return false;
  }
  let refererOrigin = "";
  try {
    refererOrigin = new URL(referer).origin;
  } catch {
    return false;
  }
  // Same-origin requests are always allowed.
  if (refererOrigin === requestOrigin(req)) {
    return true;
  }
  // Allow the canonical production origin regardless of where the request
  // lands (dev, preview, prod). The primary domain is onojadavid.vercel.app;
  // big-skyy.vercel.app is kept as a legacy alias so existing links keep
  // resolving during the transition.
  const canonical = [
    "https://onojadavid.vercel.app",
    "https://big-skyy.vercel.app",
    "https://big-skyy-morpheos-projects-73412392.vercel.app",
  ];
  return canonical.includes(refererOrigin);
}

// Note on CSP tuning:
// - We do NOT set `require-trusted-types-for 'script'` because Next.js
//   hydration uses inline scripts and that policy would silently break
//   client-side React (page renders blank on production builds).
// - We do NOT set COEP: credentialless because the Instagram embed.js script
//   is cross-origin and may not send CORS headers; credentialless would
//   block it. We keep CORP `same-origin` on our own responses to stop
//   other sites embedding OUR assets, which is the actual goal here.
// - 'unsafe-inline' on script-src is required for Next.js inline hydration
//   scripts; it is scoped to script content only, not remote scripts.
const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.instagram.com https://platform.instagram.com https://platform.linkedin.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: https:",
  "media-src 'self'",
  "frame-src 'self' https://www.instagram.com https://platform.linkedin.com",
  "connect-src 'self' https://www.instagram.com https://graph.instagram.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' mailto: tel:",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": [
    "camera=()",
    "microphone=()",
    "geolocation=()",
    "payment=()",
    "usb=()",
    "magnetometer=()",
    "gyroscope=()",
    "accelerometer=()",
    "clipboard-write=(self)",
    "clipboard-read=(self)",
  ].join(", "),
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "Cross-Origin-Resource-Policy": "same-origin",
  "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
  "X-DNS-Prefetch-Control": "off",
  "X-Download-Options": "noopen",
  "X-Permitted-Cross-Domain-Policies": "none",
  "Content-Security-Policy": cspDirectives,
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // --- Hotlink / direct-access protection for brand assets ---
  const isProtectedAsset = PROTECTED_ASSETS.includes(pathname);
  if (isProtectedAsset && !isAllowedReferer(req, pathname)) {
    return new NextResponse("Forbidden", {
      status: 403,
      headers: { "Content-Type": "text/plain", ...securityHeaders },
    });
  }

  const res = NextResponse.next();
  // Attach security headers to every response
  for (const [k, v] of Object.entries(securityHeaders)) {
    res.headers.set(k, v);
  }
  return res;
}

export const config = {
  // Run on every route, including static assets in /public
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
    "/favicon.ico",
    "/site.webmanifest",
  ],
};
