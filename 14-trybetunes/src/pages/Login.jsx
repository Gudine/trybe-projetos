import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import ttLogo from '../img/logo.png';
import './Login.css';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
    };
  }

  componentDidMount() {
    document.title = 'Login | TrybeTunes';
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
    const { history, startLoading, stopLoading } = this.props;

    startLoading();
    createUser({ name: username })
      .then(() => {
        history.push('/search');
        stopLoading();
      });
  }

  render() {
    const { username } = this.state;
    const MIN_USER_LENGTH = 3;

    return (
      <div data-testid="page-login" className="page-login">
        <img src={ ttLogo } alt="TrybeTunes" />
        <form onSubmit={ this.handleForm }>
          <input
            data-testid="login-name-input"
            type="text"
            name="username"
            value={ username }
            onChange={ this.handleChange }
            placeholder="Username"
          />
          <button
            data-testid="login-submit-button"
            type="submit"
            disabled={ username.length < MIN_USER_LENGTH }
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
};

export default Login;
