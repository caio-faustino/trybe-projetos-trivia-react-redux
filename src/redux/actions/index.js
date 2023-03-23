export const PLAYER_ASSERTION = 'PLAYER_ASSERTION';
export const CLEAR_STORE = 'CLEAR_STORE';
export const FINISH_LOADING = 'FINISH_LOADING';
export const RECEIVE_NAME = 'RECEIVE_NAME';
export const PLAYER_SCORE = 'PLAYER_SCORE';

export const receiveName = (name, email) => ({
  type: RECEIVE_NAME,
  payload: name,
  email,
});

export const playerScore = (score = 0) => ({
  type: PLAYER_SCORE,
  payload: score,
});

export const playerAssertion = ({
  type: PLAYER_ASSERTION,
});

export const clearStore = {
  type: CLEAR_STORE,
};

// const finishLoading = {
//   type: FINISH_LOADING,
// };

// export function fetchToken() {
//   return async () => {
//     const response = await fetch('https://opentdb.com/api_token.php?command=request');
//     const data = await response.json();
//     localStorage.setItem('token', data.token);
//   };
// }

// export function fetchQuest(token) {
//   return async (dispatch) => {
//     dispatch(startLoading);
//     const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
//     const data = await response.json();
//     dispatch(receiveQuestions(data));
//     dispatch(finishLoading);
//   };
// }
