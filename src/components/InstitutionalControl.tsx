import { useEffect, useRef, useState } from "react";

/* ─── Card data ─── */

const CARDS = [
  {
    num: "01",
    title: "Unified System Architecture",
    tagline: "One controlled environment. No fragmentation.",
    bullets: [
      "One platform",
      "One chain of custody",
      "One traceable workflow",
      "One authoritative data source",
    ],
    closing: "Fragmentation introduces risk.\nUnification contains it.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <line x1="10" y1="6.5" x2="14" y2="6.5" />
        <line x1="6.5" y1="10" x2="6.5" y2="14" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Identity-Blind Correction",
    tagline: "Consistency engineered — not discretionary.",
    bullets: [
      "Automated scoring logic",
      "Uniform correction protocols",
      "Identity-blind evaluation",
      "Standardized outputs across regions",
    ],
    closing: "Bias, variability, and strain — structurally removed.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Controlled Exposure Surface",
    tagline: "Security by design — not by procedure.",
    bullets: [
      "Centralized digital question control",
      "Time-bound exam activation",
      "Comprehensive access logging",
      "Automated seating randomization",
    ],
    closing: "Leakage risk is not debated.\nIt is engineered downward.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <circle cx="12" cy="16" r="1" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Evidence-Based Governance",
    tagline: "Decisions backed by data — not interpretation.",
    bullets: [
      "Traceable audit logs",
      "Regional equity analytics",
      "Performance indicators",
      "Operational stability reporting",
    ],
    closing: "Not assumption.\nDocumented evidence.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
        <path d="M3 15h18" />
        <rect x="6" y="17" width="3" height="2" rx="0.5" />
        <rect x="10.5" y="15" width="3" height="4" rx="0.5" />
        <rect x="15" y="16" width="3" height="3" rx="0.5" />
      </svg>
    ),
  },
];

/* ─── Animated card ─── */

function AdvantageCard({
  card,
  index,
}: {
  card: (typeof CARDS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transitionDelay: `${index * 0.12}s`,
      }}
    >
      <div
        className="rounded-2xl p-7 sm:p-8 h-full flex flex-col transition-all duration-500"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(8px)",
          boxShadow: visible
            ? "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)"
            : "none",
        }}
      >
        {/* Header: number + icon */}
        <div className="flex items-center justify-between mb-5">
          <span
            className="text-xs font-bold tracking-widest"
            style={{ color: "rgba(165, 180, 252, 0.5)" }}
          >
            {card.num}
          </span>
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{
              background: "rgba(36, 68, 226, 0.15)",
              color: "#6b8cff",
            }}
          >
            {card.icon}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-2 leading-snug">
          {card.title}
        </h3>

        {/* Tagline */}
        <p
          className="text-sm italic mb-5"
          style={{ color: "rgba(165, 180, 252, 0.6)" }}
        >
          {card.tagline}
        </p>

        {/* Bullets */}
        <ul className="space-y-2 mb-5">
          {card.bullets.map((b, i) => (
            <li
              key={i}
              className="flex items-center gap-2.5 transition-all duration-500"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(12px)",
                transitionDelay: `${(index * 0.12) + 0.3 + i * 0.06}s`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: "#2444E2" }}
              />
              <span className="text-sm" style={{ color: "#cbd5e1" }}>
                {b}
              </span>
            </li>
          ))}
        </ul>

        {/* Closing */}
        <p
          className="text-sm font-semibold whitespace-pre-line mt-auto"
          style={{ color: "#6b8cff" }}
        >
          {card.closing}
        </p>

      </div>
    </div>
  );
}

/* ─── Main component ─── */

export default function InstitutionalControl() {
  const headerRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [closingVisible, setClosingVisible] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = closingRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setClosingVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #080c24 0%, #0d1338 40%, #111847 70%, #0a0f2e 100%)",
      }}
    >
      {/* Subtle ambient glows */}
      <div
        className="absolute top-0 left-1/4 pointer-events-none"
        style={{
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle, rgba(36, 68, 226, 0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 pointer-events-none"
        style={{
          width: 400,
          height: 400,
          background:
            "radial-gradient(circle, rgba(107, 140, 255, 0.06) 0%, transparent 70%)",
        }}
      />

      {/* ─── Section header ─── */}
      <div className="relative max-w-4xl mx-auto px-6 pt-24 sm:pt-32 pb-16">
        <div
          ref={headerRef}
          className="text-center transition-all duration-700"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(24px)",
          }}
        >
          {/* Eyebrow */}
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-5"
            style={{ color: "#6b8cff" }}
          >
            Designed for Institutional Control
          </p>

          {/* Headline */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-snug mb-4 text-white">
            Institutional Infrastructure —{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #6b8cff, #a5b4fc, #6b8cff)",
              }}
            >
              Not Isolated Tools
            </span>
          </h2>

          {/* Intro line */}
          <p className="text-sm sm:text-base mt-6 max-w-xl mx-auto" style={{ color: "#94a3b8" }}>
            System design determines control.{" "}
            <span className="font-medium" style={{ color: "#cbd5e1" }}>
              Control protects credibility.
            </span>
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-2 mt-10">
            <div className="h-px w-12" style={{ background: "rgba(107, 140, 255, 0.2)" }} />
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "#2444E2" }}
            />
            <div className="h-px w-12" style={{ background: "rgba(107, 140, 255, 0.2)" }} />
          </div>
        </div>
      </div>

      {/* ─── "Core System Advantages" label ─── */}
      <div className="relative max-w-5xl mx-auto px-6 pb-8">
        <div
          className="flex items-center gap-4 transition-all duration-700"
          style={{
            opacity: headerVisible ? 1 : 0,
            transitionDelay: "0.3s",
          }}
        >
          <div className="h-px flex-1" style={{ background: "rgba(107, 140, 255, 0.12)" }} />
          <span
            className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] whitespace-nowrap"
            style={{ color: "rgba(165, 180, 252, 0.4)" }}
          >
            Core System Advantages
          </span>
          <div className="h-px flex-1" style={{ background: "rgba(107, 140, 255, 0.12)" }} />
        </div>
      </div>

      {/* ─── Cards grid ─── */}
      <div className="relative max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CARDS.map((card, i) => (
            <AdvantageCard key={card.num} card={card} index={i} />
          ))}
        </div>
      </div>

      {/* ─── Closing statement ─── */}
      <div className="relative max-w-3xl mx-auto px-6 pb-24 sm:pb-32">
        <div
          ref={closingRef}
          className="text-center transition-all duration-700"
          style={{
            opacity: closingVisible ? 1 : 0,
            transform: closingVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          {/* Divider line */}
          <div
            className="mx-auto mb-10 transition-all duration-700"
            style={{
              width: closingVisible ? 60 : 0,
              height: 2,
              background: "linear-gradient(90deg, #2444E2, #6b8cff)",
              transitionDelay: "0.2s",
            }}
          />

          <p className="text-xl sm:text-2xl lg:text-3xl font-bold leading-snug text-white">
            ELMY is not simply a digital tool.
          </p>
          <p
            className="text-xl sm:text-2xl lg:text-3xl font-bold leading-snug mt-2"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #6b8cff, #a5b4fc, #6b8cff)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            It is infrastructure for trusted national assessment.
          </p>
        </div>
      </div>
    </section>
  );
}
