import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { GrHomeRounded } from 'react-icons/gr';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

class Header extends Component {
  render() {
    const {
      cartQnt,
    } = this.props;
    return (
      <header>
        <NavLink to="/"><GrHomeRounded className="home-icon" /></NavLink>
        <h1>Front-end Online Store</h1>
        <Link to="/cart" className="cart" data-testid="shopping-cart-button">
          🛒
          <span data-testid="shopping-cart-size" className="cart-qnt">
            { cartQnt }
          </span>
        </Link>
      </header>
    );
  }
}

Header.propTypes = {
  cartQnt: PropTypes.number.isRequired,
};

export default Header;
