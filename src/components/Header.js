import React from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  state = {
    email: '',
  };

  componentDidMount() {
    const { playerEmail } = this.props;
    const email = md5(playerEmail).toString();
    this.setState({
      email,
    });
  }

  render() {
    const { email } = this.state;
    const { playerName, score } = this.props;
    return (
      <div>
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${email}` } alt={ playerName } />
        <span data-testid="header-player-name">{ playerName }</span>
        <span data-testid="header-score">{ score }</span>
      </div>
    );
  }
}

Header.propTypes = {
  playerEmail: PropTypes.string,
}.isRequired;

export default connect(null)(Header);
