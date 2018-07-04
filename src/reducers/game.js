import * as vars from '../vars';

// #### action types ####
export const SET_SHOW_START_SCREEN = 'GAME_SET_SHOW_START_SCREEN';
export const SET_GAME_RUNNING = 'GAME_SET_GAME_RUNNING';

export const UPDATE_NUM_ROWS = 'GAME_UPDATE_NUM_ROWS';
export const UPDATE_NUM_COLS = 'GAME_UPDATE_NUM_COLS';


// #### action creators ####
export const showStartScreen = () => ({type: SET_SHOW_START_SCREEN, payload: true});
export const hideStartScreen = () => ({type: SET_SHOW_START_SCREEN, payload: false});

export const startGame = () => ({type: SET_GAME_RUNNING, payload: true});
export const stopGame = () => ({type: SET_GAME_RUNNING, payload: false});

export const updateNumRows = payload => ({type: UPDATE_NUM_ROWS, payload});
export const updateNumCols = payload => ({type: UPDATE_NUM_COLS, payload});
export const actions = {
	showStartScreen,
	hideStartScreen,

	startGame,
	stopGame,

	updateNumRows,
	updateNumCols
};


const INITIAL_STATE = {
	show_start_screen: true,
	game_running: false,
	difficultySetting: vars.EASY_MODE,

	num_rows: 3,
	num_cols: 3
};


export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
		case SET_SHOW_START_SCREEN:
			return {...state, show_start_screen: action.payload};

		case SET_GAME_RUNNING:
			return {...state, game_running: action.payload};

		case UPDATE_NUM_ROWS:
			if (state.game_running)
				return state;
			return {...state, num_rows: action.payload};
		case UPDATE_NUM_COLS:
			if (state.game_running)
				return state;
			return {...state, num_cols: action.payload};

		default:
			return state;
	}
}