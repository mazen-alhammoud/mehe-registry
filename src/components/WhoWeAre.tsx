import { useEffect, useRef, useState } from "react";
import saiidPhotoUrl from "../assets/Saiid.jpeg";
import mohamadPhotoUrl from "../assets/Mohamad Shaayto.tsx.jpeg";
import abassPhotoUrl from "../assets/Abass.jpeg";
import chalhoubPhotoUrl from "../assets/Mohamad Chalhoub.jpeg";
import danaPhotoUrl from "../assets/Dana.jpeg";
import aminePhotoUrl from "../assets/Amine.jpeg";
import fatimaPhotoUrl from "../assets/Fatima.jpeg";

/* ─── Animated counter ─── */

function CountUp({
  end,
  suffix = "",
  duration = 2000,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          observer.disconnect();
          const start = performance.now();
          const step = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * end).toLocaleString());
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* ─── Data ─── */

const PILLARS = [
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      </svg>
    ),
    title: "Education",
    desc: "Curriculum design, pedagogy, and institutional governance",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8m-4-4v4" />
      </svg>
    ),
    title: "Technology",
    desc: "Secure platforms, digital assessment, and learning analytics",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20V10m6 10V4M6 20v-4" />
      </svg>
    ),
    title: "Business",
    desc: "Scalable operations and institutional implementation",
  },
];

const STATS = [
  { end: 1400, suffix: "+", label: "Test Takers Assessed" },
  { end: 1500, suffix: "",  label: "Question Bank Items" },
  { end: 5000, suffix: "+", label: "Active Users on LMS" },
];

interface Member {
  name: string;
  role: string;
  education: string;
  initials: string;
  photo?: string;
}

const LEADERSHIP: Member[] = [
  { name: "Nizar Al Awar",          role: "CEO", education: "Double Major in Management & Marketing, LAU", initials: "N" },
  { name: "Mohamad Shayto",         role: "COO", education: "CCE & Finance, AUB",                        initials: "MS", photo: mohamadPhotoUrl },
  { name: "Saiid El Hajj Chehade",  role: "CTO", education: "PhD Cyber Security, EPFL",                  initials: "SE", photo: saiidPhotoUrl },
];

const TEAM: Member[] = [
  { name: "Amine Ghoussayni",  role: "Head of Technology",        education: "BE in CCE, AUB",                      initials: "AG", photo: aminePhotoUrl },
  { name: "Mohammad Chalhoub", role: "Full-Stack Developer",      education: "MS Cyber Security, AUB",              initials: "MC", photo: chalhoubPhotoUrl },
  { name: "Abbas Hinnawi",     role: "Junior Software Developer", education: "BE in CCE, Lebanese University",      initials: "AH", photo: abassPhotoUrl },
  { name: "Dana Kakoun",       role: "Senior Education Advisor",  education: "PhD Educational Sciences, USJ | CELTA", initials: "DK", photo: danaPhotoUrl },
  { name: "Ali Farhat",        role: "Academic Support Associate",education: "BE in CCE, Lebanese University",      initials: "AF" },
  { name: "Fatima Zaarour",    role: "Business Development",      education: "BBA in Finance, AUB",                 initials: "FZ", photo: fatimaPhotoUrl },
];

/* ─── Member card ─── */

function MemberCard({ member, index, featured }: { member: Member; index: number; featured?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const avatarSize = featured ? "w-20 h-20" : "w-16 h-16";
  const initialsSize = featured ? "text-xl" : "text-base";

  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transitionDelay: `${index * 0.06}s`,
      }}
    >
      <div
        className={`${avatarSize} rounded-full flex items-center justify-center mb-3 overflow-hidden`}
        style={{
          background: "linear-gradient(135deg, #eef1f8 0%, #e2e7f3 100%)",
          border: "2px solid rgba(36, 68, 226, 0.08)",
        }}
      >
        {member.photo ? (
          <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
        ) : (
          <span className={`${initialsSize} font-bold select-none`} style={{ color: "#2444E2" }}>
            {member.initials}
          </span>
        )}
      </div>
      <h3 className={`font-bold text-gray-900 leading-snug ${featured ? "text-base" : "text-sm"}`}>
        {member.name}
      </h3>
      <p className="text-xs font-semibold mt-0.5" style={{ color: "#2444E2" }}>
        {member.role}
      </p>
      <p className="text-[0.7rem] text-gray-400 mt-1 leading-relaxed max-w-[200px]">
        {member.education}
      </p>
    </div>
  );
}

/* ─── Main component ─── */

