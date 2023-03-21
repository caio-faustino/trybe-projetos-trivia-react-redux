import React from 'react';
import PropTypes from 'prop-types';
import shuffleArray from '../tests/helpers/shuffleArray';

class Questions extends React.Component {
  state = {
    mixedAnswers: [],
    isCorrectAnswer: null,
  };

  componentDidMount() {
    this.mixAnswers();
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
    console.log(answer);
    const { currQuestion } = this.props;
    const isCorrect = answer === currQuestion.correct_answer;
    this.setState({
      isCorrectAnswer: isCorrect,
    });
  };

  render() {
    const { currQuestion } = this.props;
    const { category, question } = currQuestion;
    const { mixedAnswers, isCorrectAnswer } = this.state;
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
                  className={ className }
                >
                  { answer }
                </button>
              );
            })}
          </div>
          <button>Next</button>
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

export default Questions;
