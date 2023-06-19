import { FC } from 'react';
// components
import { Symbol } from 'components';
// utils
import type { ISquare } from 'types';

type SquareProps = {
  id: ISquare['id'];
  value: ISquare['occupation'];
  isWinning?: ISquare['isWinning'];
  onClick: (id: ISquare['id']) => void;
};

const Square: FC<SquareProps> = ({ id, value, isWinning, onClick }) => {
  function handleClick() {
    if (!value) {
      onClick(id);
    }
  }

  return (
    <button className='Square' onClick={handleClick}>
      {value && <Symbol sign={value} />}
    </button>
  );
};

export default Square;
