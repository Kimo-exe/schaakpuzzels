import {QueryErrorResetBoundary} from '@tanstack/react-query'
import {type FunctionComponent, type PropsWithChildren, Suspense} from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import ErrorFallback from '@/components/errorFallback.tsx'
import Loading from '@/components/loading.tsx'

interface QueryBoundaryProps extends PropsWithChildren {
  loadingMessage?: string
}

/**
 * Combineert Suspense en een ErrorBoundary zodat "Opnieuw proberen" de mislukte query opnieuw uitvoert.
 */
const QueryBoundary: FunctionComponent<QueryBoundaryProps> = ({children, loadingMessage}) => {
  return (
    <QueryErrorResetBoundary>
      {({reset}) => (
        <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
          <Suspense fallback={<Loading message={loadingMessage} />}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}

export default QueryBoundary
