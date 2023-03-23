import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Message from '../components/Message';
import FinalFeedback from '../components/FinalFeedback';
import { clearStore } from '../redux/actions';

class Feedback extends React.Component {
  playAgain = () => {
    const { history, dispatch } = this.props;
    history.push('/');
    dispatch(clearStore);
  };

  render() {
    const { playerEmail, playerName, score, assertions, history } = this.props;
    return (
      <div>
        <Header playerEmail={ playerEmail } playerName={ playerName } score={ score } />
        <Message acertos={ assertions } />
        <FinalFeedback points={ score } total={ assertions } />
        <button
          data-testid="btn-play-again"
          onClick={ () => this.playAgain() }
        >
          Play Again
        </button>
        <button
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  playerName: state.player.name,
  playerEmail: state.player.gravatarEmail,
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  playerEmail: PropTypes.string,
  playerName: PropTypes.string,
  score: PropTypes.string,
  assertions: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
