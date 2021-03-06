import React, { Component } from "react";
import Board from "./Board";
import { calculateWinner } from "../utils/util";


class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            boardSize: 3,
            stepNumber: 0,
            history: [{
                squares: Array(3 * 3).fill(null),
            }],
            xIsNext: true,
        }
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[this.state.stepNumber];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
        });
    }

    render() {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map(( step, move ) => {
            const description = move ? `Go To Move #${move}` : `Start Again`;
            return (
                <li key={move}>
                    <button onClick={ () => this.jumpTo(move) }>{description}</button>
                </li>
            )
        });
        
        
        let status;

        if (winner) {
            status = `Winner is: ${winner}`;
        } else {
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        }

        return (
        <div className="game">
            <div className="game-board">
                <Board
                    boardSize ={ this.state.boardSize } 
                    squares={ current.squares }
                    onClick={ (i) => this.handleClick(i) }
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
        );
    }
}

export default Game;