import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './Header.css';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      loading: true,
    };
  }

  componentDidMount() {
    getUser().then((user) => {
      this.setState({ username: user.name, loading: false });
    });
  }

  render() {
    const { username, loading } = this.state;

    return (
      <header data-testid="header-component">
        {loading && <Loading />}
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

export default Header;
