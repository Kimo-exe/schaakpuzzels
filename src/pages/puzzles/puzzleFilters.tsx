import RestartAltIcon from '@mui/icons-material/RestartAlt'
import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  type SelectChangeEvent,
  Slider,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import {type ChangeEventHandler, type FunctionComponent, type MouseEvent, useContext} from 'react'
import {MAX_MOVES, MIN_MOVES, PuzzleFilterContext} from '@/context/puzzleFilterContext.tsx'
import type {PuzzleSortOrder, SideFilter} from '@/models/puzzleFilter.ts'

const PuzzleFilters: FunctionComponent = () => {
  const {filter, updateFilter, resetFilter} = useContext(PuzzleFilterContext)

  const searchChangeHandler: ChangeEventHandler<HTMLInputElement> = evt => {
    updateFilter('search', evt.currentTarget.value)
  }

  const sideChangeHandler = (_evt: MouseEvent<HTMLElement>, side: SideFilter | null): void => {
    // ToggleButtonGroup geeft null terug als je de actieve knop opnieuw aanklikt.
    if (side !== null) updateFilter('side', side)
  }

  const moveRangeChangeHandler = (_evt: Event, value: number[]): void => {
    updateFilter('moveRange', [value[0], value[1]])
  }

  const sortChangeHandler = (evt: SelectChangeEvent<PuzzleSortOrder>): void => {
    updateFilter('sortOrder', evt.target.value as PuzzleSortOrder)
  }

  return (
    <Paper variant="outlined" sx={{p: 3, mb: 3}}>
      <Grid container spacing={3} sx={{alignItems: 'center'}}>
        <Grid size={{xs: 12, md: 6}}>
          <TextField
            fullWidth
            label="Zoek op titel"
            value={filter.search}
            onChange={searchChangeHandler}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>
        <Grid size={{xs: 12, sm: 6, md: 3}}>
          <FormControl fullWidth>
            <InputLabel id="sort-order-label">Sorteren</InputLabel>
            <Select<PuzzleSortOrder>
              labelId="sort-order-label"
              label="Sorteren"
              value={filter.sortOrder}
              onChange={sortChangeHandler}
            >
              <MenuItem value="newest">Nieuwste eerst</MenuItem>
              <MenuItem value="oldest">Oudste eerst</MenuItem>
              <MenuItem value="title">Titel (A-Z)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{xs: 12, sm: 6, md: 3}}>
          <ToggleButtonGroup
            exclusive
            fullWidth
            color="primary"
            value={filter.side}
            onChange={sideChangeHandler}
            aria-label="Kleur aan zet"
          >
            <ToggleButton value="all">Alle</ToggleButton>
            <ToggleButton value="white">Wit</ToggleButton>
            <ToggleButton value="black">Zwart</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid size={{xs: 12, md: 6}}>
          <Typography id="move-range-label" gutterBottom>
            Aantal zetten: {filter.moveRange[0]} tot {filter.moveRange[1]}
          </Typography>
          <Box sx={{px: 1}}>
            <Slider
              aria-labelledby="move-range-label"
              value={filter.moveRange}
              onChange={moveRangeChangeHandler}
              min={MIN_MOVES}
              max={MAX_MOVES}
              step={1}
              marks
              valueLabelDisplay="auto"
              disableSwap
            />
          </Box>
        </Grid>
        <Grid size={{xs: 12, md: 6}} sx={{display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center'}}>
          <FormControlLabel
            control={
              <Switch checked={filter.onlyMate} onChange={(_evt, checked) => updateFilter('onlyMate', checked)} />
            }
            label="Enkel mat"
          />
          <FormControlLabel
            control={
              <Switch
                checked={filter.onlyFavorites}
                onChange={(_evt, checked) => updateFilter('onlyFavorites', checked)}
              />
            }
            label="Enkel favorieten"
          />
          <Box sx={{flexGrow: 1}} />
          <Button startIcon={<RestartAltIcon />} onClick={resetFilter}>
            Filters wissen
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default PuzzleFilters
