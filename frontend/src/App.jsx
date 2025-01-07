import AppNavigator from "./navigation/AppNavigator"
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Design } from './Theme'
import {  QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {

  const ThemeMode = createTheme(Design("light"));
  const queryClient = new QueryClient()
  
  return (
    <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={ThemeMode}>
      <CssBaseline />
      <AppNavigator/>
    </ThemeProvider>
  </QueryClientProvider>
  )
}

export default App
