"use client";

import Image from "next/image";

export default function SupportNavbar() {
  return (
    <>
      <style>{`
        .snav { position:sticky; top:0; z-index:50; width:100%; border-bottom:1px solid rgba(22,48,48,0.1); background:rgba(255,255,255,0.95); backdrop-filter:blur(12px); }
        .snav-inner { max-width:1080px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; padding:15px 16px; }
        .snav-btn { display:inline-flex; align-items:center; background:#42c8c8; color:#fff; border:none; border-radius:99px; padding:9px 20px; font-size:13px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; text-decoration:none; box-shadow:0 6px 20px rgba(18,110,110,0.28); transition:background 0.2s,transform 0.2s; white-space:nowrap; }
        .snav-btn:hover { background:#126e6e; transform:translateY(-1px); }
        @media (min-width:640px) { .snav-inner { padding:12px 24px; } .snav-btn { padding:10px 24px; font-size:14px; } }
      `}</style>
      <nav className="snav">
        <div className="snav-inner">
          <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <Image
              src="https://res.cloudinary.com/dthj7fakc/image/upload/v1781681465/logo-marinas_lm71bk.png"
              alt="Marina's Clinic"
              width={150}
              height={82}
              priority
              style={{ height: 64, width: "auto" }}
            />
          </a>
          <a href="/" className="snav-btn">
            Book Consultation
          </a>
        </div>
      </nav>
    </>
  );
}
