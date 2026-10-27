function StatCard({ label, value, helper, tone, icon }) {
  return (
    <article className={`stat-card ${tone}`}>
      <div className="stat-topline">
        <span>{label}</span>
        <span className="stat-icon" aria-hidden="true">{icon}</span>
      </div>
      <strong>{value}</strong>
      <small>{helper}</small>
    </article>
  )
}

export default StatCard
