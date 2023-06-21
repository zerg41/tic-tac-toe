import { SymbolSign } from '../common';
import { IUser } from '../user';

type PlayerId = 1 | 2;

export interface IPlayer {
  id: PlayerId;
  name: IUser['name'];
  symbol: SymbolSign;
}

export type Winner = IPlayer['name'] | null;

// TODO: IRegisteredUser, IUnregistredUser extends IUser...
