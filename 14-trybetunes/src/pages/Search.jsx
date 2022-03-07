import React, { Component } from 'react';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import './Search.css';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      artist: '',
      searchQuery: null,
      searchResults: [],
    };
  }

  handleChange = ({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  handleForm = (ev) => {
    ev.preventDefault();
    const { artist } = this.state;

    this.setState({
      artist: '',
      loading: true,
    });

    searchAlbumsAPI(artist)
      .then((r) => this.setState({
        loading: false,
        searchQuery: artist,
        searchResults: r,
      }));
  }

  render() {
    const { loading, artist, searchQuery, searchResults } = this.state;
    const MIN_ARTIST_LENGTH = 2;

    const generateAlbumList = () => searchResults.map((album) => (
      <AlbumCard
        key={ album.collectionId }
        { ...album }
      />
    ));

    return (
      <div data-testid="page-search">
        {loading && <Loading />}
        <Header />
        <form className="search-bar" onSubmit={ this.handleForm }>
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
        <section className="search-results">
          <header>
            <h1>
              { searchQuery && (
                searchResults.length
                  ? `Resultado de álbuns de: ${searchQuery}`
                  : 'Nenhum álbum foi encontrado'
              )}
            </h1>
          </header>
          <section className="album-list">
            {generateAlbumList()}
          </section>
        </section>
      </div>
    );
  }
}

export default Search;
