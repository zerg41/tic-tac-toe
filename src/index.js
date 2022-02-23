import React from 'react';
import ReactDOM from 'react-dom';
// components
import Game from './components/Game';
// styles
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <Game />
    </React.StrictMode>,
    document.getElementById('root')
);