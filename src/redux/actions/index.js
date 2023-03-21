export const RECEIVE_QUESTION = 'RECEIVE_QUESTION';
export const START_LOADING = 'START_LOADING';
export const FINISH_LOADING = 'FINISH_LOADING';

// const receiveQuestions = (quest) => ({
//   type: RECEIVE_QUESTION,
//   payload: quest,
// });

// const startLoading = {
//   type: START_LOADING,
// };

// const finishLoading = {
//   type: FINISH_LOADING,
// };

export function fetchToken() {
  return async () => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    localStorage.setItem('token', data.token);
  };
}

// export function fetchQuest(token) {
//   return async (dispatch) => {
//     dispatch(startLoading);
//     const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
//     const data = await response.json();
//     dispatch(receiveQuestions(data));
//     dispatch(finishLoading);
//   };
// }
