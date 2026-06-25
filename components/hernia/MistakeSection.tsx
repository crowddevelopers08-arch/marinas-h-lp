import { Reveal } from "./Reveal";

const mistakes = [
  ["hope the swelling disappears", "on its own."],
  ["avoid it out of fear", "of surgery."],
  ["search Google and YouTube", "for answers instead of clarity."],
  ["live with discomfort", "every single day."],
];

export function MistakeSection() {
  return (
    <section className="sec" id="mistake">
      <div className="wrap">
        <Reveal className="mistake-grid">
          <div>
            <span className="eyebrow">The biggest mistake</span>
            <h2 className="section-title">
              Most hernia patients make the same costly mistake: they wait.
            </h2>
            <div className="mistake-list">
              {mistakes.map(([bold, rest]) => (
                <div className="m" key={bold}>
                  <span className="x">x</span>
                  <div>
                    They <b>{bold}</b> {rest}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="truth">
            <h3>
              The reality is simple:{" "}
              <em>a hernia does not heal on its own.</em>
            </h3>
            <p>
              Delaying often makes the condition harder to manage, not easier.
              The earlier it is diagnosed, the{" "}
              <span className="underline">simpler the options</span> tend to be
              - and the sooner you stop organising your day around discomfort.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
