export const SET_USER = "Set User";
export const CLEAR_USER = "Clear User";

export const INITIAL_USER_STATE = null;

export function userReducer(state, action) {
    switch (action.type) {
        case SET_USER:
            return action.payload;
        case CLEAR_USER:
            return INITIAL_USER_STATE;
        default:
            return state;
    }
}
