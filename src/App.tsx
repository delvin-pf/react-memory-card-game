import './App.css'
import { useTheme } from './states/theme'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Page } from './Components/Page'

export default function App () {
  const [isDark, toggleTheme] = useTheme(theme => [theme.isDark, theme.toogle])
  const theme = createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light'
    }
  })

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Page toogleTheme={toggleTheme} />
      </ThemeProvider>
    </>
  )
}
