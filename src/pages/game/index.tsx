import { FC } from 'react';
// components
import { Content, Header } from 'layouts';
import Game from 'components';
// utils
// TEMP
import { defaultGameSettings, defaultPlayerOne, defaultPlayerTwo } from 'mocks';

export const GamePage: FC = () => {
  return (
    <>
      <Header />
      <Content>
        <Game
          settings={defaultGameSettings}
          players={{ 1: defaultPlayerOne, 2: defaultPlayerTwo }}
        />
      </Content>
    </>
  );
};
