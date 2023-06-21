import { BOARD_SIZE } from 'utils/constants';
import type { IBoard, IGame, IMove, IPlayer, ISquare, WinningPositions } from 'utils/types';

export function createBoard() {
  const size: IBoard['size'] = BOARD_SIZE;
  let board: IBoard['state'] = [];
  let squareId = 0;

  [...new Array(size)].forEach((_, rowIndex) => {
    [...new Array(size)].forEach((_, colIndex) => {
      let newSquare: ISquare = {
        id: squareId,
        position: { rowIndex, colIndex },
        value: null,
        isWinning: false,
      };

      board.push(newSquare);
      squareId++;
    });
  });

  return board;
}

function checkIsWinningSquare(
  squarePosition: ISquare['position'],
  winningPositions: WinningPositions
) {
  return winningPositions?.some(
    ({ colIndex, rowIndex }) =>
      colIndex === squarePosition.colIndex && rowIndex === squarePosition.rowIndex
  );
}

export function updateBoard(
  prevState: IBoard['state'],
  squareId: ISquare['id'],
  symbolSign: ISquare['value'],
  winningPositions: WinningPositions
) {
  const nextState = prevState.map((square) => {
    let isWinning = !!winningPositions && checkIsWinningSquare(square.position, winningPositions);
    let value = square.id === squareId ? symbolSign : square.value;

    return {
      ...square,
      isWinning,
      value,
    };
  });

  return nextState;
}

export function updateHistory(prevHistory: IGame['history'], moveNumber: keyof IGame['history']) {
  return Object.fromEntries(Object.entries(prevHistory).slice(0, moveNumber - 1));
}

export function updateSituation(
  prevSituation: IGame['situation'],
  nextMoveNumber: IGame['state']['currentMoveState']['moveNumber'],
  winner: IGame['winner'],
  boardSize = BOARD_SIZE
) {
  let situation: IGame['situation'] = prevSituation;

  if (!!winner) {
    situation = 'WIN';
  } else if (nextMoveNumber > boardSize * boardSize) {
    situation = 'DRAW';
  }

  return situation;
}

// function updatePoints(
//   prevState: IGame['state']['points'],
//   squarePosition: ISquare['position'],
//   currentPlayer: IPlayer
// ) {
//   const { colIndex, rowIndex } = squarePosition;
//   const boardSize = prevState.cols.length;
//   const toAdd = currentPlayer.id === 1 ? 1 : -1;
//   const nextState = { ...prevState };

//   nextState.cols[colIndex] += toAdd;
//   nextState.rows[rowIndex] += toAdd;

//   if (colIndex === rowIndex) {
//     nextState.diagonal += toAdd;
//   }

//   if (colIndex + rowIndex === boardSize - 1) {
//     nextState.antiDiagonal += toAdd;
//   }

//   if (Math.abs(nextState.rows[rowIndex]) === boardSize) {
//     nextState.winningLines = [...new Array(boardSize)].map((_, index) => ({
//       colIndex: index,
//       rowIndex: rowIndex,
//     }));
//   }
//   if (Math.abs(nextState.cols[colIndex]) === boardSize) {
//     nextState.winningLines = [...new Array(boardSize)].map((_, index) => ({
//       colIndex: colIndex,
//       rowIndex: index,
//     }));
//   }

//   if (Math.abs(nextState.diagonal) === boardSize) {
//     nextState.winningLines = [...new Array(boardSize)].map((_, index) => ({
//       colIndex: index,
//       rowIndex: index,
//     }));
//   }
//   if (Math.abs(nextState.antiDiagonal) === boardSize) {
//     nextState.winningLines = [...new Array(boardSize)].map((_, index) => ({
//       colIndex: index,
//       rowIndex: boardSize - index - 1,
//     }));
//   }

//   if (nextState.winningLines?.length) {
//     nextState.winner = currentPlayer;
//   }

//   console.log('nextWinState', nextState);

//   return nextState;
// }

export function checkWin(
  move: IMove,
  prevPoints: IGame['state']['points'],
  prevWinner: IGame['winner'],
  prevWinningPositions: IGame['winningPositions'],
  boardSize = BOARD_SIZE
) {
  const {
    player,
    square: {
      position: { colIndex, rowIndex },
    },
  } = move;

  const toAdd = player.id === 1 ? 1 : -1;
  const nextPoints = { ...prevPoints, cols: [...prevPoints.cols], rows: [...prevPoints.rows] };
  let nextWinner = prevWinner;
  let nextWinningPositions: IGame['winningPositions'] = prevWinningPositions;

  nextPoints.cols[colIndex] += toAdd;
  nextPoints.rows[rowIndex] += toAdd;

  if (colIndex === rowIndex) {
    nextPoints.diagonal += toAdd;
  }

  if (colIndex + rowIndex === boardSize - 1) {
    nextPoints.antiDiagonal += toAdd;
  }

  if (Math.abs(nextPoints.rows[rowIndex]) === boardSize) {
    nextWinningPositions = [...new Array(boardSize)].map((_, index) => ({
      colIndex: index,
      rowIndex: rowIndex,
    })) as IGame['winningPositions'];
  }
  if (Math.abs(nextPoints.cols[colIndex]) === boardSize) {
    nextWinningPositions = [...new Array(boardSize)].map((_, index) => ({
      colIndex: colIndex,
      rowIndex: index,
    })) as IGame['winningPositions'];
  }
  if (Math.abs(nextPoints.diagonal) === boardSize) {
    nextWinningPositions = [...new Array(boardSize)].map((_, index) => ({
      colIndex: index,
      rowIndex: index,
    })) as IGame['winningPositions'];
  }
  if (Math.abs(nextPoints.antiDiagonal) === boardSize) {
    nextWinningPositions = [...new Array(boardSize)].map((_, index) => ({
      colIndex: index,
      rowIndex: boardSize - index - 1,
    })) as IGame['winningPositions'];
  }

  if (!!nextWinningPositions) {
    nextWinner = player.name;
  }

  return {
    nextPoints,
    nextWinner,
    nextWinningPositions,
  } as {
    nextPoints: IGame['state']['points'];
    nextWinner: IGame['winner'];
    nextWinningPositions: IGame['winningPositions'];
  };
}
