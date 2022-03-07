import React, { Component } from 'react';
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
        <div>TrybeTunes</div>

        <div data-testid="header-user-name">{username}</div>
      </header>
    );
  }
}

export default Header;
