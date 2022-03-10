import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import defAvatar from '../img/def_circle.png';
import './Profile.css';

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
    const pfp = image || defAvatar;

    return (
      <div className="page-profile" data-testid="page-profile">
        <div className="profile-card">
          <section>
            <img data-testid="profile-image" src={ pfp } alt={ name } />
            <Link to="/profile/edit">Editar perfil</Link>
          </section>
          <section>
            <p className="field-name">Name</p>
            <p className="field-value">{ name }</p>
          </section>
          <section>
            <p className="field-name">Email</p>
            <p className="field-value">{ email }</p>
          </section>
          <section>
            <p className="field-name">Description</p>
            <p className="field-value">{ description }</p>
          </section>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
};

export default Profile;
