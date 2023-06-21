import { FC } from 'react';
// components
import { Symbol } from 'components';
// utils
import type { ISquare } from 'utils/types';

type SquareProps = {
  id: ISquare['id'];
  value: ISquare['value'];
  isWinning?: ISquare['isWinning'];
  onClick: (id: ISquare['id']) => void;
};

const Square: FC<SquareProps> = ({ id, value, isWinning, onClick }) => {
  function handleClick() {
    const isEmpty = !value;

    if (isEmpty) {
      onClick(id);
    }
  }

  return (
    <button className={`Square ${isWinning ? 'Square_status_winner' : ''}`} onClick={handleClick}>
      {value && <Symbol sign={value} />}
    </button>
  );
};

export default Square;
