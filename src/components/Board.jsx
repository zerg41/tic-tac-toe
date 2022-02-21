import React, { useCallback, useEffect, useMemo, useRef } from "react";
import Square from "./Square";


function Board({ squares, onClick }) {

    const renderSquare = useCallback((i) => {
        return (
            <Square
                key={i} 
                value={ squares[i] }
                onClick={ () => onClick(i) }                    
            />
        );
    }, []);

    const renderRow = (num) => {
        return (
            <div className="board-row">
                {/* {renderColumns(num)} */}
            </div>
        );
    };

    // const renderColumns

    const renderBoard = useMemo(() => {
        console.log(squares);
        return (
            squares.map( (value, index) => {
                if ((index + 1) % 3 === 0 || index === 0) {
                    console.log(index);
                    return <div className="board-row">{renderSquare(index)}</div>
                }
                return renderSquare(index)

            })
        );
    }, [squares]);
    

    return (
        <div>
            {renderBoard}
            {/* <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div> */}
        </div>
    );
}

export default Board;