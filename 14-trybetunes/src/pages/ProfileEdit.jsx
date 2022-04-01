import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getUser, updateUser } from '../services/userAPI';
import './ProfileEdit.css';
import { connect } from 'react-redux';
import { startLoading, stopLoading } from '../redux/actions';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      btnDisabled: true,
    };
  }

  async componentDidMount() {
    document.title = 'Profile Editing | TrybeTunes';
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
    const { history, startLoading, stopLoading } = this.props;

    startLoading();
    updateUser({ name, email, image, description })
      .then(() => {
        history.push('/profile');
        stopLoading();
      });
  }

  render() {
    const { name, email, image, description, btnDisabled } = this.state;
    return (
      <div data-testid="page-profile-edit" className="page-profile-edit">
        <form className="profile-edit-card" onSubmit={ this.handleForm }>
          <label htmlFor="pf-edit-name">
            Name:
            <input
              data-testid="edit-input-name"
              id="pf-edit-name"
              type="text"
              name="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="pf-edit-image">
            Image URL:
            <input
              data-testid="edit-input-image"
              id="pf-edit-image"
              type="text"
              name="image"
              value={ image }
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
            Description:
            <textarea
              data-testid="edit-input-description"
              id="pf-edit-description"
              name="description"
              value={ description }
              rows={ 10 }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="edit-button-save"
            type="submit"
            disabled={ btnDisabled }
          >
            Save
          </button>
        </form>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
};

const mapDispatchToProps = { startLoading, stopLoading };

export default connect(null, mapDispatchToProps)(ProfileEdit);
