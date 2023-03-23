import md5 from 'crypto-js/md5';

const playerScore = 'ranking';

export const readRanking = () => JSON.parse(localStorage.getItem(playerScore));

const saveRanking = (ranking) => localStorage
  .setItem(playerScore, JSON.stringify(ranking));

export const setLocalRanking = (name, email, score) => {
    const playerEmail = md5(email).toString();
    const rankingAtual = readRanking();
    console.log(rankingAtual);
    const currRanking = {
        name,
        score,
        picture: `https://www.gravatar.com/avatar/${playerEmail}`,
    };
    if(rankingAtual.length === 0) {
      saveRanking([currRanking])
    } else {
      saveRanking([...rankingAtual, currRanking])
    }
};