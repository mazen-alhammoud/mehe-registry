import { useEffect, useRef, useState } from "react";

/* ─── Team data ─── */

interface Member {
  name: string;
  role: string;
  education: string;
  initials: string;
}

const LEADERSHIP: Member[] = [
  {
    name: "Nizar Al Awar",
    role: "CEO",
    education: "Double Major in Management & Marketing, LAU",
    initials: "N",
  },
  {
    name: "Mohamad Shayto",
    role: "COO",
    education: "CCE & Finance, AUB",
    initials: "MS",
  },
  {
    name: "Saiid El Hajj Chehade",
    role: "CTO",
    education: "PhD Cyber Security, EPFL",
    initials: "SE",
  },
];

const TEAM: Member[] = [
  {
    name: "Amine Ghoussayni",
    role: "Head of Technology",
    education: "BE in CCE, AUB",
    initials: "AG",
  },
  {
    name: "Mohammad Chalhoub",
    role: "Full-Stack Developer",
    education: "MS Cyber Security, AUB",
    initials: "MC",
  },
  {
    name: "Abbas Hinnawi",
    role: "Junior Software Developer",
    education: "BE in CCE, Lebanese University",
    initials: "AH",
  },
  {
    name: "Dana Kakoun",
    role: "Senior Education Advisor",
    education: "PhD Educational Sciences, USJ | CELTA",
    initials: "DK",
  },
  {
    name: "Ali Farhat",
    role: "Academic Support Associate",
    education: "BE in CCE, Lebanese University",
    initials: "AF",
  },
  {
    name: "Fatima Zaarour",
    role: "Business Development",
    education: "BBA in Finance, AUB",
    initials: "FZ",
  },
];

/* ─── Member card ─── */

function MemberCard({
  member,
  index,
  featured,
}: {
  member: Member;
  index: number;
  featured?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
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

  const avatarSize = featured ? "w-24 h-24" : "w-20 h-20";
  const initialsSize = featured ? "text-2xl" : "text-lg";

  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${index * 0.08}s`,
      }}
    >
      {/* Avatar placeholder */}
      <div
        className={`${avatarSize} rounded-full flex items-center justify-center mb-4 transition-all duration-700`}
        style={{
          background:
            "linear-gradient(135deg, #eef1f8 0%, #e2e7f3 100%)",
          border: "2px solid rgba(36, 68, 226, 0.08)",
          boxShadow: visible
            ? "0 4px 20px rgba(0,0,0,0.06), 0 0 0 4px rgba(36, 68, 226, 0.04)"
            : "none",
          transitionDelay: `${index * 0.08 + 0.1}s`,
        }}
      >
        <span
          className={`${initialsSize} font-bold select-none`}
          style={{ color: "#2444E2" }}
        >
          {member.initials}
        </span>
      </div>

      {/* Name */}
      <h3
        className={`font-bold text-gray-900 leading-snug ${
          featured ? "text-lg" : "text-base"
        }`}
      >
        {member.name}
      </h3>

      {/* Role */}
      <p
        className="text-sm font-semibold mt-1"
        style={{ color: "#2444E2" }}
      >
        {member.role}
      </p>

      {/* Education */}
      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed max-w-[200px]">
        {member.education}
      </p>
    </div>
  );
}

/* ─── Main component ─── */

export default function MeetTheTeam() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative bg-white">
      {/* Subtle background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(36,68,226,0.03) 0%, transparent 60%)",
        }}
      />

      {/* ─── Header ─── */}
      <div className="relative max-w-4xl mx-auto px-6 pt-24 sm:pt-32 pb-16">
        <div
          ref={headerRef}
          className="text-center transition-all duration-700"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-5"
            style={{ color: "#2444E2" }}
          >
            Leadership & Team
          </p>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight leading-snug mb-4">
            The People Behind{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #1a33b8, #2444E2, #6b8cff)",
              }}
            >
              ELMY
            </span>
          </h2>

          <p className="text-sm sm:text-base text-gray-400 max-w-lg mx-auto">
            A multidisciplinary team combining technology, education,
            and institutional governance expertise.
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <div className="h-px w-12 bg-gray-200" />
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "#2444E2" }}
            />
            <div className="h-px w-12 bg-gray-200" />
          </div>
        </div>
      </div>

      {/* ─── Leadership row ─── */}
      <div className="relative max-w-4xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8">
          {LEADERSHIP.map((member, i) => (
            <MemberCard
              key={member.name}
              member={member}
              index={i}
              featured
            />
          ))}
        </div>
      </div>

      {/* ─── Divider ─── */}
      <div className="max-w-5xl mx-auto px-6 pb-12">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1" style={{ background: "#e2e5ec" }} />
          <span
            className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] whitespace-nowrap"
            style={{ color: "#94a3b8" }}
          >
            Team
          </span>
          <div className="h-px flex-1" style={{ background: "#e2e5ec" }} />
        </div>
      </div>

      {/* ─── Team grid ─── */}
      <div className="relative max-w-5xl mx-auto px-6 pb-24 sm:pb-32">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-y-12 gap-x-8">
          {TEAM.map((member, i) => (
            <MemberCard
              key={member.name}
              member={member}
              index={i + LEADERSHIP.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
