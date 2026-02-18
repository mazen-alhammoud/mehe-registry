import { useEffect, useRef, useState } from "react";

/* ─── Step data ─── */

const STEPS = [
  {
    num: 1,
    title: "Secure Design & Configuration",
    tagline: "Defined centrally. Locked before activation.",
    bullets: [
      "Exam blueprint approved",
      "Questions uploaded to secure system",
      "Timing & sequencing configured",
      "Seating logic predefined",
    ],
    closing: "Nothing printed.\nNothing transported.",
  },
  {
    num: 2,
    title: "Identity & Access Control",
    tagline: "Only verified participants enter the system.",
    bullets: [
      "Unique digital accounts",
      "Admission tickets generated",
      "Practice access before exam day",
      "Controlled access windows",
    ],
    closing: "Chain of custody becomes digital.",
  },
  {
    num: 3,
    title: "Official Exam Day Execution",
    tagline: "Standardized conditions. Across all schools.",
    bullets: [
      "Automated randomized seating",
      "Ticket verification on entry",
      "Secure device-based exam",
      "Central live monitoring at Ministry HQ",
    ],
    closing:
      "No pre-assigned clustering.\nNo uncontrolled movement.\nNo physical paper circulation.",
  },
  {
    num: 4,
    title: "Automated Correction & Integrity Controls",
    tagline: "Immediate. Consistent. Unbiased.",
    bullets: [
      "Automatic scoring",
      "Identity-blind correction",
      "Uniform marking standards",
      "Anomaly detection flags",
    ],
    closing: "Human variability minimized.",
  },
  {
    num: 5,
    title: "Reporting & System-Level Insight",
    tagline: "Evidence replaces assumption.",
    bullets: [
      "Student-level reports",
      "School & regional dashboards",
      "Equity analysis",
      "Operational stability metrics",
    ],
    closing: "Data becomes decision support.",
  },
];

/* ─── Animated step card ─── */

function StepCard({
  step,
  index,
}: {
  step: (typeof STEPS)[number];
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

  /* Alternate slide direction */
  const fromLeft = index % 2 === 0;
  const slideX = fromLeft ? -40 : 40;

  /* Image on opposite side of text */
  const imageOnRight = index % 2 === 0;

  const textColumn = (
    <div
      className="flex-1 transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateX(0) translateY(0)"
          : `translateX(${slideX}px) translateY(16px)`,
        transitionDelay: "0.15s",
      }}
    >
      <div
        className="rounded-2xl px-7 py-7 sm:px-9 sm:py-8 h-full transition-shadow duration-700"
        style={{
          background: "#ffffff",
          border: "1px solid rgba(0, 0, 0, 0.06)",
          boxShadow: visible
            ? "0 8px 32px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)"
            : "0 2px 8px rgba(0,0,0,0.02)",
        }}
      >
        {/* Step number + title */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-700"
            style={{
              background: visible ? "#2444E2" : "#e5e7eb",
              color: visible ? "#fff" : "#9ca3af",
              boxShadow: visible
                ? "0 0 0 4px rgba(36, 68, 226, 0.10), 0 2px 8px rgba(36, 68, 226, 0.15)"
                : "none",
              transform: visible ? "scale(1)" : "scale(0.7)",
              transitionDelay: "0.2s",
            }}
          >
            {step.num}
            {visible && (
              <span
                className="absolute inset-0 rounded-full animate-pulse-ring"
                style={{ border: "2px solid rgba(36, 68, 226, 0.3)" }}
              />
            )}
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
            {step.title}
          </h3>
        </div>

        {/* Tagline */}
        <p
          className="text-sm text-gray-400 italic mb-4 transition-all duration-500"
          style={{
            opacity: visible ? 1 : 0,
            transitionDelay: "0.4s",
          }}
        >
          {step.tagline}
        </p>

        {/* Bullets — staggered reveal */}
        <ul className="space-y-2.5 mb-5">
          {step.bullets.map((b, i) => (
            <li
              key={i}
              className="flex items-center gap-2.5 transition-all duration-500"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(16px)",
                transitionDelay: `${0.45 + i * 0.08}s`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: "#2444E2" }}
              />
              <span className="text-sm text-gray-600">{b}</span>
            </li>
          ))}
        </ul>

        {/* Closing statement */}
        <p
          className="text-sm font-semibold whitespace-pre-line transition-all duration-500"
          style={{
            color: "#2444E2",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(8px)",
            transitionDelay: "0.75s",
          }}
        >
          {step.closing}
        </p>
      </div>
    </div>
  );

  const imageColumn = (
    <div
      className="flex-1 transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateX(0) scale(1)"
          : `translateX(${-slideX}px) scale(0.95)`,
        transitionDelay: "0.3s",
      }}
    >
      <div
        className="rounded-2xl overflow-hidden flex items-center justify-center h-full transition-all duration-700"
        style={{
          background: "#f9fafb",
          border: "2px dashed rgba(36, 68, 226, 0.15)",
          minHeight: 240,
          boxShadow: visible
            ? "0 4px 20px rgba(0,0,0,0.04)"
            : "none",
        }}
      >
        <div className="text-center">
          <svg
            className="w-10 h-10 mx-auto mb-3"
            style={{ color: "rgba(36, 68, 226, 0.2)" }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span
            className="text-xs font-medium"
            style={{ color: "rgba(36, 68, 226, 0.3)" }}
          >
            Image coming soon
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div ref={ref} className="pb-10 sm:pb-14">
      {/* Mobile: stacked */}
      <div className="flex flex-col gap-4 sm:hidden">
        {textColumn}
        {imageColumn}
      </div>

      {/* Desktop: side by side, alternating */}
      <div className="hidden sm:grid sm:grid-cols-2 gap-6 items-stretch">
        {imageOnRight ? (
          <>
            {textColumn}
            {imageColumn}
          </>
        ) : (
          <>
            {imageColumn}
            {textColumn}
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Main component ─── */

export default function NationalFramework() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

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

  return (
    <section className="relative bg-white">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 0%, rgba(36,68,226,0.03) 0%, transparent 50%), radial-gradient(ellipse at 80% 100%, rgba(36,68,226,0.03) 0%, transparent 50%)",
        }}
      />

      {/* ─── Section header ─── */}
      <div className="relative max-w-2xl mx-auto px-6 pt-24 sm:pt-32 pb-16">
        <div
          ref={headerRef}
          className="text-center transition-all duration-700"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-5"
            style={{ color: "#2444E2" }}
          >
            The Controlled Exam Journey
          </p>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight leading-snug mb-4">
            From Design to{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #1a33b8, #2444E2, #6b8cff)",
              }}
            >
              Decision
            </span>
            {" "}— Fully Traceable
          </h2>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <div className="h-px w-12 bg-gray-200" />
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "#2444E2" }}
            />
            <div className="h-px w-12 bg-gray-200" />
          </div>
        </div>
      </div>

      {/* ─── Alternating cards ─── */}
      <div className="relative max-w-5xl mx-auto px-6 pb-24 sm:pb-32">
        {STEPS.map((step, i) => (
          <StepCard key={step.num} step={step} index={i} />
        ))}
      </div>
    </section>
  );
}
