const bestMoveSpotFuntion = (origBoard) => {
  const humanPlayer = 'O'
  const aiPlayer = 'X'

  const winnerChecker = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
  ]

  const checkWin = (board, player) => {
    const plays = board.reduce((a, e, i) => ((e === player) ? a.concat(i) : a), [])
    let gameWon = null
    for (const [index, win] of winnerChecker.entries()) {
      if (win.every(elem => plays.indexOf(elem) > -1)) {
        gameWon = { index, player }
        break
      }
    }

    return gameWon
  }

  const emptySquares = () => origBoard.filter(s => typeof s === 'number')

  const minimax = (newBoard, player) => {
    const availSpots = emptySquares()
    if (checkWin(newBoard, humanPlayer)) {
      return { score: -10 }
    } if (checkWin(newBoard, aiPlayer)) {
      return { score: 10 }
    } if (availSpots.length === 0) {
      return { score: 0 }
    }
    const moves = []
    availSpots.map((availSpot) => {
      const move = {
        index: null,
        score: null,
      }
      move.index = newBoard[availSpot]
      newBoard[availSpot] = player
      if (player === aiPlayer) {
        const result = minimax(newBoard, humanPlayer)
        move.score = result.score
      } else {
        const result = minimax(newBoard, aiPlayer)
        move.score = result.score
      }
      newBoard[availSpot] = move.index
      moves.push(move)
    })

    let bestMove
    if (player === aiPlayer) {
      let bestScore = -10000
      moves.map((move, index) => {
        if (move.score > bestScore) {
          bestScore = move.score
          bestMove = index
        }
      })
    } else {
      let bestScore = 10000
      moves.map((move, index) => {
        if (move.score < bestScore) {
          bestScore = move.score
          bestMove = index
        }
      })
    }

    return moves[bestMove]
  }

  return minimax(origBoard, aiPlayer)
}
export default bestMoveSpotFuntion
