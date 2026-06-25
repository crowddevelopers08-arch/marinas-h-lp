import { CheckIcon } from "./Icons";
import { Reveal } from "./Reveal";

const includes = [
  [
    "Detailed hernia assessment",
    "A proper evaluation of what is actually going on.",
  ],
  ["Symptom evaluation", "Your specific signs, mapped to what they may mean."],
  [
    "Review of reports & scans",
    "Bring what you have - it will be looked at properly.",
  ],
  [
    "Discussion of treatment options",
    "Clear, plain-language explanation of your choices.",
  ],
  [
    "Recovery expectations",
    "What life realistically looks like through recovery.",
  ],
  [
    "Surgical guidance - if required",
    "Only if it is genuinely the right step for you.",
  ],
];

const offerItems = [
  "Reports & scans reviewed",
  "Treatment options explained",
  "Second opinions welcome",
];

export function ConsultationSection() {
  return (
    <section className="sec" id="consult">
      <div className="wrap">
        <Reveal className="consult-grid">
          <div>
            <span className="eyebrow">Your consultation with Dr. Preethi Mrinalini </span>
            <h2 className="section-title">
              For people serious about understanding their condition.
            </h2>
            <p className="lead section-copy">
              This is not a quick glance. It is a focused, honest session
              designed to give you real answers.
            </p>
            <div className="incl">
              {includes.map(([title, copy]) => (
                <div className="it" key={title}>
                  <span className="ck">
                    <CheckIcon color="#fff" size={15} strokeWidth={3} />
                  </span>
                  <div>
                    <b>{title}</b>
                    <p>{copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="offer-card">
            <div className="kicker">Consultation fee</div>
            <div className="price">
              <small>Rs.</small>800
            </div>
            <div className="price-sub">One focused session with the surgeon</div>
            <a href="#book" className="btn">
              Book my consultation
            </a>
            <ul className="offer-list">
              {offerItems.map((item) => (
                <li key={item}>
                  <CheckIcon color="#99e6e6" size={15} strokeWidth={2.6} />
                  {item}
                </li>
              ))}
            </ul>
            <div className="slots">
              Only <i>a few slots</i> open each week
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
