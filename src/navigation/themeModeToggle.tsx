import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import {IconButton, Tooltip} from '@mui/material'
import {type FunctionComponent, useContext} from 'react'
import {ThemeModeContext} from '@/context/themeModeContext.tsx'

const ThemeModeToggle: FunctionComponent = () => {
  const {mode, toggleMode} = useContext(ThemeModeContext)
  const label = mode === 'light' ? 'Schakel naar donkere modus' : 'Schakel naar lichte modus'

  return (
    <Tooltip title={label}>
      <IconButton color="inherit" aria-label={label} onClick={toggleMode}>
        {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Tooltip>
  )
}

export default ThemeModeToggle
