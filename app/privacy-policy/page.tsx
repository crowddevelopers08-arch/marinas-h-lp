import SupportNavbar from "../../components/hernia/SupportNavbar";

export const metadata = {
  title: "Privacy Policy — Marina's Clinic",
};

export default function PrivacyPolicyPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#e3f9f9", color: "#163030" }}>
      <SupportNavbar />

      <div style={{ padding: "48px 16px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{
            background: "#fff",
            borderRadius: "28px 4px 28px 4px",
            border: "1px solid rgba(22,48,48,0.12)",
            boxShadow: "0 24px 70px rgba(18,110,110,0.12)",
            padding: "48px 40px",
          }}>

            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{ width: 40, height: 4, background: "#42c8c8", borderRadius: 99, margin: "0 auto 12px" }} />
              <h1 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 32, fontWeight: 900, color: "#163030", margin: 0 }}>
                Privacy Policy
              </h1>
              <p style={{ marginTop: 8, fontSize: 13, color: "#3d5656" }}>Last updated: June 2025</p>
            </div>

            {/* Sections */}
            <div style={{ fontSize: 14, lineHeight: 1.8, color: "#3d5656", display: "flex", flexDirection: "column", gap: 24 }}>
              {[
                ["1. Information We Collect", "When you submit a consultation request on this website, we collect your name, phone number, and the health concern you have shared. We may also collect your IP address and browser information automatically through standard web technologies."],
                ["2. How We Use Your Information", "The information you provide is used solely to contact you regarding your consultation request and to assist in scheduling your appointment with our medical team. We do not use your personal information for marketing purposes without your explicit consent."],
                ["3. Data Sharing", "We do not sell, trade, or otherwise transfer your personal information to third parties. Your data may be shared with our scheduling and CRM systems only to facilitate your consultation. These systems are bound by confidentiality obligations."],
                ["4. Data Security", "We implement industry-standard security measures to protect your personal data. All form submissions are transmitted over HTTPS. However, no method of transmission over the internet is 100% secure."],
                ["5. Cookies & Tracking", "This website uses cookies and similar tracking technologies (Google Analytics, Google Ads, Facebook Pixel, Microsoft Clarity) to understand how visitors use our site and to improve our services. You can disable cookies in your browser settings at any time."],
                ["6. Your Rights", "You have the right to request access to, correction of, or deletion of your personal information. To exercise these rights, please contact us using the details listed on our website."],
                ["7. Contact Us", "If you have any questions about this Privacy Policy, please contact Marina’s Clinic at the phone number or address listed on our website."],
              ].map(([title, body]) => (
                <section key={title}>
                  <h2 style={{ fontSize: 16, fontWeight: 700, color: "#163030", marginBottom: 6 }}>{title}</h2>
                  <p style={{ margin: 0 }}>{body}</p>
                </section>
              ))}
            </div>

            {/* Back button */}
            <style>{`
              .pp-btn { display:inline-block; background:#42c8c8; color:#fff; border:2px solid #42c8c8; border-radius:99px; padding:12px 32px; font-size:13px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; text-decoration:none; box-shadow:0 12px 30px rgba(18,110,110,0.24); transition:background 0.2s, border-color 0.2s; }
              .pp-btn:hover { background:#126e6e; border-color:#126e6e; }
            `}</style>
            <div style={{ marginTop: 40, textAlign: "center" }}>
              <a href="/" className="pp-btn">Back to Home</a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
