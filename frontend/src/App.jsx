import AppNavigator from "./navigation/AppNavigator"
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Design } from './Theme'

function App() {

  const ThemeMode = createTheme(Design("light"));

  return (
    <ThemeProvider theme={ThemeMode}>
      <CssBaseline />
      <AppNavigator/>
    </ThemeProvider>
  )
}

export default App
