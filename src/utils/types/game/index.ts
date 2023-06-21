import { IBoard } from '../board';
import { WinningPositions } from '../square';
import { IPlayer, Winner } from '../player';
import { ICurrentMoveState, IMove } from '../move';

type GameSituation = 'WIN' | 'DRAW' | 'ONGOING' | 'INITIALIZING';

interface IGameState {
  currentMoveState: ICurrentMoveState;
  moveHistory: IMove[];
  boardState: IBoard['state'];
  points: {
    rows: number[];
    cols: number[];
    diagonal: number;
    antiDiagonal: number;
  };
}

interface IGameHistory {
  [moveNumber: number]: IGameState;
}

export interface IGameSettings {
  boardSize: IBoard['size'];
}

export interface IGamePlayers {
  1: IPlayer;
  2: IPlayer;
}

export interface IGame {
  state: IGameState;
  history: IGameHistory;
  situation: GameSituation;
  winner: Winner;
  winningPositions: WinningPositions;
  // // STATIC
  // settings: IGameSettings;
  // players: IGamePlayers;
  // TODO:
  id?: number;
}
