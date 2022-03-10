import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <>
        <input
          type="text"
          // onChange={handleChange}
          name="search"
          // value={search}
        />
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
