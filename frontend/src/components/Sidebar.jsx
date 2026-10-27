const navigation = [
  { id: 'dashboard', label: 'Dashboard', icon: '▦' },
  { id: 'all', label: 'All Tasks', icon: '☷' },
  { id: 'completed', label: 'Completed', icon: '✓' },
  { id: 'pending', label: 'Pending', icon: '◷' },
  { id: 'settings', label: 'Settings', icon: '⚙' },
]

function Sidebar({ activeView, onNavigate, isOpen, onClose }) {
  return (
    <aside className={`sidebar${isOpen ? ' sidebar-open' : ''}`}>
      <div className="brand">
        <div className="brand-mark">T</div>
        <div>
          <strong>Taskflow</strong>
          <span>DevOps workspace</span>
        </div>
        <button className="mobile-close" type="button" onClick={onClose} aria-label="Close navigation">×</button>
      </div>

      <nav aria-label="Primary navigation">
        <p className="nav-label">Workspace</p>
        {navigation.map((item) => (
          <button
            className={`nav-item${activeView === item.id ? ' active' : ''}`}
            key={item.id}
            type="button"
            onClick={() => {
              onNavigate(item.id)
              onClose()
            }}
          >
            <span className="nav-icon" aria-hidden="true">{item.icon}</span>
            {item.label}
            {item.id === 'pending' && <span className="nav-count">!</span>}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="avatar">JD</div>
        <div className="profile-copy">
          <strong>Jordan Davis</strong>
          <span>Learning mode</span>
        </div>
        <span className="online-dot" aria-label="Online" />
      </div>
    </aside>
  )
}

export default Sidebar
