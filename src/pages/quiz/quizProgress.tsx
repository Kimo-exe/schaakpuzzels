import {Box, LinearProgress, Stack, Typography} from '@mui/material'
import type {FunctionComponent} from 'react'

interface QuizProgressProps {
  current: number
  total: number
  score: number
}

const QuizProgress: FunctionComponent<QuizProgressProps> = ({current, total, score}) => {
  return (
    <Box sx={{mb: 3}}>
      <Stack direction="row" sx={{justifyContent: 'space-between', mb: 1}}>
        <Typography>
          Vraag {current} van {total}
        </Typography>
        <Typography sx={{fontWeight: 700}}>Score: {score}</Typography>
      </Stack>
      <LinearProgress variant="determinate" value={(current / total) * 100} sx={{height: 8, borderRadius: 4}} />
    </Box>
  )
}

export default QuizProgress