export default function WhoWeAre() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in-view");
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{ background: "#fafafa" }}>
      {/* ═══ Part 1 — Who We Are ═══ */}
      <div className="pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em] mb-5 animate-fade-up"
              style={{ color: "#2444E2", animationDelay: "0s" }}
            >
              Who We Are
            </p>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-[1.15] mb-8 animate-fade-up"
              style={{ animationDelay: "0.06s" }}
            >
              A Lebanese EdTech company{" "}
              <span
                className="bg-clip-text text-transparent animate-gradient-text"
                style={{
                  backgroundImage: "linear-gradient(90deg, #1a33b8, #2444E2, #6b8cff, #2444E2, #1a33b8)",
                }}
              >
                built for institutions operating at scale.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mt-4">
            <div>
              <p
                className="text-lg sm:text-xl text-gray-600 leading-[1.8] animate-fade-up"
                style={{ animationDelay: "0.12s" }}
              >
                ELMY Learning Solutions designs and delivers{" "}
                <strong className="font-semibold text-gray-900">learning systems</strong>{" "}
                with embedded{" "}
                <strong className="font-semibold text-gray-900">digital assessment</strong>{" "}
                and{" "}
                <strong className="font-semibold text-gray-900">learning analytics</strong>
                —purpose-built for institutions operating at scale.
              </p>

              <p
                className="text-lg sm:text-xl text-gray-600 leading-[1.8] mt-6 animate-fade-up"
                style={{ animationDelay: "0.18s" }}
              >
                Our team combines education, technology, and business expertise
                with strong academic foundations and hands-on implementation
                experience.
              </p>
            </div>

            <div className="space-y-6 lg:pt-2">
              {PILLARS.map((p, i) => (
                <div
                  key={p.title}
                  className="flex items-start gap-5 animate-fade-up"
                  style={{ animationDelay: `${0.22 + i * 0.08}s` }}
                >
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-xl flex-shrink-0"
                    style={{ background: "rgba(36, 68, 226, 0.06)", color: "#2444E2" }}
                  >
                    {p.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-1">{p.title}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Part 2 — Credibility stats ═══ */}
      <div className="py-14 sm:py-16" style={{ background: "#f2f2f4" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em] mb-3"
              style={{ color: "#2444E2" }}
            >
              Track Record
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              Credibility that matters:{" "}
              <span
                className="bg-clip-text text-transparent animate-gradient-text"
                style={{
                  backgroundImage: "linear-gradient(90deg, #1a33b8, #2444E2, #6b8cff, #2444E2, #1a33b8)",
                }}
              >
                what we have already delivered
              </span>
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 text-center">
            {STATS.map((stat, i) => (
              <div key={stat.label} className={i === 1 ? "relative" : ""}>
                {i === 1 && (
                  <>
                    <div className="hidden sm:block absolute inset-y-0 left-0 w-px bg-gray-200" />
                    <div className="hidden sm:block absolute inset-y-0 right-0 w-px bg-gray-200" />
                  </>
                )}
                <span
                  className="block text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight tabular-nums"
                  style={{ color: "#2444E2" }}
                >
                  <CountUp end={stat.end} suffix={stat.suffix} />
                </span>
                <span className="mt-2 block text-sm sm:text-base text-gray-500 font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div className="max-w-3xl mx-auto mt-14">
            <div
              className="relative rounded-xl px-8 py-7 sm:px-10 sm:py-8"
              style={{
                background: "linear-gradient(135deg, rgba(36,68,226,0.04) 0%, rgba(36,68,226,0.02) 100%)",
                borderLeft: "3px solid #2444E2",
              }}
            >
              <p className="text-base sm:text-lg text-gray-600 leading-[1.8]">
                We operate as{" "}
                <span className="font-semibold text-gray-900">systems builders</span> and{" "}
                <span className="font-semibold text-gray-900">solution architects</span>.
                Our role is to design{" "}
                <span
                  className="font-semibold bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #1a33b8, #2444E2, #6b8cff)",
                  }}
                >
                  customized, precise, scalable, and institutionally owned
                </span>{" "}
                solutions that raise standards while protecting credibility.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Part 3 — The People Behind ELMY ═══ */}
      <div className="py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-14">
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em] mb-5 animate-fade-up"
              style={{ color: "#2444E2", animationDelay: "0s" }}
            >
              Leadership & Team
            </p>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight leading-snug mb-4 animate-fade-up"
              style={{ animationDelay: "0.06s" }}
            >
              The People Behind{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(90deg, #1a33b8, #2444E2, #6b8cff)",
                }}
              >
                ELMY
              </span>
            </h2>
            <p
              className="text-sm sm:text-base text-gray-400 max-w-lg mx-auto animate-fade-up"
              style={{ animationDelay: "0.12s" }}
            >
              A multidisciplinary team combining technology, education,
              and institutional governance expertise.
            </p>
          </div>

          {/* Leadership */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8 mb-14">
            {LEADERSHIP.map((m, i) => (
              <MemberCard key={m.name} member={m} index={i} featured />
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-14">
            <div className="h-px flex-1" style={{ background: "#e2e5ec" }} />
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em]" style={{ color: "#94a3b8" }}>
              Team
            </span>
            <div className="h-px flex-1" style={{ background: "#e2e5ec" }} />
          </div>

          {/* Team grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-12 gap-x-8">
            {TEAM.map((m, i) => (
              <MemberCard key={m.name} member={m} index={i + LEADERSHIP.length} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
