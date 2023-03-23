import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { playerScore } from '../redux/actions/index';
// import shuffleArray from '../tests/helpers/shuffleArray';

class Questions extends React.Component {
  state = {
    // mixedAnswers: [],
    // isCorrectAnswer: null,
    time: 30,
    // isDisabled: false,
    // buttonNext: false,
  };

  componentDidMount() {
    // const oneSecond = 1000;
    // this.mixAnswers();
    // this.interval = setInterval(this.counter, oneSecond);
  }

  // mixAnswers = () => {
  //   const { currQuestion } = this.props;
  //   console.log(currQuestion);
  //   const answers = [];
  //   answers.push(currQuestion.correct_answer);
  //   answers.push(...currQuestion.incorrect_answers);
  //   const mixed = shuffleArray(answers);
  //   this.setState({
  //     mixedAnswers: mixed,
  //   });
  // };

  render() {
    const { currQuestion, nextQuestion, handleAnswerClick,
      isCorrectAnswer, isDisabled, buttonNext, mixedAnswers } = this.props;
    const { category, question } = currQuestion;
    const { time } = this.state;
    return (
      <div>
        <div>
          <p data-testid="question-category">{ category }</p>
          <p data-testid="question-text">{ question }</p>
          <div data-testid="answer-options">
            { mixedAnswers.map((answer, i) => {
              let className = '';
              if (isCorrectAnswer === null) {
                className = '';
              } else if (answer === currQuestion.correct_answer) {
                className = 'correct';
              } else {
                className = 'incorrect';
              }
              // console.log('classname', className);
              // console.log(currQuestion.correct_answer);
              return (
                <button
                  key={ i }
                  data-testid={ answer !== currQuestion.correct_answer
                    ? `wrong-answer-${i}` : 'correct-answer' }
                  onClick={ () => handleAnswerClick(answer) }
                  disabled={ isDisabled }
                  className={ className }
                >
                  { answer }
                </button>
              );
            })}
          </div>
          { buttonNext
            ? (
              <button
                data-testid="btn-next"
                onClick={ () => nextQuestion() }
              >
                Next

              </button>
            )
            : null}
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
