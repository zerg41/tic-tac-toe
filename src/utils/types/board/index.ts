import { ISquare } from '../square';

type BoardSize = 3;
type BoardState = ISquare[];

export interface IBoard {
  state: BoardState;
  size: BoardSize;
}
