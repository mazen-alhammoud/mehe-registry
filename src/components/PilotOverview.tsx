import { useEffect, useRef, useState } from "react";

/* ─── Data ─── */

const STATEMENTS = [
  "There is no manual correction phase.",
  "There is no physical transfer of materials.",
  "There is no delay between completion and scoring.",
];

const OVERSIGHT_ITEMS = [
  "Real-time participation across schools",
  "Completion progression by location",
  "Session timing consistency",
  "System stability indicators",
  "Flagged irregularities or anomaly alerts",
];

/* ─── Main component ─── */

export default function PilotOverview() {
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
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-20 sm:pt-32 sm:pb-28">
        {/* ─── Two-column layout ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">

          {/* ═══ Left column: Process guarantees (dark card) ═══ */}
          <div
            className={`rounded-2xl px-8 py-9 sm:px-10 sm:py-11 transition-all duration-700 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              background: "linear-gradient(135deg, #0d1424 0%, #111827 50%, #0a0f1e 100%)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
              transitionDelay: "0.05s",
            }}
          >
            {/* Statements */}
            <div className="space-y-5 mb-8">
              {STATEMENTS.map((statement, i) => (
                <div
                  key={statement}
                  className={`flex items-start gap-3.5 transition-all duration-500 ease-out ${
                    visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-12px]"
                  }`}
                  style={{ transitionDelay: `${0.15 + i * 0.08}s` }}
                >
                  <div
                    className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  >
                    <svg className="w-3.5 h-3.5 text-white/50" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M12 4L6.5 10.5 4 8"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="text-base sm:text-lg font-semibold text-white leading-snug">
                    {statement}
                  </p>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div
              className="h-px mb-7"
              style={{ background: "linear-gradient(to right, rgba(255,255,255,0.12), transparent)" }}
            />

            {/* Closing */}
            <p
              className={`text-lg sm:text-xl font-bold leading-snug transition-all duration-700 ease-out ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "0.4s" }}
            >
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, #6b8cff, #a5b4fc, #6b8cff)" }}
              >
                The process is unified from login to result.
              </span>
            </p>
          </div>

          {/* ═══ Right column: Live Ministerial Oversight ═══ */}
          <div
            className={`rounded-2xl px-8 py-9 sm:px-10 sm:py-11 transition-all duration-700 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              background: "#ffffff",
              border: "1px solid rgba(36,68,226,0.1)",
              boxShadow: "0 2px 16px rgba(36,68,226,0.04), 0 1px 4px rgba(0,0,0,0.03)",
              transitionDelay: "0.15s",
            }}
          >
            {/* Tag */}
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(36,68,226,0.08)" }}
              >
                <svg className="w-4 h-4" style={{ color: "#2444E2" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <p
                className="text-sm sm:text-base font-bold uppercase tracking-[0.12em]"
                style={{ color: "#2444E2" }}
              >
                Live Ministerial Oversight
              </p>
            </div>

            <p className="text-sm text-gray-500 leading-relaxed mb-7">
              Throughout execution, authorized Ministry leadership may observe:
            </p>

            {/* Observation items */}
            <div className="space-y-3 mb-8">
              {OVERSIGHT_ITEMS.map((item, i) => (
                <div
                  key={item}
                  className={`flex items-center gap-3 transition-all duration-500 ease-out ${
                    visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-12px]"
                  }`}
                  style={{ transitionDelay: `${0.25 + i * 0.06}s` }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "#2444E2" }}
                  />
                  <span className="text-sm text-gray-700 leading-snug">{item}</span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div
              className="h-px mb-7"
              style={{ background: "linear-gradient(to right, rgba(36,68,226,0.15), transparent)" }}
            />

            {/* Closing callout */}
            <div
              className="relative pl-5"
              style={{ borderLeft: "2px solid #2444E2" }}
            >
              <p className="text-sm font-semibold text-gray-900 leading-relaxed">
                This is not post-event reporting.
              </p>
              <p className="text-sm font-semibold leading-relaxed">
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg, #1a33b8, #2444E2, #6b8cff)" }}
                >
                  It is live institutional visibility.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
