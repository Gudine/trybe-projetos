import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      loading: false,
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

    this.setState({ loading: true });
    createUser({ name: username })
      .then(() => this.setState({ loading: false, sent: true }));
  }

  render() {
    const { username, loading, sent } = this.state;
    const MIN_USER_LENGTH = 3;

    return (
      <div data-testid="page-login">
        {sent && <Redirect to="/search" />}
        {loading && <Loading />}
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

export default Login;
