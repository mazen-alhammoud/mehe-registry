import { useEffect, useRef, useState } from "react";

/* ─── Scope items ─── */

const SCOPE_ITEMS = [
  { value: "~50", unit: "public schools", detail: "Nationwide selection" },
  { value: "30", unit: "students / school", detail: "Ministry-selected cohort" },
  { value: "Gr 7–9", unit: "grade levels", detail: "As determined by the Ministry" },
  { value: "~1,500", unit: "total participants", detail: "Synchronized nationally" },
  { value: "1 hr", unit: "MCQ competition", detail: "Digital format" },
  { value: "100%", unit: "Ministry supervised", detail: "Standardized execution" },
];

/* ─── Main component ─── */

export default function UncompromisingStandards() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

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
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-28 sm:py-36"
      style={{
        background: "linear-gradient(180deg, #f8f8fa 0%, #ffffff 50%, #f8f8fa 100%)",
      }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 800,
          height: 600,
          background: "radial-gradient(ellipse, rgba(36,68,226,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* ─── Top: tag + heading ─── */}
        <div
          className={`text-center mb-14 sm:mb-16 transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2.5 mb-5">
            <div className="h-px w-6" style={{ background: "#2444E2" }} />
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: "#2444E2" }}
            >
              The competition at a glance
            </p>
            <div className="h-px w-6" style={{ background: "#2444E2" }} />
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-4">
            Competition Scope
          </h2>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            A structured national benchmarking exercise — not a software demonstration.
          </p>
        </div>

        {/* ─── Stat cards grid ─── */}
        <div
          className={`grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 mb-14 sm:mb-16 transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "0.12s" }}
        >
          {SCOPE_ITEMS.map((item, i) => (
            <div
              key={item.unit}
              className="group relative rounded-2xl px-5 py-6 sm:px-6 sm:py-7 transition-all duration-500 ease-out hover:-translate-y-0.5"
              style={{
                background: "#ffffff",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.03), 0 4px 16px rgba(0,0,0,0.02)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
                transitionDelay: `${0.15 + i * 0.06}s`,
              }}
            >
              <p
                className="text-2xl sm:text-3xl font-bold tracking-tight mb-1"
                style={{ color: "#2444E2" }}
              >
                {item.value}
              </p>
              <p className="text-sm font-semibold text-gray-900 mb-1.5">
                {item.unit}
              </p>
              <p className="text-[0.7rem] text-gray-400 leading-snug">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        {/* ─── Closing statement ─── */}
        <div
          className={`text-center transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "0.4s" }}
        >
          <div
            className="w-full rounded-2xl px-10 py-8 sm:px-14 sm:py-10"
            style={{
              background: "linear-gradient(135deg, #0d1424 0%, #111827 50%, #0a0f1e 100%)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <p className="text-lg sm:text-xl font-bold text-white leading-snug mb-1">
              The framing is competitive.
            </p>
            <p className="text-lg sm:text-xl font-bold leading-snug">
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, #6b8cff, #2444E2, #6b8cff)" }}
              >
                The structure remains rigorous.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
