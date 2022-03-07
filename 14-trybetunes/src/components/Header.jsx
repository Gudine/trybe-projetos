import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
