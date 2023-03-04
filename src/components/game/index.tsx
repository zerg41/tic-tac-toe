import React, { FC, useEffect, useLayoutEffect, useState } from 'react';
// components
import StatusBar from './status-bar';
import Board from './board';
// utils
import { EGameEvent, IBoard, IGame, IPlayer, IPlayerOne, IPlayerTwo, ISquare } from 'types';
import { ESymbol } from 'types/common';
import History from './history';

const INITIAL_MOVE_NUMBER = 1;
const DEFAULT_PLAYER_NAME = 'anonymous';
const FIRST_PLAYER_ID: IPlayerOne['id'] = 1;
const SECOND_PLAYER_ID: IPlayerTwo['id'] = 2;

const defaultPlayerOne: IPlayerOne = {
  id: FIRST_PLAYER_ID,
  symbol: ESymbol.Cross,
  name: DEFAULT_PLAYER_NAME,
};
const defaultPlayerTwo: IPlayerTwo = {
  id: SECOND_PLAYER_ID,
  symbol: ESymbol.Zero,
  name: DEFAULT_PLAYER_NAME,
};

interface WinState {
  rows: number[];
  cols: number[];
  diagonal: number;
  antiDiagonal: number;
}

type GameProps = {
  settings: IGame['settings'];
};

