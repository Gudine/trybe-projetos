import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
    const { productsAndQuantities } = this.props;
    this.setState({
      emptyCart: !productsAndQuantities.length,
    });
  }

  render() {
    const { emptyCart } = this.state;
    const { handleQuantities, handleRemoveItem, productsAndQuantities } = this.props;

    return (
      emptyCart || !productsAndQuantities.length
        ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        : (
          <div>
            {productsAndQuantities.map(({ productName, quantity, btnDisabled }) => (
              <div key={ productName }>
                <button
                  type="button"
                  name={ productName }
                  onClick={ handleRemoveItem }
                >
                  X
                </button>
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
          </div>)
    );
  }
}

Cart.propTypes = {
  productsAndQuantities: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleQuantities: PropTypes.func.isRequired,
  handleRemoveItem: PropTypes.func.isRequired,
};

export default Cart;
