import { FC } from 'react';
// components
import Game from 'components';
import { Header } from 'layouts';
import type { IBoard, IGame, IUser } from 'types';

const DEFAULT_BOARD_SIZE: IBoard['size'] = 3;
const DEFAULT_USER_ONE: IUser = { id: 100, name: 'John Doe' };
const DEFAULT_USER_TWO: IUser = { id: 101, name: 'Shawn Connery' };

const defaultGameSettings: IGame['settings'] = {
  boardSize: DEFAULT_BOARD_SIZE,
  playerNames: { 1: DEFAULT_USER_ONE.name, 2: DEFAULT_USER_TWO.name },
};

export const GamePage: FC = () => {
  return (
    <>
      <Header />
      <main className='Main-Content'>
        <Game settings={defaultGameSettings} />
      </main>
    </>
  );
};
