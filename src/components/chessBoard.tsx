import {Box} from '@mui/material'
import type {FunctionComponent} from 'react'
import ChessSquare from '@/components/chessSquare.tsx'
import type {IBoardPosition} from '@/models/board.ts'
import type {PieceColor} from '@/models/puzzle.ts'

interface ChessBoardProps {
  position: IBoardPosition
  orientation: PieceColor
  label: string
}

const ChessBoard: FunctionComponent<ChessBoardProps> = ({position, orientation, label}) => {
  // Het bord wordt gedraaid zodat de speler aan zet onderaan staat, net zoals op Chess.com.
  const rows = orientation === 'white' ? position.squares : position.squares.toReversed().map(row => row.toReversed())
  const {lastMove} = position

  const squares = rows.flatMap((row, rowIndex) =>
    row.map((boardSquare, columnIndex) => (
      <ChessSquare
        key={boardSquare.square}
        {...boardSquare}
        isHighlighted={boardSquare.square === lastMove?.from || boardSquare.square === lastMove?.to}
        showRank={columnIndex === 0}
        showFile={rowIndex === rows.length - 1}
      />
    )),
  )

  return (
    <Box sx={{containerType: 'inline-size', width: '100%'}}>
      <Box
        role="img"
        aria-label={label}
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          gridTemplateRows: 'repeat(8, 1fr)',
          aspectRatio: '1',
          borderRadius: 1,
          overflow: 'hidden',
          boxShadow: 3,
        }}
      >
        {squares}
      </Box>
    </Box>
  )
}

export default ChessBoard
