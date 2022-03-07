import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      artist: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { artist } = this.state;
    const MIN_ARTIST_LENGTH = 2;

    return (
      <div data-testid="page-search">
        <Header />
        <form className="search-bar">
          <input
            data-testid="search-artist-input"
            type="text"
            name="artist"
            value={ artist }
            onChange={ this.handleChange }
            placeholder="Nome do Artista"
          />
          <button
            data-testid="search-artist-button"
            type="submit"
            disabled={ artist.length < MIN_ARTIST_LENGTH }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
