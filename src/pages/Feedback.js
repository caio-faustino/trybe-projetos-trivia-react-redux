import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Message from '../components/Message';
import FinalFeedback from '../components/FinalFeedback';

class Feedback extends React.Component {
  render() {
    const { playerEmail, playerName, score, assertions, history } = this.props;
    return (
      <div>
        <Header playerEmail={ playerEmail } playerName={ playerName } score={ score } />
        <Message acertos={ assertions } />
        <FinalFeedback points={ score } total={ assertions } />
        <button
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
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
  playerName: state.name,
  playerEmail: state.gravatarEmail,
  score: state.score,
  assertions: state.assertions,
});

Feedback.propTypes = {
  playerEmail: PropTypes.string,
  playerName: PropTypes.string,
  score: PropTypes.string,
  assertions: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
