"use client";

import { useRef, useState } from "react";
import { Reveal } from "./Reveal";

const stories = [
  {
    id: "DZKXI_YPTdE",
    caption: "Doctor guidance on hernia — watch the reel.",
  },
  {
    id: "DY4QVVOxov9",
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

  return (
    <section className="sec" id="stories">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">What Doctor Say</span>
          <h2 className="section-title">
             Quick videos. Clear answers. Better decisions.
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
              {stories.map(({ id, caption }) => (
                <div className="vid" key={id}>
                  <iframe
                    src={`https://www.instagram.com/reel/${id}/embed/`}
                    title={caption}
                    loading="lazy"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    scrolling="no"
                    style={{ width: "100%", height: "100%", border: 0, borderRadius: "inherit", display: "block", background: "#fff" }}
                  />
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
          <div className="stories-full-video-link">
            <p>For the full video and more doctor guidance, watch it on Instagram.</p>
            <a
              href="https://www.instagram.com/dr.preethimrinalini?igsh=YWkzdmlsc3l0aWF5"
              target="_blank"
              rel="noopener noreferrer"
            >
              View full video
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
