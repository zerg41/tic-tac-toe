import React from "react";
// components
import Square from "./Square";


function Board({ boardSize, squares, onClick }) {

    const renderSquare = (index) => {

        return (
            <Square
                key={ index } 
                value={ squares[index] }
                onClick={ () => onClick(index) }                    
            />
        );
    };

    const renderColumns = (index) => {
        const colList = [];

        for (let col = 0; col < boardSize; col++) {
            const squareIndex = col + index * boardSize;
            colList.push(renderSquare(squareIndex));
        }

        return colList.map((col) => col);
    };

    const renderBoard = () => {
        const rowList = [];

        for (let row = 0; row < boardSize; row++) {
            rowList.push(<div className="board-row">{renderColumns(row)}</div>);
        }

        return rowList.map((row) => row);
    };
    
    return (
        <div className="game-board">
            {renderBoard()}
        </div>
    );
}

export default Board;