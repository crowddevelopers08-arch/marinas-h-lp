"use client";

import Image from "next/image";

export default function ReviewPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#e3f9f9", color: "#163030" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "40px 16px" }}>
        <div style={{ width: "100%", maxWidth: 560 }}>
          <div style={{
            background: "#fff",
            borderRadius: "36px 4px 36px 4px",
            border: "1px solid rgba(22,48,48,0.1)",
            boxShadow: "0 24px 70px rgba(18,110,110,0.16)",
            padding: "40px 36px",
          }}>

            <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
              <Image src="/Marina-logo.png" alt="Marina's Clinic" width={160} height={60} style={{ height: 48, width: "auto" }} priority />
            </div>

            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <div style={{ width: 48, height: 4, background: "#42c8c8", borderRadius: 99, margin: "0 auto 12px" }} />
              <h4 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 32, fontWeight: 900, color: "#163030", marginBottom: 16 }}>
                Click &amp; Review
              </h4>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#3d5656", margin: 0 }}>
                We&apos;d love to hear your feedback!<br />
                Please click any one of the buttons below to share your review.<br />
                A short review of 4 to 5 lines would be greatly appreciated.
              </p>
            </div>

            <style>{`
              .cr-primary { display:block; background:#42c8c8; color:#fff; border:2px solid #42c8c8; border-radius:99px; padding:12px 20px; text-align:center; font-size:13px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; text-decoration:none; box-shadow:0 12px 30px rgba(18,110,110,0.24); transition:background 0.2s,border-color 0.2s; }
              .cr-primary:hover { background:#126e6e; border-color:#126e6e; }
              .cr-outline { display:block; background:transparent; color:#126e6e; border:2px solid #126e6e; border-radius:99px; padding:12px 20px; text-align:center; font-size:13px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; text-decoration:none; transition:background 0.2s,color 0.2s; }
              .cr-outline:hover { background:#126e6e; color:#fff; }
              @media (min-width: 480px) { .cr-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; } }
            `}</style>

            <div className="cr-grid" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <a href="https://g.page/r/CYDkmZgU4_5OEBM/review" className="cr-primary">
                Client Review
              </a>
              <a href="/client-feedback" className="cr-outline">
                Client Feedback
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
