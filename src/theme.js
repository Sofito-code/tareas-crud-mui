import { createTheme } from '@mui/material/styles'

// Los mismos colores del material del curso mantienen la plantilla consistente.
const theme = createTheme({
  palette: {
    primary: { main: '#6d1f8c' },
    secondary: { main: '#0b2ab6' },
    background: { default: '#F5F6FA' },
  },
  shape: { borderRadius: 8 },
  typography: {
    // MUI usa botones en mayúsculas por defecto; mantenemos su capitalización natural.
    button: { textTransform: 'none', fontWeight: 600 },
  },
})

export default theme
