import { useState } from 'react'
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

export default function EditTask({ items, loading, onUpdate }) {
  const { id } = useParams() // Los parámetros de ruta llegan como texto.
  const navigate = useNavigate()

  // La comparación es numérica, por eso se convierte el parámetro de ruta.
  const task = items.find((item) => item.id === Number(id))

  const [title, setTitle] = useState(task ? task.title : '')
  const [description, setDescription] = useState(task ? task.description : '')
  const [titleError, setTitleError] = useState(false)

  // Los datos llegan mediante fetch, por eso el formulario se rellena cuando están disponibles.

  if (loading) return <CircularProgress />

  if (!task) {
    return (
      <Alert
        severity="warning"
        action={
          <Button color="inherit" size="small" component={RouterLink} to="/tasks">
            Back
          </Button>
        }
      >
        Task with id {id} was not found.
      </Alert>
    )
  }

  function save() {
    if (!title.trim()) {
      setTitleError(true)
      return
    }

    onUpdate(Number(id), {
      title: title.trim(),
      description: description.trim(),
    })
    navigate('/tasks')
  }

  return (
    <Paper sx={{ p: 3, maxWidth: 560 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Edit task
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Title"
          value={title}
          error={titleError}
          helperText={titleError ? 'Title is required' : ' '}
          onChange={(e) => {
            setTitle(e.target.value)
            setTitleError(false)
          }}
        />

        <TextField
          label="Description"
          value={description}
          multiline
          minRows={3}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Stack direction="row" spacing={1}>
          <Button variant="contained" onClick={save}>
            Save changes
          </Button>
          <Button onClick={() => navigate('/tasks')}>Cancel</Button>
        </Stack>
      </Stack>
    </Paper>
  )
}
