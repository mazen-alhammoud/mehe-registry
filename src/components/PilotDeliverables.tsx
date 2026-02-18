import { useEffect, useRef, useState, useCallback } from "react";

/* ─── Card data ─── */

const CARDS = [
  {
    title: "Performance & Completion Report",
    descriptor: "A verified view of participation and outcomes.",
    bullets: [
      "Participation rates",
      "Completion integrity metrics",
      "Item-level performance analysis",
      "Distribution by school and region",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    title: "Equity & Regional Analysis",
    descriptor: "Consistency measured across the national system.",
    bullets: [
      "Performance comparisons by region",
      "School-level variation mapping",
      "Standardization indicators",
      "Difficulty calibration validation",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    title: "Integrity & Operational Stability",
    descriptor: "Full traceability across the examination lifecycle.",
    bullets: [
      "Access logs",
      "Incident tracking",
      "System uptime metrics",
      "Anomaly detection summary",
    ],
    micro: "Logged data — not assumptions.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Behavioral & Learning Insights",
    descriptor: "Transforming exam activity into education intelligence.",
    bullets: [
      "Time-per-question patterns",
      "Hesitation indicators",
      "Answer-change analysis",
      "Exam-flow friction points",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    title: "Strategic Recommendation Brief",
    descriptor: "Clear next-step pathways informed by evidence.",
    bullets: ["Refine", "Expand", "Adjust", "Scale"],
    micro: "Decisions grounded in data — not assumption.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

const CARD_W = 320;
const GAP = 20;

/* ─── Expanding closing callout ─── */

function ClosingCallout() {
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
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="max-w-5xl mx-auto px-6 py-20 sm:py-28 flex justify-center">
      <div
        className="overflow-hidden text-center transition-all ease-out"
        style={{
          width: expanded ? "100%" : "220px",
          maxWidth: "100%",
          padding: expanded ? "3rem 2.5rem" : "0.75rem 1.5rem",
          borderRadius: expanded ? "1rem" : "9999px",
          background: expanded
            ? "linear-gradient(135deg, rgba(30,41,59,0.04) 0%, rgba(30,41,59,0.08) 100%)"
            : "rgba(30,41,59,0.06)",
          border: expanded
            ? "1px solid rgba(30,41,59,0.12)"
            : "1px solid rgba(30,41,59,0.15)",
          transitionDuration: "0.8s",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Label — always visible */}
        <p
          className="text-xs font-semibold uppercase tracking-[0.15em] transition-all ease-out"
          style={{
            color: "#475569",
            marginBottom: expanded ? "1rem" : "0",
            transitionDuration: "0.6s",
          }}
        >
          Beyond Results
        </p>

        {/* Expanding content */}
        <div
          className="transition-all ease-out overflow-hidden flex flex-col items-center"
          style={{
            maxHeight: expanded ? "320px" : "0px",
            opacity: expanded ? 1 : 0,
            transform: expanded ? "translateY(0)" : "translateY(8px)",
            transitionDuration: "0.7s",
            transitionDelay: expanded ? "0.25s" : "0s",
          }}
        >
          <p
            className="text-xl sm:text-2xl font-bold leading-snug max-w-xl mb-6"
            style={{ color: "#0f172a" }}
          >
            The Ministry receives more than results.
          </p>

          {/* Icon row */}
          <div className="grid grid-cols-3 w-full max-w-sm">
            {/* Visibility */}
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: "#f1f3f9", color: "#475569" }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <span className="text-xs font-semibold" style={{ color: "#334155" }}>
                Visibility
              </span>
            </div>

            {/* Operational Control */}
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: "#f1f3f9", color: "#475569" }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </div>
              <span className="text-xs font-semibold" style={{ color: "#334155" }}>
                Operational Control
              </span>
            </div>

            {/* Validated Path Forward */}
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: "#f1f3f9", color: "#475569" }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <span className="text-xs font-semibold" style={{ color: "#334155" }}>
                Validated Path Forward
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main component ─── */

export default function PilotDeliverables() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  /* Reveal on scroll */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Sync active dot with scroll position */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const idx = Math.round(track.scrollLeft / (CARD_W + GAP));
      setActive(Math.min(idx, CARDS.length - 1));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  /* Navigate to card */
  const goTo = useCallback((idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: idx * (CARD_W + GAP), behavior: "smooth" });
    setActive(idx);
  }, []);

  /* Drag to scroll */
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, scrollLeft: track.scrollLeft };
    track.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      const track = trackRef.current;
      if (!track) return;
      const dx = e.clientX - dragStart.current.x;
      track.scrollLeft = dragStart.current.scrollLeft - dx;
    },
    [isDragging]
  );

  const onPointerUp = useCallback(() => setIsDragging(false), []);

  return (
    <section ref={sectionRef} className="relative bg-white">
      <div className="max-w-5xl mx-auto px-6 pt-24 sm:pt-32 pb-6">
        {/* ─── Header ─── */}
        <div
          className="mb-16 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
            style={{ color: "#64748b" }}
          >
            What the Ministry Receives After the Pilot
          </p>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-snug mb-5">
            <span style={{ color: "#0f172a" }}>A </span>
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #1a33b8, #2444E2, #6b8cff)",
              }}
            >
              Structured, Auditable Evidence Pack
            </span>
          </h2>

          <p
            className="text-sm sm:text-base leading-relaxed max-w-2xl"
            style={{ color: "#64748b" }}
          >
            The pilot concludes with more than examination outcomes.
            <br />
            It delivers verified evidence — enabling informed decisions,
            protecting institutional credibility, and supporting responsible
            national scaling.
          </p>
        </div>

        {/* ─── Post-Pilot Deliverables label ─── */}
        <div
          className="flex items-center gap-4 mb-5 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transitionDelay: "0.1s",
          }}
        >
          <div className="h-px flex-1" style={{ background: "#e2e5ec" }} />
          <span
            className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] whitespace-nowrap"
            style={{ color: "#94a3b8" }}
          >
            Post-Pilot Deliverables
          </span>
          <div className="h-px flex-1" style={{ background: "#e2e5ec" }} />
        </div>
      </div>

      {/* ─── Horizontal carousel (contained) ─── */}
      <div
        className="max-w-5xl mx-auto px-6 transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transitionDelay: "0.2s",
        }}
      >
        <div
          ref={trackRef}
          className="flex overflow-x-auto pb-6 select-none"
          style={{
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
            cursor: isDragging ? "grabbing" : "grab",
            gap: GAP,
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {CARDS.map((card, i) => (
            <div
              key={card.title}
              className="shrink-0 rounded-xl flex flex-col transition-all duration-500"
              style={{
                width: CARD_W,
                scrollSnapAlign: "start",
                background: "#ffffff",
                border:
                  active === i
                    ? "1px solid #cbd5e1"
                    : "1px solid #e2e5ec",
                boxShadow:
                  active === i
                    ? "0 4px 24px rgba(0,0,0,0.06)"
                    : "0 1px 4px rgba(0,0,0,0.03)",
              }}
            >
              <div className="px-6 py-6 flex flex-col h-full">
                {/* Number + Icon row */}
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-[0.6rem] font-bold uppercase tracking-widest"
                    style={{ color: "#94a3b8" }}
                  >
                    0{i + 1}
                  </span>
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: "#f1f3f9", color: "#3b4a6b" }}
                  >
                    {card.icon}
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="text-sm font-bold mb-1 leading-snug"
                  style={{ color: "#1e293b" }}
                >
                  {card.title}
                </h3>

                {/* Descriptor */}
                <p
                  className="text-xs mb-4 leading-relaxed"
                  style={{ color: "#64748b" }}
                >
                  {card.descriptor}
                </p>

                {/* Bullets */}
                <ul className="space-y-1.5 mb-auto">
                  {card.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span
                        className="w-1 h-1 rounded-full mt-1.5 shrink-0"
                        style={{ background: "#475569" }}
                      />
                      <span className="text-xs" style={{ color: "#475569" }}>
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Micro-copy */}
                {card.micro && (
                  <p
                    className="mt-5 pt-4 text-[0.65rem] font-medium italic tracking-wide"
                    style={{
                      color: "#94a3b8",
                      borderTop: "1px solid #f1f5f9",
                    }}
                  >
                    {card.micro}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ─── Dots + arrows ─── */}
        <div className="max-w-5xl mx-auto px-6 mt-6 flex items-center justify-between">
          {/* Dots */}
          <div className="flex gap-2">
            {CARDS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="transition-all duration-300"
                style={{
                  width: active === i ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: active === i ? "#475569" : "#cbd5e1",
                  border: "none",
                  cursor: "pointer",
                }}
                aria-label={`Go to card ${i + 1}`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex gap-2">
            <button
              onClick={() => goTo(Math.max(0, active - 1))}
              disabled={active === 0}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
              style={{
                border: "1px solid #e2e5ec",
                background: "#fff",
                color: active === 0 ? "#cbd5e1" : "#475569",
                cursor: active === 0 ? "default" : "pointer",
              }}
              aria-label="Previous"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={() => goTo(Math.min(CARDS.length - 1, active + 1))}
              disabled={active === CARDS.length - 1}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
              style={{
                border: "1px solid #e2e5ec",
                background: "#fff",
                color: active === CARDS.length - 1 ? "#cbd5e1" : "#475569",
                cursor: active === CARDS.length - 1 ? "default" : "pointer",
              }}
              aria-label="Next"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ─── Closing callout ─── */}
      <ClosingCallout />
    </section>
  );
}
