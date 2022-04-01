import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import './Album.css';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import { connect } from 'react-redux';
import { startLoading, stopLoading } from '../redux/actions';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      albumData: {},
      musicList: [],
    };
  }

  async componentDidMount() {
    document.title = 'Album | TrybeTunes';
    const { match, startLoading, stopLoading } = this.props;
    const { id } = match.params;

    startLoading();

    const [musics, favSongs] = await Promise.all([
      getMusics(id),
      getFavoriteSongs(),
    ]);

    document.title = `${musics[0].collectionName} | TrybeTunes`;

    this.setState({
      albumData: musics[0],
      musicList: musics.slice(1).map((music) => ({
        ...music,
        isFavorited: favSongs.some((favdSong) => favdSong.trackId === music.trackId),
      })),
    }, stopLoading);
  }

  handleCheckbox = async ({ target }, targetMusic) => {
    const { checked } = target;
    const { startLoading, stopLoading } = this.props;

    startLoading();

    await (checked ? addSong(targetMusic) : removeSong(targetMusic));
    const favSongs = await getFavoriteSongs();

    this.setState((prev) => ({
      musicList: prev.musicList.map((music) => ({
        ...music,
        isFavorited: favSongs.some((favdSong) => favdSong.trackId === music.trackId),
      })),
    }), stopLoading);
  };

  render() {
    const { albumData, musicList } = this.state;
    const { artistName, artworkUrl100, collectionName } = albumData;
    const artwork = artworkUrl100?.replace?.('100x100', '600x600');

    const generateMusicList = () => musicList.map((music, index, arr) => (
      <MusicCard
        key={ music.trackId }
        music={ music }
        handleCheckbox={ this.handleCheckbox }
        final={ index === arr.length - 1 }
      />
    ));

    const bgStyle = { background: `url(${artwork}) center/cover` };

    return (
      <div className="page-album" style={ bgStyle } data-testid="page-album">
        <section className="album-contents">
          <section className="album-data">
            <img className="album-img" src={ artwork } alt={ collectionName } />
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
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
};

const mapDispatchToProps = { startLoading, stopLoading };

export default connect(null, mapDispatchToProps)(Album);
