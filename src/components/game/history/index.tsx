import { FC } from 'react';
// utils
import type { IBoard, IGame } from 'utils/types';

type HistoryProps = {
  history: IGame['history'];
  players: IGame['players'];
  squares: IBoard['state'];
  onMoveBack: (moveNumber: number) => void;
};

const History: FC<HistoryProps> = ({ history, players, squares, onMoveBack }) => {
  let movesList = Object.keys(history).map((moveKey) => {
    let moveNumber = Number(moveKey);

    let squareInfo = `col-row: ${
      squares[history[moveNumber].move.squareId].position.colIndex + 1
    } - ${squares[history[moveNumber].move.squareId].position.rowIndex + 1}`;

    let playerInfo = players[history[moveNumber].move.playerId].name;

    let description = `Move #${moveNumber}: [${squareInfo}] by ${playerInfo}`;

    function handleMoveBack() {
      onMoveBack(moveNumber);
    }

    return (
      <li key={moveNumber} className='MoveList-Item'>
        <button style={{ width: '300px', textAlign: 'start' }} onClick={handleMoveBack}>
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
