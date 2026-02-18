import { useEffect, useRef, useState } from "react";

export default function ClosingCTA() {
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
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #080c24 0%, #0d1338 50%, #0a0f2e 100%)",
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 700,
          height: 700,
          background:
            "radial-gradient(circle, rgba(36, 68, 226, 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-6 py-28 sm:py-40">
        {/* Eyebrow */}
        <div
          className="text-center transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-6"
            style={{ color: "#6b8cff" }}
          >
            A Responsible Next Step
          </p>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-white mb-10">
            A Measured Step{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #6b8cff, #a5b4fc, #6b8cff)",
              }}
            >
              Forward
            </span>
          </h2>
        </div>

        {/* Divider */}
        <div
          className="mx-auto transition-all duration-700"
          style={{
            width: visible ? 48 : 0,
            height: 1,
            background: "rgba(107, 140, 255, 0.25)",
            transitionDelay: "0.15s",
          }}
        />

        {/* Core message */}
        <div
          className="text-center mt-10 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transitionDelay: "0.2s",
          }}
        >
          <p className="text-sm sm:text-base leading-relaxed mb-8" style={{ color: "#94a3b8" }}>
            Modernization should not begin with expansion.
            <br />
            It should begin with{" "}
            <span className="font-semibold" style={{ color: "#cbd5e1" }}>
              validation
            </span>
            .
          </p>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
            {[
              "A controlled pilot",
              "Joint oversight",
              "Clear metrics",
              "Transparent reporting",
            ].map((item, i) => (
              <span
                key={item}
                className="text-sm font-medium transition-all duration-500"
                style={{
                  color: "#cbd5e1",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(8px)",
                  transitionDelay: `${0.35 + i * 0.08}s`,
                }}
              >
                {item}
                {i < 3 && (
                  <span className="ml-6" style={{ color: "rgba(107,140,255,0.3)" }}>
                    /
                  </span>
                )}
              </span>
            ))}
          </div>

          <p
            className="text-sm transition-all duration-500"
            style={{
              color: "#6b8cff",
              opacity: visible ? 1 : 0,
              transitionDelay: "0.6s",
            }}
          >
            Evidence first. Then decision.
          </p>
        </div>

        {/* Divider */}
        <div
          className="mx-auto my-12 transition-all duration-700"
          style={{
            width: visible ? 48 : 0,
            height: 1,
            background: "rgba(107, 140, 255, 0.25)",
            transitionDelay: "0.7s",
          }}
        />

        {/* Anchor line */}
        <div
          className="text-center transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transitionDelay: "0.8s",
          }}
        >
          <p className="text-lg sm:text-xl font-bold leading-snug text-white max-w-lg mx-auto">
            A secure digital foundation is not built through assumption.
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #6b8cff, #a5b4fc, #6b8cff)",
              }}
            >
              It is built through disciplined execution.
            </span>
          </p>
        </div>

        {/* CTA */}
        <div
          className="text-center mt-14 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transitionDelay: "1s",
          }}
        >
          <a
            href="#request-access"
            className="inline-flex items-center justify-center px-10 py-4 text-base font-semibold text-white rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{
              background: "linear-gradient(135deg, #1a33b8, #2444E2)",
              boxShadow:
                "0 4px 20px rgba(36, 68, 226, 0.35), 0 0 0 1px rgba(107, 140, 255, 0.15)",
              // @ts-expect-error css var
              "--tw-ring-color": "#2444E2",
              "--tw-ring-offset-color": "#0a0f2e",
            }}
          >
            Initiate a Ministry Pilot
          </a>
        </div>
      </div>
    </section>
  );
}
