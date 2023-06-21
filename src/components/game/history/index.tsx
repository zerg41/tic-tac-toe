import { FC } from 'react';
// utils
import type { IBoard, IGame, IMove } from 'utils/types';

type HistoryProps = {
  moves: IMove[];
  players: IGame['players'];
  squares: IBoard['state'];
  onMoveBack: (moveNumber: number) => void;
};

const History: FC<HistoryProps> = ({ moves, players, squares, onMoveBack }) => {
  let movesList = moves.map(({ squareId, playerId }, index) => {
    const moveNumber = index + 1;

    const squareInfo = `col-row: ${squares[squareId].position.colIndex + 1} - ${
      squares[squareId].position.rowIndex + 1
    }`;

    const playerInfo = players[playerId].name;

    const description = `Move #${index}: [${squareInfo}] by ${playerInfo}`;

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
