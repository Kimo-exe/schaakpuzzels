import {Alert, AlertTitle, Button} from '@mui/material'
import type {FunctionComponent} from 'react'
import type {FallbackProps} from 'react-error-boundary'

const ErrorFallback: FunctionComponent<FallbackProps> = ({error, resetErrorBoundary}) => {
  const message = error instanceof Error ? error.message : 'Er ging iets mis.'

  return (
    <Alert
      severity="error"
      action={
        <Button color="inherit" size="small" onClick={resetErrorBoundary}>
          Opnieuw proberen
        </Button>
      }
    >
      <AlertTitle>Oeps, de data kon niet geladen worden</AlertTitle>
      {message}
    </Alert>
  )
}

export default ErrorFallback
