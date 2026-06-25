"use client";

import { useEffect, useState } from "react";

export function StickyBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`sticky ${show ? "show" : ""}`}>
      <div className="sticky-in">
        <div className="l">
          <b>Rs.800</b>
          <span>Hernia &amp; diastasis consultation - limited weekly slots</span>
        </div>
        <a href="#book" className="btn">
          Book my consultation
        </a>
      </div>
    </div>
  );
}
