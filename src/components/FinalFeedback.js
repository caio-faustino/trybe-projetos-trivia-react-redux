import React from 'react';
import PropTypes from 'prop-types';

class FinalFeedback extends React.Component {
  render() {
    const { points, total } = this.props;
    return (
      <div>
        <p data-testid="feedback-total-score">{ points }</p>
        <p data-testid="feedback-total-question">{ total }</p>
      </div>
    );
  }
}

FinalFeedback.propTypes = {
  pontuação: PropTypes.string,
  total: PropTypes.string,
}.isRequired;

export default FinalFeedback;
