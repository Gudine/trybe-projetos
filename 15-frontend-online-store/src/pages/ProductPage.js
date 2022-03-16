import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FreeShipping from '../components/FreeShipping';
import Reviews from '../components/Reviews';
import SendReview from '../components/SendReview';
import { getProduct } from '../services/api';
import './ProductPage.css';

class ProductPage extends Component {
  constructor() {
    super();

    if (!localStorage.getItem('reviews')) localStorage.setItem('reviews', '[]');

    this.state = {
      product: {},
      reviews: JSON.parse(localStorage.getItem('reviews')),
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({
      product: await getProduct(id),
    });
  }

  handleSendReview = (review) => {
    const reviews = JSON.parse(localStorage.getItem('reviews'));
    const newReviews = [...reviews, review];
    localStorage.setItem('reviews', JSON.stringify(newReviews));

    this.setState({ reviews: newReviews });
  }

  render() {
    const { handleAddToCart, cartQnt } = this.props;
    const {
      reviews, product, product: { title, thumbnail, price, attributes,
        shipping = { free_shipping: false }, id: btnId },
    } = this.state;
    const freeShipping = shipping.free_shipping;

    return (
      <>
        <header>
          <h1>Front-end Online Store</h1>
          <Link to="/cart" className="cart" data-testid="shopping-cart-button">
            🛒
            <span data-testid="shopping-cart-size" className="cart-qnt">
              { cartQnt }
            </span>
          </Link>
        </header>
        {!Object.keys(product).length
          ? (
            <div className="product-page" />)
          : (
            <div className="product-page">
              <div className="product-title">
                <span data-testid="product-detail-name">{ title }</span>
                <img
                  src={ thumbnail }
                  alt={ title }
                />
              </div>
              <span>{ `R$${price.toLocaleString('pt-br')}` }</span>
              { freeShipping && <FreeShipping /> }
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
              <SendReview
                handleSendReview={ this.handleSendReview }
                productId={ btnId }
              />
              <Reviews reviews={ reviews } productId={ btnId } />
            </div>
          )}
      </>
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
  cartQnt: PropTypes.number.isRequired,
};

export default ProductPage;
