import React from 'react'
import { Button } from 'antd'
import 'antd/dist/antd.css'
import './App.css'
import Board from './board'
import BestMoveSpotFuntion from './util/BestMoveSpotFuntion'
import logo from './logo.svg'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      oTurn: true,
      countTern: 0,
      mode: '1 Player',
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { countTern, oTurn, mode } = this.state
    if (countTern > 0 && !oTurn && mode === '1 Player') {
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
       oTurn: true,
       countTern: 0,
       mode: '1 Player',
     })
   }

   handleChangeMode=async (mode) => {
     await this.initState()
     this.setState({ mode })
   }

   handleComputerTurn=() => {
     const { oTurn, squares } = this.state
     const computerBestMove = BestMoveSpotFuntion(squares).index
     squares[computerBestMove] = 'X'
     this.setState({
       squares,
       oTurn: !oTurn,
       countTern: this.state.countTern += 1,
     })
   }

   handleClick= (i) => {
     const { squares, oTurn } = this.state
     if (!this.handleCalculateWinner(squares) && squares[i] !== 'X') {
       squares[i] = oTurn ? 'O' : 'X'
       this.setState({
         squares,
         oTurn: !oTurn,
         countTern: this.state.countTern += 1,
       })
     }
   }

   render() {
     const { squares, oTurn, mode } = this.state
     const winner = this.handleCalculateWinner(squares)
     let status
     if (winner) {
       status = `Winner: ${winner}`
     } else {
       status = `${oTurn ? 'O' : 'X'} : turn`
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
           <Button onClick={this.initState}> Re Start </Button>
         </div>
         <div className="game-mode">
            GAME MODE:
           {' '}
           {mode}
         </div>
         <div className="game-mode-bt">

           <Button
             onClick={() => this.handleChangeMode('1 Player')}
           >
                1 Player
           </Button>
           <Button
             onClick={() => this.handleChangeMode('2 Player')}
           >
                2 Player
           </Button>

         </div>
       </div>
     )
   }
}
export default App
