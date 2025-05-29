import { createContext, useContext } from 'react';

const AppContext = createContext({
    appState: null,
    dispatch: () => {},
    socket: null,
    gameId: null,
    playerColor: null
});

export function useAppContext() {
    return useContext(AppContext);
}

// Custom hook to check if it's the player's turn
export function useIsPlayerTurn() {
    const { appState, playerColor } = useAppContext();
    return appState.turn === playerColor;
}

// Custom hook to get the current game status
export function useGameStatus() {
    const { appState } = useAppContext();
    return {
        isGameOver: appState.status === 'finished',
        winner: appState.winner,
        isDraw: appState.isDraw
    };
}

// Custom hook for multiplayer functionality
export function useMultiplayer() {
    const { socket, gameId, playerColor } = useAppContext();
    
    return {
        isConnected: !!socket,
        gameId,
        playerColor,
        isHost: playerColor === 'w',
        isGuest: playerColor === 'b'
    };
}

// Custom hook to track moves
export function useMovesTracking() {
    const { appState } = useAppContext();
    return {
        currentPosition: appState.position[appState.position.length - 1],
        movesList: appState.movesList,
        lastMove: appState.movesList[appState.movesList.length - 1]
    };
}

export default AppContext;