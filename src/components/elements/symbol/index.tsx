import { FC } from 'react';
import { SymbolSign } from 'types';

const SymbolClass = {
  x: 'Cross',
  o: 'Zero',
} as const;

type SymbolProps = {
  sign: SymbolSign;
};

const Symbol: FC<SymbolProps> = ({ sign }) => {
  return <div className={`Symbol ${SymbolClass[sign]}`}></div>;
};

export default Symbol;
