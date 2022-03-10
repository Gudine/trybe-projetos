import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductCard extends Component {
  // A exibição deve ter título, foto e preço.
  render() {
    const { title, thumbnail, price } = this.props;

    return (
      <div data-testid="product">
        <img src={ thumbnail } alt={ title } />
        <div>{ title }</div>
        <div>{ price }</div>
      </div>
    );
  }
}

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default ProductCard;
