import { NavLink, Outlet } from 'react-router-dom'
import { AppBar, Toolbar, Button, Container, Box } from '@mui/material'

// NavLink agrega la clase "active" al enlace de la página actual.
const linkSx = {
  color: 'inherit',
  '&.active': { borderBottom: '2px solid currentColor' },
}

export default function Layout() {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <AppBar position='static'>
        <Toolbar>
          <Button component={NavLink} to='/' end sx={linkSx}>Home</Button>
          <Button component={NavLink} to='/about' sx={linkSx}>About</Button>
          <Button component={NavLink} to='/tasks' sx={linkSx}>Tasks</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth='md' sx={{ py: 4 }}>
        <Outlet />   {/* aquí entra cada página */}
      </Container>
    </Box>
  )
}
