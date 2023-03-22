import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Questions from '../components/Questions';
import Header from '../components/Header';
import { playerScore } from '../redux/actions/index';

class Game extends React.Component {
  state = {
    allQuestions: [],
    currentQuestion: {},
    isLoading: true,
    position: 0,
    isCorrectAnswer: null,
    time: 30,
    isDisabled: false,
    buttonNext: false,
  };

  componentDidMount() {
    this.RequestQuests();
    const oneSecond = 1000;
    this.interval = setInterval(this.counter, oneSecond);
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

  handleAnswerClick = (answer) => {
    const { dispatch } = this.props;
    const { currentQuestion } = this.state;
    const { time } = this.state;
    const isCorrect = answer === currentQuestion.correct_answer;
    const updateScore = this.calculateScore(isCorrect, currentQuestion.difficulty, time);
    const feedback = this.displayAnswerFeedback(isCorrect);
    clearInterval(this.interval);
    this.setState({
      isCorrectAnswer: isCorrect,
      time: feedback,
      isDisabled: true,
    });
    if (isCorrect) {
      dispatch(playerScore(updateScore));
    } dispatch(playerScore(0));
    this.setState({
      buttonNext: true,
    });
  };

  calculateScore = (isCorrect, difficulty, time) => {
    let addScore = 0;
    let answerDifficulty = '';
    const baseCorrect = 10;
    const magicNumber = 3;
    if (isCorrect) {
      if (difficulty === 'easy') {
        answerDifficulty = 1;
      } else if (difficulty === 'medium') {
        answerDifficulty = 2;
      } else if (difficulty === 'hard') {
        answerDifficulty = magicNumber;
      }
      addScore = baseCorrect + (time * answerDifficulty);
      return addScore;
    }
    return 0;
  };

  displayAnswerFeedback = (isCorrect) => {
    let feedback = '';
    if (isCorrect) {
      feedback = 'Acertou';
    } else {
      feedback = 'Errou';
    }
    return feedback;
  };

  counter = () => {
    const { time } = this.state;
    if (time === 0) {
      clearInterval(this.interval);
      this.setState({
        time: 'Tempo Esgotado',
        isDisabled: true,
      });
    } else {
      this.setState((prevState) => ({
        time: prevState.time - 1,
        isDisabled: false,
      }));
    }
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
    const { isLoading, currentQuestion, isCorrectAnswer,
      isDisabled, buttonNext } = this.state;
    if (isLoading) { return (<p>Carregando...</p>); }
    return (
      <div>
        <Header playerName={ playerName } playerEmail={ playerEmail } score={ score } />
        <Questions
          currQuestion={ currentQuestion }
          nextQuestion={ this.nextQuest }
          handleAnswerClick={ this.handleAnswerClick }
          isCorrectAnswer={ isCorrectAnswer }
          isDisabled={ isDisabled }
          buttonNext={ buttonNext }
        />
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
