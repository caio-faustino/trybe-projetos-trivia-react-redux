import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { playerEmail, playerName, score } = this.props;
    return (
      <div>
        <Header playerEmail={ playerEmail } playerName={ playerName } score={ score } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  playerName: state.name,
  playerEmail: state.gravatarEmail,
  score: state.score,
});

Feedback.propTypes = {
  playerEmail: PropTypes.string,
  playerName: PropTypes.string,
  score: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
