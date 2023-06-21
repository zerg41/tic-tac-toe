import { FC } from 'react';
import { useGame } from 'hooks';
// components
import StatusBar from './status-bar';
import Board from './board';
import History from './history';
// utils
import type { IGamePlayers, IGameSettings } from 'utils/types';

type GameProps = {
  settings: IGameSettings;
  players: IGamePlayers;
};

const Game: FC<GameProps> = ({ settings, players }) => {
  const { currentMove, situation, squares, winner, moves, restart, makeMove, backToMove } = useGame(
    settings,
    players
  );
  const isGameOver = situation === 'DRAW' || situation === 'WIN';

  return (
    <section className='Game'>
      <div className='GameBoard'>
        <StatusBar
          situation={situation}
          moveNumber={currentMove.number}
          currentPlayerId={currentMove.playerId}
          winner={winner}
          players={players}
        />
        <Board size={settings.boardSize} squares={squares} onSquareClick={makeMove} />
        {isGameOver && <button onClick={restart}>Restart</button>}
      </div>
      <History moves={moves} onMoveListItemClick={backToMove} />
    </section>
  );
};

export default Game;
