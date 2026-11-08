import {Box} from '@mui/material'
import type {FunctionComponent} from 'react'
import type {IBoardSquare} from '@/models/board.ts'
import {isLightSquare, pieceNames, pieceSymbols} from '@/utils/chessUtils.ts'

interface ChessSquareProps extends IBoardSquare {
  isHighlighted: boolean
  showFile: boolean
  showRank: boolean
}

const ChessSquare: FunctionComponent<ChessSquareProps> = ({square, piece, isHighlighted, showFile, showRank}) => {
  const light = isLightSquare(square)
  const background = isHighlighted ? (light ? '#f6f669' : '#baca2b') : light ? '#eeeed2' : '#769656'
  const coordinateColor = light ? '#769656' : '#eeeed2'
  const label = piece ? `${square}: ${piece.color === 'w' ? 'witte' : 'zwarte'} ${pieceNames[piece.type]}` : square

  return (
    <Box
      title={label}
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: background,
        lineHeight: 1,
        userSelect: 'none',
      }}
    >
      {showRank && (
        <Box component="span" sx={{position: 'absolute', top: 2, left: 3, fontSize: '2.2cqw', color: coordinateColor}}>
          {square[1]}
        </Box>
      )}
      {showFile && (
        <Box
          component="span"
          sx={{position: 'absolute', bottom: 1, right: 3, fontSize: '2.2cqw', color: coordinateColor}}
        >
          {square[0]}
        </Box>
      )}
      {piece && (
        <Box
          component="span"
          sx={{
            fontSize: '9cqw',
            fontFamily: '"Segoe UI Symbol", "DejaVu Sans", "Noto Sans Symbols 2", serif',
            color: piece.color === 'w' ? '#ffffff' : '#1b1b1b',
            textShadow:
              piece.color === 'w' ? '0 0 1px #000, 0 0 1px #000, 0 0 2px #000' : '0 0 1px rgba(255, 255, 255, 0.4)',
          }}
        >
          {pieceSymbols[piece.type]}
        </Box>
      )}
    </Box>
  )
}

export default ChessSquare
