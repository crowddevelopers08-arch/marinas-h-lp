"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Reveal } from "./Reveal";

const images = [
  {
    src: "https://res.cloudinary.com/dthj7fakc/image/upload/v1782466684/herina-image_dlichk.png",
    alt: "Hernia treatment reference image",
    label: "Diagnosis",
    title: "Understand the bulge",
    copy: "A clear visual starting point before treatment is planned.",
  },
  {
    src: "https://res.cloudinary.com/dthj7fakc/image/upload/v1782466686/herina-image1_xan4cv.png",
    alt: "Modern hernia care reference image",
    label: "Repair",
    title: "See the weak spot",
    copy: "Know what the surgeon is actually looking to fix.",
  },
  {
    src: "https://res.cloudinary.com/dthj7fakc/image/upload/v1782466686/herina-image2_bwzqf4.png",
    alt: "Hernia consultation reference image",
    label: "Recovery",
    title: "Plan with confidence",
    copy: "Understand the next step without guessing from symptoms alone.",
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

export function ImageCarouselSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function setFromScroll() {
    const track = trackRef.current;
    if (!track) return;
    const item = track.querySelector<HTMLElement>(".image-carousel-card");
    if (!item) return;

    const step = item.offsetWidth + 18;
    const index = Math.round(track.scrollLeft / step);
    setActiveIndex(Math.min(Math.max(index, 0), images.length - 1));
  }

  function goTo(index: number) {
    const track = trackRef.current;
    const item = track?.querySelector<HTMLElement>(".image-carousel-card");
    if (!track || !item) return;

    track.scrollTo({ left: (item.offsetWidth + 18) * index, behavior: "smooth" });
    setActiveIndex(index);
  }

  function move(direction: "prev" | "next") {
    const nextIndex =
      direction === "next"
        ? Math.min(activeIndex + 1, images.length - 1)
        : Math.max(activeIndex - 1, 0);

    goTo(nextIndex);
  }

  return (
    <section className="sec image-carousel-section" id="hernia-gallery">
      <div className="wrap">
        <Reveal className="center">
          <span className="eyebrow">Visual guide</span>
          <h2 className="section-title image-carousel-title">
            Hernia treatment becomes easier when you can see what is happening.
          </h2>
          <p className="lead section-copy image-carousel-copy">
            Three simple views to understand the problem, the repair, and the
            recovery path before you decide anything.
          </p>

          <div className="image-carousel-shell">
            <button
              className="image-carousel-arrow prev"
              onClick={() => move("prev")}
              aria-label="Previous image"
              type="button"
            >
              <ArrowLeft />
            </button>

            <div
              className="image-carousel-track"
              ref={trackRef}
              onScroll={setFromScroll}
            >
              {images.map((image, index) => (
                <div
                  className={`image-carousel-card${index === activeIndex ? " active" : ""}`}
                  key={image.src}
                >
                  <div className="image-carousel-media">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={760}
                      height={640}
                      sizes="(max-width: 620px) 84vw, (max-width: 900px) 46vw, 31vw"
                    />
                  </div>
                  <div className="image-carousel-content">
                    <span>{image.label}</span>
                    <h3>{image.title}</h3>
                    <p>{image.copy}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="image-carousel-arrow next"
              onClick={() => move("next")}
              aria-label="Next image"
              type="button"
            >
              <ArrowRight />
            </button>
          </div>

          <div className="image-carousel-dots">
            {images.map((image, index) => (
              <button
                key={image.src}
                className={`carousel-dot${index === activeIndex ? " active" : ""}`}
                onClick={() => goTo(index)}
                aria-label={`Go to image ${index + 1}`}
                type="button"
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
