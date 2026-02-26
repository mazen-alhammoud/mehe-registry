import { useEffect, useRef, useState, useCallback } from "react";
import attemptSvgUrl from "../assets/Attempt.svg";
import dashboardSvgUrl from "../assets/Dashboard.svg";
import examSvgUrl from "../assets/Exam.svg";
import performanceSvgUrl from "../assets/Performance.svg";
import profileSvgUrl from "../assets/Profile.svg";
import meheLogoUrl from "../assets/mehe.png";
import elmyLogoUrl from "../assets/elmy.png";
import PilotStreams from "./PilotStreams";
import UncompromisingStandards from "./UncompromisingStandards";
import GovernanceDivision from "./GovernanceDivision";
import NationalFramework from "./NationalFramework";
import EveryStageIs from "./EveryStageIs";
import PilotDeliverables from "./PilotDeliverables";
import PilotOverview from "./PilotOverview";
import ClosingCTA from "./ClosingCTA";
import WhoWeAre from "./WhoWeAre";

/* ─── Data ─── */

const BULLETS = [
  "Centralized governance under Ministry oversight.",
  "Controlled identity and execution architecture.",
  "Synchronized national participation.",
  "Immediate, unbiased digital scoring.",
];

const CAPABILITIES = [
  { label: "Dashboard", svg: dashboardSvgUrl },
  { label: "Exams", svg: examSvgUrl },
  { label: "Attempt Reports", svg: attemptSvgUrl },
  { label: "Performance", svg: performanceSvgUrl },
  { label: "Profiles", svg: profileSvgUrl },
];

/* ─── Check icon (inline SVG) ─── */

function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 flex-shrink-0 mt-0.5"
      style={{ color: '#2444E2' }}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/* ─── Nav sections ─── */

const NAV_SECTIONS = [
  { id: "nav-overview", label: "Overview" },
  { id: "nav-team", label: "Who We Are" },
  { id: "nav-governance", label: "Framework & Governance" },
  { id: "nav-architecture", label: "Academic & Platform" },
  { id: "nav-preparation", label: "Preparation" },
  { id: "nav-competition", label: "Competition Day" },
  { id: "nav-grading", label: "Grading & Intelligence" },
  { id: "nav-reporting", label: "Reporting & Value" },
];

/* ─── Nav bar ─── */

