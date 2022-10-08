import React from 'react';
// utils
import { calculateWinner } from '../utils/util';

function Info({ history, stepNumber, xIsNext }) {
  const MAX_STEPS = 9;
  let currentMove = history[stepNumber];
  let winner = calculateWinner(currentMove.squares);
  let status;

  if (winner) {
    status = `Winner is: ${winner.id}`;
  } else if (stepNumber === MAX_STEPS) {
    status = `Draw`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className='info'>
      <h2>Game Status</h2>
      <div>{status}</div>
    </div>
  );
}

export default Info;
