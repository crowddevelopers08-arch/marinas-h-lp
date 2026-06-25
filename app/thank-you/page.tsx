import SupportNavbar from "../../components/hernia/SupportNavbar";

export const metadata = {
  title: "Thank You — Marina's Clinic",
};

export default function ThankYouPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#e3f9f9", color: "#163030" }}>
      <SupportNavbar />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 65px)", padding: "40px 16px" }}>
        <div style={{
          width: "100%",
          maxWidth: 520,
          background: "#fff",
          borderRadius: "36px 4px 36px 4px",
          border: "1px solid rgba(22,48,48,0.12)",
          boxShadow: "0 24px 70px rgba(18,110,110,0.16)",
          padding: "48px 40px",
          textAlign: "center",
        }}>

          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#e3f9f9", color: "#126e6e", fontSize: 36, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            ✓
          </div>

          <div style={{ width: 48, height: 4, background: "#42c8c8", borderRadius: 99, margin: "0 auto 12px" }} />
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "#126e6e", marginBottom: 12 }}>
            Booking Confirmed
          </p>
          <h1 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 36, fontWeight: 900, color: "#163030", marginBottom: 16 }}>
            Thank You!
          </h1>
          <p style={{ maxWidth: 400, margin: "0 auto 32px", fontSize: 16, lineHeight: 1.7, color: "#3d5656" }}>
            We&apos;ve received your consultation request. Our team will call you shortly to confirm your appointment slot.
          </p>

          <div style={{ maxWidth: 340, margin: "0 auto 32px", background: "#e3f9f9", border: "1px solid rgba(22,48,48,0.12)", borderRadius: 16, padding: "20px 24px", textAlign: "left", fontSize: 14, color: "#163030" }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>What happens next?</div>
            <ol style={{ listStyle: "none", padding: 0, margin: 0, color: "#3d5656", display: "flex", flexDirection: "column", gap: 4 }}>
              <li>1. Our coordinator will call within 2 hours</li>
              <li>2. Your slot will be reserved on confirmation</li>
              <li>3. Visit us on the scheduled date</li>
            </ol>
          </div>

          <style>{`
            .ty-btn { display:inline-block; background:#42c8c8; color:#fff; border:2px solid #42c8c8; border-radius:99px; padding:12px 32px; font-size:13px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; text-decoration:none; box-shadow:0 12px 30px rgba(18,110,110,0.24); transition:background 0.2s, border-color 0.2s; }
            .ty-btn:hover { background:#126e6e; border-color:#126e6e; }
          `}</style>
          <a href="/" className="ty-btn">Back to Home</a>
        </div>
      </div>
    </div>
  );
}
