# Big Skyy Marketing — Onoja Oche David Portfolio

> Digital marketing & real estate content specialist portfolio, Abuja, Nigeria.

A custom-built Next.js 16 portfolio for **Onoja Oche David**, founder of
**Big Skyy Marketing**. The site faithfully ports the supplied reference
HTML into a production-ready Next.js / Tailwind app, then layers on tight
asset protection, a strict security header policy, and full mobile + desktop
responsive design.

## Highlights

- **Custom Big Skyy Marketing favicon set** — multi-size `.ico`, Apple touch
  icon, 192/512 manifest icons, and a transparent-background footer logo,
  all generated from the supplied brand asset.
- **Strict security headers** — CSP, HSTS, X-Frame-Options: DENY, CORP
  `same-origin`, Permissions-Policy lockdown, nosniff, COOP, referrer
  policy. Set via `src/middleware.ts`.
- **Asset hotlink protection** — the brand logos (`/big-skyy-logo*.png`,
  `/icon-*.png`, `/apple-touch-icon.png`) are blocked from direct browser
  access and from being embedded on third-party hosts. Only same-origin
  requests get a 200; everyone else gets a 403.
- **Runtime client-side protection** — right-click, drag-to-desktop,
  Ctrl/Cmd+S/U/P, F12, devtools shortcuts, and copy-on-image are all
  intercepted in `src/components/security-gate.tsx`. Devtools detection
  blurs the page when docked (visual deterrent). Print is disabled.
- **Faithful reference design** — sky-blue shader background, grain
  overlay, gradient hero headline, eyebrow badges, skill cards, Instagram
  embed showcase, experience bullets, numbered strengths, dark contact
  footer with the Big Skyy Marketing logo.
- **Live Instagram reel embed** — the official Instagram `embed.js` is
  loaded lazily and hydrated through a client island so the reel preview
  shows real content (profile, video thumbnail, likes, action buttons).
- **Mobile-first responsive** — 1 column on phones, multi-column on tablet
  / desktop. Sticky footer respects viewport height on short pages and
  gets pushed down naturally on long pages.

## Tech stack

| Layer      | Choice                                              |
| ---------- | --------------------------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack)                  |
| Language   | TypeScript 5                                        |
| Styling    | Tailwind CSS 4 + custom CSS (shader, grain, sky palette) |
| Fonts      | Space Grotesk (display) + Inter (body) via `next/font` |
| Icons      | Hand-rolled inline SVG (no icon font dependency)    |
| Hosting    | Vercel                                              |
| Source     | GitHub                                              |

## Project structure

```
public/
  favicon.ico, favicon-*.png, icon-*.png, apple-touch-icon.png
  big-skyy-logo.png               # original (white BG)
  big-skyy-logo-transparent.png   # transparent BG, used in footer
  site.webmanifest
src/
  app/
    layout.tsx        # fonts, metadata, favicon refs, SecurityGate mount
    page.tsx           # the portfolio (hero, skills, showcase, exp, footer)
    globals.css        # sky palette, shader, grain, security CSS
  components/
    security-gate.tsx    # client-side runtime asset protection
    instagram-embed.tsx  # lazy-loaded Instagram oEmbed island
  middleware.ts          # security headers + hotlink protection
next.config.ts         # allowedDevOrigins, images.unoptimized, no poweredBy
```

## Local development

```bash
bun install
bun run dev    # http://localhost:3000
```

## Build

```bash
bun run build
bun run start
```

## Deployment

The repo is connected to Vercel — every push to `main` triggers an
automatic production deployment.

## License

© Onoja Oche David / Big Skyy Marketing. All rights reserved.
