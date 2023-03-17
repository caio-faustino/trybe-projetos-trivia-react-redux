import React from 'react';
import PropTypes from 'prop-types';

class SettingsBtn extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <button
        type="button"
        data-testid="btn-settings"
        onClick={ () => history.push('/settings') }
      >
        Configurações
      </button>
    );
  }
}

SettingsBtn.propTypes = {
  history: PropTypes.objectOf,
}.isRequired;

export default SettingsBtn;
