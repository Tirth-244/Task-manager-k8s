import TaskItem from './TaskItem'

function TaskList({ tasks, filter, onFilterChange, onUnsupportedAction, isLoading }) {
  const filters = [
    { id: 'all', label: 'All tasks' },
    { id: 'pending', label: 'Pending' },
    { id: 'completed', label: 'Completed' },
  ]

  return (
    <section className="tasks-panel" aria-labelledby="task-list-title">
      <div className="panel-heading">
        <div>
          <h2 id="task-list-title">Your tasks</h2>
          <p>Keep your learning milestones moving forward.</p>
        </div>
        <div className="filter-tabs" role="tablist" aria-label="Task filters">
          {filters.map((item) => (
            <button
              className={filter === item.id ? 'selected' : ''}
              key={item.id}
              type="button"
              role="tab"
              aria-selected={filter === item.id}
              onClick={() => onFilterChange(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      {isLoading ? (
        <div className="empty-state">
          <div className="loading-spinner" aria-hidden="true" />
          <h3>Loading your tasks</h3>
          <p>Connecting to the task API…</p>
        </div>
      ) : tasks.length ? (
        <ul className="task-list">
          {tasks.map((task) => <TaskItem key={task.id} task={task} onUnsupportedAction={onUnsupportedAction} />)}
        </ul>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">⌕</div>
          <h3>No matching tasks</h3>
          <p>Try a different search or filter, or create a new task.</p>
        </div>
      )}
    </section>
  )
}

export default TaskList
