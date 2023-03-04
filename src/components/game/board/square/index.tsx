import { CrossSymbol, ZeroSymbol } from 'components/symbols';
import React, { FC } from 'react';
import { ISquare } from 'types';
import { ESymbol } from 'types/common';

type SquareProps = {
  id: ISquare['id'];
  value: ISquare['occupation'];
  isWinning?: ISquare['isWinning'];
  onClick: (id: ISquare['id']) => void;
};

const Square: FC<SquareProps> = ({ id, value, isWinning, onClick }) => {
  function handleClick() {
    if (value) {
      return;
    }

    onClick(id);
  }

  return (
    <button className='Square' onClick={handleClick}>
      {value && { [ESymbol.Cross]: <CrossSymbol />, [ESymbol.Zero]: <ZeroSymbol /> }[value]}
    </button>
  );
};

export default Square;
