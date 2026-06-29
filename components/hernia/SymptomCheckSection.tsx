"use client";

import { useMemo, useState } from "react";
import { CheckIcon } from "./Icons";
import { Reveal } from "./Reveal";

const symptoms = [
  "A visible bulge in your abdomen or groin",
  "Discomfort while coughing or sneezing",
  "A feeling of heaviness or pressure in your stomach",
  "Swelling that appears standing, disappears lying down",
  "A post-pregnancy tummy bulge that never went away",
];

const messages = [
  "Tap the symptoms above that apply to you.",
  "Even one persistent symptom is worth checking properly.",
  "A couple of these together is a common reason patients book.",
  "That pattern is worth getting assessed - sooner is simpler.",
  "Several of these point to something that will not fade on its own.",
  "This is exactly the picture most patients ignore for too long.",
  "Please do not keep waiting on this - book a proper assessment.",
];

export function SymptomCheckSection() {
  const [selected, setSelected] = useState<number[]>([]);
  const progress = useMemo(
    () => `${(selected.length / symptoms.length) * 100}%`,
    [selected.length],
  );

  function toggle(index: number) {
    setSelected((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  }

  return (
    <section className="sec" id="check">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">A 30-second self-check</span>
          <h2 className="section-title tight">
            Tick what sounds like you. Most people are surprised by the count.
          </h2>
          <p className="lead section-copy">
            These are the symptoms patients tell us they ignored for months -
            sometimes years. Selecting them will not diagnose anything, but it
            will tell you whether an assessment is worth your time.
          </p>

          <div className="check-card">
            <ul className="symptoms">
              {symptoms.map((symptom, index) => {
                const isSelected = selected.includes(index);

                return (
                  <li
                    className={`sym ${isSelected ? "on" : ""}`}
                    key={symptom}
                    onClick={() => toggle(index)}
                  >
                    <span className="box">
                      <CheckIcon color="#fff" size={14} strokeWidth={3} />
                    </span>
                    {symptom}
                  </li>
                );
              })}
            </ul>

            <div className="meter">
              <div className="num">
                <span>{selected.length}</span>
                <small>/6</small>
              </div>
              <div className="progress">
                <i style={{ width: progress }} />
              </div>
              <div className="msg">{messages[selected.length]}</div>
              <a href="#book" className="btn">
                Book my consultation
              </a>
              <div className="fineprint">Self-check only - not a diagnosis.</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
