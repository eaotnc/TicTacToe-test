import React from 'react'
import logo from './logo.svg'
import './App.css'
import Board from './board'
import BestMoveSpotFuntion from './BestMoveSpotFuntion'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //   squares: Array(9).fill(0),
      squares: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      humenTurn: true,
      countTern: 0,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { countTern, humenTurn } = this.state
    console.log('prevProps,prevState', prevState)
    if (countTern > 0 && !humenTurn) {
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
       humenTurn: true,
       countTern: 0,
     })
   }

   handleComputerTurn=() => {
     const { humenTurn, squares } = this.state
     const computerBestMove = BestMoveSpotFuntion(squares).index
     console.log('computerBestMove', computerBestMove)
     squares[computerBestMove] = 'X'
     this.setState({
       squares,
       humenTurn: !humenTurn,
       countTern: this.state.countTern += 1,
     })
   }

   handleClick= (i) => {
     const { squares, humenTurn } = this.state
     squares[i] = humenTurn ? 'O' : 'X'
     if (!this.handleCalculateWinner(squares)) {
       this.setState({
         squares,
         humenTurn: !humenTurn,
         countTern: this.state.countTern += 1,
       })
     }
   }

   render() {
     console.log('render')
     const { squares, humenTurn } = this.state
     const winner = this.handleCalculateWinner(squares)

     let status
     if (winner) {
       status = `Winner: ${winner}`
     } else {
       status = `${humenTurn ? 'O' : 'X'} : turn`
     }

     return (
       <div className="game">
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
