"use client";

import Image from "next/image";
import React, { useState } from "react";

export default function ClientFeedbackPage() {
  const [formData, setFormData] = useState({ name: "", phone: "", suggestions: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error" | ""; text: string }>({ type: "", text: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (message.text) setMessage({ type: "", text: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

    if (!/^\d{10}$/.test(formData.phone.trim())) {
      setMessage({ type: "error", text: "Please enter a valid 10-digit mobile number." });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          concern: `Client feedback: ${formData.suggestions.trim()}`,
          source: "Marina's Clinic Client Feedback Page",
          pageUrl: window.location.href,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Feedback submitted successfully!" });
        setFormData({ name: "", phone: "", suggestions: "" });
      } else {
        setMessage({ type: "error", text: result.error || "Failed to submit feedback" });
      }
    } catch {
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid rgba(22,48,48,0.15)",
    background: "#e3f9f9",
    borderRadius: "14px 4px 14px 4px",
    padding: "12px 16px",
    fontSize: 14,
    color: "#163030",
    outline: "none",
    fontFamily: "inherit",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#e3f9f9", color: "#163030" }}>
      <style>{`
        .cf-submit { width:100%; background:#42c8c8; color:#fff; border:2px solid #42c8c8; border-radius:99px; padding:12px 20px; font-size:13px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; cursor:pointer; transition:background 0.2s; font-family:inherit; }
        .cf-submit:hover:not(:disabled) { background:#126e6e; border-color:#126e6e; }
        .cf-submit:disabled { background:#9e9e9e; border-color:#9e9e9e; cursor:not-allowed; }
        .cf-back { width:100%; background:transparent; color:#126e6e; border:2px solid #126e6e; border-radius:99px; padding:12px 20px; font-size:13px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; cursor:pointer; transition:background 0.2s,color 0.2s; font-family:inherit; }
        .cf-back:hover { background:#126e6e; color:#fff; }
        .cf-input:focus { border-color:#126e6e; box-shadow:0 0 0 3px rgba(66,200,200,0.15); }
        @media (min-width:480px) { .cf-btns { display:grid !important; grid-template-columns:1fr 1fr; gap:12px; } }
      `}</style>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "40px 16px" }}>
        <div style={{ width: "100%", maxWidth: 600 }}>
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

            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{ width: 48, height: 4, background: "#42c8c8", borderRadius: 99, margin: "0 auto 12px" }} />
              <h4 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 32, fontWeight: 900, color: "#163030", marginBottom: 12 }}>
                Help Us Improve
              </h4>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "#3d5656", margin: 0 }}>
                Tell us what did not meet your expectations. Our team will review your feedback and follow up where needed.
              </p>
            </div>

            {message.text && (
              <div style={{
                marginBottom: 20,
                padding: "12px 16px",
                borderRadius: 8,
                textAlign: "center",
                fontSize: 14,
                fontWeight: 500,
                background: message.type === "success" ? "#e3f9f9" : "#fff0f0",
                border: message.type === "success" ? "1px solid rgba(18,110,110,0.2)" : "1px solid rgba(211,47,47,0.3)",
                color: message.type === "success" ? "#126e6e" : "#d32f2f",
              }}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#163030", marginBottom: 6 }}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  placeholder="Enter your full name"
                  className="cf-input"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#163030", marginBottom: 6 }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  maxLength={10}
                  pattern="\d{10}"
                  disabled={isSubmitting}
                  placeholder="10-digit mobile number"
                  className="cf-input"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#163030", marginBottom: 6 }}>
                  Your Suggestions
                </label>
                <textarea
                  name="suggestions"
                  value={formData.suggestions}
                  onChange={handleChange}
                  required
                  rows={4}
                  disabled={isSubmitting}
                  placeholder="Share your valuable suggestions and feedback..."
                  className="cf-input"
                  style={{ ...inputStyle, resize: "none" }}
                />
              </div>

              <div className="cf-btns" style={{ display: "flex", flexDirection: "column", gap: 12, paddingTop: 8 }}>
                <button type="submit" disabled={isSubmitting} className="cf-submit">
                  {isSubmitting ? "Submitting..." : "Submit Feedback"}
                </button>
                <button type="button" onClick={() => window.history.back()} disabled={isSubmitting} className="cf-back">
                  Back to Home
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
