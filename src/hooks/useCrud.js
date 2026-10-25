import { useEffect, useState } from 'react'

export default function useCrud(url) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const control = new AbortController()
    async function load() {
      try {
        const res = await fetch(url, { signal: control.signal })
        if (!res.ok) throw new Error(`Could not load (${res.status})`)
        const data = await res.json()
        setItems(data.map((item, i) => ({ ...item, id: Number(item.id ?? i + 1) })))
      } catch (e) {
        if (e.name !== 'AbortError') setError(e.message)
      } finally {
        if (!control.signal.aborted) setLoading(false)
      }
    }
    load()
    return () => control.abort()    // al desmontar, cancelar
  }, [url])
 
  const create = (nuevo) => {
    const id = items.length
      ? Math.max(...items.map((i) => i.id)) + 1
      : 1;
    setItems([...items, { ...nuevo, id }]);
  };
 
  const update = (id, datos) =>
    setItems(items.map((i) =>
      i.id === id ? { ...i, ...datos } : i));
 
  const remove = (id) =>
    setItems(items.filter((i) => i.id !== id));

  return { items, create, update, remove, loading, error }
}
