import Image from "next/image";

const PHONE_NUMBER = "+91 98840 00171";
const PHONE_HREF = "tel:+919884000171";

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-layout">
          <div className="footer-main">
            <div className="f-top">
              <div className="brand">
                <div style={{ background: "#fff", borderRadius: 10, padding: "6px 10px", display: "inline-flex", alignItems: "center" }}>
                  <Image
                    src="https://res.cloudinary.com/dthj7fakc/image/upload/v1781681953/Marina-logo_v7lcbn.png"
                    alt="Preethi Mrinalini Clinic"
                    width={120}
                    height={48}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <small>Advanced Laparoscopic &amp; Hernia Surgeon</small>
              </div>
              <a href="#book" className="btn">
                Book consultation - Rs.800
              </a>
            </div>
            <p className="disc">
              <b>Medical disclaimer:</b> This page is for general information and to
              help you book a consultation. It is not medical advice, diagnosis, or
              treatment, and the symptom self-check is not a diagnostic tool.
              Outcomes, benefits, and recovery vary from person to person. Always
              consult a qualified medical professional regarding your individual
              condition. Replace all placeholder figures, images, and videos with
              verified content before publishing.
            </p>
            <p className="disc" style={{ marginTop: 14 }}>
              Copyright 2026 Dr.Preethi Mrinalini. All rights reserved.
            </p>
          </div>

          <div className="footer-contact" aria-label="Clinic contact details">
            <div className="f-contact-label">Visit Us</div>
            <address className="f-address">
              40 &amp; 54, Josier St, Nungambakkam, Chennai 600034
            </address>
            <a className="f-phone" href={PHONE_HREF}>
              {PHONE_NUMBER}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
