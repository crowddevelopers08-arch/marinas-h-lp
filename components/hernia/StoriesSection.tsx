"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

const stories = [
  // {
  //   src: "https://res.cloudinary.com/dthj7fakc/video/upload/v1781762970/video1_kaazse.mp4",
  //   caption: "Postpartum weight gain — is it always fat?",
  // },
  {
    src: "https://res.cloudinary.com/dthj7fakc/video/upload/v1781681467/A_lot_of_moms_tell_me_the_same_thing____I_still_look_pregnant..._even_years_after_delivery.___And_many_assume_it_s_just_stubborn_fat.__But_sometimes__the_rea_w2fn73.mp4",
    caption: '"I still look pregnant... even years after delivery."',
  },
  {
    src: "https://res.cloudinary.com/dthj7fakc/video/upload/v1781681467/Most_people_think_every_tummy_bulge_is_fat._But_sometimes__it_could_be_something_entirely_different._A_hernia_is_a_weakness_in_the_abdominal_wall_that_allow_gfuapm.mp4",
    caption: "Not every tummy bulge is fat — it could be a hernia.",
  },
];

function ArrowLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function getScrollStep(el: HTMLDivElement) {
  const item = el.querySelector<HTMLElement>(".vid");
  if (!item) return el.scrollWidth / stories.length;

  const styles = window.getComputedStyle(el);
  const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
  return item.offsetWidth + gap;
}

export function StoriesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isVideoPlayingRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  function handleScroll() {
    const el = scrollRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / getScrollStep(el));
    setActiveIndex(Math.min(index, stories.length - 1));
  }

  function goTo(index: number) {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: getScrollStep(el) * index, behavior: "smooth" });
    setActiveIndex(index);
  }

  function move(direction: "prev" | "next") {
    const nextIndex =
      direction === "next"
        ? (activeIndex + 1) % stories.length
        : (activeIndex - 1 + stories.length) % stories.length;

    goTo(nextIndex);
  }

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 621px)");
    const mobileQuery = window.matchMedia("(max-width: 620px)");

    const timer = window.setInterval(() => {
      if (!desktopQuery.matches && !mobileQuery.matches) return;
      if (mobileQuery.matches && isVideoPlayingRef.current) return;

      const el = scrollRef.current;
      if (!el) return;

      setActiveIndex((currentIndex) => {
        const nextIndex = (currentIndex + 1) % stories.length;
        el.scrollTo({ left: getScrollStep(el) * nextIndex, behavior: "smooth" });
        return nextIndex;
      });
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="sec" id="stories">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">What Doctor Say</span>
          <h2 className="section-title">
            Stories From Those Who Chose Change.
          </h2>
          <div className="stories-carousel-shell">
            <button
              className="stories-carousel-arrow prev"
              onClick={() => move("prev")}
              aria-label="Previous video"
              type="button"
            >
              <ArrowLeft />
            </button>

            <div className="vids stories-carousel" ref={scrollRef} onScroll={handleScroll}>
              {stories.map(({ src, caption }) => (
                <div className="vid" key={src}>
                  <video
                    src={src}
                    controls
                    playsInline
                    preload="metadata"
                    onPlay={() => {
                      isVideoPlayingRef.current = true;
                    }}
                    onPause={() => {
                      isVideoPlayingRef.current = false;
                    }}
                    onEnded={() => {
                      isVideoPlayingRef.current = false;
                    }}
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit", display: "block" }}
                  />
                  <div className="ov" style={{ position: "relative", background: "none", pointerEvents: "none" }}>
                    <div className="nm story-caption" style={{ pointerEvents: "none" }}>&quot;{caption}&quot;</div>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="stories-carousel-arrow next"
              onClick={() => move("next")}
              aria-label="Next video"
              type="button"
            >
              <ArrowRight />
            </button>
          </div>
          <div className="carousel-dots stories-carousel-dots">
            {stories.map((_, i) => (
              <button
                key={i}
                className={`carousel-dot${i === activeIndex ? " active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Go to video ${i + 1}`}
                type="button"
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
