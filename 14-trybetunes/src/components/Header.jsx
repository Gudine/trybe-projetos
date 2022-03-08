import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import './Header.css';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
    };
  }

  componentDidMount() {
    const { startLoading, stopLoading } = this.props;

    startLoading();
    getUser().then((user) => this.setState({ username: user.name }, stopLoading));
  }

  render() {
    const { username } = this.state;

    return (
      <header data-testid="header-component">
        <section>
          <div>TrybeTunes</div>
          <div data-testid="header-user-name">{username}</div>
        </section>
        <nav>
          <NavLink data-testid="link-to-search" to="/search">Search</NavLink>
          <NavLink data-testid="link-to-favorites" to="/favorites">Favorites</NavLink>
          <NavLink data-testid="link-to-profile" to="/profile">Profile</NavLink>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
};

export default Header;
