import CloseIcon from '@mui/icons-material/Close'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material'
import {type FunctionComponent, useMemo, useState} from 'react'
import ChessBoard from '@/components/chessBoard.tsx'
import FavoriteButton from '@/components/favoriteButton.tsx'
import PuzzleInfoChips from '@/components/puzzleInfoChips.tsx'
import type {IPuzzle} from '@/models/puzzle.ts'
import SolutionViewer from '@/pages/puzzles/solutionViewer.tsx'
import {getBoardPositions} from '@/utils/chessUtils.ts'
import {formatDate} from '@/utils/puzzleUtils.ts'

interface PuzzleDetailDialogProps {
  puzzle: IPuzzle
  onClose: () => void
}

const PuzzleDetailDialog: FunctionComponent<PuzzleDetailDialogProps> = ({puzzle, onClose}) => {
  const [revealedCount, setRevealedCount] = useState<number>(0)
  const positions = useMemo(() => getBoardPositions(puzzle.fen, puzzle.moves), [puzzle.fen, puzzle.moves])

  return (
    <Dialog open onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{pr: 6}}>
        {puzzle.title}
        <Typography variant="body2" color="text.secondary">
          Gepubliceerd op {formatDate(puzzle.publishedAt)}
        </Typography>
        <IconButton aria-label="Sluiten" onClick={onClose} sx={{position: 'absolute', right: 8, top: 8}}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid size={{xs: 12, md: 6}}>
            {positions ? (
              <ChessBoard
                position={positions[revealedCount]}
                orientation={puzzle.sideToMove}
                label={
                  revealedCount === 0
                    ? `Beginstelling van ${puzzle.title}`
                    : `Stelling na zet ${revealedCount} van ${puzzle.moves.length}`
                }
              />
            ) : (
              // Als de zetten niet ingelezen kunnen worden, tonen we de afbeelding van Chess.com.
              <Box component="img" src={puzzle.image} alt={`Bordstelling van ${puzzle.title}`} sx={{width: '100%'}} />
            )}
          </Grid>
          <Grid size={{xs: 12, md: 6}}>
            <PuzzleInfoChips puzzle={puzzle} />
            <Typography variant="body2" color="text.secondary" sx={{mt: 2, wordBreak: 'break-all'}}>
              FEN: {puzzle.fen}
            </Typography>
            <Divider sx={{my: 2}} />
            <SolutionViewer
              moves={puzzle.moves}
              sideToMove={puzzle.sideToMove}
              revealedCount={revealedCount}
              onRevealedCountChange={setRevealedCount}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <FavoriteButton puzzle={puzzle} />
        <Box sx={{flexGrow: 1}} />
        <Button href={puzzle.url} target="_blank" rel="noreferrer" endIcon={<OpenInNewIcon />}>
          Bekijk op Chess.com
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PuzzleDetailDialog
