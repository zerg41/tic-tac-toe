import { SymbolSign } from '../common';

interface ISquarePosition {
  colIndex: number;
  rowIndex: number;
}

export type WinningPositions = [ISquarePosition, ISquarePosition, ISquarePosition] | null;

export interface ISquare {
  id: number;
  value: SymbolSign | null;
  position: ISquarePosition;
  isWinning?: boolean;
}
