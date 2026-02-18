import { useCallback, useEffect, useRef, useState } from "react";

/* ─── Data ─── */

const STEPS = [
  {
    process: "Manual question preparation and storage prior to exam day",
    risk: "Increased exposure window before official administration",
  },
  {
    process: "Physical printing and transportation of exam materials",
    risk: "Risk of premature access or uncontrolled duplication",
  },
  {
    process: "Repeated human handling across multiple centers",
    risk: "Reduced chain-of-custody visibility",
  },
  {
    process: "Extended time gap between exam sitting and correction",
    risk: "Perception risk regarding consistency and neutrality",
  },
  {
    process: "Manual correction processes tied to identity visibility",
    risk: "Risk of inconsistent marking standards",
  },
  {
    process: "Centralized paper correction at scale",
    risk: "Operational fatigue and variability under workload pressure",
  },
  {
    process: "Fragmented communication between regions and central authority",
    risk: "Limited real-time oversight and delayed issue detection",
  },
];

const SEVERITY = [
  { dot: "#f59e0b", text: "#fbbf24", bg: "rgba(245,158,11,0.06)", border: "rgba(245,158,11,0.20)" },
  { dot: "#f59e0b", text: "#fbbf24", bg: "rgba(245,158,11,0.06)", border: "rgba(245,158,11,0.20)" },
  { dot: "#f97316", text: "#fb923c", bg: "rgba(249,115,22,0.06)", border: "rgba(249,115,22,0.20)" },
  { dot: "#f97316", text: "#fb923c", bg: "rgba(249,115,22,0.06)", border: "rgba(249,115,22,0.20)" },
  { dot: "#ef4444", text: "#f87171", bg: "rgba(239,68,68,0.06)",  border: "rgba(239,68,68,0.22)" },
  { dot: "#ef4444", text: "#f87171", bg: "rgba(239,68,68,0.06)",  border: "rgba(239,68,68,0.22)" },
  { dot: "#dc2626", text: "#ef4444", bg: "rgba(220,38,38,0.08)",  border: "rgba(220,38,38,0.25)" },
];

const COOLDOWN = 600; // ms between card changes

/* ─── Main component ─── */

