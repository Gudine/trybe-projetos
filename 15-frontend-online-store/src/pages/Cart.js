/* eslint-disable react/jsx-max-depth */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
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
              <h3>Carrinho</h3>
              {productsAndQuantities
                .map(({
                  productName, quantity, btnDisabled, productImg, price,
                }) => (
                  <div className="cart-item" key={ productName }>
                    <button
                      type="button"
                      name={ productName }
                      onClick={ handleRemoveItem }
                      className="trash-icon"
                    >
                      <BsTrash />
                    </button>
                    <div className="info-quant">
                      <div className="img-container">
                        <img
                          src={ productImg }
                          alt={ productName }
                          className="prod-img"
                        />
                      </div>
                      <div className="product-info">
                        <p
                          data-testid="shopping-cart-product-name"
                          className="product-name"
                        >
                          {productName}
                        </p>
                        <div className="quantities-board">
                          <button
                            type="button"
                            data-testid="product-decrease-quantity"
                            name={ productName }
                            value="decrease"
                            onClick={ handleQuantities }
                            className="quantity-icon"
                          >
                            <AiOutlineMinusCircle />
                          </button>
                          <div
                            data-testid="shopping-cart-product-quantity"
                            className="quantity-text"
                          >
                            {quantity}
                          </div>
                          <button
                            type="button"
                            data-testid="product-increase-quantity"
                            name={ productName }
                            value="increase"
                            onClick={ handleQuantities }
                            disabled={ btnDisabled }
                            className="quantity-icon"
                          >
                            <AiOutlinePlusCircle />
                          </button>
                        </div>
                      </div>
                      <div />
                      <div />
                      <p
                        data-testid="shopping-cart-product-name"
                        className="product-price"
                      >
                        {`R$${(price * quantity).toLocaleString('pt-br')}`}
                      </p>
                    </div>
                  </div>
                ))}
              <div className="checkout-link-container">
                <Link
                  to="/checkout"
                  data-testid="checkout-products"
                  className="checkout-link"
                >
                  Checkout
                </Link>
              </div>
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
