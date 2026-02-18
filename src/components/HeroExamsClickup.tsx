import { useEffect, useRef, useState, useCallback } from "react";
import attemptSvgUrl from "../assets/Attempt.svg";
import dashboardSvgUrl from "../assets/Dashboard.svg";
import examSvgUrl from "../assets/Exam.svg";
import performanceSvgUrl from "../assets/Performance.svg";
import profileSvgUrl from "../assets/Profile.svg";
import meheLogoUrl from "../assets/mehe.png";
import elmyLogoUrl from "../assets/elmy.png";
import StructuralPressures from "./StructuralPressures";
import PilotStreams from "./PilotStreams";
import UncompromisingStandards from "./UncompromisingStandards";
import NationalFramework from "./NationalFramework";
import EveryStageIs from "./EveryStageIs";
import PilotDeliverables from "./PilotDeliverables";
import PilotOverview from "./PilotOverview";
import InstitutionalControl from "./InstitutionalControl";
import MeetTheTeam from "./MeetTheTeam";
import ClosingCTA from "./ClosingCTA";

/* ─── Data ─── */

const BULLETS = [
  "Secure delivery of official examinations.",
  "Standardized workflows across examination centers.",
  "Reduced administrative burden for schools and the Ministry.",
];

const CAPABILITIES = [
  { label: "Dashboard", svg: dashboardSvgUrl },
  { label: "Exams", svg: examSvgUrl },
  { label: "Attempt Reports", svg: attemptSvgUrl },
  { label: "Performance", svg: performanceSvgUrl },
  { label: "Profiles", svg: profileSvgUrl },
];

/* ─── Animated counter ─── */

function CountUp({
  end,
  suffix = "",
  duration = 2000,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          observer.disconnect();

          const start = performance.now();
          const step = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * end);
            setDisplay(current.toLocaleString());
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

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
  { id: "nav-challenge", label: "Challenge" },
  { id: "nav-pilot", label: "Pilot" },
  { id: "nav-framework", label: "Framework" },
  { id: "nav-deliverables", label: "Deliverables" },
  { id: "nav-infrastructure", label: "Why ELMY" },
  { id: "nav-team", label: "Team" },
];

/* ─── Nav bar ─── */

