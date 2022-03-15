import PropTypes from 'prop-types';
import React, { Component } from 'react';

class ProductCard extends Component {
  handleCard = () => {
    const { history, btnId } = this.props;
    history.push(`/product/${btnId}`);
  };

  render() {
    const { product, handleAddToCart, btnId } = this.props;
    const { title, thumbnail, price } = product;

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
        <button
          type="button"
          data-testid="product-detail-link"
          onClick={ this.handleCard }
        >
          Detalhes
        </button>
      </div>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  btnId: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProductCard;
