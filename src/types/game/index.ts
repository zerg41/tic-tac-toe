import { IBoard, ISquare } from 'types/board';
import { IPlayer, IPlayerOne, IPlayerTwo } from 'types/player';

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

export interface IMove {
  playerId: IPlayer['id'];
  squareId: ISquare['id'];
}

interface IGameHistory {
  [moveNumber: number]: { move: IMove; boardSnapshot: IBoard['state'] };
}

interface IGamePlayers {
  1: IPlayerOne;
  2: IPlayerTwo;
}

export interface IGameSettings {
  boardSize: IBoard['size'];
}

export interface IGame {
  situation: EGameEvent;
  history: IGameHistory;

  // STATIC
  settings: IGameSettings;
  players: IGamePlayers;
  // TODO:
  id?: number;
}
