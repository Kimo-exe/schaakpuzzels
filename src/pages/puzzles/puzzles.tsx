import ExtensionIcon from '@mui/icons-material/Extension'
import type {FunctionComponent} from 'react'
import PageHeader from '@/components/pageHeader.tsx'
import QueryBoundary from '@/components/queryBoundary.tsx'
import PuzzleFilterProvider from '@/context/puzzleFilterContext.tsx'
import PuzzleFilters from '@/pages/puzzles/puzzleFilters.tsx'
import PuzzleOverview from '@/pages/puzzles/puzzleOverview.tsx'

const Puzzles: FunctionComponent = () => {
  return (
    <PuzzleFilterProvider>
      <PageHeader
        title="Puzzelcollectie"
        subtitle="Je collectie start met de puzzel van de dag en een willekeurige puzzel. Laad extra puzzels in, filter ze en klik op een puzzel om de oplossing te bekijken."
        icon={<ExtensionIcon fontSize="large" color="primary" />}
      />
      <PuzzleFilters />
      <QueryBoundary loadingMessage="Puzzels ophalen bij Chess.com...">
        <PuzzleOverview />
      </QueryBoundary>
    </PuzzleFilterProvider>
  )
}

export default Puzzles
