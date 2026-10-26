import { Link as RouterLink } from 'react-router-dom'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

export default function Home() {
  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Home
      </Typography>

      <Typography sx={{ mb: 2 }}>
        A minimal CRUD template with <strong>React Router</strong> and{' '}
        <strong>Material UI</strong>: three static pages and a task resource with
        listing, creation, editing, and confirmed deletion.
      </Typography>

      <Typography sx={{ mb: 3 }} color="text.secondary">
        Tasks live in <code>App</code>, not inside the pages, so they persist while you
        navigate. They are loaded once with <code>fetch</code> from{' '}
        <code>public/data/tasks.json</code>.
      </Typography>

      <Button variant="contained" component={RouterLink} to="/tasks">
        View tasks
      </Button>
    </Paper>
  )
}
