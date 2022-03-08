import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      btnDisabled: true,
      sent: false,
    };
  }

  async componentDidMount() {
    const { startLoading, stopLoading } = this.props;
    startLoading();

    const userData = await getUser();
    this.setState({ ...userData }, () => {
      this.verifyFields();
      stopLoading();
    });
  }

  verifyFields = () => {
    const { name, email, image, description } = this.state;

    if (name && image && description && email.match(/\w+@\w+\.\w{3}/)) {
      this.setState({ btnDisabled: false });
    } else {
      this.setState({ btnDisabled: true });
    }
  };

  handleChange = ({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, this.verifyFields);
  };

  handleForm = (ev) => {
    ev.preventDefault();
    const { name, email, image, description } = this.state;
    const { startLoading, stopLoading } = this.props;

    startLoading();
    updateUser({ name, email, image, description })
      .then(() => this.setState({ sent: true }, stopLoading));
  }

  render() {
    const { name, email, image, description, btnDisabled, sent } = this.state;
    return (
      <div data-testid="page-profile-edit">
        {sent && <Redirect to="/profile" /> }
        <form onSubmit={ this.handleForm }>
          <label htmlFor="pf-edit-name">
            Nome de usuário:
            <input
              data-testid="edit-input-name"
              id="pf-edit-name"
              type="text"
              name="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="pf-edit-email">
            Email:
            <input
              data-testid="edit-input-email"
              id="pf-edit-email"
              type="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="pf-edit-description">
            Descrição:
            <input
              data-testid="edit-input-description"
              id="pf-edit-description"
              type="text"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="pf-edit-image">
            URL da Imagem:
            <input
              data-testid="edit-input-image"
              id="pf-edit-image"
              type="text"
              name="image"
              value={ image }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="edit-button-save"
            type="submit"
            disabled={ btnDisabled }
          >
            Salvar
          </button>
        </form>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
};

export default ProfileEdit;
