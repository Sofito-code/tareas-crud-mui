// hooks/useCrud.js
// Un CRUD en memoria cuyos datos iniciales llegan mediante fetch.
// Hoy fetch lee un archivo .json; mañana puede leer una API cambiando la URL.
import { useEffect, useState } from 'react'

export function useCrud(url) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 1. Cargar los datos iniciales.
  useEffect(() => {
    const control = new AbortController()

    async function load() {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(url, { signal: control.signal })
        if (!res.ok) throw new Error(`Could not load ${url} (${res.status})`)

        const data = await res.json()
        // Nos aseguramos de que cada elemento tenga un id numérico.
        setItems(data.map((item, index) => ({ ...item, id: Number(item.id ?? index + 1) })))
      } catch (e) {
        if (e.name !== 'AbortError') setError(e.message)
      } finally {
        if (!control.signal.aborted) setLoading(false)
      }
    }

    load()
    return () => control.abort()
  }, [url])

  // 2. Las tres operaciones del CRUD viven actualmente en memoria.

  const create = (newItem) => {
    const id = items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1
    setItems([...items, { ...newItem, id }])
    return id
  }

  const update = (id, data) =>
    setItems(items.map((item) => (item.id === id ? { ...item, ...data } : item)))

  const remove = (id) => setItems(items.filter((item) => item.id !== id))

  return { items, create, update, remove, loading, error }
}
