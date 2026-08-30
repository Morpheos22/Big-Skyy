import { InstagramEmbed } from "@/components/instagram-embed";

/**
 * Onoja Oche David — Big Skyy Marketing portfolio.
 * Server component. The Instagram embed and the SecurityGate (in layout)
 * are the only client islands.
 *
 * Design notes:
 * - The page faithfully preserves the sky-blue shader aesthetic of the
 *   reference HTML, ported to a Next.js / Tailwind codebase.
 * - Layout is mobile-first responsive: 1 column on mobile, multi-column
 *   on tablet/desktop.
 * - Root wrapper uses `min-h-screen flex flex-col` + `mt-auto` on the
 *   footer so the footer sticks to the viewport bottom on short pages
 *   and is pushed down naturally on long pages (no floating/overlap).
 */

type Skill = { title: string; description: string };
const skills: Skill[] = [
  {
    title: "Content Production",
    description:
      "Property walkthrough concepts, construction progress content, short-form video, and promotional creatives built for social platforms.",
  },
  {
    title: "Copywriting",
    description:
      "Captions, adverts, WhatsApp campaigns, cold outreach, investment pitches, and brochure content tailored to real estate buyers.",
  },
  {
    title: "Paid Advertising",
    description:
      "Meta Ads and Google Ads — campaign structure, targeting, creative testing, and performance tracking tied to actual lead flow.",
  },
  {
    title: "Lead Generation",
    description:
      "Prospect research, outreach, qualification, and handoff to sales across WhatsApp, email, and LinkedIn.",
  },
  {
    title: "AI-Assisted Production",
    description:
      "Using generative AI tools for video scripts, creative concepts, and marketing assets without losing the human edge.",
  },
  {
    title: "Tools",
    description:
      "CapCut, Canva, Meta Ads Manager, Google Ads, AI content tools, with growing Adobe Premiere and After Effects proficiency.",
  },
];

type ExperienceBlock = { title: string; items: string[] };
const experience: ExperienceBlock[] = [
  {
    title: "Real Estate Content & Campaign Projects",
    items: [
      "Created real estate video concepts and scripts for short-form platforms, including educational content on property titles and investment decisions.",
      "Developed promotional messaging and investor pitches for Abuja property opportunities, including land and estate projects.",
      "Planned content around property benefits, location, investment potential, buyer objections, and calls to action.",
      "Produced social-media-ready copy and visual concepts designed to convert attention into WhatsApp enquiries and qualified prospects.",
    ],
  },
  {
    title: "Paid Advertising & Lead Generation Projects",
    items: [
      "Built practical Meta and Google Ads campaign strategies focused on lead generation, audience targeting, keyword themes, ad copy, and conversion-focused landing experiences.",
      "Developed prospecting approaches for real estate businesses targeting investors, end-users, and corporate decision-makers.",
      "Worked on outreach systems combining email, WhatsApp, LinkedIn, and social media prospecting into one qualified pipeline.",
    ],
  },
  {
    title: "AI-Assisted Content Production",
    items: [
      "Used generative AI tools to develop video scripts, creative concepts, visual directions, and marketing assets for real estate campaigns.",
      "Created structured short-form video concepts suitable for CapCut and AI video workflows that move from script to publishable cut.",
    ],
  },
];

type Strength = { num: string; title: string; description: string };
const strengths: Strength[] = [
  {
    num: "1",
    title: "Hands-on mindset",
    description:
      "I prefer creating, testing, and improving marketing assets rather than only managing briefs or handing them off.",
  },
  {
    num: "2",
    title: "Commercial focus",
    description:
      "Content and advertising should ultimately support enquiries, qualified leads, and sales — not just vanity metrics.",
  },
  {
    num: "3",
    title: "Real estate orientation",
    description:
      "Familiar with Abuja property marketing, investor messaging, and the common concerns that come up before a buyer commits.",
  },
  {
    num: "4",
    title: "Fast learner",
    description:
      "Actively building practical capability across content production, paid media, and modern marketing tools.",
  },
  {
    num: "5",
    title: "Clear communication",
    description:
      "Confident writing professional sales copy and communicating with prospects across WhatsApp, email, and LinkedIn.",
  },
];

