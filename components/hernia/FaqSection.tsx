"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";

const faqs = [
  [
    "Does a hernia ever heal on its own?",
    "No. A hernia does not resolve by itself, and the discomfort or swelling usually persists. Waiting often makes the condition harder to manage over time - which is why an early, clear assessment matters.",
  ],
  [
    "I am scared of surgery. Is this consultation just a sales pitch for it?",
    "The consultation is about understanding your condition first. Dr. Preethi Mrinalini explains what type of hernia you have and your options in plain language. Surgical guidance is only discussed if it is genuinely the right step for you.",
  ],
  [
    "I think my belly is just post-pregnancy fat. Should I still come?",
    "Possibly yes. Many women assume it is stubborn fat when it is actually diastasis recti - abdominal muscle separation that will not respond to ordinary exercise. The assessment can tell the difference.",
  ],
  [
    "What should I bring to the consultation?",
    "Bring any existing scans, reports, or prescriptions related to your symptoms. They will be reviewed personally as part of your evaluation. If you do not have any, that is completely fine too.",
  ],
  [
    "What is the consultation fee, and what does it include?",
    "The fee is Rs.800. It includes a detailed assessment, symptom evaluation, review of your reports and scans, discussion of treatment options, recovery expectations, and surgical guidance if required.",
  ],
  [
    "Can I come for just a second opinion?",
    "Absolutely. Second opinions are welcome. Many patients book specifically to get clarity on advice they have already received elsewhere before making a decision.",
  ],
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="sec" id="faq">
      <div className="wrap">
        <Reveal>
          <div className="center">
            <span className="eyebrow">Common questions</span>
            <h2 className="section-title">Before you book</h2>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => (
              <FaqItem
                answer={answer}
                isOpen={openIndex === index}
                key={question}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                question={question}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FaqItem({
  answer,
  isOpen,
  onClick,
  question,
}: {
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  question: string;
}) {
  return (
    <div className={`q ${isOpen ? "open" : ""}`}>
      <button onClick={onClick}>
        {question} <span className="qi">+</span>
      </button>
      <div className="a" style={{ maxHeight: isOpen ? 260 : 0 }}>
        <p>{answer}</p>
      </div>
    </div>
  );
}
