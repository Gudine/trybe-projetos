import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductCard extends Component {
  handleCard = () => {
    // nome do produto, imagem, preço e especificação técnica.
    const { product, history } = this.props;
    const { title, thumbnail_id, price, attributes } = product;

    const liteProduct = { title, thumbnail_id, price, attributes };
    const productUrl = JSON.stringify(liteProduct);

    history.push(`/product/${productUrl}`);
  };

  render() {
    const { product } = this.props;
    const { title, thumbnail, price } = product;

    return (
      <div data-testid="product">
        <img src={ thumbnail } alt={ title } />
        <div>{ title }</div>
        <div>{ price }</div>
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProductCard;
