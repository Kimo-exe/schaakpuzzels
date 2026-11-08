import {Box, CircularProgress, Typography} from '@mui/material'
import type {FunctionComponent} from 'react'

interface LoadingProps {
  message?: string
}

const Loading: FunctionComponent<LoadingProps> = ({message = 'Bezig met laden...'}) => {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, py: 6}}>
      <CircularProgress />
      <Typography color="text.secondary">{message}</Typography>
    </Box>
  )
}

export default Loading
