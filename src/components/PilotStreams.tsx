import { useEffect, useRef, useState } from "react";

/* ─── Stream data ─── */

interface SubSection {
  title: string;
  bullets: string[];
}

interface Stream {
  id: string;
  label: string;
  tagline: string;
  framing: string;
  icon: "academic" | "technology" | "operational";
  sections: SubSection[];
  callout?: string;
}

const STREAMS: Stream[] = [
  {
    id: "academic",
    label: "Academic Design",
    tagline: "Stream A",
    framing: "Measurement must be intentional.",
    icon: "academic",
    sections: [
      {
        title: "Blueprint & Alignment",
        bullets: [
          "Curriculum-aligned exam blueprint",
          "Learning outcome mapping",
          "Ministry academic validation at every stage",
        ],
      },
      {
        title: "Question Design Discipline",
        bullets: [
          "Structured item design framework",
          "Bloom's taxonomy integration (where appropriate)",
          "Measured cognitive depth — not recall-only testing",
        ],
      },
      {
        title: "Assessment Integrity",
        bullets: [
          "Controlled difficulty distribution",
          "Calibrated timing strategy",
          "Pre-approved content governance",
        ],
      },
    ],
    callout: "Co-developed and validated with Ministry academic teams.",
  },
  {
    id: "technology",
    label: "Secure Technology",
    tagline: "Stream B",
    framing: "Access must be controlled. Visibility must be traceable.",
    icon: "technology",
    sections: [
      {
        title: "Identity & Access Control",
        bullets: [
          "Role-based accounts (students, proctors, administrators, Ministry viewers)",
          "Unique credentials with controlled time windows",
          "Secure authentication protocols",
        ],
      },
      {
        title: "System Stability",
        bullets: [
          "Centralized configuration",
          "Practice/demo environment prior to exam day",
          "Controlled exam activation",
        ],
      },
      {
        title: "Behavioral Intelligence",
        bullets: [
          "Time-per-question tracking",
          "Answer-change patterns",
          "Anomaly detection indicators",
        ],
      },
    ],
    callout: "Co-validated with Ministry IT team.",
  },
  {
    id: "operational",
    label: "Operational Execution",
    tagline: "Stream C",
    framing: "Integrity is protected on exam day.",
    icon: "operational",
    sections: [
      {
        title: "Supervision Protocols",
        bullets: [
          "School-level readiness checklist",
          "Structured proctor guidance",
        ],
      },
      {
        title: "Integrity Safeguards",
        bullets: [
          "Automated randomized seating (cinema-style principle)",
          "Controlled movement protocols",
          "Reduced collusion opportunity",
        ],
      },
      {
        title: "Central Oversight",
        bullets: [
          "Real-time monitoring dashboard at Ministry HQ",
          "Live visibility across participating schools",
          "Incident traceability",
        ],
      },
    ],
    callout: "Execution coordinated with the Ministry.",
  },
];

/* ─── Icons ─── */

