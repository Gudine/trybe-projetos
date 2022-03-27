import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import { getProductsFromCategoryAndQuery } from './services/api';

class App extends Component {
  constructor() {
    super();

    this.state = {
      search: '',
      products: [],
      categoryId: '',
      cartItems: [],
      cartQnt: 0,
    };
  }

  componentDidMount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (cartItems) {
      this.setState({
        cartItems,
      }, this.productCount);
    }
  }

  getCartQuant= () => {
    const { cartItems } = this.state;
    const sumCartQuant = cartItems.reduce((acc, { quantity }) => acc + quantity, 0);

    this.setState({ cartQnt: sumCartQuant });
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
    const foundObj = products.find((product) => product.id === id);
    const objToSave = {
      productImg: foundObj.thumbnail,
      productName: foundObj.title,
      price: foundObj.price,
      quantity: 1,
      avlQnt: foundObj.available_quantity,
      btnDisabled: false,
    };
    this.setState((prevState) => ({
      cartItems: [...prevState.cartItems, objToSave],
    }), this.productCount);
  }

  productCount = () => {
    const { cartItems } = this.state;
    const prodAndQuant = cartItems
      .reduce((acc, curr) => {
        const { productName, avlQnt, price, quantity, productImg } = curr;
        if (acc[productName]) {
          acc[productName].count += quantity;
        } else {
          acc[productName] = {
            count: quantity,
            avlQnt,
            price,
            productImg,
          };
        }
        return acc;
      }, {});

    const products = Object.keys(prodAndQuant);
    const quantities = Object.values(prodAndQuant);
    const pAndQ = products.map((productName, index) => ({
      productName,
      productImg: quantities[index].productImg,
      quantity: quantities[index].count,
      avlQnt: quantities[index].avlQnt,
      price: quantities[index].price,
      btnDisabled: quantities[index].count === quantities[index].avlQnt,
    }));

    localStorage.setItem('cartItems', JSON.stringify(pAndQ));

    this.setState({
      cartItems: pAndQ,
    }, this.getCartQuant);
  }

  handleQuantities = (e) => {
    const { currentTarget: { value, name } } = e;
    let newPnQArray = [];
    const { cartItems } = this.state;
    newPnQArray = cartItems
      .reduce((acc, { productName, quantity, avlQnt, productImg, price }) => {
        if (productName === name) {
          if (value === 'increase') {
            acc = [...acc, {
              productName,
              productImg,
              quantity: quantity + 1,
              price,
              avlQnt,
              btnDisabled: (quantity + 1) === avlQnt,
            }];
          } else if (quantity === 1) {
            this.handleRemoveItem(e);
          } else {
            acc = [...acc, {
              productName,
              productImg,
              quantity: quantity - 1,
              avlQnt,
              price,
              btnDisabled: quantity - 1 === avlQnt,
            }];
          }
        } else {
          acc = [...acc, {
            productName,
            productImg,
            quantity,
            avlQnt,
            price,
            btnDisabled: quantity === avlQnt,
          }];
        }
        return acc;
      }, []);
    this.setState({ cartItems: newPnQArray }, this.productCount);
  }

  handleRemoveItem = ({ currentTarget: { name } }) => {
    const { cartItems } = this.state;
    const newPnQArray = cartItems.reduce((acc, curr) => {
      if (curr.productName !== name) {
        return [...acc, curr];
      }
      return acc;
    }, []);
    this.setState({
      cartItems: newPnQArray,
    }, this.productCount);
  }

  render() {
    const { search, products, cartItems, cartQnt } = this.state;

    return (
      <HashRouter>
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
                cartQnt={ cartQnt }
              />
            ) }
          />
          <Route
            path="/cart"
            render={ (props) => (<Cart
              { ...props }
              productsAndQuantities={ cartItems }
              handleQuantities={ this.handleQuantities }
              handleRemoveItem={ this.handleRemoveItem }
              cartQnt={ cartQnt }
            />) }
          />
          <Route
            path="/product/:id"
            render={ (props) => (<ProductPage
              { ...props }
              handleAddToCart={ this.handleAddToCart }
              cartQnt={ cartQnt }
            />) }
          />
          <Route
            path="/checkout"
            render={ (props) => (<Checkout
              { ...props }
              cartItems={ cartItems }
            />) }
          />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
