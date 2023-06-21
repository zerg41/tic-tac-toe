import { FC } from 'react';
// utils
import type { IMove } from 'utils/types';

type HistoryProps = {
  moves: IMove[];
  onMoveListItemClick: (moveNumber: number) => void;
};

const History: FC<HistoryProps> = ({ moves, onMoveListItemClick }) => {
  let movesList = moves.map(({ square, player }, index) => {
    const moveNumber = index + 1;

    const squareInfo = `col-row: ${square.position.colIndex + 1} - ${square.position.rowIndex + 1}`;

    const playerInfo = player.name;

    const description = `Move #${moveNumber}: [${squareInfo}] by ${playerInfo}`;

    function handleClick() {
      onMoveListItemClick(moveNumber);
    }

    return (
      <li key={moveNumber} className='MoveList-Item'>
        <button style={{ width: '300px', textAlign: 'start' }} onClick={handleClick}>
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
