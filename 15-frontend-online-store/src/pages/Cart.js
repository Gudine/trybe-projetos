import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      productsAndQuantities: [],
      emptyCart: true,
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
        acc[productName] = {
          count: 1,
        };
      }
      return acc;
    }, {});

    const products = Object.keys(prodAndQuant);
    const quantities = Object.values(prodAndQuant);
    const productsAndQuantities = products.map((product, index) => ({
      product,
      quantity: quantities[index].count,
    }));

    this.setState({
      productsAndQuantities,
      emptyCart: !cartProducts.length,
    });
  }

  handleQuantities = (e) => {
    const { target: { value, name } } = e;
    let newPnQArray = [];
    const { productsAndQuantities } = this.state;
    newPnQArray = productsAndQuantities
      .reduce((acc, { product, quantity }) => {       
        if (product === name) {
          if (value === 'increase') {
            acc = [...acc, {
              product,
              quantity: quantity + 1,
            }];
          } else if (quantity === 1) {
            this.handleRemoveItem(e);
          } else {
            acc = [...acc, {
              product,
              quantity: quantity - 1,
            }];
          }
        } else {
          acc = [...acc, {
            product,
            quantity,
          }];
        }
        return acc;
      }, []);
    this.setState({ productsAndQuantities: newPnQArray });
  }

  handleRemoveItem = ({ target: { name } }) => {
    const { productsAndQuantities } = this.state;
    const newPnQArray = productsAndQuantities.reduce((acc, curr) => {
      if (curr.product !== name) {
        return [...acc, curr];
      }
      return acc;
    }, []);

    this.setState({
      productsAndQuantities: newPnQArray,
      emptyCart: !newPnQArray.length,
    });
  }

  render() {
    const { productsAndQuantities, emptyCart } = this.state;

    return (
      emptyCart
        ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        : (
          <div>
            {productsAndQuantities.map(({ product, quantity }) => (
              <div key={ product }>
                <button
                  type="button"
                  name={ product }
                  onClick={ this.handleRemoveItem }
                >
                  X
                </button>
                <p data-testid="shopping-cart-product-name">{product}</p>
                <button
                  type="button"
                  data-testid="product-decrease-quantity"
                  name={ product }
                  value="decrease"
                  onClick={ this.handleQuantities }
                >
                  -
                </button>
                <p data-testid="shopping-cart-product-quantity">{quantity}</p>
                <button
                  type="button"
                  data-testid="product-increase-quantity"
                  name={ product }
                  value="increase"
                  onClick={ this.handleQuantities }
                >
                  +
                </button>
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
