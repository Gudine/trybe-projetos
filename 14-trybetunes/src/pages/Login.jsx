import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import ttLogo from '../img/logo.png';
import './Login.css';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      sent: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  handleForm = (ev) => {
    ev.preventDefault();
    const { username } = this.state;
    const { startLoading, stopLoading } = this.props;

    startLoading();
    createUser({ name: username })
      .then(() => this.setState({ sent: true }, stopLoading));
  }

  render() {
    const { username, sent } = this.state;
    const MIN_USER_LENGTH = 3;

    return (
      <div data-testid="page-login" className="page-login">
        {sent && <Redirect to="/search" />}
        <img src={ ttLogo } alt="TrybeTunes" />
        <form onSubmit={ this.handleForm }>
          <input
            data-testid="login-name-input"
            type="text"
            name="username"
            value={ username }
            onChange={ this.handleChange }
            placeholder="Nome de Usuário"
          />
          <button
            data-testid="login-submit-button"
            type="submit"
            disabled={ username.length < MIN_USER_LENGTH }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
};

export default Login;
