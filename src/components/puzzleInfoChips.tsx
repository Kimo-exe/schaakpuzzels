import {Chip, Stack} from '@mui/material'
import type {FunctionComponent} from 'react'
import type {IPuzzle} from '@/models/puzzle.ts'
import {getSideLabel} from '@/utils/puzzleUtils.ts'

interface PuzzleInfoChipsProps {
  puzzle: IPuzzle
}

const PuzzleInfoChips: FunctionComponent<PuzzleInfoChipsProps> = ({puzzle}) => {
  const {sideToMove, playerMoveCount, isMate} = puzzle

  return (
    <Stack direction="row" spacing={1} useFlexGap sx={{flexWrap: 'wrap'}}>
      <Chip
        size="small"
        label={getSideLabel(sideToMove)}
        variant={sideToMove === 'white' ? 'outlined' : 'filled'}
        color={sideToMove === 'white' ? 'default' : 'secondary'}
      />
      <Chip size="small" label={`${playerMoveCount} ${playerMoveCount === 1 ? 'zet' : 'zetten'}`} />
      {isMate && <Chip size="small" color="error" label="Mat" />}
    </Stack>
  )
}

export default PuzzleInfoChips
