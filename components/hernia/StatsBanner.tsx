"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 5000, suffix: "+", label: "Happy Patients" },
  { value: 1000, suffix: "+", label: "Online Appointments" },
  { value: 12, suffix: "+", label: "Years Of Experience" },
  { value: 15, suffix: "+", label: "Doctors and Staff" },
];

export function StatsBanner() {
  return (
    <section className="stats-banner" aria-label="Clinic statistics">
      <div className="stats-banner-grid">
        {stats.map((stat) => (
          <div className="stats-banner-item" key={stat.label}>
            <StatCounter value={stat.value} suffix={stat.suffix} />
            <div className="stats-banner-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function StatCounter({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
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
          } else {
            setCount(value);
          }
        }

        frame = requestAnimationFrame(step);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <div className="stats-banner-value" ref={ref}>
      {count.toLocaleString("en-IN")}
      {suffix}
    </div>
  );
}
