import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import defAvatar from '../img/def_circle.png';
import './Profile.css';
import { connect } from 'react-redux';
import { startLoading, stopLoading } from '../redux/actions';

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
    document.title = 'Profile | TrybeTunes';
    const { startLoading, stopLoading } = this.props;
    startLoading();

    const userData = await getUser();
    document.title = `${userData.name} | TrybeTunes`;
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
            <Link to="/profile/edit">Edit profile</Link>
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

const mapDispatchToProps = { startLoading, stopLoading };

export default connect(null, mapDispatchToProps)(Profile);
