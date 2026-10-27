function TaskItem({ task, onToggleTask, onDeleteTask }) {
  const taskId = task.id || task._id;

  return (
    <li className="task-row">
      <button
        className={`task-checkbox${task.completed ? ' checked' : ''}`}
        type="button"
        onClick={() => onToggleTask(task)}
        aria-label={`${task.completed ? 'Mark pending' : 'Mark completed'}: ${task.title}`}
        title={task.completed ? 'Mark pending' : 'Mark completed'}
      >
        {task.completed ? '✓' : ''}
      </button>
      <div className="task-main">
        <strong className={task.completed ? 'task-complete' : ''}>{task.title}</strong>
        <span>Task ID: #{taskId}</span>
      </div>
      <span className={`status-badge ${task.completed ? 'status-completed' : 'status-pending'}`}>
        <span className="status-dot" /> {task.completed ? 'Completed' : 'Pending'}
      </span>
      <button
        className="delete-button"
        type="button"
        onClick={() => onDeleteTask(taskId)}
        aria-label={`Delete ${task.title}`}
        title="Delete task"
      >⌫</button>
    </li>
  )
}

export default TaskItem
