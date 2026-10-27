const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
const REQUEST_BASE = !import.meta.env.VITE_API_URL && import.meta.env.DEV ? '/api' : API_URL

async function request(path, options = {}) {
  const response = await fetch(`${REQUEST_BASE}${path}`, {
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
    ...options,
  })

  let payload = null
  try {
    payload = await response.json()
  } catch {
    // Empty responses are handled by the status check below.
  }

  if (!response.ok) {
    throw new Error(payload?.error || `Request failed with status ${response.status}.`)
  }

  return payload
}

export const api = {
  getHealth: () => request('/health'),
  getTasks: () => request('/tasks'),
  createTask: (title) => request('/tasks', {
    method: 'POST',
    body: JSON.stringify({ title }),
  }),
  updateTask: (id, updates) => request(`/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  }),
  deleteTask: (id) => request(`/tasks/${id}`, {
    method: 'DELETE',
  }),
}

