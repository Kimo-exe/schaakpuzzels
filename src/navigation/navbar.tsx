import ExtensionIcon from '@mui/icons-material/Extension'
import HomeIcon from '@mui/icons-material/Home'
import QuizIcon from '@mui/icons-material/Quiz'
import {AppBar, Box, Container, Stack, Toolbar, Typography} from '@mui/material'
import type {FunctionComponent} from 'react'
import {Link} from 'react-router'
import NavButton from '@/navigation/navButton.tsx'
import ThemeModeToggle from '@/navigation/themeModeToggle.tsx'

const Navbar: FunctionComponent = () => {
  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{gap: 2, flexWrap: 'wrap'}}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{color: 'inherit', textDecoration: 'none', fontWeight: 800, mr: 2}}
          >
            ♞ Zet &amp; Mat
          </Typography>
          <Stack direction="row" spacing={1} component="nav">
            <NavButton to="/" label="Home" icon={<HomeIcon />} />
            <NavButton to="/puzzels" label="Puzzels" icon={<ExtensionIcon />} />
            <NavButton to="/quiz" label="Quiz" icon={<QuizIcon />} />
          </Stack>
          <Box sx={{flexGrow: 1}} />
          <ThemeModeToggle />
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
