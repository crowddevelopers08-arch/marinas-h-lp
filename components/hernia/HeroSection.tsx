import { CheckIcon, PlayIcon } from "./Icons";

export function HeroSection() {
  return (
    <section className="hero" id="hero">
      <div className="wrap hero-grid">
        <div>
          <span className="pill">
            <span className="dot" /> Watch before you decide what to do
          </span>
          <h1>
            Living with a Hernia is a choice you are making{" "}
            <em>Every Single Day.</em>
          </h1>
          <p className="sub">
            The bulge, the heaviness, the pull when you lift or cough - most
            people wait months hoping it fades. It does not. A short, honest
            assessment tells you exactly what you are dealing with and what
            your real options are.
          </p>
          <div className="hero-cta">
            <a href="#book" className="btn">
              Book my consultation <span className="sub">Rs.800</span>
            </a>
            <a href="#check" className="btn btn-ghost">
              Check my symptoms
            </a>
          </div>
          <div className="trust-inline">
            <span>
              <CheckIcon color="#42c8c8" size={17} /> Minimally invasive
              approach
            </span>
            <span>
              <CheckIcon color="#42c8c8" size={17} /> Reports reviewed
              personally
            </span>
          </div>
        </div>

        <div className="vsl">
          <div className="vsl-bg" />
          <span className="vsl-tag">Watch first</span>
          <div className="vsl-inner">
            <video
              src="https://res.cloudinary.com/dthj7fakc/video/upload/v1781681469/Postpartum_weight_gain_100__normal_️_WATCH_FULLY__._._.__Laparoscopy__Surgeon__Doctor__Pregnancy__Women_MP4_wfpgnl.mp4"
              controls
              playsInline
              style={{ width: "100%", borderRadius: "inherit", display: "block" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
