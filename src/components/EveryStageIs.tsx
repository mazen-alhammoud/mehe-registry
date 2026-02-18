import { useEffect, useRef, useState } from "react";

const WORDS = ["traceable", "logged", "measurable"];
const CYCLE_MS = 2400;

export default function EveryStageIs() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

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
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Cycle words once visible */
  useEffect(() => {
    if (!visible) return;
    const id = setInterval(
      () => setActiveIndex((prev) => (prev + 1) % WORDS.length),
      CYCLE_MS
    );
    return () => clearInterval(id);
  }, [visible]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0a0f2e 0%, #111847 50%, #0d1338 100%)",
      }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(36, 68, 226, 0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 py-28 sm:py-36 flex flex-col items-center">
        {/* Centered text block */}
        <div
          className="text-center transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
          }}
        >
          {/* Static line */}
          <p className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Every stage is
          </p>

          {/* Animated word — centered */}
          <div className="relative mt-1 flex justify-center">
            <span className="relative inline-block text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {/* Invisible spacer for width */}
              <span style={{ visibility: "hidden" }}>measurable</span>
              {WORDS.map((word, i) => {
                const isActive = activeIndex === i;
                const isPast =
                  activeIndex > i ||
                  (activeIndex === 0 && i === WORDS.length - 1);
                return (
                  <span
                    key={word}
                    className="absolute inset-0 flex justify-center transition-all duration-500 ease-out"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive
                        ? "translateY(0)"
                        : isPast
                        ? "translateY(-100%)"
                        : "translateY(100%)",
                      backgroundImage:
                        "linear-gradient(90deg, #6b8cff, #a5b4fc, #6b8cff)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </span>
          </div>

          {/* Decorative underline */}
          <div
            className="mt-6 mx-auto transition-all duration-700"
            style={{
              width: visible ? 80 : 0,
              height: 3,
              borderRadius: 2,
              background: "linear-gradient(90deg, #2444E2, #6b8cff)",
              transitionDelay: "0.3s",
            }}
          />
        </div>
      </div>
    </section>
  );
}
