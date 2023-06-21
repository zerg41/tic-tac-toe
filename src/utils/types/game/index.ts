import { IBoard, ISquare } from '../board';
import { IPlayer, IPlayerOne, IPlayerTwo } from '../player';

export enum EGameEvent {
  Win = 'WIN',
  Draw = 'DRAW',
  Ongoing = 'ONGOING',
  Initializing = 'INITIALIZING',
}

// export enum EMoveEvent {
//   MakeChoice,
//   WaitingOpponent,
//   Finished,
// }

interface IWinState {
  rows: number[];
  cols: number[];
  diagonal: number;
  antiDiagonal: number;
  winner: IPlayer | null;
  winningLines: ISquare['position'][];
}

export interface IMove {
  playerId: IPlayer['id'];
  squareId: ISquare['id'];
}

interface IGamePlayers {
  1: IPlayerOne;
  2: IPlayerTwo;
}

interface IGameSettings {
  boardSize: IBoard['size'];
}

interface IGameState {
  situation: EGameEvent;
  boardState: IBoard['state'];
  winState: IWinState;
  moves: IMove[];
  currentPlayerId: IPlayer['id'];
  currentMoveNumber: number;
}

interface IGameHistory {
  [moveNumber: number]: IGameState;
}

export interface IGame {
  state: IGameState;
  history: IGameHistory;

  // STATIC
  settings: IGameSettings;
  players: IGamePlayers;
  // TODO:
  id?: number;
}
