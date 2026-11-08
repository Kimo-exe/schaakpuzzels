export type PieceColor = 'white' | 'black'

/**
 * Ruwe response van https://api.chess.com/pub/puzzle en /pub/puzzle/random.
 */
export interface IPuzzleResponse {
  title: string
  comments?: string
  url: string
  publish_time: number
  fen: string
  pgn: string
  image: string
}

/**
 * Puzzel zoals die in de applicatie gebruikt wordt.
 */
export interface IPuzzle {
  id: string
  title: string
  url: string
  publishedAt: number
  fen: string
  image: string
  moves: string[]
  sideToMove: PieceColor
  playerMoveCount: number
  isMate: boolean
}
