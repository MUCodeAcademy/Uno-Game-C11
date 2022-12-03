export const TOGGLE_IS_GAME_ACTIVE = "Is Game Active";
export const TOGGLE_IS_HOST = "Is Host";
export const SET_PLAY_DECK = "Set Play Deck";
export const SET_DISCARD_DECK = "Set Play Deck";
export const SET_PLAYERS = "Set Players";
export const SET_ACTIVE_CARD = "Set Active Card";
export const SET_IS_REVERSE = "Is Reverse";
export const SET_SHUFFLING = "Shuffling";
export const SET_TURN = "Turn";

export const INITIAL_GAME_STATE = {
    isGameActive: false,
    isHost: false,
    playDeck: [],
    discardDeck: [],
    players: [],
    activeCard: {},
    isReverse: false,
    shuffling: false,
    turn: 0,
};

export function gameReducer(state, action) {
    switch (action.type) {
        case TOGGLE_IS_GAME_ACTIVE:
            const game = state.isGameActive === false ? true : false;
            return { ...state, isGameActive: game };
        case TOGGLE_IS_HOST:
            const host = state.isHost === false ? true : false;
            return { ...state, isHost: host };
        case SET_PLAY_DECK:
            return action.payload;
        case SET_DISCARD_DECK:
            return action.payload;
        case SET_PLAYERS:
            return action.payload;
        case SET_ACTIVE_CARD:
            return action.payload;
        case SET_IS_REVERSE:
            const reverse = state.isReverse === false ? true : false;
            return { ...state, isReverse: reverse };
        case SET_SHUFFLING:
            const isShuffling = state.shuffling === false ? true : false;
            return { ...state, shuffling: isShuffling };
        case SET_TURN:
            return action.payload;
    }
}
