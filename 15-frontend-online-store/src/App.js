import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Cart from './pages/Cart';
import Home from './pages/Home';
import { getProductsFromCategoryAndQuery } from './services/api';

class App extends Component {
  constructor() {
    super();

    this.state = {
      search: '',
      products: [],
      categoryId: '',
      cartProducts: [],
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

  handleCatClick = ({ target: { id } }) => {
    this.setState({
      categoryId: id,
    }, this.getProducts);
  }

  handleAddToCart = ({ target: { id } }) => {
    const { products } = this.state;
    const objToSave = products.find((product) => product.id === id);
    console.log(objToSave);
    this.setState((prevState) => ({
      cartProducts: [...prevState.cartProducts, objToSave],
    }));
  }

  render() {
    const { search, products, cartProducts } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (
              <Home
                { ...props }
                handleChange={ this.handleChange }
                handleCatClick={ this.handleCatClick }
                handleAddToCart={ this.handleAddToCart }
                getProducts={ this.getProducts }
                search={ search }
                products={ products }
              />
            ) }
          />
          <Route
            path="/cart"
            render={ (props) => <Cart { ...props } cartProducts={ cartProducts } /> }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
