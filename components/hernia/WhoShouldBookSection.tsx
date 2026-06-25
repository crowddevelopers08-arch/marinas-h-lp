"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "./Reveal";

const cards = [
  ["+", "You have hernia symptoms", "A bulge, heaviness, or pain you have been brushing off."],
  ["Rx", "You were advised surgery", "And you want to truly understand it before deciding."],
  ["W", "You have diastasis recti signs", "Especially women after pregnancy with a bulge that stayed."],
  ["2nd", "You want a second opinion", "A fresh, specialist perspective on what you have been told."],
  ["?", "You want clarity first", "Answers before any treatment decision - no pressure."],
  ["Now", "You have been waiting too long", "Ready to stop hoping it will fade and actually find out."],
];

export function WhoShouldBookSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number>(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const mq = window.matchMedia("(max-width: 900px)");

    function tick() {
      if (!pausedRef.current) {
        posRef.current += 0.6;
        const half = track!.scrollWidth / 2;
        if (half > 0 && posRef.current >= half) posRef.current = 0;
        track!.style.transform = `translateX(-${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    function start() {
      posRef.current = 0;
      track!.style.transform = "translateX(0)";
      rafRef.current = requestAnimationFrame(tick);
    }

    function stop() {
      cancelAnimationFrame(rafRef.current);
    }

    const parent = track.parentElement!;
    const pause = () => { pausedRef.current = true; };
    const resume = () => { pausedRef.current = false; };
    parent.addEventListener("mouseenter", pause);
    parent.addEventListener("touchstart", pause, { passive: true });
    parent.addEventListener("mouseleave", resume);
    parent.addEventListener("touchend", resume);

    if (mq.matches) start();
    mq.addEventListener("change", (e) => (e.matches ? start() : stop()));

    return () => {
      stop();
      parent.removeEventListener("mouseenter", pause);
      parent.removeEventListener("touchstart", pause);
      parent.removeEventListener("mouseleave", resume);
      parent.removeEventListener("touchend", resume);
    };
  }, []);

  return (
    <section className="sec" id="who">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">Who should book this</span>
          <h2 className="section-title">This consultation is for you if...</h2>
          {/* Desktop: grid */}
          <div className="who-grid">
            {cards.map(([icon, title, copy]) => (
              <div className="who-c" key={title}>
                <div className="ic">{icon}</div>
                <b>{title}</b>
                <p>{copy}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Mobile + tablet: JS-driven marquee */}
      <div className="who-marquee">
        <div className="who-marquee-track" ref={trackRef}>
          {[...cards, ...cards].map(([icon, title, copy], i) => (
            <div className="who-c who-marquee-card" key={i}>
              <div className="ic">{icon}</div>
              <b>{title}</b>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
