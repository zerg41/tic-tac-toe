import React, { Component } from 'react';
// components
import Board from './Board';
import Info from './Info';
// utils
import { calculateWinner } from '../utils/util';
import Log from './Log';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boardSize: 3,
      stepNumber: 0,
      history: [
        {
          squares: Array(3 * 3).fill(null),
        },
      ],
      xIsNext: true,
    };
  }

  handleMove(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    const winner = calculateWinner(squares);

    if (winner || squares[i]) {
      console.log(winner.winnerLine);
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  render() {
    return (
      <>
        <header className='main-header'>
          <h1 className='main-header__title'>Tic Tac Toe</h1>
        </header>
        <main className='main-content'>
          <section className='game'>
            <Board
              boardSize={this.state.boardSize}
              squares={this.state.history[this.state.stepNumber].squares}
              onClick={(i) => this.handleClick(i)}
            />
            <Info
              history={this.state.history}
              stepNumber={this.state.stepNumber}
              xIsNext={this.state.xIsNext}
            />
          </section>
          <section className='log'>
            <Log history={this.state.history} handleMove={(step) => this.handleMove(step)} />
          </section>
        </main>
      </>
    );
  }
}

export default Game;
