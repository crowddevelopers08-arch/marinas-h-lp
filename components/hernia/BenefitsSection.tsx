"use client";

import {
  BoltIcon,
  CircleCheckIcon,
  HeartIcon,
  PlusIcon,
  PulseIcon,
  ShieldIcon,
} from "./Icons";
import { Reveal } from "./Reveal";

const benefits = [
  {
    title: "Smaller incisions",
    copy: "Minimally invasive techniques mean far less to heal from afterward.",
    icon: <PlusIcon />,
  },
  {
    title: "Less discomfort",
    copy: "A gentler experience built around your comfort, not just the procedure.",
    icon: <HeartIcon />,
  },
  {
    title: "Faster recovery",
    copy: "An emphasis on getting you back to daily life sooner.",
    icon: <BoltIcon />,
  },
  {
    title: "Early return to activity",
    copy: "Less time spent sidelined from work, family and routine.",
    icon: <PulseIcon />,
  },
  {
    title: "Better cosmetic outcomes",
    copy: "Approaches that consider how things look and feel afterward.",
    icon: <CircleCheckIcon />,
  },
  {
    title: "Reduced recurrence risk",
    copy: "Treatment chosen with the goal of lasting results.",
    icon: <ShieldIcon />,
  },
];

function ArrowLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 6 15 12 9 18" />
    </svg>
  );
}

export function BenefitsSection() {
  function scroll(dir: "prev" | "next") {
    const track = document.querySelector<HTMLElement>(".ben-carousel-track");
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".ben");
    const step = (card?.offsetWidth ?? 260) + 14;
    track.scrollBy({ left: dir === "next" ? step : -step, behavior: "smooth" });
  }

  return (
    <section className="sec" id="benefits">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">Why patients choose modern treatment</span>
          <h2 className="section-title">
            Today&apos;s options are not what most people picture.
          </h2>
          <p className="lead section-copy">
            The first step is simply understanding which type of hernia you
            have. From there, modern approaches can offer:
          </p>
          {/* Desktop: grid */}
          <div className="ben-grid">
            {benefits.map((benefit) => (
              <div className="ben" key={benefit.title}>
                <div className="ic">{benefit.icon}</div>
                <h4>{benefit.title}</h4>
                <p>{benefit.copy}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Mobile + tablet: arrow carousel */}
      <div className="ben-carousel">
        <button className="ben-arrow" onClick={() => scroll("prev")} aria-label="Previous">
          <ArrowLeft />
        </button>
        <div className="ben-carousel-track">
          {benefits.map((benefit) => (
            <div className="ben" key={benefit.title}>
              <div className="ic">{benefit.icon}</div>
              <h4>{benefit.title}</h4>
              <p>{benefit.copy}</p>
            </div>
          ))}
        </div>
        <button className="ben-arrow" onClick={() => scroll("next")} aria-label="Next">
          <ArrowRight />
        </button>
      </div>
    </section>
  );
}
