import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Questions from '../components/Questions';

class Game extends React.Component {
  state = {
    // allQuestions: [],
    currentQuestion: {},
    isLoading: true,
  };

  componentDidMount() {
    this.RequestQuests();
  }

  RequestQuests = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    // dispatch(fetchQuest(token));
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    const three = 3;
    if (data.response_code === three) {
      localStorage.clear();
      history.push('/');
    }
    this.setState({
      // allQuestions: data.results,
      currentQuestion: data.results[0],
      isLoading: false,
    });
  };

  // nextQuest = (index = 0) => {
  //   const { allQuestions } = this.state;
  //   this.setState({
  //     currentQuestion: allQuestions[index],
  //   });
  // };

  render() {
    // const { isLoading } = this.props;
    const { isLoading, currentQuestion } = this.state;
    if (isLoading) { return (<p>Carregando...</p>); }
    return (
      <div>
        <Questions currQuestion={ currentQuestion } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  allQuests: state.allQuests,
  isLoading: state.isLoading,
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(mapStateToProps)(Game);
