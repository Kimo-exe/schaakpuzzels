import type {PieceColor} from '@/models/puzzle.ts'

export type SideFilter = 'all' | PieceColor

export type PuzzleSortOrder = 'newest' | 'oldest' | 'title'

export interface IPuzzleFilter {
  search: string
  side: SideFilter
  moveRange: [number, number]
  onlyMate: boolean
  onlyFavorites: boolean
  sortOrder: PuzzleSortOrder
}
