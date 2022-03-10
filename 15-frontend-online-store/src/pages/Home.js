import React, { Component } from 'react';
import ProductCard from '../components/ProductCard';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      search: '',
      products: [],
    };
  }

  handleChange = ({ target: { name, value }  }) => {
    this.setState({ [name]: value });
  };

  getProducts = async () => {
    const { search } = this.state;

    const apiResult = await getProductsFromCategoryAndQuery(null, search);
    this.setState({ products: apiResult.results });
  };

  render() {
    const { search, products } = this.state;

    return (
      <>
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
