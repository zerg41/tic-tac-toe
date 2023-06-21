import { useEffect, useState } from 'react';
import {
  checkWin,
  createBoard,
  updateBoard,
  updateHistory,
  updateSituation,
} from 'utils/functions';
import type { IBoard, IGame, IGamePlayers, IGameSettings, IMove, ISquare } from 'utils/types';

export const initialState: IGame = {
  state: {
    currentMoveState: {
      moveNumber: 1,
      playerId: 1,
    },
    moveHistory: [],
    boardState: [],
    points: {
      rows: [],
      cols: [],
      diagonal: 0,
      antiDiagonal: 0,
    },
  },
  history: {},
  situation: 'INITIALIZING',
  winner: null,
  winningPositions: null,
};

interface IGameInstance {
  winner: IGame['winner'];
  situation: IGame['situation'];
  squares: IBoard['state'];
  moves: IGame['state']['moveHistory'];
  currentMove: {
    number: IGame['state']['currentMoveState']['moveNumber'];
    playerId: IGame['state']['currentMoveState']['playerId'];
  };
  restart: () => void;
  makeMove: (squareId: ISquare['id']) => void;
  backToMove: (moveNumber: number) => void;
}

type GameHook = (settings: IGameSettings, players: IGamePlayers) => IGameInstance;

const useGame: GameHook = ({ boardSize }, players) => {
  const [game, setGame] = useState<IGame>(initialState);
  const {
    situation,
    winner,
    winningPositions,
    state: { boardState, currentMoveState, moveHistory, points },
    history,
  } = game;

  useEffect(() => {
    console.log(game);
  });

  useEffect(() => {
    if (situation === 'INITIALIZING') {
      setGame((game) => ({
        ...game,
        situation: 'ONGOING',
        state: {
          ...game.state,
          boardState: createBoard(),
          points: {
            ...game.state.points,
            cols: new Array(boardSize).fill(0),
            rows: new Array(boardSize).fill(0),
          },
        },
      }));
    }
  }, [situation, boardSize]);

  /* API FUNCTIONS */

  function restart() {
    setGame(() => initialState);
  }

  function makeMove(squareId: ISquare['id']) {
    if (situation === 'ONGOING') {
      const selectedSquare = boardState[squareId];
      const currentPlayer = players[currentMoveState.playerId];
      const currentMove: IMove = {
        player: currentPlayer,
        square: selectedSquare,
      };
      const { nextPoints, nextWinner, nextWinningPositions } = checkWin(
        currentMove,
        points,
        winner,
        winningPositions,
        boardSize
      );
      const nextMoveNumber = currentMoveState.moveNumber + 1;
      const nextPlayerId = currentMoveState.playerId === 1 ? 2 : 1;
      const nextSituation = updateSituation(situation, nextMoveNumber, nextWinner, boardSize);
      const nextBoardState = updateBoard(
        boardState,
        squareId,
        currentPlayer.symbol,
        nextWinningPositions
      );

      setGame((game) => ({
        ...game,
        situation: nextSituation,
        winningPositions: nextWinningPositions,
        winner: nextWinner,
        state: {
          ...game.state,
          boardState: nextBoardState,
          currentMoveState: { moveNumber: nextMoveNumber, playerId: nextPlayerId },
          moveHistory: [...game.state.moveHistory, currentMove],
          points: nextPoints,
        },
        history: {
          ...game.history,
          [currentMoveState.moveNumber]: game.state,
        },
      }));
    }
  }

  function backToMove(moveNumber: keyof IGame['history']) {
    if (situation === 'ONGOING') {
      setGame((game) => ({
        ...game,
        state: { ...game.history[moveNumber] },
        history: updateHistory(game.history, moveNumber),
      }));
    }
  }

  return {
    squares: boardState,
    moves: moveHistory,
    history,
    winner,
    situation,
    currentMove: {
      number: currentMoveState.moveNumber,
      playerId: currentMoveState.playerId,
    },
    restart,
    makeMove,
    backToMove,
  };
};

export default useGame;
