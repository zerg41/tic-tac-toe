import { IBoard } from '../board';
import { WinningPositions } from '../square';
import { IPlayer } from '../player';
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

interface IGameSettings {
  boardSize: IBoard['size'];
}

interface IGamePlayers {
  1: IPlayer;
  2: IPlayer;
}

export interface IGame {
  state: IGameState;
  history: IGameHistory;
  situation: GameSituation;
  winner: IPlayer['name'] | null;
  winningPositions: WinningPositions | null;
  // STATIC
  settings: IGameSettings;
  players: IGamePlayers;
  // TODO:
  id?: number;
}
