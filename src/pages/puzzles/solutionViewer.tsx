import {Box, Button, Chip, Stack, Typography} from '@mui/material'
import {type FunctionComponent, useState} from 'react'
import type {IPuzzle} from '@/models/puzzle.ts'
import {formatMoveLabel} from '@/utils/puzzleUtils.ts'

interface SolutionViewerProps {
  puzzle: IPuzzle
}

/**
 * Toont de oplossing zet per zet. Zetten van de speler aan zet krijgen de primaire kleur.
 */
const SolutionViewer: FunctionComponent<SolutionViewerProps> = ({puzzle}) => {
  const {moves, sideToMove} = puzzle
  const [revealedCount, setRevealedCount] = useState<number>(0)

  if (moves.length === 0) {
    return <Typography color="text.secondary">Voor deze puzzel is geen oplossing beschikbaar.</Typography>
  }

  const revealedMoves = moves.slice(0, revealedCount).map((move, index) => {
    // Het label bevat het zetnummer en de kleur en is daardoor uniek binnen de oplossing.
    const label = formatMoveLabel(move, index, sideToMove)
    return (
      <Chip
        key={label}
        label={label}
        color={index % 2 === 0 ? 'primary' : 'default'}
        variant={index % 2 === 0 ? 'filled' : 'outlined'}
      />
    )
  })

  const allRevealed = revealedCount === moves.length

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        Oplossing ({revealedCount}/{moves.length} halve zetten)
      </Typography>
      <Stack direction="row" spacing={1} useFlexGap sx={{flexWrap: 'wrap', minHeight: 32, mb: 2}}>
        {revealedCount === 0 ? (
          <Typography color="text.secondary">Denk eerst zelf na en toon dan de oplossing zet per zet.</Typography>
        ) : (
          revealedMoves
        )}
      </Stack>
      <Stack direction="row" spacing={1} useFlexGap sx={{flexWrap: 'wrap'}}>
        <Button variant="contained" disabled={allRevealed} onClick={() => setRevealedCount(oldCount => oldCount + 1)}>
          Volgende zet
        </Button>
        <Button disabled={allRevealed} onClick={() => setRevealedCount(moves.length)}>
          Toon alles
        </Button>
        <Button color="inherit" disabled={revealedCount === 0} onClick={() => setRevealedCount(0)}>
          Verberg
        </Button>
      </Stack>
    </Box>
  )
}

export default SolutionViewer
