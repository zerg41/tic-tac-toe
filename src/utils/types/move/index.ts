import { IPlayer } from '../player';
import { ISquare } from '../square';

type MoveSituation = 'MAKE_CHOICE' | 'WAITING_OPPONENT';

export interface IMove {
  player: IPlayer;
  square: ISquare;
}

export interface ICurrentMoveState {
  moveNumber: number;
  playerId: IPlayer['id'];
  // TODO
  situation?: MoveSituation;
}
