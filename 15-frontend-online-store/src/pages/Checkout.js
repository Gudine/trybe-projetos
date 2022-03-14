import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Checkout extends Component {
  constructor() {
    super();

    this.state = {
      fullname: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
  };

  render() {
    const { cartItems } = this.props;
    const { fullname, email, cpf, phone, cep, address } = this.state;

    const genCartItems = () => cartItems
      .map(({ productName, price, quantity }) => (
        <div key={ productName }>
          <div>{ productName }</div>
          <div>{ price * quantity }</div>
        </div>
      ));

    const getCartPrice = () => cartItems
      .reduce((sum, { price, quantity }) => (sum + price * quantity), 0);

    return (
      <div>
        {!!cartItems.length && (
          <div className="cart-list">
            <h2>Produtos</h2>
            <div>
              { genCartItems() }
            </div>
            <h2>
              Total:
              {' '}
              <span>{ getCartPrice() }</span>
            </h2>
          </div>
        )}
        <form onSubmit={ this.handleSubmit }>
          <input
            data-testid="checkout-fullname"
            type="text"
            name="fullname"
            value={ fullname }
            placeholder="Nome Completo"
            onChange={ this.handleChange }
          />
          <input
            data-testid="checkout-email"
            type="email"
            name="email"
            value={ email }
            placeholder="Email"
            onChange={ this.handleChange }
          />
          <input
            data-testid="checkout-cpf"
            type="text"
            name="cpf"
            value={ cpf }
            placeholder="CPF"
            onChange={ this.handleChange }
          />
          <input
            data-testid="checkout-phone"
            type="text"
            name="phone"
            value={ phone }
            placeholder="Telefone"
            onChange={ this.handleChange }
          />
          <input
            data-testid="checkout-cep"
            type="text"
            name="cep"
            value={ cep }
            placeholder="CEP"
            onChange={ this.handleChange }
          />
          <input
            data-testid="checkout-address"
            type="text"
            name="address"
            value={ address }
            placeholder="Endereço"
            onChange={ this.handleChange }
          />
          <button type="submit">Comprar</button>
        </form>
      </div>
    );
  }
}

Checkout.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Checkout;
