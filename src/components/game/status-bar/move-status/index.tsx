import React, { FC } from 'react';
// utils
import { EGameEvent, IGame, IPlayer } from 'types';

type MoveStatusProps = {
  situation: IGame['situation'];
  players: IGame['players'];
  currentPlayer: IPlayer;
  moveNumber: number;
  winner?: IPlayer;
};

const MoveStatus: FC<MoveStatusProps> = React.memo(
  ({ situation, currentPlayer, players, moveNumber, winner }) => {
    let statusTitle: string;

    switch (situation) {
      case EGameEvent.Initializing:
        statusTitle = 'Loading Game...';
        break;
      case EGameEvent.Ongoing:
        statusTitle = `${currentPlayer.symbol} Turn`;
        break;
      case EGameEvent.Draw:
        statusTitle = 'Draw!';
        break;
      case EGameEvent.Win:
        statusTitle = `${winner?.name} Win!`;
        break;
    }

    return (
      <>
        <div className='Move'>{`Move # ${moveNumber}`}</div>
        <div className='Status'>
          {situation === EGameEvent.Ongoing ? (
            <>
              <div
                className={`Player${
                  currentPlayer.id === players['1'].id ? ' Player_status_active' : ''
                }`}
              >
                {players['1'].symbol}
              </div>
              vs
              <div
                className={`Player${
                  currentPlayer.id === players['2'].id ? ' Player_status_active' : ''
                }`}
              >
                {players['2'].symbol}
              </div>
            </>
          ) : (
            statusTitle
          )}
        </div>
      </>
    );
  }
);

export default MoveStatus;
