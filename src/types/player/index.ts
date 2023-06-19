import { SymbolSign } from 'types/common';
import { IUser } from 'types/user';

export type PlayerId = 1 | 2;

export interface IPlayer {
  id: PlayerId;
  name: IUser['name'];
  symbol: SymbolSign;
}

export interface IPlayerOne extends IPlayer {
  id: 1;
  symbol: 'x';
}

export interface IPlayerTwo extends IPlayer {
  id: 2;
  symbol: 'o';
}

// TODO: IRegisteredUser, IUnregistredUser extends IUser...
