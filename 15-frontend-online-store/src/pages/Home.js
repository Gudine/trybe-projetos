import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
//   constructor() {
//     super();
//     this.state = {
//       redirect: false,
//     };
//   }

  // handleClick= () => {
  //   console.log('ta funcionando');
  // }

  render() {
    return (
      <>
        <input
          type="text"
          // onChange={handleChange}
          name="search"
          // value={search}
        />
        <Link to="/cart" data-testid="shopping-cart-button">icone carrinho</Link>
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.

        </p>
      </>
    );
  }
}

export default Home;
