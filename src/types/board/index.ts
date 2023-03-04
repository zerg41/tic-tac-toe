import { ESymbol } from 'types/common';

type BoardSize = 3 | 4 | 5;
type BoardState = ISquare[];

interface ISquarePosition {
  colIndex: number;
  rowIndex: number;
}

export interface ISquare {
  id: number;
  occupation: ESymbol | null;
  position: ISquarePosition;
  isWinning?: boolean;
}

export interface IBoard {
  state: BoardState;
  size: BoardSize;
}
