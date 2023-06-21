import React, { FC } from 'react';
// utils
import type { ICurrentMoveState, IGame, IGamePlayers } from 'utils/types';

type MoveStatusProps = {
  situation: IGame['situation'];
  players: IGamePlayers;
  winner: IGame['winner'];
  currentPlayerId: ICurrentMoveState['playerId'];
  moveNumber: ICurrentMoveState['moveNumber'];
};

const MoveStatus: FC<MoveStatusProps> = React.memo(
  ({ situation, currentPlayerId, players, moveNumber, winner }) => {
    let statusTitle: string;

    switch (situation) {
      case 'INITIALIZING':
        statusTitle = 'Loading Game...';
        break;
      case 'ONGOING':
        statusTitle = `${players[currentPlayerId].symbol} Turn`;
        break;
      case 'DRAW':
        statusTitle = 'Draw!';
        break;
      case 'WIN':
        statusTitle = `${winner} Win!`;
        break;
    }

    return (
      <>
        <div className='Move'>{`Move # ${moveNumber}`}</div>
        <div className='Status'>
          {situation === 'ONGOING' ? (
            <>
              <div
                className={`Player${
                  currentPlayerId === players['1'].id ? ' Player_status_active' : ''
                }`}
              >
                {players['1'].symbol}
              </div>
              vs
              <div
                className={`Player${
                  currentPlayerId === players['2'].id ? ' Player_status_active' : ''
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
