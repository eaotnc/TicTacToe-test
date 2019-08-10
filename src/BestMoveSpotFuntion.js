import React from 'react'

const BestMoveSpotFuntion = (origBoard) => {
  const huPlayer = 'O'
  const aiPlayer = 'X'
  const fc = 0

  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
  ]

  function emptySquares() {
    return origBoard.filter(s => typeof s === 'number')
  }
  // winning combinations using the board indexies for instace the first win could be 3 xes in a row
  function checkWin(board, player) {
    const plays = board.reduce((a, e, i) => ((e === player) ? a.concat(i) : a), [])
    let gameWon = null
    for (const [index, win] of winCombos.entries()) {
      if (win.every(elem => plays.indexOf(elem) > -1)) {
        gameWon = { index, player }
        break
      }
    }
    return gameWon
  }

  function minimax(newBoard, player) {
    const availSpots = emptySquares()

    if (checkWin(newBoard, huPlayer)) {
      return { score: -10 }
    } if (checkWin(newBoard, aiPlayer)) {
      return { score: 10 }
    } if (availSpots.length === 0) {
      return { score: 0 }
    }
    const moves = []
    for (var i = 0; i < availSpots.length; i++) {
      const move = {}
      move.index = newBoard[availSpots[i]]
      newBoard[availSpots[i]] = player

      if (player == aiPlayer) {
        var result = minimax(newBoard, huPlayer)
        move.score = result.score
      } else {
        var result = minimax(newBoard, aiPlayer)
        move.score = result.score
      }

      newBoard[availSpots[i]] = move.index

      moves.push(move)
    }

    let bestMove
    if (player === aiPlayer) {
      var bestScore = -10000
      for (var i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score
          bestMove = i
        }
      }
    } else {
      var bestScore = 10000
      for (var i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score
          bestMove = i
        }
      }
    }

    return moves[bestMove]
  }

  return minimax(origBoard, aiPlayer)
}
export default BestMoveSpotFuntion
