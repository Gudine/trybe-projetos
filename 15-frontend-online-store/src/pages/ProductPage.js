import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SendReview from '../components/SendReview';
import Reviews from '../components/Reviews';
import { getProduct } from '../services/api';

class ProductPage extends Component {
  constructor() {
    super();

    this.state = {
      product: {},
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({
      product: await getProduct(id),
    });
  }

  render() {
    const { handleAddToCart, handleSendReview, reviews } = this.props;
    const {
      product, product: { title, thumbnail, price, attributes, id: btnId },
    } = this.state;

    return (
      !Object.keys(product).length
        ? <div className="product-page" />
        : (
          <div className="product-page">
            <Link to="/cart" data-testid="shopping-cart-button">icone carrinho</Link>
            <span data-testid="product-detail-name">{ title }</span>
            <img
              src={ thumbnail }
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
            <SendReview handleSendReview={ handleSendReview } productId={ btnId } />
            <Reviews reviews={ reviews } productId={ btnId } />
          </div>
        )
    );
  }
}

ProductPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  handleSendReview: PropTypes.func.isRequired,
  reviews: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    stars: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  })).isRequired,
};

export default ProductPage;
