import { RECEIVE_NAME, PLAYER_SCORE } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
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
  default:
    return state;
  }
};

export default player;
