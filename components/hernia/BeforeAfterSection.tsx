import { ArrowIcon, CheckIcon, CrossIcon } from "./Icons";
import { Reveal } from "./Reveal";

const before = [
  "Planning your movements around the discomfort",
  "Worrying quietly whether it is getting worse",
  "Avoiding lifting, exercise, even certain clothes",
  "Conflicting answers from Google and forums",
  "Putting off a decision month after month",
];

const after = [
  "You know exactly what type of hernia you have",
  "You understand your real options - not guesses",
  "You know what recovery would actually look like",
  "Your scans and reports reviewed by a specialist",
  "A decision you can make with confidence",
];

export function BeforeAfterSection() {
  return (
    <section className="sec" id="ba">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">Before &amp; after a clear diagnosis</span>
          <h2 className="section-title">
            The difference is not just physical. It is the not-knowing.
          </h2>
          <div className="ba-grid">
            <div className="ba-col before">
              <span className="tag">Living with it</span>
              <h3>Every day on hold</h3>
              <ul>
                {before.map((item) => (
                  <li key={item}>
                    <CrossIcon color="#D14224" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="ba-arrow">
              <ArrowIcon />
            </div>

            <div className="ba-col after">
              <span className="tag">After your assessment</span>
              <h3>Finally, clarity</h3>
              <ul>
                {after.map((item) => (
                  <li key={item}>
                    <CheckIcon color="#99e6e6" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
