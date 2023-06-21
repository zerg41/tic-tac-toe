import { BOARD_SIZE } from 'utils/constants';
import { IGameSettings, IPlayer, IUser } from 'utils/types';

export const mockUserOne: IUser = { id: 100, name: 'John Doe' };
export const mockUserTwo: IUser = { id: 101, name: 'Shawn Connery' };

export const defaultGameSettings: IGameSettings = {
  boardSize: BOARD_SIZE,
};

export const defaultPlayerOne: IPlayer = {
  id: 1,
  symbol: 'x',
  name: mockUserOne.name,
};

export const defaultPlayerTwo: IPlayer = {
  id: 2,
  symbol: 'o',
  name: mockUserTwo.name,
};
