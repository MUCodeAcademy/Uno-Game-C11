export const SET_GAME = "Set Game"
export const INITIAL_ACTIVE_GAME_STATE = false

export function gameReducer(state, action) {
    switch (action.type) {
        case SET_ACTIVE_GAME:
            return action.payload

        default:
            return state;
    }
}