import { FC, useEffect } from 'react';
// hooks
import useTimer from 'hooks';
// components
import Timer from './timer';
import MoveStatus from './move-status';
// utils
import { EGameEvent, IGame, IPlayer } from 'utils/types';

type StatusBarProps = {
  situation: EGameEvent;
  players: IGame['players'];
  currentPlayer: IPlayer;
  moveNumber: number;
  winner: IPlayer | null;
};

const StatusBar: FC<StatusBarProps> = ({
  situation,
  currentPlayer,
  players,
  winner,
  moveNumber,
}) => {
  const timer = useTimer();

  useEffect(() => {
    if (situation === EGameEvent.Ongoing) {
      timer.start();
      return;
    }

    if (situation === EGameEvent.Initializing) {
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
        currentPlayer={currentPlayer}
        players={players}
        winner={winner}
      />
    </div>
  );
};

export default StatusBar;
