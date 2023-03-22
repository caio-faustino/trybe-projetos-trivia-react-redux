import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Questions from '../components/Questions';
import Header from '../components/Header';

class Game extends React.Component {
  state = {
    allQuestions: [],
    currentQuestion: {},
    isLoading: true,
    position: 0,
  };

  componentDidMount() {
    this.RequestQuests();
  }

  RequestQuests = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    const three = 3;
    if (data.response_code === three) {
      localStorage.clear();
      history.push('/');
    }
    this.setState({
      allQuestions: data.results,
      currentQuestion: data.results[0],
      isLoading: false,
    });
  };

  nextQuest = () => {
    this.setState((prev) => ({
      position: prev.position + 1,
    }));
    const { allQuestions, position } = this.state;
    this.setState({
      currentQuestion: allQuestions[position],
    });
  };

  render() {
    const { playerName, playerEmail, score } = this.props;
    const { isLoading, currentQuestion } = this.state;
    if (isLoading) { return (<p>Carregando...</p>); }
    return (
      <div>
        <Header playerName={ playerName } playerEmail={ playerEmail } score={ score } />
        <Questions currQuestion={ currentQuestion } nextQuestion={ this.nextQuest } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  playerName: state.player.name,
  playerEmail: state.player.gravatarEmail,
  score: state.player.score,
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(mapStateToProps)(Game);
