import './App.css';
import Board from './components/Board/Board';
import { reducer } from './reducer/reducer';
import { useReducer, useEffect, useState } from 'react';
import { initGameState } from './constants';
import AppContext from './contexts/Context';
import Control from './components/Control/Control';
import MovesList from './components/Control/bits/MovesList';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

function App() {
    const [appState, dispatch] = useReducer(reducer, initGameState);
    const [gameId, setGameId] = useState(null);
    const [playerColor, setPlayerColor] = useState(null);

    useEffect(() => {
        const handleGameCreated = ({ gameId, color }) => {
            setGameId(gameId);
            setPlayerColor(color);
            alert(`Game created! Share this ID with your opponent: ${gameId}`);
        };

        const handlePlayerColor = (color) => {
            setPlayerColor(color);
        };

        const handleGameStarted = (gameState) => {
            console.log('Game started:', gameState);
            alert(`Game started! You are playing as ${playerColor === 'w' ? 'white' : 'black'}`);
        };

        const handleMoveMade = ({ newPosition, newMove, turn, piece, moveNumber, gameStatus, MovesList }) => {
            console.log('Move received:', { newPosition, newMove, turn, piece, moveNumber, gameStatus, MovesList });

            // Always update state when receiving move from server
            dispatch({
                type: 'NEW_MOVE',
                payload: {
                    newPosition,
                    newMove,
                    turn,
                    piece,
                    moveNumber,
                    gameStatus,
                    movesList: MovesList
                }
            });

            // Handle game status changes if needed
            if (gameStatus === 'finished') {
                dispatch({
                    type: 'GAME_OVER',
                    payload: { winner: piece[0] }
                });
            }
        };

        const handleGameError = (error) => {
            console.error('Game error:', error);
            alert(error.message);
        };

        // Set up socket event listeners
        socket.on('gameCreated', handleGameCreated);
        socket.on('playerColor', handlePlayerColor);
        socket.on('gameStarted', handleGameStarted);
        socket.on('moveMade', handleMoveMade);
        socket.on('gameError', handleGameError);

        // Cleanup function
        return () => {
            socket.off('gameCreated', handleGameCreated);
            socket.off('playerColor', handlePlayerColor);
            socket.off('gameStarted', handleGameStarted);
            socket.off('moveMade', handleMoveMade);
            socket.off('gameError', handleGameError);
        };
    }, [playerColor]);

    const createGame = () => {
        socket.emit('createGame');
    };

    const joinGame = () => {
        const gameId = prompt('Enter game ID:');
        if (gameId) {
            socket.emit('joinGame', gameId);
        }
    };

    const providerState = {
        appState,
        dispatch,
        gameId,
        socket,
        playerColor
    };

    return (
        <AppContext.Provider value={providerState}>
            <div className="App">
                <Board />
                <Control>
                    <MovesList />
                    <div className="game-controls">
                        <button
                            onClick={createGame}
                            disabled={gameId !== null}
                        >
                            Create Game
                        </button>
                        <button
                            onClick={joinGame}
                            disabled={gameId !== null}
                        >
                            Join Game
                        </button>
                    </div>
                    {playerColor && (
                        <div className="game-info">
                            Playing as: {playerColor === 'w' ? 'White' : 'Black'}
                            {gameId && <div>Game ID: {gameId}</div>}
                        </div>
                    )}
                </Control>
            </div>
        </AppContext.Provider>
    );
}

export default App;