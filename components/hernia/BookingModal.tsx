"use client";

import { useEffect, useRef, useState } from "react";

type Form = { name: string; email: string; phone: string; concern: string };
type Status = "idle" | "loading" | "paying" | "verifying" | "error";
type RazorpayResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

const FORM_NAME = "Hernia Consultation Booking Form";
const SOURCE = "Hernia-LP";
const CONSULTATION_AMOUNT = 100;

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open(): void;
      on(event: "payment.failed", callback: (response: unknown) => void): void;
    };
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (document.getElementById("rzp-script")) return resolve(true);
    const script = document.createElement("script");
    script.id = "rzp-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function BookingModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Form>({ name: "", email: "", phone: "", concern: "" });
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function openModal(e: Event) {
      const target = (e as MouseEvent).target as HTMLElement;
      const link = target.closest('a[href="#book"]');
      if (link) {
        e.preventDefault();
        setSubmitted(false);
        setErrorMsg("");
        setStatus("idle");
        setOpen(true);
      }
    }
    document.addEventListener("click", openModal);
    return () => document.removeEventListener("click", openModal);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => firstRef.current?.focus(), 60);
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function change(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function recordPaymentAbandoned(orderId: string, amount: number, currency: string) {
    const payload = {
      source: SOURCE,
      formName: FORM_NAME,
      name: form.name,
      phone: form.phone,
      email: form.email,
      concern: form.concern || "Not shared",
      pageUrl: window.location.href,
      paymentId: orderId,
      paymentStatus: "failed",
      orderId,
      amount,
      currency,
    };

    await Promise.allSettled([
      fetch("/api/razorpay/abandon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }),
      fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }),
    ]);
  }

  function goToThankYou() {
    window.location.href = "/thank-you";
  }

  async function submit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      // 1. Save lead first (non-blocking on failure)
      fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: SOURCE,
          formName: FORM_NAME,
          name: form.name,
          phone: form.phone,
          email: form.email,
          concern: form.concern,
          pageUrl: window.location.href,
          paymentStatus: "lead_created",
        }),
      }).catch(() => null);

      // 2. Load Razorpay script
      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error("Payment gateway failed to load. Please try again.");

      // 3. Create order
      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: CONSULTATION_AMOUNT,
          currency: "INR",
          source: SOURCE,
          formName: FORM_NAME,
          name: form.name,
          phone: form.phone,
          email: form.email,
          concern: form.concern,
          pageUrl: window.location.href,
        }),
      });
      if (!orderRes.ok) throw new Error("Could not create payment order. Please try again.");
      const { orderId, amount, currency, keyId } = await orderRes.json();

      setStatus("paying");
      let paymentCompleted = false;

      // 4. Open Razorpay checkout
      const rzp = new window.Razorpay({
        key: keyId,
        amount,
        currency,
        order_id: orderId,
        name: "Marina's Clinic",
        description: "Hernia Consultation with Dr. Preethi Mrinalini",
        image: "https://res.cloudinary.com/dthj7fakc/image/upload/v1781681465/logo-marinas_lm71bk.png",
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: "#42c8c8" },
        handler: async (response: RazorpayResponse) => {
          paymentCompleted = true;
          setStatus("verifying");

          try {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                amount,
                currency,
                source: SOURCE,
                formName: FORM_NAME,
                name: form.name,
                phone: form.phone,
                email: form.email,
                concern: form.concern,
                pageUrl: window.location.href,
              }),
            });

            if (!verifyRes.ok) {
              throw new Error("Payment succeeded, but verification failed. Our team will verify it manually.");
            }

            setStatus("idle");
            goToThankYou();
          } catch (verifyErr) {
            setErrorMsg(
              verifyErr instanceof Error
                ? verifyErr.message
                : "Payment succeeded, but verification failed. Our team will verify it manually.",
            );
            setStatus("idle");
            goToThankYou();
          }
        },
        modal: {
          ondismiss: () => {
            setStatus("idle");
            if (!paymentCompleted) {
              void recordPaymentAbandoned(orderId, amount, currency).finally(goToThankYou);
            }
          },
        },
      });

      rzp.on("payment.failed", () => {
        paymentCompleted = true;
        setStatus("idle");
        void recordPaymentAbandoned(orderId, amount, currency).finally(goToThankYou);
      });

      rzp.open();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("idle");
    }
  }

  const isLoading = status === "loading" || status === "paying" || status === "verifying";

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
      <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button className="modal-close" onClick={() => setOpen(false)} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {submitted ? (
          <div className="modal-success">
            <div className="modal-success-icon">✓</div>
            <h3>Payment confirmed!</h3>
            <p>Thank you for your payment. Dr. Preethi Mrinalini&apos;s team will contact you within 24 hours to schedule your consultation.</p>
            <button className="btn" style={{ marginTop: 24 }} onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <span className="eyebrow" style={{ marginBottom: 8 }}>Book a consultation</span>
              <h2 id="modal-title" className="modal-title">Get clarity on your condition</h2>
              <p className="modal-sub">Rs.800 · Reviewed personally by Dr. Preethi Mrinalini</p>
            </div>

            <form className="modal-form" onSubmit={submit} noValidate>
              <div className="modal-field">
                <label className="modal-label" htmlFor="m-name">Full name</label>
                <input
                  ref={firstRef}
                  id="m-name"
                  className="modal-input"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={change}
                  required
                />
              </div>

              <div className="modal-field">
                <label className="modal-label" htmlFor="m-phone">Phone number</label>
                <input
                  id="m-phone"
                  className="modal-input"
                  type="tel"
                  name="phone"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={change}
                  required
                />
              </div>

              <div className="modal-field">
                <label className="modal-label" htmlFor="m-email">Email address</label>
                <input
                  id="m-email"
                  className="modal-input"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={change}
                  required
                />
              </div>

              <div className="modal-field">
                <label className="modal-label" htmlFor="m-concern">Your concern</label>
                <textarea
                  id="m-concern"
                  className="modal-input modal-textarea"
                  name="concern"
                  placeholder="Briefly describe your symptoms or what you'd like to discuss..."
                  value={form.concern}
                  onChange={change}
                  rows={2}
                />
              </div>

              {errorMsg && <p className="modal-error">{errorMsg}</p>}

              <button type="submit" className="btn modal-submit" disabled={isLoading}>
                {status === "loading" ? "Preparing payment…" : status === "paying" ? "Opening checkout…" : "Pay Rs.800 & Book Slot"}
              </button>
              <p className="modal-fine">Secure payment via Razorpay · UPI / Card / NetBanking</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
