import AddIcon from '@mui/icons-material/Add'
import {Alert, Box, Button, Snackbar, Typography} from '@mui/material'
import {type FunctionComponent, useContext, useState} from 'react'
import {useGetPuzzleCollection} from '@/api/puzzles.ts'
import {FavoritesContext} from '@/context/favoritesContext.tsx'
import {PuzzleFilterContext} from '@/context/puzzleFilterContext.tsx'
import type {IPuzzle} from '@/models/puzzle.ts'
import PuzzleDetailDialog from '@/pages/puzzles/puzzleDetailDialog.tsx'
import PuzzleList from '@/pages/puzzles/puzzleList.tsx'
import {filterPuzzles} from '@/utils/puzzleUtils.ts'

interface ISnackbarMessage {
  severity: 'success' | 'info' | 'error'
  text: string
}

const PuzzleOverview: FunctionComponent = () => {
  const {data: puzzles, fetchNextPage, isFetchingNextPage} = useGetPuzzleCollection()
  const {filter} = useContext(PuzzleFilterContext)
  const {favorites} = useContext(FavoritesContext)
  const [selectedPuzzle, setSelectedPuzzle] = useState<IPuzzle | undefined>(undefined)
  const [snackbarMessage, setSnackbarMessage] = useState<ISnackbarMessage | undefined>(undefined)

  const favoriteIds = favorites.map(favorite => favorite.id)
  const filteredPuzzles = filterPuzzles(puzzles, filter, favoriteIds)

  const loadMoreHandler = async (): Promise<void> => {
    const countBefore = puzzles.length
    const result = await fetchNextPage()

    if (result.isError) {
      setSnackbarMessage({severity: 'error', text: result.error.message})
    } else if ((result.data?.length ?? 0) > countBefore) {
      setSnackbarMessage({severity: 'success', text: 'Nieuwe puzzel toegevoegd aan je collectie!'})
    } else {
      // De random endpoint van Chess.com wordt ongeveer 15 seconden gecachet.
      setSnackbarMessage({
        severity: 'info',
        text: 'Chess.com gaf dezelfde puzzel terug. Probeer het zo meteen opnieuw.',
      })
    }
  }

  return (
    <>
      <Typography color="text.secondary" sx={{mb: 2}}>
        {filteredPuzzles.length} van {puzzles.length} puzzels getoond
      </Typography>
      <PuzzleList puzzles={filteredPuzzles} onSelect={setSelectedPuzzle} />
      <Box sx={{display: 'flex', justifyContent: 'center', mt: 4}}>
        <Button
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          loading={isFetchingNextPage}
          onClick={loadMoreHandler}
        >
          Laad een willekeurige puzzel
        </Button>
      </Box>
      {selectedPuzzle && (
        <PuzzleDetailDialog
          key={selectedPuzzle.id}
          puzzle={selectedPuzzle}
          onClose={() => setSelectedPuzzle(undefined)}
        />
      )}
      <Snackbar
        open={snackbarMessage !== undefined}
        autoHideDuration={4000}
        onClose={() => setSnackbarMessage(undefined)}
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
      >
        <Alert severity={snackbarMessage?.severity} variant="filled" onClose={() => setSnackbarMessage(undefined)}>
          {snackbarMessage?.text}
        </Alert>
      </Snackbar>
    </>
  )
}

export default PuzzleOverview
