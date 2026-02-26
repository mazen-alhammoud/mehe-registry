import { useEffect, useRef, useState } from "react";

/* ─── Main component ─── */

export default function PilotStreams() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

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
        <div
          className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          {/* Tag */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8" style={{ background: "#2444E2" }} />
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: "#2444E2" }}
            >
              Competition Framework & Governance
            </p>
          </div>

          {/* Title + description — two-column on large screens */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-start">
            <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-bold text-gray-900 tracking-tight leading-[1.15]">
              A controlled, Ministry-led national{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, #1a33b8, #2444E2, #6b8cff)" }}
              >
                benchmarking initiative.
              </span>
            </h2>

            <div className="lg:pt-1.5">
              <p className="text-base text-gray-500 leading-[1.8] mb-6">
                The National Digital Competition Day is executed through a secure digital system and designed to operate under real school conditions.
              </p>

              {/* Closing statement */}
              <div
                className="relative pl-5"
                style={{ borderLeft: "2px solid #2444E2" }}
              >
                <p className="text-sm font-medium text-gray-800 leading-relaxed">
                  This is not an exhibition of technology.
                  <br />
                  It is a disciplined, measurable national exercise.
                </p>
              </div>
            </div>
          </div>

          {/* Key attributes row */}
          <div
            className={`grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10 transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "0.1s" }}
          >
            {[
              { label: "Ministry-Led", desc: "Centralized governance" },
              { label: "Controlled", desc: "Identity & execution" },
              { label: "Synchronized", desc: "National participation" },
              { label: "Immediate", desc: "Unbiased digital scoring" },
            ].map((attr) => (
              <div
                key={attr.label}
                className="rounded-xl px-4 py-3.5 text-center"
                style={{
                  background: "rgba(36,68,226,0.03)",
                  border: "1px solid rgba(36,68,226,0.08)",
                }}
              >
                <p className="text-sm font-semibold text-gray-900 mb-0.5">
                  {attr.label}
                </p>
                <p className="text-[0.7rem] text-gray-400 tracking-wide">
                  {attr.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
