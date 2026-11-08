import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import {IconButton, Tooltip} from '@mui/material'
import {type FunctionComponent, useContext} from 'react'
import {FavoritesContext} from '@/context/favoritesContext.tsx'
import type {IPuzzle} from '@/models/puzzle.ts'

interface FavoriteButtonProps {
  puzzle: IPuzzle
}

const FavoriteButton: FunctionComponent<FavoriteButtonProps> = ({puzzle}) => {
  const {isFavorite, toggleFavorite} = useContext(FavoritesContext)
  const favorite = isFavorite(puzzle.id)
  const label = favorite ? 'Verwijder uit favorieten' : 'Voeg toe aan favorieten'

  return (
    <Tooltip title={label}>
      <IconButton aria-label={label} color={favorite ? 'error' : 'default'} onClick={() => toggleFavorite(puzzle)}>
        {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </Tooltip>
  )
}

export default FavoriteButton
