import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import './Album.css';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      albumData: {},
      musicList: [],
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;

    const [musics, favSongs] = await Promise.all([
      getMusics(id),
      getFavoriteSongs(),
    ]);

    this.setState({
      loading: false,
      albumData: musics[0],
      musicList: musics.slice(1).map((music) => ({
        ...music,
        isFavorited: favSongs.some((favdSong) => favdSong.trackId === music.trackId),
      })),
    });
  }

  handleCheckbox = async ({ target }, targetMusic) => {
    const { checked } = target;

    this.setState({ loading: true });

    await (checked ? addSong(targetMusic) : removeSong(targetMusic));
    const favSongs = await getFavoriteSongs();

    this.setState((prev) => ({
      loading: false,
      musicList: prev.musicList.map((music) => ({
        ...music,
        isFavorited: favSongs.some((favdSong) => favdSong.trackId === music.trackId),
      })),
    }));
  };

  render() {
    const { loading, albumData, musicList } = this.state;
    const { artistName, artworkUrl100, collectionName } = albumData;

    const generateMusicList = () => musicList.map((music) => (
      <MusicCard
        key={ music.trackId }
        music={ music }
        handleCheckbox={ this.handleCheckbox }
      />
    ));

    return (
      <div data-testid="page-album">
        {loading && <Loading />}
        <Header />
        <section className="album-contents">
          <section className="album-data">
            <img src={ artworkUrl100 } alt={ collectionName } />
            <p data-testid="album-name">{collectionName}</p>
            <p data-testid="artist-name">{artistName}</p>
          </section>
          <section className="music-list">
            {generateMusicList()}
          </section>
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
