import { useEffect, useRef, useState } from "react";

/* ─── Data ─── */

const MINISTRY_ITEMS = [
  "Select participating schools and students",
  "Assign supervisors and proctors",
  "Provide devices (laptops or tablets)",
  "Provide stable internet connectivity",
  "Ensure classroom and on-site readiness",
  "Observe execution centrally and live",
];

const ELMY_ITEMS = [
  "Design the complete academic blueprint",
  "Develop and provide all competition questions and materials",
  "Configure and secure the Ministry-branded platform",
  "Create and manage secure user identities",
  "Generate individualized digital admission tickets",
  "Assign randomized cinema-style classroom and seating allocations",
  "Enable centralized live monitoring dashboards",
  "Activate automatic grading mechanisms",
  "Deliver structured analytics and reporting",
];

/* ─── Bullet icon ─── */

function Bullet({ color }: { color: string }) {
  return (
    <span
      className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[7px]"
      style={{ background: color }}
    />
  );
}

/* ─── Main component ─── */

export default function GovernanceDivision() {
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
        {/* ─── Header ─── */}
        <div
          className={`mb-14 sm:mb-16 transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8" style={{ background: "#2444E2" }} />
            <p
              className="text-sm sm:text-base font-bold uppercase tracking-[0.15em]"
              style={{ color: "#2444E2" }}
            >
              Governance & Division of Responsibilities
            </p>
          </div>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl leading-relaxed">
            Institutional clarity protects credibility and reinforces ownership.
          </p>
        </div>

        {/* ─── Two-column responsibilities ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-14 sm:mb-16">
          {/* Ministry column */}
          <div
            className={`rounded-2xl px-7 py-8 sm:px-9 sm:py-10 transition-all duration-700 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: "0.1s",
              background: "linear-gradient(135deg, #0d1424 0%, #111827 50%, #0a0f1e 100%)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16" />
                </svg>
              </div>
              <div>
                <p className="text-base sm:text-lg font-bold text-white">
                  The Ministry will:
                </p>
              </div>
            </div>

            <ul className="space-y-3.5">
              {MINISTRY_ITEMS.map((item, i) => (
                <li
                  key={item}
                  className={`flex items-start gap-3 transition-all duration-500 ease-out ${
                    visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-12px]"
                  }`}
                  style={{ transitionDelay: `${0.2 + i * 0.06}s` }}
                >
                  <Bullet color="rgba(255,255,255,0.35)" />
                  <span className="text-sm text-gray-300 leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Elmy column */}
          <div
            className={`rounded-2xl px-7 py-8 sm:px-9 sm:py-10 transition-all duration-700 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: "0.2s",
              background: "#ffffff",
              border: "1px solid rgba(36,68,226,0.1)",
              boxShadow: "0 2px 16px rgba(36,68,226,0.04), 0 1px 4px rgba(0,0,0,0.03)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(36,68,226,0.08)" }}
              >
                <svg className="w-5 h-5" style={{ color: "#2444E2" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <p className="text-base sm:text-lg font-bold text-gray-900">
                  ELMY will:
                </p>
              </div>
            </div>

            <ul className="space-y-3.5">
              {ELMY_ITEMS.map((item, i) => (
                <li
                  key={item}
                  className={`flex items-start gap-3 transition-all duration-500 ease-out ${
                    visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-12px]"
                  }`}
                  style={{ transitionDelay: `${0.25 + i * 0.06}s` }}
                >
                  <Bullet color="#2444E2" />
                  <span className="text-sm text-gray-600 leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ─── Closing statement ─── */}
        <div
          className={`text-center transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "0.45s" }}
        >
          <p className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
            The Ministry leads the initiative.
          </p>
          <p className="text-lg sm:text-xl font-bold leading-snug mt-1">
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, #1a33b8, #2444E2, #6b8cff)" }}
            >
              ELMY engineers the system that makes it controlled, visible, and measurable.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