function StreamIcon({ type, active }: { type: Stream["icon"]; active: boolean }) {
  const color = active ? "#ffffff" : "#9ca3af";

  if (type === "academic") {
    return (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
      </svg>
    );
  }
  if (type === "technology") {
    return (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    );
  }
  // operational
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

/* ─── Bullet check ─── */

function BulletCheck() {
  return (
    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="#2444E2" strokeWidth="1.2" opacity="0.25" />
      <path d="M5.5 8l2 2 3.5-4" stroke="#2444E2" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Expanding callout ─── */

function MiniPilotCallout() {
  const ref = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setExpanded(true);
          obs.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="mt-10 sm:mt-12 flex justify-center">
      <div
        className="overflow-hidden text-center transition-all ease-out"
        style={{
          width: expanded ? "100%" : "260px",
          maxWidth: "100%",
          padding: expanded ? "3rem 2.5rem" : "0.75rem 1.5rem",
          borderRadius: expanded ? "1rem" : "9999px",
          background: expanded
            ? "linear-gradient(135deg, rgba(36,68,226,0.04) 0%, rgba(36,68,226,0.08) 100%)"
            : "rgba(36,68,226,0.06)",
          border: expanded
            ? "1px solid rgba(36,68,226,0.12)"
            : "1px solid rgba(36,68,226,0.15)",
          transitionDuration: "0.8s",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Label — always visible */}
        <p
          className="text-xs font-semibold uppercase tracking-[0.15em] transition-all ease-out"
          style={{
            color: "#2444E2",
            marginBottom: expanded ? "1rem" : "0",
            transitionDuration: "0.6s",
          }}
        >
          Before National Rollout
        </p>

        {/* Expanding content */}
        <div
          className="transition-all ease-out overflow-hidden"
          style={{
            maxHeight: expanded ? "200px" : "0px",
            opacity: expanded ? 1 : 0,
            transform: expanded ? "translateY(0)" : "translateY(8px)",
            transitionDuration: "0.7s",
            transitionDelay: expanded ? "0.25s" : "0s",
          }}
        >
          <p className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug max-w-xl mx-auto mb-3">
            A controlled mini-pilot is conducted with the Ministry team
          </p>
          <p className="text-sm sm:text-base text-gray-500 max-w-md mx-auto">
            to validate execution, coordination, and system readiness.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Main component ─── */

export default function PilotStreams() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeStream, setActiveStream] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-20 sm:pt-32 sm:pb-28">
        {/* ─── Header ─── */}
        <div
          className={`text-center mb-14 sm:mb-16 transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
            style={{ color: "#2444E2" }}
          >
            How the Pilot Runs
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-4">
            One Unified System.{" "}
            <br className="hidden sm:block" />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, #1a33b8, #2444E2, #6b8cff)" }}
            >
              Three Synchronized Streams.
            </span>
          </h2>
        </div>

        {/* ─── Stream selector tabs ─── */}
        <div
          className={`relative grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-12 sm:mb-14 transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          style={{ transitionDelay: "0.1s" }}
        >
          {STREAMS.map((s, i) => {
            const isActive = i === activeStream;
            return (
              <button
                key={s.id}
                onClick={() => setActiveStream(i)}
                className="group relative rounded-xl px-5 py-5 sm:px-6 sm:py-6 text-left transition-all duration-400 cursor-pointer overflow-hidden"
                style={{
                  background: isActive
                    ? "linear-gradient(135deg, #1a33b8 0%, #2444E2 50%, #3b5fe8 100%)"
                    : "#f4f5f7",
                  border: "1px solid",
                  borderColor: isActive ? "rgba(36,68,226,0.3)" : "rgba(0,0,0,0.04)",
                  boxShadow: isActive
                    ? "0 8px 32px rgba(36,68,226,0.25), 0 2px 8px rgba(36,68,226,0.15)"
                    : "none",
                  opacity: isActive ? 1 : 0.6,
                  transform: isActive ? "scale(1)" : "scale(0.98)",
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <StreamIcon type={s.icon} active={isActive} />
                  <span
                    className="text-[0.6rem] font-bold uppercase tracking-[0.15em] transition-colors duration-300"
                    style={{ color: isActive ? "rgba(255,255,255,0.7)" : "#9ca3af" }}
                  >
                    {s.tagline}
                  </span>
                </div>
                <p
                  className="text-sm sm:text-base font-semibold transition-colors duration-300"
                  style={{ color: isActive ? "#ffffff" : "#6b7280" }}
                >
                  {s.label}
                </p>
                <p
                  className="mt-1 text-xs leading-snug transition-colors duration-300"
                  style={{ color: isActive ? "rgba(255,255,255,0.6)" : "#9ca3af" }}
                >
                  {s.framing}
                </p>
              </button>
            );
          })}
        </div>

        {/* ─── Stream content ─── */}
        <div className="relative" style={{ minHeight: 320 }}>
          {STREAMS.map((s, i) => {
            const isActive = i === activeStream;

            return (
              <div
                key={s.id}
                className="absolute inset-x-0 top-0"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateY(0)" : "translateY(12px)",
                  transition: "all 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
                  pointerEvents: isActive ? "auto" : "none",
                }}
                aria-hidden={!isActive}
              >
                {/* Framing line */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px flex-1 max-w-[40px]" style={{ background: "#2444E2", opacity: 0.2 }} />
                  <p className="text-sm sm:text-base text-gray-500 italic">
                    {s.framing}
                  </p>
                </div>

                {/* Subsections grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                  {s.sections.map((sub, j) => (
                    <div
                      key={sub.title}
                      className="relative"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "translateY(0)" : "translateY(8px)",
                        transition: `all 0.45s cubic-bezier(0.16, 1, 0.3, 1) ${j * 0.08}s`,
                      }}
                    >
                      {/* Number + Title */}
                      <div className="flex items-center gap-2.5 mb-4">
                        <span
                          className="flex items-center justify-center w-6 h-6 rounded-md text-[0.55rem] font-bold"
                          style={{ background: "rgba(36,68,226,0.08)", color: "#2444E2" }}
                        >
                          {j + 1}
                        </span>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-tight">
                          {sub.title}
                        </h3>
                      </div>

                      {/* Bullets */}
                      <ul className="space-y-2.5 pl-0.5">
                        {sub.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-2.5">
                            <BulletCheck />
                            <span className="text-[0.8rem] text-gray-600 leading-snug">
                              {bullet}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Stream callout */}
                {s.callout && (
                  <div
                    className="mt-8 inline-flex items-center gap-2 rounded-lg px-4 py-2.5"
                    style={{
                      background: "rgba(36,68,226,0.04)",
                      border: "1px solid rgba(36,68,226,0.1)",
                    }}
                  >
                    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zm0 3v4m0 2v.5"
                        stroke="#2444E2"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="text-xs font-medium" style={{ color: "#2444E2" }}>
                      {s.callout}
                    </span>
                  </div>
                )}
              </div>
            );
          })}

          {/* Height spacer — tallest stream determines container height */}
          <div className="invisible" aria-hidden="true">
            <div className="mb-8 flex items-center gap-3">
              <div className="h-px flex-1 max-w-[40px]" />
              <p className="text-sm">&nbsp;</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {STREAMS.reduce((a, b) => {
                const aLen = a.sections.reduce((s, sec) => s + sec.bullets.length, 0);
                const bLen = b.sections.reduce((s, sec) => s + sec.bullets.length, 0);
                return aLen >= bLen ? a : b;
              }).sections.map((sub) => (
                <div key={sub.title}>
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="w-6 h-6" />
                    <h3 className="text-sm font-semibold">{sub.title}</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {sub.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <span className="w-4 h-4" />
                        <span className="text-[0.8rem] leading-snug">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="mt-8 px-4 py-2.5">
                <span className="text-xs">&nbsp;</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Mini-pilot callout band (expanding) ─── */}
        <MiniPilotCallout />
      </div>
    </section>
  );
}
