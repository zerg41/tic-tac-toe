import { IGame, IPlayerOne, IPlayerTwo, IUser } from 'utils/types';
import { DEFAULT_BOARD_SIZE, FIRST_PLAYER_ID, SECOND_PLAYER_ID } from 'utils/constants';

export const mockUserOne: IUser = { id: 100, name: 'John Doe' };
export const mockUserTwo: IUser = { id: 101, name: 'Shawn Connery' };

export const defaultGameSettings: IGame['settings'] = {
  boardSize: DEFAULT_BOARD_SIZE,
};

export const defaultPlayerOne: IPlayerOne = {
  id: FIRST_PLAYER_ID,
  symbol: 'x',
  name: mockUserOne.name,
};

export const defaultPlayerTwo: IPlayerTwo = {
  id: SECOND_PLAYER_ID,
  symbol: 'o',
  name: mockUserTwo.name,
};
