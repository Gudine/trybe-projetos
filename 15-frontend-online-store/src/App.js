import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Cart from './pages/Cart';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import { getProductsFromCategoryAndQuery } from './services/api';

class App extends Component {
  constructor() {
    super();
    if (!localStorage.getItem('reviews')) localStorage.setItem('reviews', '[]');
    this.state = {
      search: '',
      products: [],
      categoryId: '',
      cartProducts: [],
      reviews: JSON.parse(localStorage.getItem('reviews')),
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
    this.setState((prevState) => ({
      cartProducts: [...prevState.cartProducts, objToSave],
    }));
  }

  handleSendReview = (review) => {
    const reviews = JSON.parse(localStorage.getItem('reviews'));
    const newReviews = [...reviews, review];
    localStorage.setItem('reviews', JSON.stringify(newReviews));

    this.setState({ reviews: newReviews });
  }

  render() {
    const { search, products, cartProducts, reviews } = this.state;

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
          <Route
            path="/product/:product"
            render={ (props) => (<ProductPage
              { ...props }
              handleAddToCart={ this.handleAddToCart }
              handleSendReview={ this.handleSendReview }
              reviews={ reviews }
            />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
