import {CssBaseline, createTheme, type PaletteMode, ThemeProvider} from '@mui/material'
import {createContext, type FunctionComponent, type PropsWithChildren, useMemo, useState} from 'react'

interface IThemeModeContext {
  mode: PaletteMode
  toggleMode: () => void
}

export const ThemeModeContext = createContext<IThemeModeContext>({
  mode: 'light',
  toggleMode: () => {},
})

const ThemeModeProvider: FunctionComponent<PropsWithChildren> = ({children}) => {
  const [mode, setMode] = useState<PaletteMode>('light')

  const toggleMode = (): void => {
    setMode(oldMode => (oldMode === 'light' ? 'dark' : 'light'))
  }

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {main: mode === 'light' ? '#4e7837' : '#81b64c'},
          secondary: {main: '#b58863'},
          background:
            mode === 'light' ? {default: '#f4f1ea', paper: '#ffffff'} : {default: '#1f1e1b', paper: '#2b2a27'},
        },
        shape: {borderRadius: 10},
        typography: {
          h1: {fontWeight: 800},
          h2: {fontWeight: 700},
          h3: {fontWeight: 700},
        },
      }),
    [mode],
  )

  return (
    <ThemeModeContext value={{mode, toggleMode}}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext>
  )
}

export default ThemeModeProvider
