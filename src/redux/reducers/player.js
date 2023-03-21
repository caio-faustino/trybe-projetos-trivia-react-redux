import { RECEIVE_QUESTION, START_LOADING, FINISH_LOADING } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
  allQuests: {},
  isLoading: false,
};

export const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVE_QUESTION:
    return {
      ...state,
      allQuests: action.payload,
    };

  case START_LOADING:
    return {
      ...state,
      isLoading: true,
    };
  case FINISH_LOADING:
    return {
      ...state,
      isLoading: false,
    };
  default:
    return state;
  }
};
