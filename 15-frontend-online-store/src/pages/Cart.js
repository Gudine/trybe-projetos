import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      productsAndQuantities: [],
    };
  }

  componentDidMount() {
    this.productCount();
  }

  productCount = () => {
    const { cartProducts } = this.props;
    const prodAndQuant = cartProducts.reduce((acc, curr) => {
      const productName = curr.title;
      if (acc[productName]) {
        acc[productName].count += 1;
      } else {
        acc[productName] = { count: 1 };
      }
      return acc;
    }, {});

    const products = Object.keys(prodAndQuant);
    const quantities = Object.values(prodAndQuant);
    const productsAndQuantities = products.map((product, index) => ({
      product,
      quantity: quantities[index].count,
    }));

    this.setState({ productsAndQuantities });
  }

  render() {
    const { productsAndQuantities } = this.state;
    const { cartProducts } = this.props;

    return (
      !cartProducts.length
        ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        : (
          <div>
            {productsAndQuantities.map(({ product, quantity }) => (
              <div key={ product }>
                <p data-testid="shopping-cart-product-name">{product}</p>
                <p data-testid="shopping-cart-product-quantity">{quantity}</p>
              </div>
            ))}
          </div>)
    );
  }
}

Cart.propTypes = {
  cartProducts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Cart;
