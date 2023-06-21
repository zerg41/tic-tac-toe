import { SymbolSign } from '../common';
import { IUser } from '../user';

type PlayerId = 1 | 2;

export interface IPlayer {
  id: PlayerId;
  name: IUser['name'];
  symbol: SymbolSign;
}

// TODO: IRegisteredUser, IUnregistredUser extends IUser...
