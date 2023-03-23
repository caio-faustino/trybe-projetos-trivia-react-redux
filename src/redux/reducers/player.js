import { RECEIVE_NAME, PLAYER_SCORE, PLAYER_ASSERTION } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
};

export const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVE_NAME:
    return {
      ...state,
      player: {
        ...state.player,
        name: action.payload,
        gravatarEmail: action.email,
      },
    };
  case PLAYER_SCORE:
    return {
      ...state,
      player: {
        ...state.player,
        score: state.player.score + action.payload,
      },
    };
  case PLAYER_ASSERTION:
    return {
      ...state,
      player: {
        ...state.player,
        assertions: Number(state.player.assertions) + 1,
      },
    };
  default:
    return state;
  }
};

export default player;
