import {Chess, type PieceSymbol, type Square} from 'chess.js'
import type {IBoardPosition, IBoardSquare} from '@/models/board.ts'

const FILES = 'abcdefgh'

// U+FE0E zorgt ervoor dat de schaaksymbolen als tekst getoond worden en niet als emoji (bv. de pion op Windows).
const TEXT_PRESENTATION = '︎'

export const pieceSymbols: Record<PieceSymbol, string> = {
  k: `♚${TEXT_PRESENTATION}`,
  q: `♛${TEXT_PRESENTATION}`,
  r: `♜${TEXT_PRESENTATION}`,
  b: `♝${TEXT_PRESENTATION}`,
  n: `♞${TEXT_PRESENTATION}`,
  p: `♟${TEXT_PRESENTATION}`,
}

export const pieceNames: Record<PieceSymbol, string> = {
  k: 'koning',
  q: 'dame',
  r: 'toren',
  b: 'loper',
  n: 'paard',
  p: 'pion',
}

const toBoardSquares = (chess: Chess): IBoardSquare[][] =>
  chess.board().map((row, rowIndex) =>
    row.map((piece, fileIndex) => ({
      square: `${FILES[fileIndex]}${8 - rowIndex}` as Square,
      piece: piece ? {type: piece.type, color: piece.color} : undefined,
    })),
  )

/**
 * Berekent de stelling vóór de eerste zet en na elke zet van de oplossing.
 * Geeft undefined terug als de FEN of een zet niet geldig is, zodat de UI kan terugvallen op de afbeelding.
 */
export const getBoardPositions = (fen: string, moves: string[]): IBoardPosition[] | undefined => {
  try {
    const chess = new Chess(fen)
    const positions: IBoardPosition[] = [{squares: toBoardSquares(chess)}]

    for (const move of moves) {
      const {from, to} = chess.move(move)
      positions.push({squares: toBoardSquares(chess), lastMove: {from, to}})
    }

    return positions
  } catch {
    return undefined
  }
}

export const isLightSquare = (square: Square): boolean => {
  const fileIndex = FILES.indexOf(square[0])
  const rank = Number(square[1])
  return (fileIndex + rank) % 2 === 0
}
