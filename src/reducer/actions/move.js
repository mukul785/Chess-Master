import actionTypes from '../actionTypes';

export const makeNewMove = ({newPosition, newMove, turn}) => {
    return {
        type: actionTypes.NEW_MOVE,
        payload: {newPosition, newMove, turn},
    }
}

export const clearCandidates = () => {
    return {
        type: actionTypes.CLEAR_CANDIDATE_MOVES,
    }
}

export const generateCandidates = ({candidateMoves}) => {
    return {
        type: actionTypes.GENERATE_CANDIDATE_MOVES,
        payload: { candidateMoves }
    }
}

// export const takeBack = () => {
//     return {
//         type: actionTypes.TAKE_BACK,
//     }
// }
