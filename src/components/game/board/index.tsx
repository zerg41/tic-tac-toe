import React, { FC } from 'react';
// components
import Square from './square';
// utils
import type { IBoard, ISquare } from 'types';

type BoardProps = {
  size: IBoard['size'];
  squares: IBoard['state'];
  onSelectSquare: (selectedSquareId: ISquare['id']) => void;
};

const Board: FC<BoardProps> = ({ size, squares, onSelectSquare }) => {
  function renderBoard(squares: IBoard['state']) {
    return squares.map((square) => (
      <Square key={square.id} id={square.id} value={square.occupation} onClick={onSelectSquare} />
    ));
  }

  return (
    <div className='Board' style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
      {squares && renderBoard(squares)}
    </div>
  );
};

export default Board;