export default function PortfolioPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* ============== HERO ============== */}
      <header
        className="hero relative overflow-hidden"
        style={{
          padding: "96px 0 80px",
          background: "var(--sky-50)",
        }}
      >
        <div className="shader-bg" aria-hidden />
        <div className="grain" aria-hidden />
        <div className="wrap relative z-[2]">
          <span className="eyebrow">Real Estate Digital Marketing</span>
          <h1 className="h1-gradient">Onoja Oche David</h1>
          <p
            className="font-display"
            style={{
              fontSize: "19px",
              fontWeight: 500,
              color: "var(--sky-800)",
              marginBottom: "12px",
            }}
          >
            Digital Marketing &amp; Content Specialist
          </p>
          <p
            style={{
              fontSize: "14.5px",
              color: "var(--ink-soft)",
              marginBottom: "28px",
            }}
          >
            Abuja, Nigeria &nbsp;•&nbsp; Content Creation &nbsp;•&nbsp; Paid
            Ads &nbsp;•&nbsp; Lead Generation
          </p>
          <p
            className="hero-summary"
            style={{
              fontSize: "17px",
              color: "var(--ink-soft)",
              maxWidth: "620px",
            }}
          >
            I build the content and campaigns that turn property listings into
            qualified conversations. From property walkthrough videos to Meta
            and Google Ads, I help real estate brands in Abuja reach investors
            and buyers, and move them toward a WhatsApp enquiry.
          </p>
          <div
            className="cta-row"
            style={{
              marginTop: "36px",
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <a href="#showcase" className="btn btn-primary">
              View my work
            </a>
            <a href="#contact" className="btn btn-secondary">
              Get in touch
            </a>
          </div>
        </div>
      </header>

      {/* ============== SKILLS ============== */}
      <section
        id="skills"
        className="relative"
        style={{ padding: "64px 0", borderTop: "1px solid var(--sky-100)" }}
      >
        <div className="wrap">
          <p className="eyebrow-small">Core Skills</p>
          <h2 className="h2">What I do</h2>
          <p className="section-sub">
            A working toolkit built specifically around real estate marketing —
            from first video concept to a qualified lead.
          </p>
          <div className="skills-grid">
            {skills.map((s) => (
              <article key={s.title} className="skill-card">
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============== SHOWCASE ============== */}
      <section
        id="showcase"
        className="relative"
        style={{ padding: "64px 0", borderTop: "1px solid var(--sky-100)" }}
      >
        <div className="wrap">
          <p className="eyebrow-small">Showcase</p>
          <h2 className="h2">See the work in action</h2>
          <p className="section-sub">
            Real estate and digital marketing content, live on Instagram and
            LinkedIn.
          </p>

          <div className="showcase-grid">
            <div
              className="showcase-embed"
              data-protect
              aria-label="Instagram reel preview"
            >
              <InstagramEmbed permalink="https://www.instagram.com/reel/Dbx9FmQCs8j/">
                <div style={{ padding: "32px 16px", color: "rgba(255,255,255,0.6)" }}>
                  Loading Instagram reel…
                </div>
              </InstagramEmbed>
            </div>

            <div className="link-card-col">
              <a
                className="link-card"
                href="https://www.instagram.com/davidoche76"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="link-icon ig" aria-hidden>
                  IG
                </span>
                <span className="link-text">
                  <h3>@davidoche76</h3>
                  <p>Instagram — full content library</p>
                </span>
              </a>
              <a
                className="link-card"
                href="https://www.linkedin.com/in/david-onoja-5338a13b1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="link-icon li" aria-hidden>
                  in
                </span>
                <span className="link-text">
                  <h3>David Onoja</h3>
                  <p>LinkedIn profile and network</p>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============== EXPERIENCE ============== */}
      <section
        id="experience"
        className="relative"
        style={{ padding: "64px 0", borderTop: "1px solid var(--sky-100)" }}
      >
        <div className="wrap">
          <p className="eyebrow-small">Experience</p>
          <h2 className="h2">Selected practical experience</h2>
          <p className="section-sub">
            Real, hands-on project work — not just theory.
          </p>

          {experience.map((block) => (
            <div key={block.title} className="exp-block">
              <h3>{block.title}</h3>
              <ul className="exp-list">
                {block.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ============== STRENGTHS ============== */}
      <section
        id="strengths"
        className="relative"
        style={{ padding: "64px 0", borderTop: "1px solid var(--sky-100)" }}
      >
        <div className="wrap">
          <p className="eyebrow-small">Why Work With Me</p>
          <h2 className="h2">What sets me apart</h2>
          <p className="section-sub">
            Five things that consistently come up in the projects I work on.
          </p>
          <div className="strengths-list">
            {strengths.map((s) => (
              <article key={s.num} className="strength-item">
                <div className="strength-dot" aria-hidden>
                  {s.num}
                </div>
                <div>
                  <h4>{s.title}</h4>
                  <p>{s.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============== CONTACT / FOOTER ============== */}
      <footer id="contact" className="contact-section mt-auto">
        <div className="shader-bg" aria-hidden />
        <div className="grain" aria-hidden />
        <div className="wrap">
          <p className="eyebrow-small" style={{ color: "var(--sky-400)" }}>
            Contact
          </p>
          <h2 className="h2">Let&apos;s work together</h2>
          <p className="section-sub">
            Based in Abuja and available for on-site work, content shoots,
            property walkthroughs, and campaign execution.
          </p>
          <div className="contact-methods">
            <a className="contact-pill" href="mailto:davidonoja1999@gmail.com">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              davidonoja1999@gmail.com
            </a>
            <a className="contact-pill" href="tel:+2349072626267">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
              </svg>
              09072626267
            </a>
          </div>

          {/* Big Skyy Marketing brand row */}
          <div className="footer-brand-row">
            {/* Footer brand logo. Using a plain <img> instead of next/image
                because we don't want a downloadable srcset / multiple
                resolutions floating around. The middleware also blocks
                direct access to this asset from non-same-origin referrers. */}
            <img
              src="/big-skyy-logo-transparent.png"
              alt="Big Skyy Marketing logo"
              className="footer-logo"
              data-protect
              width={220}
              height={56}
              draggable={false}
            />
            <p className="footer-meta">
              © {new Date().getFullYear()} Onoja Oche David ·{" "}
              <a
                href="https://www.instagram.com/davidoche76"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>{" "}
              ·{" "}
              <a
                href="https://www.linkedin.com/in/david-onoja-5338a13b1"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>{" "}
              · Abuja, Nigeria
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