const Game: FC<GameProps> = ({ settings }) => {
  const [players, setPlayers] = useState<IGame['players']>({
    1: defaultPlayerOne,
    2: defaultPlayerTwo,
  });
  // GAME SESSION
  const [boardState, setBoardState] = useState<IBoard['state']>([]);
  const [history, setHistory] = useState<IGame['history']>({});
  const [situation, setSituation] = useState<IGame['situation']>(EGameEvent.Initializing);
  // MOVE SESSION
  const [currentPlayerId, setCurrentPlayerId] = useState<keyof IGame['players']>(FIRST_PLAYER_ID);
  const [currentMoveNumber, setCurrentMoveNumber] = useState<number>(INITIAL_MOVE_NUMBER);
  const [isInHistoryState, setIsInHistoryState] = useState(false);
  const [winner, setWinner] = useState<IPlayer>();
  // TEMP
  const [winState, setWinState] = useState<WinState>({
    rows: new Array(settings.boardSize).fill(0),
    cols: new Array(settings.boardSize).fill(0),
    diagonal: 0,
    antiDiagonal: 0,
  });

  const nextMoveNumber = currentMoveNumber + 1;

  // Initialize Game
  useEffect(() => {
    const newBoard = createBoard(settings.boardSize);
    const newPlayers = { ...players };
    newPlayers[FIRST_PLAYER_ID].name = settings.playerNames[FIRST_PLAYER_ID];
    newPlayers[SECOND_PLAYER_ID].name = settings.playerNames[SECOND_PLAYER_ID];

    setBoardState(newBoard);

    setPlayers(newPlayers);

    setTimeout(() => {
      setSituation(EGameEvent.Ongoing);
    }, 3000);

    return () => {
      setPlayers({ 1: defaultPlayerOne, 2: defaultPlayerTwo });
      setBoardState([]);
      setIsInHistoryState(false);
      clearHistory();
      setSituation(EGameEvent.Initializing);
      setCurrentMoveNumber(INITIAL_MOVE_NUMBER);
      setCurrentPlayerId(FIRST_PLAYER_ID);
    };
  }, []);

  // Set Draw or Win
  useLayoutEffect(() => {
    if (boardState.length && currentMoveNumber === boardState.length + 1) {
      setSituation(EGameEvent.Draw);
      return;
    }

    if (winner) {
      setSituation(EGameEvent.Win);
      return;
    }
  }, [currentMoveNumber, winner]);

  function updateHistory(
    moveNumber: keyof IGame['history'],
    move: IGame['history'][number]['move'],
    boardSnapshot: IGame['history'][number]['boardSnapshot']
  ) {
    setHistory(
      (history) => ({ ...history, [moveNumber]: { move, boardSnapshot } } as IGame['history'])
    );
  }

  function clearHistory(moveNumber?: keyof IGame['history']) {
    let newHistory: IGame['history'] = {};

    if (moveNumber) {
      newHistory = { ...history };

      for (let record in newHistory) {
        if (Number(record) >= moveNumber) {
          delete newHistory[record];
        }
      }
    }

    setHistory(newHistory);
  }

  function updateBoard(selectedSquareId: ISquare['id']) {
    let selectedSquare = boardState.find((square) => square.id === selectedSquareId);

    if (selectedSquare) {
      setBoardState((squares) =>
        squares.map((square) => {
          if (square.id !== selectedSquareId) {
            return square;
          }

          return {
            ...square,
            occupation: players[currentPlayerId].symbol,
          };
        })
      );
    }
  }

  function checkWinner(
    colIndex: ISquare['position']['colIndex'],
    rowIndex: ISquare['position']['rowIndex']
  ) {
    const size = settings.boardSize;
    const toAdd = currentPlayerId === FIRST_PLAYER_ID ? 1 : -1;
    let newWinState = { ...winState };

    newWinState.cols[colIndex] += toAdd;
    newWinState.rows[rowIndex] += toAdd;

    if (colIndex === rowIndex) {
      newWinState.diagonal += toAdd;
    }

    if (colIndex + rowIndex === size - 1) {
      newWinState.antiDiagonal += toAdd;
    }

    setWinState(newWinState);

    if (
      Math.abs(newWinState.rows[rowIndex]) === size ||
      Math.abs(newWinState.cols[colIndex]) === size ||
      Math.abs(newWinState.diagonal) === size ||
      Math.abs(newWinState.antiDiagonal) === size
    ) {
      setWinner(players[currentPlayerId]);
      return true;
    }

    return false;
  }

  function switchPlayer() {
    setCurrentPlayerId((currentPlayerId) =>
      currentPlayerId === FIRST_PLAYER_ID ? SECOND_PLAYER_ID : FIRST_PLAYER_ID
    );
  }

  /* Handlers */
  function handleMove(selectedSquareId: ISquare['id']) {
    if (situation === EGameEvent.Ongoing) {
      if (isInHistoryState) {
        clearHistory(nextMoveNumber);
        setIsInHistoryState(false);
      }

      let move: IGame['history'][number]['move'] = {
        playerId: currentPlayerId,
        squareId: selectedSquareId,
      };

      updateBoard(selectedSquareId);
      updateHistory(currentMoveNumber, move, boardState);

      let colIndex = boardState[selectedSquareId].position.colIndex;
      let rowIndex = boardState[selectedSquareId].position.rowIndex;

      if (checkWinner(colIndex, rowIndex)) {
        return;
      }

      switchPlayer();
      setCurrentMoveNumber(nextMoveNumber);
    }
  }

  function handleMoveBack(moveNumber: keyof IGame['history']) {
    let playerId = history[moveNumber].move.playerId;
    let boardSnapshot = history[moveNumber].boardSnapshot;

    setBoardState(boardSnapshot);
    setCurrentPlayerId(playerId);
    setCurrentMoveNumber(moveNumber);
    setIsInHistoryState(true);
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
        <Board size={settings.boardSize} squares={boardState} onSelectSquare={handleMove} />
      </div>
      <History
        history={history}
        players={players}
        squares={boardState}
        onMoveBack={handleMoveBack}
      />
    </section>
  );
};

export default Game;

function createBoard(size: IBoard['size']) {
  let newBoard: IBoard['state'] = [];
  let squareId = 0;

  [...new Array(size)].forEach((_, rowIndex) => {
    [...new Array(size)].forEach((_, colIndex) => {
      let newSquare: ISquare = {
        id: squareId,
        position: { rowIndex, colIndex },
        occupation: null,
        isWinning: false,
      };

      squareId++;
      newBoard.push(newSquare);
    });
  });

  return newBoard;
}
