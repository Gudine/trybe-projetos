import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import ttLogo from '../img/logo.png';
import defAvatar from '../img/def_circle_green.png';
import './Header.css';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      image: '',
    };
  }

  componentDidMount() {
    const { startLoading, stopLoading } = this.props;

    startLoading();
    getUser().then((user) => this.setState({
      username: user.name,
      image: user.image || defAvatar,
    }, stopLoading));
  }

  render() {
    const { username, image } = this.state;

    return (
      <>
        <header data-testid="header-component">
          <img src={ ttLogo } alt="TrybeTunes" />
          <div className="user-section">
            <img src={ image } alt="" />
            <span data-testid="header-user-name">{username}</span>
          </div>
        </header>
        <nav>
          <NavLink data-testid="link-to-search" to="/search">Search</NavLink>
          <NavLink data-testid="link-to-favorites" to="/favorites">Favorites</NavLink>
          <NavLink data-testid="link-to-profile" to="/profile">Profile</NavLink>
        </nav>
      </>
    );
  }
}

Header.propTypes = {
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
};

export default Header;
