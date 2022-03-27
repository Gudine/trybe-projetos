import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import './Checkout.css';

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
      submitted: false,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
    this.setState({ submitted: true });
  };

  render() {
    const { cartItems } = this.props;
    const { fullname, email, cpf, phone, cep, address, submitted } = this.state;

    const genCartItems = () => cartItems
      .map(({ productName, price, quantity, productImg }) => (
        <div className="cart-item checkout-item" key={ productName }>
          <div className="full-product">
            <div className="img-container">
              <img
                src={ productImg }
                alt={ productName }
                className="prod-img"
              />
            </div>
            <div className="product-name">
              { productName }
            </div>
          </div>
          <div className="product-price">
            { `R$${(price * quantity).toLocaleString('pt-br')}` }
          </div>
        </div>
      ));

    const getCartPrice = () => cartItems
      .reduce((sum, { price, quantity }) => (sum + price * quantity), 0);

    const getCartQuantity = () => cartItems
      .reduce((sum, { quantity }) => (sum + quantity), 0);

    return (
      <div>
        <Header cartQnt={ getCartQuantity() } />
        {submitted
          ? (
            <h1 className="purchase-success">
              {`${fullname}, parabéns pela sua compra!`}
            </h1>
          )
          : (
            <div>
              {!!cartItems.length && (
                <div className="cart-list">
                  <h2>Produtos</h2>
                  <div>
                    { genCartItems() }
                  </div>
                  <h2 className="total-price">
                    Total:
                    {' '}
                    <span>{ `R$${(getCartPrice()).toLocaleString('pt-br')}` }</span>
                  </h2>
                </div>
              )}
              <form
                className="checkout-form"
                onSubmit={ this.handleSubmit }
              >
                <h2>Dados Pessoais</h2>
                <label htmlFor="fullname" className="input-label">
                  Nome Completo
                  <input
                    data-testid="checkout-fullname"
                    type="text"
                    name="fullname"
                    value={ fullname }
                    placeholder="Nome Completo"
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="email" className="input-label">
                  E-mail
                  <input
                    data-testid="checkout-email"
                    type="email"
                    name="email"
                    value={ email }
                    placeholder="E-mail"
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="cpf" className="input-label">
                  CPF
                  <input
                    data-testid="checkout-cpf"
                    type="text"
                    name="cpf"
                    value={ cpf }
                    placeholder="CPF"
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="phone" className="input-label">
                  Telefone
                  <input
                    data-testid="checkout-phone"
                    type="tel"
                    name="phone"
                    value={ phone }
                    placeholder="Telefone"
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="cep" className="input-label">
                  CEP
                  <input
                    data-testid="checkout-cep"
                    type="text"
                    name="cep"
                    value={ cep }
                    placeholder="CEP"
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="address" className="input-label">
                  Endereço Completo
                  <input
                    data-testid="checkout-address"
                    type="text"
                    name="address"
                    value={ address }
                    placeholder="Endereço"
                    onChange={ this.handleChange }
                  />
                </label>
                <button className="purchase-btn" type="submit">Comprar</button>
              </form>
            </div>
          )}
      </div>
    );
  }
}

Checkout.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Checkout;
