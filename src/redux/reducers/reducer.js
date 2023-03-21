import { RECEIVE_NAME } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVE_NAME:
    return {
      ...state,
      name: action.payload,
      gravatarEmail: action.email,
    };
  default:
    return state;
  }
};

export default reducer;
