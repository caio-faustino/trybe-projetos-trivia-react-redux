import React from 'react';
import PropTypes from 'prop-types';
import SettingsBtn from '../components/SettingsBtn';

class Login extends React.Component {
  state = {
    isDisabled: true,
    playerName: '',
    playerEmail: '',
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, () => this.handleDisabled());
  };

  handleDisabled = () => {
    const { playerEmail, playerName } = this.state;
    const emailRegex = /^[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+$/gi;
    const nameValidate = playerName.length > 0;
    const emailValidate = emailRegex.test(playerEmail);
    this.setState({
      isDisabled: !(nameValidate && emailValidate),
    });
  };

  gameBegin = async () => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    localStorage.setItem('token', data.token);
    const { history } = this.props;
    history.push('/game');
  };

  render() {
    const { history } = this.props;
    const { isDisabled } = this.state;
    return (
      <div>
        <form>
          <input
            type="text"
            data-testid="input-player-name"
            name="playerName"
            onChange={ this.handleChange }
          />
          <input
            type="text"
            data-testid="input-gravatar-email"
            name="playerEmail"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isDisabled }
            onClick={ () => this.gameBegin() }
          >
            Play

          </button>
        </form>
        <SettingsBtn history={ history } />
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Login;
