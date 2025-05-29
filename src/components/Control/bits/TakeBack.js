// import { useAppContext } from '../../../contexts/Context'
// import { takeBack } from '../../../reducer/actions/move'

// const TakeBack = () => {
//     const { dispatch, socket, gameId, playerColor } = useAppContext()

//     const handleTakeBack = () => {
//         if (socket && gameId) {
//             socket.emit('takeBack', { gameId });
//         }
//         dispatch(takeBack())
//     }

//     return (
//         <button 
//             className="take-back-btn" 
//             onClick={handleTakeBack}
//             disabled={!socket || !gameId}
//         >
//             Take Back
//         </button>
//     )
// }

// export default TakeBack