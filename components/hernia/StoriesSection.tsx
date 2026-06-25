"use client";

import { useRef, useState } from "react";
import { Reveal } from "./Reveal";

const stories = [
  {
    src: "https://res.cloudinary.com/dthj7fakc/video/upload/v1781681469/Postpartum_weight_gain_100__normal_️_WATCH_FULLY__._._.__Laparoscopy__Surgeon__Doctor__Pregnancy__Women_MP4_wfpgnl.mp4",
    caption: "Postpartum weight gain — is it always fat?",
  },
  {
    src: "https://res.cloudinary.com/dthj7fakc/video/upload/v1781681467/A_lot_of_moms_tell_me_the_same_thing____I_still_look_pregnant..._even_years_after_delivery.___And_many_assume_it_s_just_stubborn_fat.__But_sometimes__the_rea_w2fn73.mp4",
    caption: '"I still look pregnant... even years after delivery."',
  },
  {
    src: "https://res.cloudinary.com/dthj7fakc/video/upload/v1781681467/Most_people_think_every_tummy_bulge_is_fat._But_sometimes__it_could_be_something_entirely_different._A_hernia_is_a_weakness_in_the_abdominal_wall_that_allow_gfuapm.mp4",
    caption: "Not every tummy bulge is fat — it could be a hernia.",
  },
];

export function StoriesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function handleScroll() {
    const el = scrollRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / (el.scrollWidth / stories.length));
    setActiveIndex(Math.min(index, stories.length - 1));
  }

  function goTo(index: number) {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: (el.scrollWidth / stories.length) * index, behavior: "smooth" });
    setActiveIndex(index);
  }

  return (
    <section className="sec" id="stories">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">Real stories from real patients</span>
          <h2 className="section-title">
            People who waited too long - and what changed after.
          </h2>
          <div className="vids" ref={scrollRef} onScroll={handleScroll}>
            {stories.map(({ src, caption }) => (
              <div className="vid" key={src}>
                <video
                  src={src}
                  controls
                  playsInline
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit", display: "block" }}
                />
                <div className="ov" style={{ position: "relative", background: "none", pointerEvents: "none" }}>
                  <div className="nm story-caption" style={{ pointerEvents: "none" }}>&quot;{caption}&quot;</div>
                </div>
              </div>
            ))}
          </div>
          <div className="carousel-dots">
            {stories.map((_, i) => (
              <button
                key={i}
                className={`carousel-dot${i === activeIndex ? " active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Go to video ${i + 1}`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
