import { createTheme } from '@mui/material/styles'
 
const theme = createTheme({
  palette: {
    primary:    { main: '#6d1f8c' },   // morado
    secondary:  { main: '#0b2ab6' },   // azul
    background: { default: '#9b9b9d' } // gris de fondo
  },
  shape: { borderRadius: 8 },
  typography: {
    // sin esto, MUI pone los botones en MAYÚSCULAS
    button: { textTransform: 'none', fontWeight: 600 }
  }
})
 
export default theme
