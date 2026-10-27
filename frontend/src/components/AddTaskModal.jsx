import { useEffect, useRef, useState } from 'react'

function AddTaskModal({ isOpen, isSaving, onClose, onSubmit }) {
  const [title, setTitle] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setTitle('')
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [isOpen])

  if (!isOpen) return null

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit(title)
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="add-task-title">
        <div className="modal-heading">
          <div className="modal-icon">+</div>
          <button className="modal-close" type="button" onClick={onClose} aria-label="Close modal">×</button>
          <h2 id="add-task-title">Create a new task</h2>
          <p>Add a learning milestone to your workspace.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="new-task-title">Task title</label>
          <input ref={inputRef} id="new-task-title" value={title} onChange={(event) => setTitle(event.target.value)} maxLength={120} placeholder="e.g. Build a Kubernetes deployment" />
          <div className="modal-actions">
            <button className="secondary-button" type="button" onClick={onClose}>Cancel</button>
            <button className="primary-button" type="submit" disabled={isSaving}>{isSaving ? 'Creating…' : 'Create task'}</button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default AddTaskModal
