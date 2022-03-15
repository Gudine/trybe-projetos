import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';
import ProductCard from '../components/ProductCard';
import './Home.css';

class Home extends Component {
  render() {
    const {
      history, search, products, handleChange,
      handleCatClick, handleAddToCart, getProducts, cartQnt,
    } = this.props;
    return (
      <div className="home-page">
        <header>
          <h1>Front-end Online Store</h1>
          <Link to="/cart" className="cart" data-testid="shopping-cart-button">
            🛒
            <span data-testid="shopping-cart-size">{ cartQnt }</span>
          </Link>
        </header>
        <main>
          <Categories handleCatClick={ handleCatClick } />
          <section className="main-products">
            <input
              type="text"
              onChange={ handleChange }
              name="search"
              value={ search }
              data-testid="query-input"
            />
            <button
              type="button"
              data-testid="query-button"
              onClick={ getProducts }
            >
              Pesquisar
            </button>
            <p
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.

            </p>
            <div className="products-list">
              {products.map((product) => (
                <ProductCard
                  key={ product.id }
                  btnId={ product.id }
                  product={ product }
                  handleAddToCart={ handleAddToCart }
                  history={ history }
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    );
  }
}

Home.propTypes = {
  search: PropTypes.string.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleCatClick: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  cartQnt: PropTypes.number.isRequired,
};

export default Home;