function NavBar() {
  const [scrollPct, setScrollPct] = useState(0);
  const [activeId, setActiveId] = useState(NAV_SECTIONS[0].id);

  useEffect(() => {
    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      if (docH <= 0) { setScrollPct(0); return; }
      setScrollPct(Math.min(100, Math.round((window.scrollY / docH) * 100)));

      /* Scroll-spy: find the section closest to the top of the viewport */
      const offset = 120;
      let current = NAV_SECTIONS[0].id;
      for (const sec of NAV_SECTIONS) {
        const el = document.getElementById(sec.id);
        if (el && el.getBoundingClientRect().top <= offset) {
          current = sec.id;
        }
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
        <span className="text-xl font-bold text-gray-900 tracking-tight">
          Elmy
        </span>

        {/* ─── Section links (hidden on mobile) ─── */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_SECTIONS.map((sec) => {
            const isActive = activeId === sec.id;
            return (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(sec.id)?.scrollIntoView({ behavior: "smooth" });
                }}
                className="relative px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200"
                style={{
                  color: isActive ? "#2444E2" : "#6b7280",
                  background: isActive ? "rgba(36, 68, 226, 0.08)" : "transparent",
                }}
              >
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
          <a
            href="#login"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Login
          </a>
          <a
            href="#signup"
            className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          >
            Sign Up
          </a>
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

  useEffect(() => setMounted(true), []);

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

    const scale = 1 - progress * 0.05;
    const opacity = 1 - progress * 0.4;
    const blur = progress * 3;

    content.style.transform = `scale(${scale})`;
    content.style.opacity = String(opacity);
    content.style.filter = blur > 0.1 ? `blur(${blur}px)` : 'none';
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
            <section className="pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 overflow-hidden">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
                  {/* ─── Left column: copy ─── */}
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-[0.15em] mb-4 animate-fade-up"
                      style={{ color: '#2444E2', animationDelay: '0s' }}
                    >
                      Part of the National Campaign to Support Public Schools
                    </p>

                    <h1
                      className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-gray-900 mb-5 animate-fade-up"
                      style={{ animationDelay: '0.05s', lineHeight: '1.2' }}
                    >
                      A Secure & Trusted{' '}
                      <span
                        className="bg-clip-text text-transparent animate-gradient-text"
                        style={{
                          backgroundImage: 'linear-gradient(90deg, #1a33b8, #2444E2, #6b8cff, #2444E2, #1a33b8)',
                        }}
                      >
                        Digital Foundation
                      </span>{' '}
                      for Official School Exams in Lebanon
                    </h1>

                    <p
                      className="text-base text-gray-500 leading-[1.75] mb-7 animate-fade-up"
                      style={{ animationDelay: '0.15s' }}
                    >
                      A Ministry-aligned national pilot designed to safeguard fairness, transparency, and credibility at scale.
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

                    <a
                      href="#request-access"
                      className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 animate-fade-up"
                      style={{ backgroundColor: '#2444E2', '--tw-ring-color': '#2444E2', animationDelay: '0.5s' } as React.CSSProperties}
                    >
                      Request Institutional Access
                    </a>

                    <p
                      className="mt-3 text-xs text-gray-400 tracking-wide animate-fade-in"
                      style={{ animationDelay: '0.65s' }}
                    >
                      Pilot-ready. Ministry-aligned. Built for reliability.
                    </p>

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
          CARD 2 — Credibility strip  (z-2)
          ═══════════════════════════════════════════ */}
      <div className="relative" style={{ zIndex: 2 }}>
        <section
          className="py-16 sm:py-20"
          style={{ background: '#f7f7f8' }}
        >
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 text-center">
              <div>
                <span
                  className="block text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight tabular-nums"
                  style={{ color: '#2444E2' }}
                >
                  <CountUp end={1400} suffix="+" />
                </span>
                <span className="mt-2 block text-sm sm:text-base text-gray-500 font-medium">
                  Test Takers Assessed
                </span>
              </div>
              <div className="relative">
                <div className="hidden sm:block absolute inset-y-0 left-0 w-px bg-gray-200" />
                <div className="hidden sm:block absolute inset-y-0 right-0 w-px bg-gray-200" />
                <span
                  className="block text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight tabular-nums"
                  style={{ color: '#2444E2' }}
                >
                  <CountUp end={1500} />
                </span>
                <span className="mt-2 block text-sm sm:text-base text-gray-500 font-medium">
                  Question Bank Items
                </span>
              </div>
              <div>
                <span
                  className="block text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight tabular-nums"
                  style={{ color: '#2444E2' }}
                >
                  <CountUp end={5000} suffix="+" />
                </span>
                <span className="mt-2 block text-sm sm:text-base text-gray-500 font-medium">
                  Active Users on LMS
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ═══════════════════════════════════════════
          CARD 3 — Structural Pressures  (z-3)
          ═══════════════════════════════════════════ */}
      <div id="nav-challenge" className="relative" style={{ zIndex: 3 }}>
        <StructuralPressures />
      </div>

      {/* ═══════════════════════════════════════════
          CARD 4 — Pilot Streams  (z-4)
          ═══════════════════════════════════════════ */}
      <div id="nav-pilot" className="relative" style={{ zIndex: 4 }}>
        <PilotStreams />
      </div>

      {/* ═══════════════════════════════════════════
          CARD 5 — Uncompromising Standards  (z-5)
          ═══════════════════════════════════════════ */}
      <div className="relative" style={{ zIndex: 5 }}>
        <UncompromisingStandards />
      </div>

      {/* ═══════════════════════════════════════════
          CARD 6 — National Framework  (z-6)
          ═══════════════════════════════════════════ */}
      <div id="nav-framework" className="relative" style={{ zIndex: 6 }}>
        <NationalFramework />
      </div>

      {/* ═══════════════════════════════════════════
          CARD 7 — Every Stage Is  (z-7)
          ═══════════════════════════════════════════ */}
      <div className="relative" style={{ zIndex: 7 }}>
        <EveryStageIs />
      </div>

      {/* ═══════════════════════════════════════════
          CARD 8 — Pilot Overview  (z-8)
          ═══════════════════════════════════════════ */}
      <div className="relative" style={{ zIndex: 8 }}>
        <PilotOverview />
      </div>

      {/* ═══════════════════════════════════════════
          CARD 9 — Pilot Deliverables  (z-9)
          ═══════════════════════════════════════════ */}
      <div id="nav-deliverables" className="relative" style={{ zIndex: 9 }}>
        <PilotDeliverables />
      </div>

      {/* ═══════════════════════════════════════════
          CARD 10 — Institutional Control  (z-10)
          ═══════════════════════════════════════════ */}
      <div id="nav-infrastructure" className="relative" style={{ zIndex: 10 }}>
        <InstitutionalControl />
      </div>

      {/* ═══════════════════════════════════════════
          CARD 11 — Meet the Team  (z-11)
          ═══════════════════════════════════════════ */}
      <div id="nav-team" className="relative" style={{ zIndex: 11 }}>
        <MeetTheTeam />
      </div>

      {/* ═══════════════════════════════════════════
          CARD 12 — Closing CTA  (z-12)
          ═══════════════════════════════════════════ */}
      <div className="relative" style={{ zIndex: 12 }}>
        <ClosingCTA />
      </div>
    </>
  );
}
