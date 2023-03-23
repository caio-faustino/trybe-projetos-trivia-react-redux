import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { readRanking } from '../tests/helpers/localStorage';
import { clearStore } from '../redux/actions';

class Ranking extends React.Component {
  state = {
    isLoading: true,
    playerRanking: [],
  };

  componentDidMount() {
    this.readLocalStorage();
  }

  playAgain = () => {
    const { history, dispatch } = this.props;
    history.push('/');
    dispatch(clearStore);
  };

  readLocalStorage = () => {
    const playerPositions = readRanking();
    this.setState({
      playerRanking: playerPositions,
      isLoading: false,
    });
  };

  render() {
    const { playerRanking, isLoading } = this.state;
    const decrescente = playerRanking.sort((a, b) => b.score - a.score);
    if (isLoading) { return (<p>Carregando...</p>); }
    return (
      <div>
        <h2 data-testid="ranking-title">Tela de ranking</h2>
        <div>
          { decrescente.map((player, index) => (
            <div key={ index }>
              <img src={ player.picture } alt={ player.name } />
              <h4
                data-testid={ `player-name-${index}` }
              >
                {player.name}
              </h4>
              <p data-testid={ `player-score-${index}` }>{ player.score }</p>
            </div>
          ))}
        </div>
        <button
          data-testid="btn-go-home"
          onClick={ () => this.playAgain() }
        >
          Voltar ao Login
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(null)(Ranking);
