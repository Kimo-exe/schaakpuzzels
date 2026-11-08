import {createContext, type FunctionComponent, type PropsWithChildren, useState} from 'react'
import type {IPuzzleFilter} from '@/models/puzzleFilter.ts'

export const MIN_MOVES = 1
export const MAX_MOVES = 8

export const defaultPuzzleFilter: IPuzzleFilter = {
  search: '',
  side: 'all',
  moveRange: [MIN_MOVES, MAX_MOVES],
  onlyMate: false,
  onlyFavorites: false,
  sortOrder: 'newest',
}

interface IPuzzleFilterContext {
  filter: IPuzzleFilter
  updateFilter: <K extends keyof IPuzzleFilter>(key: K, value: IPuzzleFilter[K]) => void
  resetFilter: () => void
}

export const PuzzleFilterContext = createContext<IPuzzleFilterContext>({
  filter: defaultPuzzleFilter,
  updateFilter: () => {},
  resetFilter: () => {},
})

const PuzzleFilterProvider: FunctionComponent<PropsWithChildren> = ({children}) => {
  const [filter, setFilter] = useState<IPuzzleFilter>(defaultPuzzleFilter)

  const updateFilter = <K extends keyof IPuzzleFilter>(key: K, value: IPuzzleFilter[K]): void => {
    setFilter(oldFilter => ({...oldFilter, [key]: value}))
  }

  const resetFilter = (): void => {
    setFilter(defaultPuzzleFilter)
  }

  return <PuzzleFilterContext value={{filter, updateFilter, resetFilter}}>{children}</PuzzleFilterContext>
}

export default PuzzleFilterProvider
