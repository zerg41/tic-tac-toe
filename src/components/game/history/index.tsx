import React, { FC } from 'react';
// utils
import { IBoard, IGame } from 'types';

type HistoryProps = {
  history: IGame['history'];
  players: IGame['players'];
  squares: IBoard['state'];
  onMoveBack: (moveNumber: number) => void;
};

const History: FC<HistoryProps> = ({ history, players, squares, onMoveBack }) => {
  let movesList = Object.keys(history).map((moveKey) => {
    let moveNumber = Number(moveKey);

    let squareInfo = `col: ${
      squares[history[moveNumber].move.squareId].position.colIndex + 1
    } - row: ${squares[history[moveNumber].move.squareId].position.rowIndex + 1}`;

    let playerInfo = players[history[moveNumber].move.playerId].name;

    let description = `Move #${moveNumber}: ${squareInfo} ${playerInfo}`;

    function handleMoveBack() {
      onMoveBack(moveNumber);
    }

    return (
      <li key={moveNumber} className='MoveList-Item'>
        <button style={{ width: '300px' }} onClick={handleMoveBack}>
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className='History'>
      <h2>Moves History</h2>
      <ol className='MoveList'>{movesList}</ol>
    </div>
  );
};

export default History;
