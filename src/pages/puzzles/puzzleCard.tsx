import {Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from '@mui/material'
import type {FunctionComponent} from 'react'
import FavoriteButton from '@/components/favoriteButton.tsx'
import PuzzleInfoChips from '@/components/puzzleInfoChips.tsx'
import type {IPuzzle} from '@/models/puzzle.ts'
import {formatDate} from '@/utils/puzzleUtils.ts'

interface PuzzleCardProps {
  puzzle: IPuzzle
  onSelect: (puzzle: IPuzzle) => void
}

const PuzzleCard: FunctionComponent<PuzzleCardProps> = ({puzzle, onSelect}) => {
  return (
    <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
      <CardActionArea onClick={() => onSelect(puzzle)} sx={{flexGrow: 1}}>
        <CardMedia component="img" image={puzzle.image} alt={`Bordstelling van ${puzzle.title}`} loading="lazy" />
        <CardContent>
          <Typography variant="caption" color="text.secondary">
            {formatDate(puzzle.publishedAt)}
          </Typography>
          <Typography variant="h6" component="h3" gutterBottom>
            {puzzle.title}
          </Typography>
          <PuzzleInfoChips puzzle={puzzle} />
        </CardContent>
      </CardActionArea>
      <CardActions sx={{justifyContent: 'flex-end'}}>
        <FavoriteButton puzzle={puzzle} />
      </CardActions>
    </Card>
  )
}

export default PuzzleCard
