const stats = [
  { value: "5,000+", label: "Happy Patients" },
  { value: "1,000+", label: "Online Appointments" },
  { value: "12+", label: "Years Of Experience" },
  { value: "15+", label: "Doctors and Staff" },
];

export function StatsBanner() {
  return (
    <section className="stats-banner" aria-label="Clinic statistics">
      <div className="stats-banner-grid">
        {stats.map((stat) => (
          <div className="stats-banner-item" key={stat.label}>
            <div className="stats-banner-value">{stat.value}</div>
            <div className="stats-banner-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
