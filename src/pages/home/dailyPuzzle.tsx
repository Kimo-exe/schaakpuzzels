import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from '@mui/material'
import type {FunctionComponent} from 'react'
import {useGetDailyPuzzle} from '@/api/puzzles.ts'
import FavoriteButton from '@/components/favoriteButton.tsx'
import PuzzleInfoChips from '@/components/puzzleInfoChips.tsx'
import {formatDate} from '@/utils/puzzleUtils.ts'

const DailyPuzzle: FunctionComponent = () => {
  const {data: puzzle} = useGetDailyPuzzle()

  return (
    <Card>
      <Grid container>
        <Grid size={{xs: 12, md: 5}}>
          <CardMedia component="img" image={puzzle.image} alt={`Bordstelling van ${puzzle.title}`} />
        </Grid>
        <Grid size={{xs: 12, md: 7}} sx={{display: 'flex', flexDirection: 'column'}}>
          <CardContent sx={{flexGrow: 1}}>
            <Typography variant="overline" color="text.secondary">
              {formatDate(puzzle.publishedAt)}
            </Typography>
            <Typography variant="h5" component="h3" gutterBottom>
              {puzzle.title}
            </Typography>
            <PuzzleInfoChips puzzle={puzzle} />
            <Typography sx={{mt: 2}} color="text.secondary">
              Bekijk de stelling goed en zoek de winnende combinatie. De oplossing vind je op de puzzelpagina of
              rechtstreeks op Chess.com.
            </Typography>
          </CardContent>
          <CardActions>
            <Button href={puzzle.url} target="_blank" rel="noreferrer" endIcon={<OpenInNewIcon />}>
              Speel op Chess.com
            </Button>
            <FavoriteButton puzzle={puzzle} />
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  )
}

export default DailyPuzzle
