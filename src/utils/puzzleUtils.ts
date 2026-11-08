import type {IPuzzle, IPuzzleResponse, PieceColor} from '@/models/puzzle.ts'
import type {IPuzzleFilter} from '@/models/puzzleFilter.ts'

const RESULT_TOKENS: string[] = ['1-0', '0-1', '1/2-1/2', '*']

const dateFormatter = new Intl.DateTimeFormat('nl-BE', {dateStyle: 'long'})

/**
 * Haalt de zetten uit een PGN-string: headers, commentaar, varianten, zetnummers en het resultaat worden verwijderd.
 */
export const parsePgnMoves = (pgn: string): string[] => {
  const moveText = pgn
    .split(/\r?\n/)
    .filter(line => !line.trim().startsWith('['))
    .join(' ')
    .replace(/\{[^}]*\}/g, ' ')
    .replace(/\([^)]*\)/g, ' ')
    .replace(/\$\d+/g, ' ')

  return moveText
    .split(/\s+/)
    .map(token => token.replace(/^\d+\.(\.\.)?/, ''))
    .filter(token => token !== '' && !RESULT_TOKENS.includes(token))
}

export const getSideToMove = (fen: string): PieceColor => (fen.split(' ')[1] === 'b' ? 'black' : 'white')

export const mapPuzzleResponse = (response: IPuzzleResponse): IPuzzle => {
  const moves = parsePgnMoves(response.pgn)

  return {
    id: response.url,
    title: response.title,
    url: response.url,
    publishedAt: response.publish_time * 1000,
    fen: response.fen,
    image: response.image,
    moves,
    sideToMove: getSideToMove(response.fen),
    playerMoveCount: Math.ceil(moves.length / 2),
    isMate: moves.at(-1)?.includes('#') ?? false,
  }
}

export const uniquePuzzles = (puzzles: IPuzzle[]): IPuzzle[] => {
  const seen = new Set<string>()
  return puzzles.filter(puzzle => {
    if (seen.has(puzzle.id)) return false
    seen.add(puzzle.id)
    return true
  })
}

export const filterPuzzles = (puzzles: IPuzzle[], filter: IPuzzleFilter, favoriteIds: string[]): IPuzzle[] => {
  const search = filter.search.trim().toLowerCase()
  const [minMoves, maxMoves] = filter.moveRange

  const filtered = puzzles.filter(puzzle => {
    if (search !== '' && !puzzle.title.toLowerCase().includes(search)) return false
    if (filter.side !== 'all' && puzzle.sideToMove !== filter.side) return false
    if (puzzle.playerMoveCount < minMoves || puzzle.playerMoveCount > maxMoves) return false
    if (filter.onlyMate && !puzzle.isMate) return false
    if (filter.onlyFavorites && !favoriteIds.includes(puzzle.id)) return false
    return true
  })

  return filtered.toSorted((a, b) => {
    if (filter.sortOrder === 'title') return a.title.localeCompare(b.title, 'nl')
    if (filter.sortOrder === 'oldest') return a.publishedAt - b.publishedAt
    return b.publishedAt - a.publishedAt
  })
}

/**
 * Geeft een zet een label in schaaknotatie, bv. "1. Qh5" of "1... Kf8".
 */
export const formatMoveLabel = (move: string, index: number, sideToMove: PieceColor): string => {
  const ply = index + (sideToMove === 'black' ? 1 : 0)
  const moveNumber = Math.floor(ply / 2) + 1
  return ply % 2 === 0 ? `${moveNumber}. ${move}` : `${moveNumber}... ${move}`
}

export const formatDate = (timestamp: number): string => dateFormatter.format(new Date(timestamp))

export const getSideLabel = (side: PieceColor): string => (side === 'white' ? 'Wit aan zet' : 'Zwart aan zet')
