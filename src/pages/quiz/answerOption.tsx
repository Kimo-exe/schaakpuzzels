import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import {Button} from '@mui/material'
import type {FunctionComponent} from 'react'

export type AnswerState = 'idle' | 'correct' | 'wrong' | 'dimmed'

interface AnswerOptionProps {
  label: string
  state: AnswerState
  disabled: boolean
  onSelect: () => void
}

const AnswerOption: FunctionComponent<AnswerOptionProps> = ({label, state, disabled, onSelect}) => {
  const color = state === 'correct' ? 'success' : state === 'wrong' ? 'error' : 'primary'
  const icon = state === 'correct' ? <CheckCircleIcon /> : state === 'wrong' ? <CancelIcon /> : undefined

  return (
    <Button
      fullWidth
      size="large"
      variant={state === 'correct' || state === 'wrong' ? 'contained' : 'outlined'}
      color={color}
      endIcon={icon}
      onClick={onSelect}
      sx={{
        justifyContent: 'space-between',
        textAlign: 'left',
        textTransform: 'none',
        opacity: state === 'dimmed' ? 0.6 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
      }}
    >
      {label}
    </Button>
  )
}

export default AnswerOption
