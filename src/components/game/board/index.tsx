import { FC } from 'react';
// components
import Square from './square';
// utils
import type { IBoard, ISquare } from 'utils/types';

type BoardProps = {
  size: IBoard['size'];
  squares: IBoard['state'];
  onSelectSquare: (selectedSquareId: ISquare['id']) => void;
};

const Board: FC<BoardProps> = ({ size, squares, onSelectSquare }) => {
  return (
    <div className='Board' style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
      {squares.map((square) => (
        <Square
          key={square.id}
          id={square.id}
          value={square.value}
          isWinning={square.isWinning}
          onClick={onSelectSquare}
        />
      ))}
    </div>
  );
};

export default Board;
