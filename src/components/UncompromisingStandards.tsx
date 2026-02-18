import { useEffect, useRef, useState } from "react";

/* ─── Ring configs ─── */

const DEG = Math.PI / 180;

const INNER = {
  radius: 130,
  duration: 50, // seconds per full revolution
  direction: 1, // 1 = CW, -1 = CCW
  words: [
    { word: "Fairness",  angle: 325, tilt: 5,   float: 6   },
    { word: "Integrity", angle: 145, tilt: 7,   float: 8   },
  ],
};

const OUTER = {
  radius: 220,
  duration: 70,
  direction: -1,
  words: [
    { word: "Consistency",  angle: 55,  tilt: 6,   float: 7   },
    { word: "Transparency", angle: 195, tilt: 4.5, float: 5.5 },
    { word: "Public Trust", angle: 290, tilt: 8,   float: 9   },
  ],
};

/* ─── Dotted ring SVG (rotates with the group) ─── */

function OrbitRing({ radius }: { radius: number }) {
  const size = radius * 2;
  const circumference = 2 * Math.PI * radius;
  return (
    <svg
      className="absolute pointer-events-none"
      width={size}
      height={size}
      style={{
        top: "50%",
        left: "50%",
        marginTop: -radius,
        marginLeft: -radius,
      }}
    >
      <circle
        cx={radius}
        cy={radius}
        r={radius - 1}
        fill="none"
        stroke="rgba(36, 68, 226, 0.18)"
        strokeWidth="1.5"
        strokeDasharray={`${circumference * 0.015} ${circumference * 0.025}`}
      />
    </svg>
  );
}

/* ─── A word pill at a fixed offset from the group center ─── */

function WordPill({
  word,
  radius,
  angle,
  groupDuration,
  groupDirection,
  visible,
  delay,
  tiltDuration,
  floatDuration,
}: {
  word: string;
  radius: number;
  angle: number;
  groupDuration: number;
  groupDirection: number;
  visible: boolean;
  delay: number;
  tiltDuration: number;
  floatDuration: number;
}) {
  const rad = angle * DEG;
  const x = radius * Math.sin(rad);
  const y = -radius * Math.cos(rad);

  /* Counter-spin so text stays upright */
  const dir = groupDirection === -1 ? "reverse" : "normal";

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top: "50%",
        left: "50%",
        marginLeft: x,
        marginTop: y,
        /* counter-rotate to cancel group spin, keep text horizontal */
        animation: visible
          ? `orbit-counter-spin-centered ${groupDuration}s linear ${dir} infinite`
          : "none",
      }}
    >
      <div
        style={{
          animation: visible
            ? `word-float ${floatDuration}s ease-in-out infinite`
            : "none",
        }}
      >
        <span
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[0.72rem] sm:text-xs font-semibold whitespace-nowrap transition-all duration-700"
          style={{
            background: "rgba(255, 255, 255, 0.92)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(36, 68, 226, 0.14)",
            color: "#1a33b8",
            boxShadow:
              "0 2px 20px rgba(36, 68, 226, 0.10), 0 1px 4px rgba(0,0,0,0.04)",
            opacity: visible ? 1 : 0,
            transitionDelay: `${delay}s`,
            animation: visible
              ? `gentle-tilt ${tiltDuration}s ease-in-out infinite`
              : "none",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: "#2444E2" }}
          />
          {word}
        </span>
      </div>
    </div>
  );
}

/* ─── A ring group: rotates all its children (ring + words) together ─── */

function RingGroup({
  ring,
  visible,
}: {
  ring: typeof INNER;
  visible: boolean;
}) {
  const dir = ring.direction === -1 ? "reverse" : "normal";

  return (
    <div
      className="absolute inset-0"
      style={{
        animation: visible
          ? `orbit-spin ${ring.duration}s linear ${dir} infinite`
          : "none",
      }}
    >
      {/* The dotted track */}
      <OrbitRing radius={ring.radius} />

      {/* Words — they counter-rotate individually to stay upright */}
      {ring.words.map((w, i) => (
        <WordPill
          key={w.word}
          word={w.word}
          radius={ring.radius}
          angle={w.angle}
          groupDuration={ring.duration}
          groupDirection={ring.direction}
          visible={visible}
          delay={0.5 + i * 0.15}
          tiltDuration={w.tilt}
          floatDuration={w.float}
        />
      ))}
    </div>
  );
}

/* ─── Main component ─── */

export default function UncompromisingStandards() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  const SIZE = 500;

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
      className="relative overflow-hidden py-32 sm:py-44"
      style={{
        background:
          "linear-gradient(180deg, #f7f7f8 0%, #ffffff 40%, #f7f7f8 100%)",
      }}
    >
      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 700,
          height: 700,
          background:
            "radial-gradient(circle, rgba(36, 68, 226, 0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* ─── Eyebrow ─── */}
        <p
          className="text-xs font-semibold uppercase tracking-[0.2em] mb-8 transition-all duration-700"
          style={{
            color: "#2444E2",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
          }}
        >
          The Standard We Uphold
        </p>

        {/* ─── Orbital system ─── */}
        <div
          className="relative mx-auto transition-all duration-1000"
          style={{
            width: SIZE,
            height: SIZE,
            maxWidth: "90vw",
            maxHeight: "90vw",
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0.85)",
          }}
        >
          {/* Inner ring group — rotates CW */}
          <RingGroup ring={INNER} visible={visible} />

          {/* Outer ring group — rotates CCW */}
          <RingGroup ring={OUTER} visible={visible} />

          {/* Center orb (above both rings) */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #2444E2, #1a33b8)",
                boxShadow:
                  "0 0 40px rgba(36, 68, 226, 0.3), 0 0 80px rgba(36, 68, 226, 0.1)",
              }}
            >
              <svg
                className="w-9 h-9 sm:w-10 sm:h-10 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
          </div>
        </div>

        {/* ─── Headline ─── */}
        <h2
          className="mt-14 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight leading-snug transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(18px)",
            transitionDelay: "0.3s",
          }}
        >
          Official examinations demand{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #1a33b8, #2444E2, #6b8cff)",
            }}
          >
            uncompromising standards
          </span>
        </h2>

        <p
          className="mt-5 text-base text-gray-500 leading-relaxed max-w-xl mx-auto transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(14px)",
            transitionDelay: "0.45s",
          }}
        >
          Every pillar must be present — not as aspiration, but as operational
          guarantee — to protect the credibility of every result.
        </p>
      </div>
    </section>
  );
}
