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

    this.state = {
      search: '',
      products: [],
      categoryId: '',
      cartItems: [],
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
    const foundObj = products.find((product) => product.id === id);
    const objToSave = {
      product: foundObj,
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
        const { productName, avlQnt, price } = curr;
        if (acc[productName]) {
          acc[productName].count += 1;
        } else {
          acc[productName] = {
            count: 1,
            avlQnt,
            price,
            fullProduct: curr,
          };
        }
        return acc;
      }, {});

    const products = Object.keys(prodAndQuant);
    const quantities = Object.values(prodAndQuant);
    const pAndQ = products.map((productName, index) => ({
      productName,
      quantity: quantities[index].count,
      avlQnt: quantities[index].avlQnt,
      product: quantities[index].fullProduct,
      price: quantities[index].price,
      btnDisabled: quantities[index].count === quantities[index].avlQnt,
    }));

    this.setState({
      cartItems: pAndQ,
    });
  }

  handleQuantities = (e) => {
    const { target: { value, name } } = e;
    let newPnQArray = [];
    const { cartItems } = this.state;
    newPnQArray = cartItems
      .reduce((acc, { productName, quantity, avlQnt, product, price }) => {
        if (productName === name) {
          if (value === 'increase') {
            acc = [...acc, {
              product,
              productName,
              quantity: quantity + 1,
              price,
              avlQnt,
              btnDisabled: (quantity + 1) === avlQnt,
            }];
          } else if (quantity === 1) {
            this.handleRemoveItem(e);
          } else {
            acc = [...acc, {
              product,
              productName,
              quantity: quantity - 1,
              avlQnt,
              price,
              btnDisabled: quantity - 1 === avlQnt,
            }];
          }
        } else {
          acc = [...acc, {
            product,
            productName,
            quantity,
            avlQnt,
            price,
            btnDisabled: quantity === avlQnt,
          }];
        }
        return acc;
      }, []);
    this.setState({ cartItems: newPnQArray });
  }

  handleRemoveItem = ({ target: { name } }) => {
    const { cartItems } = this.state;
    const newPnQArray = cartItems.reduce((acc, curr) => {
      if (curr.productName !== name) {
        return [...acc, curr];
      }
      return acc;
    }, []);
    this.setState({
      cartItems: newPnQArray,
    });
  }

  render() {
    const { search, products, cartItems } = this.state;

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
            render={ (props) => (<Cart
              { ...props }
              productsAndQuantities={ cartItems }
              handleQuantities={ this.handleQuantities }
              handleRemoveItem={ this.handleRemoveItem }
            />) }
          />
          <Route
            path="/product/:id"
            render={ (props) => (<ProductPage
              { ...props }
              handleAddToCart={ this.handleAddToCart }
            />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
