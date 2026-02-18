import { useEffect, useRef, useState } from "react";
import meheLogoUrl from "../assets/mehe.png";
import elmyLogoUrl from "../assets/elmy.png";

/* ─── Bullet data ─── */

const BULLETS = [
  { text: "Implemented across ~50 public schools", bold: "~50 public schools" },
  { text: "Involving ~5,000 students", bold: "~5,000 students" },
  { text: "Computer-based MCQ-format exam", bold: "MCQ-format" },
  {
    text: "Fully aligned with the Lebanese national curriculum",
    bold: "Lebanese national curriculum",
  },
  {
    text: "Conducted under exam-like conditions (not classroom exercises)",
    bold: "exam-like conditions",
  },
  {
    text: "White-labeled under the Ministry's identity, powered by ELMY",
    bold: "Ministry's identity",
  },
];

/* ─── Helper: bold a substring ─── */

function BoldText({ text, bold }: { text: string; bold: string }) {
  const idx = text.indexOf(bold);
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <strong className="font-semibold text-gray-900">{bold}</strong>
      {text.slice(idx + bold.length)}
    </>
  );
}

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
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-white overflow-hidden">
      {/* Subtle background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, rgba(36,68,226,0.03) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-24 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ─── Left: copy ─── */}
          <div
            className="transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
            }}
          >
            {/* Eyebrow */}
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em] mb-5"
              style={{ color: "#2444E2" }}
            >
              The Pilot at a Glance
            </p>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight leading-snug mb-4">
              What the Pilot{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #1a33b8, #2444E2, #6b8cff)",
                }}
              >
                Entails
              </span>
            </h2>

            <p className="text-sm text-gray-400 mb-8 max-w-md">
              A structured national assessment deployment — not a software demo.
            </p>

            {/* Bullets */}
            <ul className="space-y-4">
              {BULLETS.map((b, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 transition-all duration-500"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(16px)",
                    transitionDelay: `${0.15 + i * 0.08}s`,
                  }}
                >
                  {/* Check icon */}
                  <svg
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                    style={{ color: "#2444E2" }}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-gray-600 leading-relaxed">
                    <BoldText text={b.text} bold={b.bold} />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ─── Right: laptop mockup ─── */}
          <div
            className="transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
              transitionDelay: "0.2s",
            }}
          >
            {/* Browser window */}
            <div className="relative mx-auto" style={{ maxWidth: 540 }}>
              <div
                className="rounded-xl overflow-hidden flex flex-col"
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(0, 0, 0, 0.08)",
                  boxShadow:
                    "0 8px 40px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                {/* Title bar with traffic lights */}
                <div
                  className="flex items-center gap-2 px-4 py-3"
                  style={{
                    background: "#f6f6f6",
                    borderBottom: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ background: "#ff5f57" }}
                  />
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ background: "#febc2e" }}
                  />
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ background: "#28c840" }}
                  />
                </div>

                {/* Two-sided auth screen */}
                <div className="flex" style={{ minHeight: 340 }}>
                  {/* Left panel — MEHE branding */}
                  <div
                    className="flex flex-col items-center justify-center px-6 py-10 text-center"
                    style={{
                      width: "42%",
                      background: "linear-gradient(160deg, #f9f6f2 0%, #faf8f5 50%, #f5f0eb 100%)",
                      borderRight: "1px solid rgba(0,0,0,0.06)",
                    }}
                  >
                    <img
                      src={meheLogoUrl}
                      alt="MEHE"
                      className="w-24 h-auto mb-4"
                    />
                    <p className="text-[0.6rem] font-semibold leading-snug mb-0.5" style={{ color: "#1a1a1a" }}>
                      الجمهورية اللبنانية
                    </p>
                    <p className="text-[0.55rem] font-bold leading-snug mb-2" style={{ color: "#C1272D" }}>
                      وزارة التربية والتعليم العالي
                    </p>

                    <div className="w-10 h-px my-3" style={{ background: "linear-gradient(90deg, transparent, #C1272D, transparent)" }} />

                    <p className="text-[0.5rem] leading-relaxed max-w-[140px]" style={{ color: "#666" }}>
                      Official National Examination Platform
                    </p>

                    {/* Decorative accent bar */}
                    <div className="flex items-center gap-1 mt-4">
                      <div className="w-6 h-0.5 rounded-full" style={{ background: "#009245" }} />
                      <div className="w-3 h-0.5 rounded-full" style={{ background: "#C1272D" }} />
                      <div className="w-6 h-0.5 rounded-full" style={{ background: "#009245" }} />
                    </div>
                  </div>

                  {/* Right panel — Login form */}
                  <div
                    className="flex-1 flex flex-col items-center justify-center px-6 py-8"
                    style={{ background: "#ffffff" }}
                  >
                    <p className="text-sm font-bold mb-1" style={{ color: "#1a1a1a" }}>
                      Sign In
                    </p>
                    <p className="text-[0.6rem] text-gray-400 mb-5">
                      Enter your credentials to continue
                    </p>

                    {/* Student ID field */}
                    <div className="w-full max-w-[200px] mb-3">
                      <label className="block text-[0.55rem] font-semibold mb-1 uppercase tracking-wider" style={{ color: "#888" }}>
                        Student ID
                      </label>
                      <div
                        className="w-full rounded-md px-3 py-2 text-[0.65rem] text-gray-400"
                        style={{
                          background: "#fafafa",
                          border: "1px solid #e5e5e5",
                        }}
                      >
                        LB-2025-XXXXX
                      </div>
                    </div>

                    {/* Access Code field */}
                    <div className="w-full max-w-[200px] mb-5">
                      <label className="block text-[0.55rem] font-semibold mb-1 uppercase tracking-wider" style={{ color: "#888" }}>
                        Access Code
                      </label>
                      <div
                        className="w-full rounded-md px-3 py-2 text-[0.65rem] text-gray-400"
                        style={{
                          background: "#fafafa",
                          border: "1px solid #e5e5e5",
                        }}
                      >
                        ••••••••
                      </div>
                    </div>

                    {/* Sign in button */}
                    <div
                      className="w-full max-w-[200px] rounded-md py-2 text-center text-[0.65rem] font-semibold text-white"
                      style={{
                        background: "linear-gradient(135deg, #C1272D, #a01f25)",
                        boxShadow: "0 2px 8px rgba(193,39,45,0.3)",
                      }}
                    >
                      Access Examination
                    </div>

                    {/* Footer note */}
                    <div className="flex items-center gap-1 mt-5">
                      <svg className="w-2.5 h-2.5" style={{ color: "#009245" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0110 0v4" />
                      </svg>
                      <span className="text-[0.5rem] text-gray-400">
                        Secured & monitored session
                      </span>
                    </div>
                  </div>
                </div>

                {/* Powered by footer */}
                <div
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5"
                  style={{
                    borderTop: "1px solid rgba(0,0,0,0.05)",
                    background: "rgba(250, 249, 247, 0.5)",
                  }}
                >
                  <span
                    className="text-[0.625rem] tracking-wide"
                    style={{ color: "#94a3b8" }}
                  >
                    Powered by
                  </span>
                  <img src={elmyLogoUrl} alt="Elmy" className="h-4 w-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
