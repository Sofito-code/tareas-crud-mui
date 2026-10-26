import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

export default function CreateTask({ onCreate }) {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [titleError, setTitleError] = useState(false)

  function save() {
    if (!title.trim()) {
      setTitleError(true)
      return
    }

    onCreate({ title: title.trim(), description: description.trim() })
    // navigate() se usa porque la navegación es consecuencia de una acción, no de un clic en un enlace.
    navigate('/tasks')
  }

  return (
    <Paper sx={{ p: 3, maxWidth: 560 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        New task
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
            Save
          </Button>
          <Button onClick={() => navigate('/tasks')}>Cancel</Button>
        </Stack>
      </Stack>
    </Paper>
  )
}
