import React from 'react'
import logo from './logo.svg'
import './App.css'
import Board from './board'
import BestMoveSpotFuntion from './util/BestMoveSpotFuntion'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      humanTurn: true,
      countTern: 0,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { countTern, humanTurn } = this.state
    if (countTern > 0 && !humanTurn) {
      this.handleComputerTurn()
    }
  }

   handleCalculateWinner=(squares) => {
     const lines = [
       [0, 1, 2],
       [3, 4, 5],
       [6, 7, 8],
       [0, 3, 6],
       [1, 4, 7],
       [2, 5, 8],
       [0, 4, 8],
       [2, 4, 6],
     ]

     for (let i = 0; i < lines.length; i++) {
       const [a, b, c] = lines[i]
       if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
         return squares[a]
       }
     }
     return null
   }

   initState=() => {
     this.setState({
       squares: [0, 1, 2, 3, 4, 5, 6, 7, 8],
       humanTurn: true,
       countTern: 0,
     })
   }

   handleComputerTurn=() => {
     const { humanTurn, squares } = this.state
     const computerBestMove = BestMoveSpotFuntion(squares).index
     squares[computerBestMove] = 'X'
     this.setState({
       squares,
       humanTurn: !humanTurn,
       countTern: this.state.countTern += 1,
     })
   }

   handleClick= (i) => {
     const { squares, humanTurn } = this.state
     if (!this.handleCalculateWinner(squares) && squares[i] !== 'X') {
       squares[i] = 'O'
       this.setState({
         squares,
         humanTurn: !humanTurn,
         countTern: this.state.countTern += 1,
       })
     }
   }

   render() {
     const { squares, humanTurn } = this.state
     const winner = this.handleCalculateWinner(squares)
     let status
     if (winner) {
       status = `Winner: ${winner}`
     } else {
       status = `${humanTurn ? 'O' : 'X'} : turn`
     }

     return (
       <div className="game">
         <div className="game-title">Tic Tac Toe Game</div>
         <div className="game-board">
           <Board
             squares={squares}
             onClick={i => this.handleClick(i)}
           />
         </div>
         <div className="game-info">
           <div>{status}</div>
           <button onClick={this.initState} type="button"> Re Start </button>
         </div>
       </div>
     )
   }
}
export default App
