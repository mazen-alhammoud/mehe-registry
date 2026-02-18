import { useEffect, useRef, useState } from "react";

/* ─── Ring configs ─── */

const DEG = Math.PI / 180;

const ORBIT = {
  radius: 250,
  duration: 60,
  direction: 1, // CW
  words: [
    { word: "Fairness",     angle: 0,   tilt: 5,   float: 6   },
    { word: "Integrity",    angle: 72,  tilt: 7,   float: 8   },
    { word: "Consistency",  angle: 144, tilt: 6,   float: 7   },
    { word: "Transparency", angle: 216, tilt: 4.5, float: 5.5 },
    { word: "Public Trust", angle: 288, tilt: 8,   float: 9   },
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
  ring: typeof ORBIT;
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

/* ─── Triangle node data ─── */

const NODES = [
  {
    id: "mehe",
    label: "MEHE Leadership",
    top: "38%",
    left: "50%",
    svgCoord: { x: 250, y: 190 },
    icon: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16" />
      </svg>
    ),
    blurb: "Sets examination policy, validates academic standards, and maintains oversight of every assessment cycle.",
    blurbSide: "right" as const,
  },
  {
    id: "students",
    label: "Students",
    top: "62%",
    left: "35%",
    svgCoord: { x: 175, y: 310 },
    icon: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    blurb: "Experience fair, secure, and consistent examinations — with results they and their families can trust.",
    blurbSide: "left" as const,
  },
  {
    id: "institutions",
    label: "Academic Institutions",
    top: "62%",
    left: "65%",
    svgCoord: { x: 325, y: 310 },
    icon: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    blurb: "Execute standardized operations with clear protocols, reducing administrative burden while raising credibility.",
    blurbSide: "right" as const,
  },
];

/* Connection lines between nodes (by index pairs) */
const EDGES: [number, number][] = [[0, 1], [1, 2], [2, 0]];

export default function UncompromisingStandards() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeNode, setActiveNode] = useState<number | null>(null);

  const SIZE = 600;

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
          {/* Single orbit ring */}
          <RingGroup ring={ORBIT} visible={visible} />

          {/* Center triangle (above orbit) */}
          <div className="absolute inset-0 z-10">
            {/* Connection lines — only visible when a node is selected */}
            <svg
              className="absolute pointer-events-none"
              width="100%"
              height="100%"
              viewBox="0 0 500 500"
            >
              {EDGES.map(([a, b], i) => {
                const from = NODES[a].svgCoord;
                const to = NODES[b].svgCoord;
                const isConnected =
                  activeNode !== null && (a === activeNode || b === activeNode);
                return (
                  <g key={i}>
                    {/* Glow line */}
                    <line
                      x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                      stroke="rgba(36, 68, 226, 0.12)"
                      strokeWidth="6"
                      strokeLinecap="round"
                      style={{
                        opacity: isConnected ? 1 : 0,
                        transition: "opacity 0.4s ease",
                      }}
                    />
                    {/* Main line */}
                    <line
                      x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                      stroke="#2444E2"
                      strokeWidth="1.5"
                      strokeDasharray="6 4"
                      style={{
                        opacity: isConnected ? 0.6 : 0,
                        transition: "opacity 0.4s ease",
                      }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Nodes + side blurbs */}
            {NODES.map((node, i) => {
              const isActive = activeNode === i;
              const isDimmed = activeNode !== null && activeNode !== i;
              const isRight = node.blurbSide === "right";
              return (
                <div
                  key={node.id}
                  className="absolute"
                  style={{ top: node.top, left: node.left, transform: "translate(-50%, -50%)" }}
                >
                  {/* Clickable node */}
                  <button
                    onClick={() => setActiveNode(isActive ? null : i)}
                    className="flex flex-col items-center transition-all duration-500 cursor-pointer"
                    style={{
                      transform: `scale(${isActive ? 1.1 : 1})`,
                      opacity: visible ? (isDimmed ? 0.45 : 1) : 0,
                      transitionDelay: visible && activeNode === null ? `${0.3 + i * 0.15}s` : "0s",
                    }}
                  >
                    <div
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-shadow duration-400"
                      style={{
                        background: "linear-gradient(135deg, #2444E2, #1a33b8)",
                        boxShadow: isActive
                          ? "0 0 40px rgba(36, 68, 226, 0.4), 0 0 80px rgba(36, 68, 226, 0.15)"
                          : "0 0 30px rgba(36, 68, 226, 0.25), 0 0 60px rgba(36, 68, 226, 0.08)",
                      }}
                    >
                      {node.icon}
                    </div>
                    <span className="mt-2 text-[0.6rem] sm:text-[0.65rem] font-bold uppercase tracking-[0.12em] text-gray-700 whitespace-nowrap">
                      {node.label}
                    </span>
                  </button>

                  {/* Side blurb */}
                  <div
                    className="absolute top-1/2 transition-all duration-400 pointer-events-none"
                    style={{
                      [isRight ? "left" : "right"]: "calc(100% + 16px)",
                      transform: `translateY(-50%) translateX(${isActive ? "0" : isRight ? "-8px" : "8px"})`,
                      opacity: isActive ? 1 : 0,
                      width: 200,
                    }}
                  >
                    <p
                      className="text-[0.7rem] sm:text-xs leading-relaxed rounded-lg px-4 py-3"
                      style={{
                        color: "#1a33b8",
                        background: "rgba(255,255,255,0.92)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(36,68,226,0.12)",
                        boxShadow: "0 4px 20px rgba(36,68,226,0.08)",
                        textAlign: isRight ? "left" : "right",
                      }}
                    >
                      {node.blurb}
                    </p>
                  </div>
                </div>
              );
            })}
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

        {/* ─── Equation graphic ─── */}
        <div
          className="max-w-3xl mx-auto mt-12 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(14px)",
            transitionDelay: "0.55s",
          }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
            {/* Operational Pilot */}
            <div
              className="flex items-center gap-3 rounded-xl px-6 py-4 sm:px-7 sm:py-5"
              style={{
                background: "rgba(36,68,226,0.05)",
                border: "1px solid rgba(36,68,226,0.12)",
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #2444E2, #1a33b8)" }}
              >
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                  <path d="M9 14l2 2 4-4" />
                </svg>
              </div>
              <div>
                <p className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
                  Operational Pilot
                </p>
                <p className="text-[0.65rem] sm:text-xs text-gray-400 mt-0.5">
                  Real school conditions
                </p>
              </div>
            </div>

            {/* Plus sign */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: "rgba(36,68,226,0.08)",
                color: "#2444E2",
              }}
            >
              <span className="text-lg font-bold leading-none">+</span>
            </div>

            {/* Credible Evidence */}
            <div
              className="flex items-center gap-3 rounded-xl px-6 py-4 sm:px-7 sm:py-5"
              style={{
                background: "rgba(36,68,226,0.05)",
                border: "1px solid rgba(36,68,226,0.12)",
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #2444E2, #1a33b8)" }}
              >
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20V10m6 10V4M6 20v-4" />
                </svg>
              </div>
              <div>
                <p className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
                  Credible Evidence
                </p>
                <p className="text-[0.65rem] sm:text-xs text-gray-400 mt-0.5">
                  Measurable insight
                </p>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center my-4 sm:my-5">
            <div className="flex flex-col items-center gap-1">
              <div className="w-px h-6" style={{ background: "linear-gradient(180deg, rgba(36,68,226,0.3), #2444E2)" }} />
              <svg className="w-5 h-5" style={{ color: "#2444E2" }} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a.75.75 0 01-.53-.22l-4-4a.75.75 0 111.06-1.06L10 16.19l3.47-3.47a.75.75 0 111.06 1.06l-4 4A.75.75 0 0110 18z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Result: Unlock */}
          <div className="flex justify-center">
            <div
              className="rounded-xl px-8 py-5 sm:px-10 sm:py-6 text-center"
              style={{
                background: "linear-gradient(135deg, #1a33b8 0%, #2444E2 50%, #3b5fe8 100%)",
                boxShadow: "0 8px 32px rgba(36,68,226,0.25), 0 2px 8px rgba(36,68,226,0.15)",
              }}
            >
              <p className="text-base sm:text-lg font-bold text-white leading-snug">
                Unlocks External Partnership & Funding
              </p>
              <p className="text-xs sm:text-sm text-white/60 mt-1">
                Future expansion with confidence
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
