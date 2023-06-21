import { FC, useEffect } from 'react';
// hooks
import { useTimer } from 'hooks';
// components
import Timer from './timer';
import MoveStatus from './move-status';
// utils
import { ICurrentMoveState, IGame, IGamePlayers } from 'utils/types';

type StatusBarProps = {
  situation: IGame['situation'];
  players: IGamePlayers;
  winner: IGame['winner'];
  currentPlayerId: ICurrentMoveState['playerId'];
  moveNumber: ICurrentMoveState['moveNumber'];
};

const StatusBar: FC<StatusBarProps> = ({
  situation,
  currentPlayerId,
  players,
  winner,
  moveNumber,
}) => {
  const timer = useTimer();

  useEffect(() => {
    if (situation === 'ONGOING') {
      timer.start();
      return;
    }

    if (situation === 'INITIALIZING') {
      timer.reset();
    }

    timer.stop();
  }, [situation]);

  return (
    <div className='StatusBar'>
      <Timer seconds={timer.elapsedSeconds} />
      <MoveStatus
        moveNumber={moveNumber}
        situation={situation}
        currentPlayerId={currentPlayerId}
        players={players}
        winner={winner}
      />
    </div>
  );
};

export default StatusBar;
