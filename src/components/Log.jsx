import React from 'react';

function Log({ history, handleMove }) {
  let movesList = history.map((step, move) => {
    let description = move ? `Go To Move #${move}` : `Go To Game Start`;

    return move !== 0 ? (
      <li className='log__list-item' key={move}>
        <button onClick={() => handleMove(move)}>{description}</button>
      </li>
    ) : (
      <></>
    );
  });

  return (
    <div className='log'>
      <h2>Moves Log</h2>
      <ol className='log__list'>{movesList}</ol>
    </div>
  );
}

export default Log;