function NavBar() {
  const [scrollPct, setScrollPct] = useState(0);
  const [activeId, setActiveId] = useState(NAV_SECTIONS[0].id);

  useEffect(() => {
    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      if (docH <= 0) { setScrollPct(0); return; }
      const pct = Math.min(100, Math.round((window.scrollY / docH) * 100));
      setScrollPct(pct);

      /* Scroll-spy: pick the last section whose top is above 40% of viewport */
      const threshold = window.innerHeight * 0.4;
      let current = NAV_SECTIONS[0].id;
      for (const sec of NAV_SECTIONS) {
        const el = document.getElementById(sec.id);
        if (el && el.getBoundingClientRect().top <= threshold) {
          current = sec.id;
        }
      }
      /* At bottom of page, activate last nav section */
      if (pct >= 95) {
        current = NAV_SECTIONS[NAV_SECTIONS.length - 1].id;
      }
      setActiveId(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <img src={elmyLogoUrl} alt="Elmy" className="h-8 w-auto" />

        {/* ─── Section links (hidden on mobile) ─── */}
        <div className="hidden lg:flex items-center gap-0.5">
          {NAV_SECTIONS.map((sec, i) => {
            const isActive = activeId === sec.id;
            return (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(sec.id)?.scrollIntoView({ behavior: "smooth" });
                }}
                className="relative flex items-center gap-1.5 px-2.5 py-1.5 text-[0.65rem] font-medium rounded-full transition-all duration-200"
                style={{
                  color: isActive ? "#2444E2" : "#9ca3af",
                  background: isActive ? "rgba(36, 68, 226, 0.08)" : "transparent",
                }}
              >
                <span
                  className="w-4 h-4 rounded-full flex items-center justify-center text-[0.5rem] font-bold flex-shrink-0"
                  style={{
                    background: isActive ? "#2444E2" : "rgba(0,0,0,0.05)",
                    color: isActive ? "#fff" : "#9ca3af",
                  }}
                >
                  {i + 1}
                </span>
                {sec.label}
              </a>
            );
          })}
        </div>

        {/* ─── Right side ─── */}
        <div className="flex items-center gap-4">
          <span
            className="text-[0.625rem] font-semibold tabular-nums tracking-wide transition-opacity duration-300"
            style={{ color: '#2444E2', opacity: scrollPct > 0 ? 1 : 0 }}
          >
            {scrollPct}%
          </span>
        </div>
      </div>

      {/* ─── Progress bar ─── */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-100/60">
        <div
          className="h-full transition-[width] duration-150 ease-out"
          style={{
            width: `${scrollPct}%`,
            background: 'linear-gradient(90deg, #2444E2, #6b8cff)',
            boxShadow: scrollPct > 0 ? '0 0 8px rgba(36, 68, 226, 0.4)' : 'none',
          }}
        />
      </div>
    </nav>
  );
}

/* ─── Main component ─── */

export default function HeroExamsClickup() {
  const [mounted, setMounted] = useState(false);
  const [activeCapability, setActiveCapability] = useState(0);
  const [paused, setPaused] = useState(false);

  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);

  useEffect(() => setMounted(true), []);

  /* ─── Scroll-triggered entrance animations ─── */
  useEffect(() => {
    const el = heroSectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in-view');
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActiveCapability((prev) => (prev + 1) % CAPABILITIES.length);
    }, 4000);
    return () => clearInterval(id);
  }, [paused]);

  /* ─── Scroll-driven parallax for the hero ─── */
  const handleScroll = useCallback(() => {
    const wrapper = heroWrapperRef.current;
    const content = heroContentRef.current;
    if (!wrapper || !content) return;

    const rect = wrapper.getBoundingClientRect();
    const contentH = content.offsetHeight;
    const spacerH = wrapper.offsetHeight - contentH;
    const scrolled = -rect.top;
    const parallaxStart = contentH - window.innerHeight;
    const progress = spacerH > 0
      ? Math.max(0, Math.min(1, (scrolled - parallaxStart) / spacerH))
      : 0;

    const scale = 1 - progress * 0.02;

    content.style.transform = `scale(${scale})`;
    content.style.opacity = '1';
    content.style.filter = 'none';
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <NavBar />

      {/* ═══════════════════════════════════════════
          CARD 1 — Hero  (sticky, z-1)
          ═══════════════════════════════════════════ */}
      <div id="nav-overview" ref={heroWrapperRef} className="relative" style={{ zIndex: 1 }}>
        <div className="sticky top-0 bg-white overflow-hidden">
          <div
            ref={heroContentRef}
            className="will-change-transform origin-top min-h-screen"
          >
            <section ref={heroSectionRef} className="pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 overflow-hidden">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
                  {/* ─── Left column: copy ─── */}
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-[0.15em] mb-4 animate-fade-up"
                      style={{ color: '#2444E2', animationDelay: '0s' }}
                    >
                      Ministry of Education and Higher Education
                    </p>

                    <h1
                      className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-gray-900 mb-5 animate-fade-up"
                      style={{ animationDelay: '0.05s', lineHeight: '1.2' }}
                    >
                      The National Digital{' '}
                      <span
                        className="bg-clip-text text-transparent animate-gradient-text"
                        style={{
                          backgroundImage: 'linear-gradient(90deg, #1a33b8, #2444E2, #6b8cff, #2444E2, #1a33b8)',
                        }}
                      >
                        Competition Day
                      </span>
                    </h1>

                    <p
                      className="text-base text-gray-500 leading-[1.75] mb-7 animate-fade-up"
                      style={{ animationDelay: '0.15s' }}
                    >
                      A Ministry-Led structured and observable national competition designed to validate performance under standardized, secure digital conditions.
                    </p>

                    <ul className="space-y-3 mb-8">
                      {BULLETS.map((bullet, i) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-3 animate-fade-up"
                          style={{ animationDelay: `${0.25 + i * 0.08}s` }}
                        >
                          <CheckIcon />
                          <span className="text-sm text-gray-700 leading-snug">
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>


                    <div
                      className="mt-10 pt-8 border-t border-gray-100 animate-fade-in"
                      style={{ animationDelay: '0.7s' }}
                    >
                      <p className="text-[0.625rem] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-3">
                        Capabilities
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {CAPABILITIES.map((cap, i) => (
                          <button
                            key={cap.label}
                            onClick={() => {
                              setActiveCapability(i);
                              setPaused(true);
                              setTimeout(() => setPaused(false), 8000);
                            }}
                            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 hover:-translate-y-px cursor-pointer ${
                              activeCapability === i
                                ? 'text-white border border-transparent'
                                : 'text-gray-600 bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                            }`}
                            style={activeCapability === i ? { backgroundColor: '#2444E2' } : undefined}
                          >
                            {cap.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ─── Right column: product preview ─── */}
                  <div
                    className={`relative lg:-mr-48 lg:mt-8 transition-all duration-700 ease-out ${mounted
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-10'
                      }`}
                    style={{ transitionDelay: '0.3s' }}
                  >
                    <div
                      className="w-full rounded-2xl overflow-hidden bg-white transition-shadow duration-300 hover:shadow-2xl animate-float"
                      style={{
                        border: '1px solid rgba(0, 0, 0, 0.06)',
                        boxShadow:
                          '0 1px 2px rgba(0,0,0,0.03), 0 4px 16px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.05)',
                      }}
                    >
                      <div
                        className="flex items-center justify-between px-5 py-4"
                        style={{
                          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                          background: '#ffffff',
                        }}
                      >
                        <img src={meheLogoUrl} alt="MEHE logo" className="h-10 w-auto" />
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-gray-100" />
                        </div>
                      </div>

                      <div className="aspect-video overflow-hidden relative">
                        {CAPABILITIES.map((cap, i) => (
                          <img
                            key={cap.label}
                            src={cap.svg}
                            alt={`Elmy platform — ${cap.label}`}
                            className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ${
                              activeCapability === i ? 'opacity-100' : 'opacity-0'
                            }`}
                          />
                        ))}
                      </div>

                      <div
                        className="flex items-center justify-center gap-1.5 px-5 py-2.5"
                        style={{
                          borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                          background: 'rgba(250, 249, 247, 0.5)',
                        }}
                      >
                        <span className="text-[0.625rem] text-gray-400 tracking-wide">
                          Powered by
                        </span>
                        <img src={elmyLogoUrl} alt="Elmy logo" className="h-5 w-auto" />
                      </div>
                    </div>

                    <div
                      className="absolute inset-y-0 right-0 w-48 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.3) 30%, rgba(255,255,255,0.7) 60%, white 100%)',
                      }}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        {/* Spacer — scroll runway for the sticky pin */}
        <div className="h-[40vh]" aria-hidden="true" />
      </div>

      {/* ═══════════════════════════════════════════
          CARD 2 — Who We Are + Stats + Team  (z-2)
          ═══════════════════════════════════════════ */}
      <div id="nav-team" className="relative" style={{ zIndex: 2 }}>
        <WhoWeAre />
      </div>

      {/* ═══════════════════════════════════════════
          CARD 3 — Framework & Governance  (z-3)
          ═══════════════════════════════════════════ */}
      <div id="nav-governance" className="relative" style={{ zIndex: 3 }}>
        <PilotStreams />
      </div>

      {/* ═══════════════════════════════════════════
          CARD 4 — Academic & Platform  (z-4)
          ═══════════════════════════════════════════ */}
      <div id="nav-architecture" className="relative" style={{ zIndex: 4 }}>
        <UncompromisingStandards />
      </div>

      {/* ═══════════════════════════════════════════
          CARD 5 — Preparation  (z-5)
          ═══════════════════════════════════════════ */}
      <div id="nav-preparation" className="relative" style={{ zIndex: 5 }}>
        <GovernanceDivision />
      </div>

      {/* ═══════════════════════════════════════════
          CARD 6 — Competition Day & Oversight  (z-6)
          ═══════════════════════════════════════════ */}
      <div id="nav-competition" className="relative" style={{ zIndex: 6 }}>
        <NationalFramework />
      </div>

      {/* ═══════════════════════════════════════════
          CARD 7 — Every Stage Is  (z-7)
          ═══════════════════════════════════════════ */}
      <div className="relative" style={{ zIndex: 7 }}>
        <EveryStageIs />
      </div>

      {/* ═══════════════════════════════════════════
          CARD 8 — Grading & Intelligence  (z-8)
          ═══════════════════════════════════════════ */}
      <div id="nav-grading" className="relative" style={{ zIndex: 8 }}>
        <PilotOverview />
      </div>

      {/* ═══════════════════════════════════════════
          CARD 9 — Reporting & Value  (z-9)
          ═══════════════════════════════════════════ */}
      <div id="nav-reporting" className="relative" style={{ zIndex: 9 }}>
        <PilotDeliverables />
      </div>

      {/* ═══════════════════════════════════════════
          CARD 10 — Closing CTA  (z-10)
          ═══════════════════════════════════════════ */}
      <div className="relative" style={{ zIndex: 10 }}>
        <ClosingCTA />
      </div>
    </>
  );
}
