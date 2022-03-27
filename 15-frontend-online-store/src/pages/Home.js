/* eslint-disable react/jsx-max-depth */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import Categories from '../components/Categories';
import Header from '../components/Header';
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
        <Header cartQnt={ cartQnt } />
        <main>
          <Categories handleCatClick={ handleCatClick } />
          <section className="main-products">
            <div className="search-block">
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
                <BsSearch />
              </button>
            </div>
            {!products.length && (
              <p
                data-testid="home-initial-message"
                className="initial-message"
              >
                Digite algum termo de pesquisa ou escolha uma categoria.

              </p>)}
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
