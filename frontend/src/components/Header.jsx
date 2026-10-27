function Header({ title, onAddTask, onOpenMenu, isHealthy, search, onSearch }) {
  return (
    <header className="page-header">
      <button className="mobile-menu" type="button" onClick={onOpenMenu} aria-label="Open navigation">☰</button>
      <div>
        <p className="breadcrumb">Workspace / <span>Tasks</span></p>
        <h1>{title}</h1>
      </div>
      <div className="header-actions">
        <div className={`health-pill${isHealthy ? ' healthy' : ''}`} title="Backend health status">
          <span className="health-dot" />
          {isHealthy ? 'API connected' : 'API offline'}
        </div>
        <label className="search-box">
          <span aria-hidden="true">⌕</span>
          <input value={search} onChange={(event) => onSearch(event.target.value)} placeholder="Search tasks..." aria-label="Search tasks" />
          <kbd>⌘ K</kbd>
        </label>
        <button className="primary-button" type="button" onClick={onAddTask}><span>+</span> Add task</button>
      </div>
    </header>
  )
}

export default Header
