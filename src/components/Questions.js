import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { playerScore } from '../redux/actions/index';
import shuffleArray from '../tests/helpers/shuffleArray';

class Questions extends React.Component {
  state = {
    mixedAnswers: [],
    isCorrectAnswer: null,
    time: 30,
    isDisabled: false,
  };

  componentDidMount() {
    const oneSecond = 1000;
    this.mixAnswers();
    this.interval = setInterval(this.counter, oneSecond);
  }

  mixAnswers = () => {
    const { currQuestion } = this.props;
    const answers = [];
    answers.push(currQuestion.correct_answer);
    answers.push(...currQuestion.incorrect_answers);
    const mixed = shuffleArray(answers);
    this.setState({
      mixedAnswers: mixed,
    });
  };

  handleAnswerClick = (answer) => {
    const { currQuestion, dispatch } = this.props;
    const { time } = this.state;
    const isCorrect = answer === currQuestion.correct_answer;
    const updateScore = this.calculateScore(isCorrect, currQuestion.difficulty, time);
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

  render() {
    const { currQuestion } = this.props;
    const { category, question } = currQuestion;
    const { mixedAnswers, isCorrectAnswer, time, isDisabled } = this.state;
    return (
      <div>
        <div>
          <p data-testid="question-category">{ category }</p>
          <p data-testid="question-text">{ question }</p>
          <div data-testid="answer-options">
            {/* <button data-testid="correct-answer">{ currQuestion.correct_answer }</button> */}
            { mixedAnswers.map((answer, i) => {
              let className = '';
              if (isCorrectAnswer === null) {
                className = '';
              } else if (answer === currQuestion.correct_answer) {
                className = 'correct';
              } else {
                className = 'incorrect';
              }
              return (
                <button
                  key={ i }
                  data-testid={ answer !== currQuestion.correct_answer
                    ? `wrong-answer-${i}` : 'correct-answer' }
                  onClick={ () => this.handleAnswerClick(answer) }
                  disabled={ isDisabled }
                  className={ className }
                >
                  { answer }
                </button>
              );
            })}
          </div>
          <button>Next</button>
          <div className="timer-wrapp">
            <span>{ time }</span>
          </div>
        </div>
      </div>
    );
  }
}

Questions.propTypes = {
  currQuestion: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }),
}.isRequired;

export default connect(null)(Questions);
