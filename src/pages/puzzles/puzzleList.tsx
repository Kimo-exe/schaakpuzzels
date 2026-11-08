import {Alert, Grid} from '@mui/material'
import type {FunctionComponent} from 'react'
import type {IPuzzle} from '@/models/puzzle.ts'
import PuzzleCard from '@/pages/puzzles/puzzleCard.tsx'

interface PuzzleListProps {
  puzzles: IPuzzle[]
  onSelect: (puzzle: IPuzzle) => void
}

const PuzzleList: FunctionComponent<PuzzleListProps> = ({puzzles, onSelect}) => {
  if (puzzles.length === 0) {
    return <Alert severity="warning">Geen puzzels gevonden die aan je filters voldoen.</Alert>
  }

  const puzzleCards = puzzles.map(puzzle => (
    <Grid key={puzzle.id} size={{xs: 12, sm: 6, md: 4}}>
      <PuzzleCard puzzle={puzzle} onSelect={onSelect} />
    </Grid>
  ))

  return (
    <Grid container spacing={3}>
      {puzzleCards}
    </Grid>
  )
}

export default PuzzleList
