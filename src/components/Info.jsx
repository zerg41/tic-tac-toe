import React from "react";
// utils
import { calculateWinner } from "../utils/util";


function Info({ history, stepNumber, handleMove, xIsNext }) {

    const currentMove = history[stepNumber];
    const movesList = history.map((step, move) => {
        const description = move ? `Go To Move #${move}` : `Go To Game Start`;

        return (
            <li key={move}>
                <button onClick={() => handleMove(move)}>{description}</button>
            </li>
        );
    });

    let status;
    const winner = calculateWinner(currentMove.squares);

    if (winner) {
        status = `Winner is: ${winner.id}`;
    } else if (stepNumber === 9) {
        status = `Draw`;
    } else {
        status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }

    return (
        <div className="game-info">
            <div>{status}</div>
            <ol>{movesList}</ol>
        </div>
    );
}

export default Info;