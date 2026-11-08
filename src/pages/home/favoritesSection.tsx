import DeleteIcon from '@mui/icons-material/Delete'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import {
  Alert,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  Tooltip,
} from '@mui/material'
import {type FunctionComponent, useContext} from 'react'
import {FavoritesContext} from '@/context/favoritesContext.tsx'
import {formatDate, getSideLabel} from '@/utils/puzzleUtils.ts'

const FavoritesSection: FunctionComponent = () => {
  const {favorites, toggleFavorite} = useContext(FavoritesContext)

  if (favorites.length === 0) {
    return (
      <Alert severity="info">
        Je hebt nog geen favorieten. Klik op het hartje bij een puzzel om hem hier te bewaren.
      </Alert>
    )
  }

  const favoriteItems = favorites.map(puzzle => (
    <ListItem
      key={puzzle.id}
      divider
      secondaryAction={
        <Stack direction="row">
          <Tooltip title="Open op Chess.com">
            <IconButton href={puzzle.url} target="_blank" rel="noreferrer" aria-label="Open op Chess.com">
              <OpenInNewIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Verwijder uit favorieten">
            <IconButton aria-label="Verwijder uit favorieten" onClick={() => toggleFavorite(puzzle)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      }
    >
      <ListItemAvatar>
        <Avatar variant="rounded" src={puzzle.image} alt="" sx={{width: 56, height: 56, mr: 2}} />
      </ListItemAvatar>
      <ListItemText
        primary={puzzle.title}
        secondary={`${formatDate(puzzle.publishedAt)} · ${getSideLabel(puzzle.sideToMove)}`}
      />
    </ListItem>
  ))

  return (
    <Paper variant="outlined">
      <List disablePadding>{favoriteItems}</List>
    </Paper>
  )
}

export default FavoritesSection
