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
          >
            Play

          </button>
          <SettingsBtn history={ history } />
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf,
}.isRequired;

export default Login;
