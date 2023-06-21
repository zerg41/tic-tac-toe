import { FC, useLayoutEffect, useState } from 'react';
// components
import StatusBar from './status-bar';
import Board from './board';
import History from './history';
// utils
import { FIRST_PLAYER_ID, SECOND_PLAYER_ID, INITIAL_MOVE_NUMBER } from 'utils/constants';
import { EGameEvent, IBoard, IGame, IMove, IPlayer, ISquare } from 'utils/types';

const initialGameState: IGame['state'] = {
  situation: EGameEvent.Initializing,
  currentMoveNumber: INITIAL_MOVE_NUMBER,
  currentPlayerId: FIRST_PLAYER_ID,
  moves: [],
  boardState: [],
  winState: {
    rows: [],
    cols: [],
    diagonal: 0,
    antiDiagonal: 0,
    winner: null,
    winningLines: [],
  },
};

type GameProps = {
  settings: IGame['settings'];
  players: IGame['players'];
};

const Game: FC<GameProps> = ({ settings, players }) => {
  // GAME SESSION
  const [gameState, setGameState] = useState<IGame['state']>(initialGameState);
  const [gameHistory, setGameHistory] = useState<IGame['history']>({});

  const { boardSize } = settings;
  const { situation, currentMoveNumber, currentPlayerId, moves, boardState, winState } = gameState;
  const { winner } = winState;

  // Initialize Game
  useLayoutEffect(() => {
    if (situation === EGameEvent.Initializing) {
      initializeGame();
    }

    return () => {
      // restartGame();
    };
  }, [situation]);

  // Set Draw or Win
  // useLayoutEffect(() => {
  //   let newSituation: EGameEvent;

  //   if (boardState.length && currentMoveNumber === boardState.length + 1) {
  //     newSituation = EGameEvent.Draw;
  //     return;
  //   }

  //   if (winner) {
  //     newSituation = EGameEvent.Win;
  //     return;
  //   }

  //   setGameState((state) => ({ ...state, situation: newSituation }));
  // }, [currentMoveNumber, winner]);

  /* FUNCTIONS */
  function initializeGame() {
    setGameState((state) => {
      return {
        ...state,
        situation: EGameEvent.Ongoing,
        boardState: createBoard(settings.boardSize),
        winState: {
          ...winState,
          rows: new Array(settings.boardSize).fill(0),
          cols: new Array(settings.boardSize).fill(0),
        },
      };
    });
  }

  function restartGame() {
    setGameState(initialGameState);
    setGameHistory({});
  }

  function createBoard(size: IBoard['size']) {
    let board: IBoard['state'] = [];
    let squareId = 0;

    [...new Array(size)].forEach((_, rowIndex) => {
      [...new Array(size)].forEach((_, colIndex) => {
        let newSquare: ISquare = {
          id: squareId,
          position: { rowIndex, colIndex },
          occupation: null,
          isWinning: false,
        };

        board.push(newSquare);
        squareId++;
      });
    });

    return board;
  }

  function updateBoard(
    prevState: IBoard['state'],
    selectedSquareId: ISquare['id'],
    symbolSign: ISquare['occupation'],
    winningLines?: IGame['state']['winState']['winningLines']
  ) {
    function checkIsWinningSquare(
      squarePosition: ISquare['position'],
      winningLines: IGame['state']['winState']['winningLines']
    ) {
      return winningLines.some(
        ({ colIndex, rowIndex }) =>
          colIndex === squarePosition.colIndex && rowIndex === squarePosition.rowIndex
      );
    }

    const nextState = prevState.map((square) => {
      let isWinning = !!winningLines?.length && checkIsWinningSquare(square.position, winningLines);
      let occupation = square.id === selectedSquareId ? symbolSign : square.occupation;

      return {
        ...square,
        isWinning,
        occupation,
      };
    });

    return nextState;
  }

  function updateWinState(
    prevState: IGame['state']['winState'],
    squarePosition: ISquare['position'],
    currentPlayer: IPlayer
  ) {
    const { colIndex, rowIndex } = squarePosition;
    const boardSize = prevState.cols.length;
    const toAdd = currentPlayer.id === 1 ? 1 : -1;
    const nextState = { ...prevState };

    nextState.cols[colIndex] += toAdd;
    nextState.rows[rowIndex] += toAdd;

    if (colIndex === rowIndex) {
      nextState.diagonal += toAdd;
    }

    if (colIndex + rowIndex === boardSize - 1) {
      nextState.antiDiagonal += toAdd;
    }

    if (Math.abs(nextState.rows[rowIndex]) === boardSize) {
      nextState.winningLines = [...new Array(boardSize)].map((_, index) => ({
        colIndex: index,
        rowIndex: rowIndex,
      }));
    }
    if (Math.abs(nextState.cols[colIndex]) === boardSize) {
      nextState.winningLines = [...new Array(boardSize)].map((_, index) => ({
        colIndex: colIndex,
        rowIndex: index,
      }));
    }

    if (Math.abs(nextState.diagonal) === boardSize) {
      nextState.winningLines = [...new Array(boardSize)].map((_, index) => ({
        colIndex: index,
        rowIndex: index,
      }));
    }
    if (Math.abs(nextState.antiDiagonal) === boardSize) {
      nextState.winningLines = [...new Array(boardSize)].map((_, index) => ({
        colIndex: index,
        rowIndex: boardSize - index - 1,
      }));
    }

    if (nextState.winningLines?.length) {
      nextState.winner = currentPlayer;
    }

    console.log('nextWinState', nextState);

    return nextState;
  }

  // function updateHistory(
  //   moveNumber: keyof IGame['history'],
  //   move: IGame['history'][number]['move'],
  //   boardSnapshot: IGame['history'][number]['boardSnapshot']
  // ) {
  //   setHistory(
  //     (history) => ({ ...history, [moveNumber]: { move, boardSnapshot } } as IGame['history'])
  //   );
  // }

  // function clearHistory(moveNumber?: keyof IGame['history']) {
  //   let newHistory: IGame['history'] = {};

  //   if (moveNumber) {
  //     override = { ...gameHistory };

  //     for (let record in newHistory) {
  //       if (Number(record) >= moveNumber) {
  //         delete newHistory[record];
  //       }
  //     }
  //   }

  //   setHistory(newHistory);
  // }

  /* HANDLERS */
  function handleMove(selectedSquareId: ISquare['id']) {
    if (situation === EGameEvent.Ongoing) {
      const selectedSquare = boardState[selectedSquareId];
      const currentPlayer = players[currentPlayerId];
      let updatedSituation: EGameEvent = situation;

      const updatedWinState = updateWinState(winState, selectedSquare.position, currentPlayer);

      if (updatedWinState.winner) {
        updatedSituation = EGameEvent.Win;
      }

      const updatedBoard = updateBoard(
        boardState,
        selectedSquareId,
        currentPlayer.symbol,
        updatedWinState.winningLines
      );

      const currentMove: IMove = {
        playerId: currentPlayerId,
        squareId: selectedSquareId,
      };

      console.log('board=', updatedBoard);

      setGameState((state) => ({
        ...state,
        boardState: updatedBoard,
        situation: updatedSituation,
        winState: updatedWinState,
        currentPlayerId: currentPlayer.id === 1 ? 2 : 1,
        currentMoveNumber: state.currentMoveNumber + 1,
        moves: [...moves, currentMove],
      }));
      setGameHistory((history) => ({ ...history, [currentMoveNumber]: gameState }));
    }
  }

  function handleMoveBack(moveNumber: keyof IGame['history']) {
    if (situation === EGameEvent.Ongoing) {
      setGameState((state) => ({
        ...gameHistory[moveNumber],
        winState: { ...gameHistory[moveNumber].winState },
      }));
      setGameHistory((history) => Object.fromEntries(Object.entries(history).slice(0, moveNumber)));
    }

    console.log('stateBakMove', gameState);
  }

  return (
    <section className='Game'>
      <div className='GameBoard'>
        <StatusBar
          situation={situation}
          moveNumber={currentMoveNumber}
          currentPlayer={players[currentPlayerId]}
          winner={winner}
          players={players}
        />
        <Board size={boardSize} squares={boardState} onSelectSquare={handleMove} />

        <button onClick={restartGame}>Restart</button>
      </div>
      <History moves={moves} players={players} squares={boardState} onMoveBack={handleMoveBack} />
    </section>
  );
};

export default Game;
