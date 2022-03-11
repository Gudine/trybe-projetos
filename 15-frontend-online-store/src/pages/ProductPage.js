import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductPage extends Component {
  render() {
    const { match: { params: { product } }, handleAddToCart } = this.props;
    const productObj = JSON.parse(product);
    const { title, thumbnail_id: thumbnailId, price, attributes, btnId } = productObj;

    return (
      <div className="product-page">
        <Link to="/cart" data-testid="shopping-cart-button">icone carrinho</Link>
        <span data-testid="product-detail-name">{ title }</span>
        <img
          src={ `http://http2.mlstatic.com/D_${thumbnailId}-I.jpg` }
          alt={ title }
        />
        <span>{ price }</span>
        <ul>
          {attributes.map(({ id, name, value_name: valueName }) => (
            <li key={ id }>{`${name}: ${valueName}`}</li>
          ))}
        </ul>
        <button
          data-testid="product-detail-add-to-cart"
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

ProductPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      product: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  handleAddToCart: PropTypes.func.isRequired,
};

export default ProductPage;
