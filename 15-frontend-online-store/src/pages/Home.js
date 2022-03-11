import PropTypes from 'prop-types';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';
import ProductCard from '../components/ProductCard';

class Home extends Component {
  render() {
    const {
      history, search, products, handleChange,
      handleCatClick, handleAddToCart, getProducts,
    } = this.props;
    return (
      <>
        <Categories handleCatClick={ handleCatClick } />
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
        <Link to="/cart" data-testid="shopping-cart-button">icone carrinho</Link>
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.

        </p>
        {products.map((product) => (
          <ProductCard
            key={ product.id }
            btnId={ product.id }
            product={ product }
            handleAddToCart={ handleAddToCart }
            history={ history }
          />
        ))}

      </>
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
};

export default Home;
