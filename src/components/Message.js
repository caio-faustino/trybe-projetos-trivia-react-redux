import React from 'react';
import PropTypes from 'prop-types';

class Message extends React.Component {
  render() {
    const { acertos } = this.props;
    const three = 3;
    if (acertos < three) {
      return (
        <p
          data-testid="feedback-text"
        >
          Could be better...
        </p>
      );
    }
    return (<p data-testid="feedback-text">Well Done!</p>);
  }
}

Message.propTypes = {
  acertos: PropTypes.string,
}.isRequired;

export default Message;
