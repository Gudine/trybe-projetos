import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';
import ProductCard from '../components/ProductCard';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      search: '',
      products: [],
      categoryId: '',
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  getProducts = async () => {
    const { categoryId, search } = this.state;

    const apiResult = await getProductsFromCategoryAndQuery(categoryId, search);
    this.setState({ products: apiResult.results });
  };

handleCatClick = ({ target: { key } }) => {
  this.setState({
    categoryId: key,
  }, this.getProducts);
}

render() {
  const { search, products } = this.state;
  return (
    <>
      <Categories handleCatClick={ this.handleCatClick } />
      <input
        type="text"
        onChange={ this.handleChange }
        name="search"
        value={ search }
        data-testid="query-input"
      />
      <button
        type="button"
        data-testid="query-button"
        onClick={ this.getProducts }
      >
        Pesquisar
      </button>
      <Link to="/cart" data-testid="shopping-cart-button">icone carrinho</Link>
      <p
        data-testid="home-initial-message"
      >
        Digite algum termo de pesquisa ou escolha uma categoria.

      </p>
      {products.map(({ id, title, thumbnail, price }) => (
        <ProductCard
          key={ id }
          title={ title }
          thumbnail={ thumbnail }
          price={ price }
        />
      ))}
    </>
  );
}
}

export default Home;
