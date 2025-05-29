import arbiter from '../../arbiter/arbiter';
import { useAppContext } from '../../contexts/Context'
import { generateCandidates } from '../../reducer/actions/move';

const Piece = ({ rank, file, piece }) => {
    const { appState, dispatch, playerColor } = useAppContext();
    const { turn } = appState;

    const onDragStart = e => {
        // Only allow dragging if it's the player's turn
        if (turn === piece[0] && (!playerColor || playerColor === piece[0])) {
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/plain", `${piece},${rank},${file}`);
            setTimeout(() => {
                e.target.style.display = 'none'
            }, 0);

            const candidateMoves = arbiter.getValidMoves({
                position: appState.position[appState.position.length - 1],
                prevPosition: appState.position[appState.position.length - 2],
                castleDirection: appState.castleDirection[turn],
                piece,
                file: Number(file),
                rank: Number(rank)
            });
            dispatch(generateCandidates({ candidateMoves }));
        } else {
            e.preventDefault();
        }
    }

    const onDragEnd = e => {
        e.target.style.display = 'block'
    }

    return (
        <div
            className={`piece ${piece} p-${file}${rank}`}
            draggable={turn === piece[0] && playerColor === piece[0]}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            data-square={`${rank}${file}`}
        />
    )
}

export default Piece