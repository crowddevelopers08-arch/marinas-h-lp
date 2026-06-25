import { Reveal } from "./Reveal";

const points = [
  "Limited slots each week",
  "Reports reviewed personally",
  "No-pressure guidance",
];

export function FinalCtaSection() {
  return (
    <section className="sec" id="book">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">Take the first step</span>
          <h2>
            Ignoring the symptoms will not give you answers. A proper
            evaluation will.
          </h2>
          <p>
            Reserve your consultation with Dr. Preethi Mrinalini and finally understand
            your condition - before it affects your quality of life.
          </p>
          <a href="#" className="btn">
            Book my consultation - Rs.800
          </a>
          <div className="reassure">
            {points.map((point) => (
              <span key={point}>* {point}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
