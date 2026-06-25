"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

export function DoctorSection() {
  return (
    <section className="sec" id="doctor">
      <div className="wrap">
        <Reveal className="doc-grid">
          {/* Desktop / tablet: photo in left column */}
          <div className="doc-photo doc-photo-desktop">
            <div className="ph" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "620px", overflow: "hidden" }}>
              <img
                src="https://res.cloudinary.com/dthj7fakc/image/upload/v1781681953/dr-preethi-mrinalini_wmgdmk.webp"
                alt="Dr. Preethi Mrinalini"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "bottom", borderRadius: "inherit" }}
              />
            </div>
          </div>
          <div>
            <span className="eyebrow">Meet your surgeon</span>
            <h2>Dr. Preethi Mrinalini </h2>
            <div className="doc-role">
              Advanced Laparoscopic &amp; Hernia Surgeon
            </div>
            <p className="bio">
              Over the years, Dr. Preethi Mrinalini has helped patients with hernia and
              abdominal wall conditions understand their diagnosis and explore
              modern treatment options - using advanced laparoscopic, minimally
              invasive approaches focused on safety, recovery and long-term
              outcomes.
            </p>
            <p className="bio">
              Her mission is simple:{" "}
              <b style={{ color: "#fff" }}>
                help patients make informed decisions before their condition
                affects their quality of life.
              </b>
            </p>
            {/* Mobile only: photo between bio and stats */}
            <div className="doc-photo doc-photo-mobile">
              <div className="ph" style={{ display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <img
                  src="https://res.cloudinary.com/dthj7fakc/image/upload/v1781681953/dr-preethi-mrinalini_wmgdmk.webp"
                  alt="Dr. Preethi Mrinalini"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "bottom", borderRadius: "inherit" }}
                />
              </div>
            </div>
            <div className="stats">
              <StatCounter value={2000} suffix="+" label="Patients guided" />
              <StatCounter value={15} suffix="+" label="Years of experience" />
              <div className="stat">
                <div className="n">
                  <em>Key</em>
                </div>
                <div className="l">Laparoscopic focus</div>
              </div>
            </div>
            <p className="doctor-note">
              *Replace stat figures with verified, accurate numbers before
              publishing.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StatCounter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    let frame = 0;
    let start = 0;
    const duration = 1400;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        function step(timestamp: number) {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);

          setCount(Math.floor(eased * value));

          if (progress < 1) {
            frame = requestAnimationFrame(step);
          }
        }

        frame = requestAnimationFrame(step);
        observer.disconnect();
      },
      { threshold: 0.4 },
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <div className="stat">
      <div className="n" ref={ref}>
        {count.toLocaleString("en-IN")}
        {suffix}
      </div>
      <div className="l">{label}</div>
    </div>
  );
}
