function TaskItem({ task, onUnsupportedAction }) {
  return (
    <li className="task-row">
      <button
        className={`task-checkbox${task.completed ? ' checked' : ''}`}
        type="button"
        onClick={() => onUnsupportedAction('Updating task status will be available when the backend adds a PATCH endpoint.')}
        aria-label={`${task.completed ? 'Mark pending' : 'Mark completed'}: ${task.title}`}
        title="Status updates require backend support"
      >
        {task.completed ? '✓' : ''}
      </button>
      <div className="task-main">
        <strong className={task.completed ? 'task-complete' : ''}>{task.title}</strong>
        <span>Task ID: #{task.id}</span>
      </div>
      <span className={`status-badge ${task.completed ? 'status-completed' : 'status-pending'}`}>
        <span className="status-dot" /> {task.completed ? 'Completed' : 'Pending'}
      </span>
      <button
        className="delete-button"
        type="button"
        onClick={() => onUnsupportedAction('Deleting tasks will be available when the backend adds a DELETE endpoint.')}
        aria-label={`Delete ${task.title}`}
        title="Deletion requires backend support"
      >⌫</button>
    </li>
  )
}

export default TaskItem
