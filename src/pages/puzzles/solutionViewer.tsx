import {Box, Button, Chip, Stack, Typography} from '@mui/material'
import type {FunctionComponent} from 'react'
import type {PieceColor} from '@/models/puzzle.ts'
import {formatMoveLabel} from '@/utils/puzzleUtils.ts'

interface SolutionViewerProps {
  moves: string[]
  sideToMove: PieceColor
  revealedCount: number
  onRevealedCountChange: (count: number) => void
}

/**
 * Toont de oplossing zet per zet. Zetten van de speler aan zet krijgen de primaire kleur.
 */
const SolutionViewer: FunctionComponent<SolutionViewerProps> = ({
  moves,
  sideToMove,
  revealedCount,
  onRevealedCountChange,
}) => {
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
        variant={index === revealedCount - 1 ? 'filled' : 'outlined'}
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
          <Typography color="text.secondary">Denk eerst zelf na en speel dan de oplossing zet per zet af.</Typography>
        ) : (
          revealedMoves
        )}
      </Stack>
      <Stack direction="row" spacing={1} useFlexGap sx={{flexWrap: 'wrap'}}>
        <Button
          variant="outlined"
          disabled={revealedCount === 0}
          onClick={() => onRevealedCountChange(revealedCount - 1)}
        >
          Vorige zet
        </Button>
        <Button variant="contained" disabled={allRevealed} onClick={() => onRevealedCountChange(revealedCount + 1)}>
          Volgende zet
        </Button>
        <Button disabled={allRevealed} onClick={() => onRevealedCountChange(moves.length)}>
          Toon alles
        </Button>
        <Button color="inherit" disabled={revealedCount === 0} onClick={() => onRevealedCountChange(0)}>
          Opnieuw
        </Button>
      </Stack>
    </Box>
  )
}

export default SolutionViewer
