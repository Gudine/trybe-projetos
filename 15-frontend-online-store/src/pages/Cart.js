import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import './Cart.css';

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      emptyCart: true,
    };
  }

  componentDidMount() {
    this.loadCart();
  }

  loadCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (cartItems) {
      this.setState({
        emptyCart: !cartItems.length,
      });
    }
  }

  render() {
    const { emptyCart } = this.state;
    const {
      handleQuantities, handleRemoveItem, productsAndQuantities, cartQnt,
    } = this.props;

    return (
      <>
        <Header cartQnt={ cartQnt } />
        {emptyCart || !productsAndQuantities.length
          ? (
            <p
              data-testid="shopping-cart-empty-message"
              className="empty-message"
            >
              Seu carrinho está vazio
            </p>
          )
          : (
            <div className="full-cart">
              {productsAndQuantities
                .map(({
                  productName, quantity, btnDisabled, productImg,
                }) => (
                  <div className="cart-item" key={ productName }>
                    <button
                      type="button"
                      name={ productName }
                      onClick={ handleRemoveItem }
                    >
                      X
                    </button>
                    <img src={ productImg } alt={ productName } />
                    <p data-testid="shopping-cart-product-name">{productName}</p>
                    <button
                      type="button"
                      data-testid="product-decrease-quantity"
                      name={ productName }
                      value="decrease"
                      onClick={ handleQuantities }
                    >
                      -
                    </button>
                    <p data-testid="shopping-cart-product-quantity">{quantity}</p>
                    <button
                      type="button"
                      data-testid="product-increase-quantity"
                      name={ productName }
                      value="increase"
                      onClick={ handleQuantities }
                      disabled={ btnDisabled }
                    >
                      +
                    </button>
                  </div>
                ))}
              <Link to="/checkout" data-testid="checkout-products">Checkout</Link>
            </div>)}
      </>
    );
  }
}

Cart.propTypes = {
  productsAndQuantities: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleQuantities: PropTypes.func.isRequired,
  handleRemoveItem: PropTypes.func.isRequired,
  cartQnt: PropTypes.number.isRequired,
};

export default Cart;
