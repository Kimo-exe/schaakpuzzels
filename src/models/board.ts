import type {Color, PieceSymbol, Square} from 'chess.js'

export interface IBoardPiece {
  type: PieceSymbol
  color: Color
}

export interface IBoardSquare {
  square: Square
  piece?: IBoardPiece
}

export interface IBoardMove {
  from: Square
  to: Square
}

/**
 * Een stelling op het bord: 8 rijen van 8 velden, van rij 8 (boven) tot rij 1 (onder) gezien vanuit wit.
 */
export interface IBoardPosition {
  squares: IBoardSquare[][]
  lastMove?: IBoardMove
}
