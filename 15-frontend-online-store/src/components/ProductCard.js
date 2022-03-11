import PropTypes from 'prop-types';
import React, { Component } from 'react';

class ProductCard extends Component {
  // A exibição deve ter título, foto e preço.
  render() {
    const { title, thumbnail, price, handleAddToCart, btnId } = this.props;

    return (
      <div data-testid="product">
        <img src={ thumbnail } alt={ title } />
        <div>{ title }</div>
        <div>{ price }</div>
        <button
          data-testid="product-add-to-cart"
          type="button"
          id={ btnId }
          onClick={ handleAddToCart }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  btnId: PropTypes.string.isRequired,
};

export default ProductCard;
