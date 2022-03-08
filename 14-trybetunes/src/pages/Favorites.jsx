import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import './Favorites.css';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      favSongs: [],
    };
  }

  async componentDidMount() {
    const { startLoading, stopLoading } = this.props;
    startLoading();

    const favSongs = await getFavoriteSongs()
      .then((r) => r.map((song) => ({ ...song, isFavorited: true })));
    this.setState({ favSongs }, stopLoading);
  }

  handleCheckbox = async ({ target }, targetMusic) => {
    const { checked } = target;
    const { startLoading, stopLoading } = this.props;

    startLoading();
    await (checked ? addSong(targetMusic) : removeSong(targetMusic));

    const favSongs = await getFavoriteSongs()
      .then((r) => r.map((song) => ({ ...song, isFavorited: true })));
    this.setState({ favSongs }, stopLoading);
  };

  render() {
    const { favSongs } = this.state;

    const generateMusicList = () => favSongs.map((music) => (
      <MusicCard
        key={ music.trackId }
        music={ music }
        handleCheckbox={ this.handleCheckbox }
      />
    ));

    return (
      <div data-testid="page-favorites" className="page-favorites">
        {generateMusicList()}
      </div>
    );
  }
}

Favorites.propTypes = {
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
};

export default Favorites;
