import { FC } from 'react';
// components
import Square from './square';
// utils
import type { IBoard, ISquare } from 'utils/types';

type BoardProps = {
  size: IBoard['size'];
  squares: IBoard['state'];
  onSquareClick: (id: ISquare['id']) => void;
};

const Board: FC<BoardProps> = ({ size, squares, onSquareClick }) => {
  return (
    <div className='Board' style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
      {squares.map((square) => (
        <Square
          key={square.id}
          id={square.id}
          value={square.value}
          isWinning={square.isWinning}
          onClick={onSquareClick}
        />
      ))}
    </div>
  );
};

export default Board;
