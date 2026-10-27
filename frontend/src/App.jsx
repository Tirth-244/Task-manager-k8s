import { useEffect, useMemo, useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import StatCard from './components/StatCard'
import TaskList from './components/TaskList'
import AddTaskModal from './components/AddTaskModal'
import { api } from './services/api'
import './index.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [activeView, setActiveView] = useState('dashboard')
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isHealthy, setIsHealthy] = useState(false)
  const [toast, setToast] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  function showToast(message, type = 'success') {
    setToast({ message, type })
    window.setTimeout(() => setToast(null), 4200)
  }

  useEffect(() => {
    async function loadData() {
      try {
        const [health, taskData] = await Promise.all([api.getHealth(), api.getTasks()])
        setIsHealthy(health?.status === 'ok')
        setTasks(Array.isArray(taskData) ? taskData : [])
      } catch {
        showToast('Could not connect to the backend. Start the API on port 3000.', 'error')
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  async function handleCreateTask(title) {
    if (!title.trim()) {
      showToast('Task title is required.', 'error')
      return
    }
    setIsSaving(true)
    try {
      const task = await api.createTask(title.trim())
      setTasks((current) => [task, ...current])
      setIsModalOpen(false)
      showToast('Task created successfully.')
    } catch (error) {
      showToast(error.message, 'error')
    } finally {
      setIsSaving(false)
    }
  }

  async function handleToggleTask(task) {
    const id = task.id || task._id
    const updatedStatus = !task.completed
    try {
      const updated = await api.updateTask(id, { completed: updatedStatus })
      setTasks((current) =>
        current.map((t) => ((t.id || t._id) === id ? { ...t, ...updated } : t))
      )
      showToast(updatedStatus ? 'Task marked completed.' : 'Task marked pending.')
    } catch (error) {
      showToast(error.message || 'Failed to update task.', 'error')
    }
  }

  async function handleDeleteTask(id) {
    try {
      await api.deleteTask(id)
      setTasks((current) => current.filter((t) => (t.id || t._id) !== id))
      showToast('Task deleted successfully.')
    } catch (error) {
      showToast(error.message || 'Failed to delete task.', 'error')
    }
  }

  const completedTasks = tasks.filter((task) => task.completed)
  const pendingTasks = tasks.filter((task) => !task.completed)
  const visibleTasks = useMemo(() => tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'all' || (filter === 'completed' ? task.completed : !task.completed)
    return matchesSearch && matchesFilter
  }), [filter, search, tasks])

  function navigate(view) {
    setActiveView(view)
    if (view === 'completed' || view === 'pending' || view === 'all') setFilter(view)
  }

  const title = activeView === 'dashboard' ? 'Dashboard' : activeView === 'settings' ? 'Settings' : `${activeView[0].toUpperCase()}${activeView.slice(1)} tasks`

  return (
    <div className="app-layout">
      <Sidebar activeView={activeView} onNavigate={navigate} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="workspace">
        <Header title={title} onAddTask={() => setIsModalOpen(true)} onOpenMenu={() => setSidebarOpen(true)} isHealthy={isHealthy} search={search} onSearch={setSearch} />
        <main className="content">
          {activeView === 'settings' ? (
            <section className="settings-card"><h2>Settings</h2><p>Workspace preferences will be available in a future release.</p></section>
          ) : (
            <>
              <div className="welcome-row">
                <div><h2>Good morning, Jordan <span>👋</span></h2><p>Here&apos;s what&apos;s happening with your tasks today.</p></div>
                <span className="date-label">{new Intl.DateTimeFormat('en', { weekday: 'long', month: 'short', day: 'numeric' }).format(new Date())}</span>
              </div>
              <div className="stats-grid">
                <StatCard label="Total tasks" value={tasks.length} helper="Across your workspace" tone="blue" icon="☷" />
                <StatCard label="Completed" value={completedTasks.length} helper={tasks.length ? `${Math.round((completedTasks.length / tasks.length) * 100)}% of all tasks` : 'No tasks yet'} tone="green" icon="✓" />
                <StatCard label="Pending" value={pendingTasks.length} helper="Ready to be completed" tone="orange" icon="◷" />
              </div>
              <TaskList
                tasks={visibleTasks}
                filter={filter}
                onFilterChange={setFilter}
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
                isLoading={isLoading}
              />
            </>
          )}
        </main>
      </div>
      <AddTaskModal isOpen={isModalOpen} isSaving={isSaving} onClose={() => setIsModalOpen(false)} onSubmit={handleCreateTask} />
      {toast && <div className={`toast toast-${toast.type}`} role="status"><span>{toast.type === 'error' ? '!' : toast.type === 'info' ? 'i' : '✓'}</span>{toast.message}</div>}
    </div>
  )
}

export default App
