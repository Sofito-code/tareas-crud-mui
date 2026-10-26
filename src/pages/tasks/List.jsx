import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

export default function TasksList({ items, loading, error, onDelete }) {
  // La tarea que espera confirmación en el diálogo (null significa cerrado).
  const [taskToDelete, setTaskToDelete] = useState(null)

  if (loading) return <CircularProgress />

  if (error) {
    return <Alert severity="error">Tasks could not be loaded: {error}</Alert>
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Tasks</Typography>
        <Button variant="contained" component={RouterLink} to="/tasks/create">
          New task
        </Button>
      </Box>

      {items.length === 0 ? (
        <Alert severity="info">There are no tasks yet. Create the first one.</Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Task</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      component={RouterLink}
                      to={`/tasks/edit/${task.id}`}
                    >
                      Edit
                    </Button>
                    <Button size="small" color="error" onClick={() => setTaskToDelete(task)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Eliminar solo necesita confirmación, no una página independiente. */}
      <Dialog open={Boolean(taskToDelete)} onClose={() => setTaskToDelete(null)}>
        <DialogTitle>Delete task?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are about to delete "{taskToDelete?.title}". This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTaskToDelete(null)}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              onDelete(taskToDelete.id)
              setTaskToDelete(null)
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
