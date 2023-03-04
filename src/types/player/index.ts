import { ESymbol } from 'types/common';
import { IUser } from 'types/user';

export type PlayerId = 1 | 2;

export interface IPlayer {
  id: PlayerId;
  name: IUser['name'];
  symbol: ESymbol;
}

export interface IPlayerOne extends IPlayer {
  id: 1;
  symbol: ESymbol.Cross;
}

export interface IPlayerTwo extends IPlayer {
  id: 2;
  symbol: ESymbol.Zero;
}

// TODO: IRegisteredUser, IUnregistredUser extends IUser...
