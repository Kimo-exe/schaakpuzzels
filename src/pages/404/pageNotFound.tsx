import {Button, Paper, Typography} from '@mui/material'
import {type FunctionComponent, useEffect, useState} from 'react'
import {Link, Navigate} from 'react-router'

const REDIRECT_SECONDS = 10

const PageNotFound: FunctionComponent = () => {
  const [secondsLeft, setSecondsLeft] = useState<number>(REDIRECT_SECONDS)

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft(oldSeconds => oldSeconds - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (secondsLeft <= 0) {
    return <Navigate to={'/'} replace />
  }

  return (
    <Paper sx={{p: 6, textAlign: 'center'}}>
      <Typography variant="h1" sx={{fontSize: 96}}>
        ♚
      </Typography>
      <Typography variant="h4" component="h1" gutterBottom>
        404 - Deze zet is illegaal
      </Typography>
      <Typography color="text.secondary" sx={{mb: 3}}>
        Deze pagina bestaat niet. Je wordt over {secondsLeft} seconden teruggestuurd naar de homepagina.
      </Typography>
      <Button component={Link} to="/" variant="contained">
        Nu terug naar home
      </Button>
    </Paper>
  )
}

export default PageNotFound
