import { connection } from "next/server";
import Image from "next/image";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";

export const metadata = {
  title: "Payment Dashboard - Marina's Clinic",
};

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(value);
}

function formatAmount(amount: number, currency: string) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount / 100);
}

function statusClass(status: string) {
  const normalized = status.toLowerCase();
  if (normalized === "captured" || normalized === "paid") return "ok";
  if (isFailed(status)) return "bad";
  return "wait";
}

function isCaptured(status: string) {
  const normalized = status.toLowerCase();
  return normalized === "captured" || normalized === "paid";
}

function isFailed(status: string) {
  const normalized = status.toLowerCase();
  return normalized.includes("fail") || normalized.includes("abandon");
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  await connection();
  const { status = "all" } = await searchParams;

  const hasDatabase = isDatabaseConfigured();
  let databaseError = "";
  const payments = hasDatabase
    ? await prisma.paymentRecord.findMany({
        orderBy: { createdAt: "desc" },
        take: 100,
      }).catch((error: unknown) => {
        const message = error instanceof Error ? error.message : "";
        databaseError = message.includes("Can't reach database server")
          ? "Could not reach the PostgreSQL server."
          : "Could not connect to PostgreSQL.";
        return [];
      })
    : [];

  const total = payments.length;
  const captured = payments.filter((payment) => isCaptured(payment.paymentStatus)).length;
  const failed = payments.filter((payment) => isFailed(payment.paymentStatus)).length;
  const leads = payments.filter((payment) => !isCaptured(payment.paymentStatus) && !isFailed(payment.paymentStatus)).length;
  const filteredPayments = payments.filter((payment) => {
    if (status === "captured") return isCaptured(payment.paymentStatus);
    if (status === "failed") return isFailed(payment.paymentStatus);
    if (status === "leads") return !isCaptured(payment.paymentStatus) && !isFailed(payment.paymentStatus);
    return true;
  });
  const filterLinks = [
    ["all", "All", total],
    ["captured", "Captured", captured],
    ["failed", "Failed", failed],
    ["leads", "Leads", leads],
  ] as const;

  return (
    <main className="dash">
      <style>{`
        .dash { min-height:100vh; background:#f4fbfb; color:#163030; padding:24px; font-family:var(--font-inter), Arial, sans-serif; }
        .dash-shell { max-width:1280px; margin:0 auto; }
        .dash-head { display:flex; align-items:center; justify-content:space-between; gap:16px; margin-bottom:20px; }
        .dash-brand { display:flex; align-items:center; gap:14px; }
        .dash-logo { width:64px; height:64px; border-radius:8px; background:#fff; border:1px solid rgba(22,48,48,0.12); display:flex; align-items:center; justify-content:center; padding:8px; }
        .dash-title h1 { margin:0 0 6px; font-size:28px; line-height:1.1; font-family:var(--font-fraunces), serif; }
        .dash-title p { margin:0; color:#557070; font-size:14px; }
        .dash-actions { display:flex; gap:10px; flex-wrap:wrap; }
        .dash-btn { border:1px solid rgba(22,48,48,0.16); background:#fff; color:#126e6e; border-radius:8px; padding:10px 14px; text-decoration:none; font-size:13px; font-weight:700; }
        .dash-btn.primary { background:#126e6e; color:#fff; border-color:#126e6e; }
        .metrics { display:grid; grid-template-columns:repeat(4, minmax(0, 1fr)); gap:12px; margin-bottom:16px; }
        .metric { background:#fff; border:1px solid rgba(22,48,48,0.1); border-radius:8px; padding:14px 16px; }
        .metric span { display:block; font-size:12px; color:#557070; margin-bottom:8px; }
        .metric b { display:block; font-size:24px; }
        .filters { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:14px; }
        .filter { display:inline-flex; align-items:center; gap:8px; border:1px solid rgba(22,48,48,0.14); background:#fff; color:#244242; text-decoration:none; border-radius:8px; padding:9px 12px; font-size:13px; font-weight:700; }
        .filter.active { background:#163030; border-color:#163030; color:#fff; }
        .filter small { font-size:12px; color:inherit; opacity:0.8; }
        .table-wrap { overflow:auto; border:1px solid rgba(22,48,48,0.12); border-radius:8px; background:#fff; }
        table { width:100%; border-collapse:collapse; min-width:1180px; }
        th, td { padding:12px 14px; border-bottom:1px solid rgba(22,48,48,0.08); text-align:left; vertical-align:top; font-size:13px; }
        th { background:#e3f9f9; color:#244242; font-size:12px; text-transform:uppercase; letter-spacing:0.04em; white-space:nowrap; }
        td { color:#244242; }
        .muted { color:#6a8383; }
        .mono { font-family:ui-monospace, SFMono-Regular, Consolas, monospace; font-size:12px; }
        .status { display:inline-flex; border-radius:999px; padding:5px 9px; font-size:12px; font-weight:800; text-transform:capitalize; }
        .status.ok { color:#0a6652; background:#dff8ef; }
        .status.wait { color:#7b5800; background:#fff4cf; }
        .status.bad { color:#9a1f1f; background:#ffe0e0; }
        .empty { background:#fff; border:1px solid rgba(22,48,48,0.1); border-radius:8px; padding:40px 24px; text-align:center; color:#557070; }
        .setup { background:#fff; border:1px solid rgba(22,48,48,0.12); border-left:4px solid #42c8c8; border-radius:8px; padding:20px; color:#244242; }
        .setup h2 { margin:0 0 8px; font-size:18px; }
        .setup p { margin:0 0 12px; color:#557070; line-height:1.6; }
        .setup code { display:block; white-space:pre-wrap; background:#f4fbfb; border:1px solid rgba(22,48,48,0.1); border-radius:8px; padding:12px; color:#163030; }
        @media (max-width:760px) {
          .dash { padding:16px; }
          .dash-head { align-items:flex-start; flex-direction:column; }
          .dash-brand { align-items:flex-start; }
          .metrics { grid-template-columns:1fr; }
        }
      `}</style>

      <div className="dash-shell">
        <div className="dash-head">
          <div className="dash-brand">
            <div className="dash-logo">
              <Image
                src="https://res.cloudinary.com/dthj7fakc/image/upload/v1781681465/logo-marinas_lm71bk.png"
                alt="Marina's Clinic"
                width={48}
                height={48}
                style={{ width: "100%", height: "auto" }}
                priority
              />
            </div>
            <div className="dash-title">
              <h1>Payment Dashboard</h1>
              <p>Latest Razorpay orders and verified payment details from PostgreSQL.</p>
            </div>
          </div>
          <div className="dash-actions">
            <a className="dash-btn primary" href="/dashboard">Refresh</a>
            <a className="dash-btn" href="/">Home</a>
            <a className="dash-btn" href="/api/submissions">Download CSV</a>
          </div>
        </div>

        <section className="metrics" aria-label="Payment summary">
          <div className="metric">
            <span>Total records</span>
            <b>{total}</b>
          </div>
          <div className="metric">
            <span>Captured</span>
            <b>{captured}</b>
          </div>
          <div className="metric">
            <span>Failed</span>
            <b>{failed}</b>
          </div>
          <div className="metric">
            <span>Leads</span>
            <b>{leads}</b>
          </div>
        </section>

        <nav className="filters" aria-label="Payment filters">
          {filterLinks.map(([key, label, count]) => (
            <a key={key} className={`filter ${status === key ? "active" : ""}`} href={key === "all" ? "/dashboard" : `/dashboard?status=${key}`}>
              {label} <small>{count}</small>
            </a>
          ))}
        </nav>

        {!hasDatabase || databaseError ? (
          <div className="setup">
            <h2>PostgreSQL is not connected yet</h2>
            <p>Add a reachable PostgreSQL connection string to .env, restart the dev server, then apply the Prisma migration.</p>
            {databaseError && <p>Current database status: {databaseError}</p>}
            <code>{`DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"\n\nnpm run prisma:migrate\nnpm run prisma:generate`}</code>
          </div>
        ) : filteredPayments.length === 0 ? (
          <div className="empty">No Razorpay payment records found yet.</div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Form Name</th>
                  <th>Patient</th>
                  <th>Phone</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Method</th>
                  <th>Razorpay Order</th>
                  <th>Payment ID</th>
                  <th>Concern</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{formatDate(payment.createdAt)}</td>
                    <td>
                      <b>{payment.formName}</b>
                      <div className="muted">{payment.source}</div>
                    </td>
                    <td>
                      <b>{payment.name}</b>
                      {payment.email && <div className="muted">{payment.email}</div>}
                    </td>
                    <td>{payment.phone}</td>
                    <td>{formatAmount(payment.amount, payment.currency)}</td>
                    <td><span className={`status ${statusClass(payment.paymentStatus)}`}>{payment.paymentStatus}</span></td>
                    <td>{payment.razorpayMethod || <span className="muted">Not paid</span>}</td>
                    <td className="mono">{payment.razorpayOrderId}</td>
                    <td className="mono">{payment.razorpayPaymentId || <span className="muted">Pending</span>}</td>
                    <td>{payment.concern || <span className="muted">Not shared</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
