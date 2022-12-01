export const SET_ACTIVE_MESSAGE = "Set Message";
export const INITIAL_ACTIVE_MESSAGE_STATE = false;

export function messageReducer(state, action) {
    switch (action.type) {
        case SET_ACTIVE_MESSAGE:
            return action.payload;
        default:
            return state;
    }
}
