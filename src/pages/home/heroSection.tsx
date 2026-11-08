import {Box, Button, Paper, Stack, Typography} from '@mui/material'
import type {FunctionComponent} from 'react'
import {Link} from 'react-router'

const HeroSection: FunctionComponent = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: {xs: 4, md: 6},
        mb: 5,
        color: 'common.white',
        background: 'linear-gradient(135deg, #3b5a2a 0%, #769656 60%, #b58863 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        aria-hidden
        sx={{position: 'absolute', right: {xs: -40, md: 24}, bottom: -40, fontSize: 220, opacity: 0.15, lineHeight: 1}}
      >
        ♛
      </Box>
      <Typography variant="overline" sx={{letterSpacing: 2}}>
        Schaakpuzzels voor elke dag
      </Typography>
      <Typography variant="h2" component="h1" sx={{mb: 2}}>
        Zet &amp; Mat
      </Typography>
      <Typography variant="h6" component="p" sx={{maxWidth: 600, mb: 4, fontWeight: 400}}>
        Train je tactisch inzicht met echte puzzels van Chess.com, verzamel je favorieten en test je schaakkennis.
      </Typography>
      <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
        <Button component={Link} to="/puzzels" variant="contained" color="secondary" size="large">
          Begin met puzzelen
        </Button>
        <Button component={Link} to="/quiz" variant="outlined" color="inherit" size="large">
          Doe de quiz
        </Button>
      </Stack>
    </Paper>
  )
}

export default HeroSection
