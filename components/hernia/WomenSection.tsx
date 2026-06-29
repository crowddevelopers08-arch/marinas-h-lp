"use client";

import { useEffect, useState } from "react";
import { CheckIcon } from "./Icons";
import { Reveal } from "./Reveal";

const signs = [
  "Mommy pouch",
  "Weak core muscles",
  "Lower back pain",
  "Difficulty exercising",
  "Abdominal bulging",
  "Lost post-pregnancy confidence",
];

const image = (
  <div className="ph" style={{ overflow: "hidden" }}>
    <img
      src="https://res.cloudinary.com/dxntva1vn/image/upload/v1782744669/hernia_ygipmq.png"
      alt="Women patient"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center",
        borderRadius: "inherit",
        display: "block",
      }}
    />
  </div>
);

export function WomenSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 620px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section className="sec" id="women">
      <div className="wrap">
        <Reveal className="women-grid">
          {/* Desktop / tablet: image in left column */}
          {!isMobile && <div className="women-visual">{image}</div>}

          <div>
            <span className="badge-soft">For Women</span>
            <h2 className="section-title">It may not just be belly fat.</h2>
            <p className="lead section-copy">
              Many women come to us convinced they have stubborn fat that will
              not budge after pregnancy. What they often have is{" "}
              <b>abdominal muscle separation - Diastasis Recti.</b> It affects
              confidence, posture and everyday comfort, and it rarely resolves
              with more crunches.
            </p>

            {/* Mobile: image between paragraph and signs */}
            {isMobile && (
              <div className="women-visual" style={{ margin: "20px 0" }}>
                {image}
              </div>
            )}

            <div className="signs">
              {signs.map((sign) => (
                <div className="sgn" key={sign}>
                  <CheckIcon size={16} strokeWidth={2.6} /> {sign}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
