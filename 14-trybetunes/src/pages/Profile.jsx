import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
    };
  }

  async componentDidMount() {
    const { startLoading, stopLoading } = this.props;
    startLoading();

    const userData = await getUser();
    this.setState({ ...userData }, stopLoading);
  }

  render() {
    const { name, email, image, description } = this.state;

    return (
      <div data-testid="page-profile">
        <img data-testid="profile-image" src={ image } alt={ name } />
        <p>{ name }</p>
        <p>{ email }</p>
        <p>{ description }</p>
        <p>
          <Link to="/profile/edit">Editar perfil</Link>
        </p>
      </div>
    );
  }
}

Profile.propTypes = {
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
};

export default Profile;