export default function StructuralPressures() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const cooldownRef = useRef(false);
  const lockedRef = useRef(false); // true while section owns scroll
  const touchStartY = useRef(0);

  /* Keep ref in sync */
  useEffect(() => { activeRef.current = active; }, [active]);

  /* Entrance observer */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Is the section "in control"? — fully covering viewport */
  const isSectionActive = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    // Section top is near viewport top (within 10px tolerance)
    return rect.top <= 10 && rect.bottom >= window.innerHeight - 10;
  }, []);

  /* Advance / retreat one card */
  const go = useCallback((dir: 1 | -1) => {
    if (cooldownRef.current) return false;
    const next = activeRef.current + dir;
    if (next < 0 || next >= STEPS.length) return false; // boundary — release

    cooldownRef.current = true;
    setActive(next);
    setTimeout(() => { cooldownRef.current = false; }, COOLDOWN);
    return true; // consumed
  }, []);

  /* ─── Wheel handler ─── */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (!isSectionActive()) {
        lockedRef.current = false;
        return;
      }

      const dir = e.deltaY > 0 ? 1 : -1;

      // At boundary — release scroll to leave section
      const atStart = activeRef.current === 0 && dir === -1;
      const atEnd = activeRef.current === STEPS.length - 1 && dir === 1;

      if (atStart || atEnd) {
        lockedRef.current = false;
        return; // don't prevent default
      }

      e.preventDefault();
      lockedRef.current = true;
      go(dir as 1 | -1);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [go, isSectionActive]);

  /* ─── Touch handler ─── */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isSectionActive()) {
        lockedRef.current = false;
        return;
      }

      const deltaY = touchStartY.current - e.touches[0].clientY;
      if (Math.abs(deltaY) < 30) return; // ignore tiny swipes

      const dir = deltaY > 0 ? 1 : -1;
      const atStart = activeRef.current === 0 && dir === -1;
      const atEnd = activeRef.current === STEPS.length - 1 && dir === 1;

      if (atStart || atEnd) {
        lockedRef.current = false;
        return;
      }

      e.preventDefault();
      lockedRef.current = true;
      if (go(dir as 1 | -1)) {
        touchStartY.current = e.touches[0].clientY; // reset for next swipe
      }
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, [go, isSectionActive]);

  /* Click navigation */
  const goTo = useCallback((index: number) => {
    if (cooldownRef.current) return;
    cooldownRef.current = true;
    setActive(index);
    setTimeout(() => { cooldownRef.current = false; }, COOLDOWN);
  }, []);

  const sev = SEVERITY[active];
  const progress = ((active + 1) / STEPS.length) * 100;

  return (
    <div
      ref={sectionRef}
      className="relative h-screen overflow-hidden rounded-t-[2rem]"
      style={{
        background: "linear-gradient(165deg, #0a0f1e 0%, #111827 50%, #0d1424 100%)",
        boxShadow: "0 -20px 80px rgba(0, 0, 0, 0.35), 0 -4px 20px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Handle bar */}
      <div className="absolute top-0 inset-x-0 flex justify-center pt-3 pointer-events-none" style={{ zIndex: 10 }}>
        <div className="w-10 h-1 rounded-full bg-white/10" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Accent glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse at center, ${sev.dot}0c 0%, transparent 70%)`,
        }}
      />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center max-w-4xl mx-auto px-6 py-10">
        {/* ─── Header ─── */}
        <div
          className={`text-center mb-8 sm:mb-10 flex-shrink-0 transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#6b8cff" }}>
            Why This Is Necessary
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-3">
            The Structural Pressures Behind{" "}
            <br className="hidden sm:block" />
            Official Examinations
          </h2>
          <p className="max-w-2xl mx-auto text-sm text-gray-400 leading-relaxed">
            The current examination lifecycle introduces structural friction at
            every stage — each one a potential point of failure.
          </p>
        </div>

        {/* ─── Progress bar ─── */}
        <div
          className={`mb-6 flex-shrink-0 transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "0.1s" }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-gray-500">
              Examination Lifecycle
            </span>
            <span className="text-[0.6rem] font-bold tabular-nums" style={{ color: sev.dot }}>
              {active + 1} / {STEPS.length}
            </span>
          </div>
          <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, #f59e0b, ${sev.dot})`,
              }}
            />
          </div>
        </div>

        {/* ─── Carousel ─── */}
        <div
          className={`relative flex-1 min-h-0 flex items-center transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "0.2s" }}
        >
          {STEPS.map((s, i) => {
            const sv = SEVERITY[i];
            const isActive = i === active;
            const offset = i - active;

            return (
              <div
                key={i}
                className="absolute inset-0 flex items-center"
                style={{
                  transform: `translateX(${offset * 6}%) scale(${isActive ? 1 : 0.94})`,
                  opacity: isActive ? 1 : 0,
                  transition: "all 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
                  pointerEvents: isActive ? "auto" : "none",
                }}
                aria-hidden={!isActive}
              >
                <div
                  className="w-full rounded-2xl px-6 py-6 sm:px-9 sm:py-8"
                  style={{
                    background: sv.bg,
                    border: `1px solid ${sv.border}`,
                    boxShadow: `0 0 60px ${sv.dot}08, 0 4px 24px rgba(0,0,0,0.3)`,
                  }}
                >
                  {/* Badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold"
                      style={{ background: `${sv.dot}20`, color: sv.dot }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="text-[0.6rem] font-semibold uppercase tracking-[0.12em]"
                      style={{ color: sv.dot }}
                    >
                      Structural Pressure
                    </span>
                  </div>

                  {/* Process */}
                  <p className="text-lg sm:text-xl font-semibold text-white leading-snug mb-4">
                    {s.process}
                  </p>

                  {/* Divider */}
                  <div
                    className="h-px mb-4"
                    style={{ background: `linear-gradient(to right, ${sv.dot}33, transparent)` }}
                  />

                  {/* Risk */}
                  <div className="flex items-start gap-3">
                    <div
                      className="flex items-center justify-center w-6 h-6 rounded-md flex-shrink-0 mt-0.5"
                      style={{ background: `${sv.dot}18` }}
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path
                          d="M7 1.75L1.75 11.25h10.5L7 1.75z"
                          stroke={sv.dot}
                          strokeWidth="1.2"
                          strokeLinejoin="round"
                        />
                        <path d="M7 6v2.5m0 1.25v.25" stroke={sv.dot} strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-gray-500 mb-1">
                        Risk to Safeguard
                      </p>
                      <p className="text-base sm:text-lg font-medium leading-snug" style={{ color: sv.text }}>
                        {s.risk}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── Controls ─── */}
        <div
          className={`mt-6 flex items-center justify-between flex-shrink-0 transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "0.3s" }}
        >
          {/* Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => go(-1)}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              style={{
                background: active > 0 ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.1)",
                opacity: active > 0 ? 1 : 0.4,
              }}
              aria-label="Previous step"
            >
              <svg className="w-4 h-4 text-gray-400" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => go(1)}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              style={{
                background: active < STEPS.length - 1 ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.1)",
                opacity: active < STEPS.length - 1 ? 1 : 0.4,
              }}
              aria-label="Next step"
            >
              <svg className="w-4 h-4 text-gray-400" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Dots */}
          <div className="flex items-center gap-1.5">
            {STEPS.map((_, i) => {
              const sv = SEVERITY[i];
              const isActive = i === active;
              const isPast = i <= active;

              return (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="p-1 cursor-pointer"
                  aria-label={`Go to step ${i + 1}`}
                >
                  <div
                    className="rounded-full transition-all duration-500"
                    style={{
                      width: isActive ? 24 : 8,
                      height: 8,
                      backgroundColor: isActive ? sv.dot : isPast ? `${sv.dot}66` : "rgba(255,255,255,0.12)",
                      boxShadow: isActive ? `0 0 8px ${sv.dot}44` : "none",
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── Bottom note ─── */}
        <div
          className={`mt-4 flex items-center justify-center gap-3 flex-shrink-0 transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "0.4s" }}
        >
          <div className="h-px flex-1 max-w-[60px]" style={{ background: "rgba(255,255,255,0.08)" }} />
          <p className="text-xs text-gray-500 text-center">
            Scroll to navigate through each pressure point
          </p>
          <div className="h-px flex-1 max-w-[60px]" style={{ background: "rgba(255,255,255,0.08)" }} />
        </div>
      </div>
    </div>
  );
}
