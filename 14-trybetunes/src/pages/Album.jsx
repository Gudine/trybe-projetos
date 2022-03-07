import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import './Album.css';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      albumData: {},
      musicList: [],
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;

    getMusics(id).then((musics) => this.setState({
      loading: false,
      albumData: musics[0],
      musicList: musics.slice(1),
    }));
  }

  render() {
    const { loading, albumData, musicList } = this.state;
    const { artistName, artworkUrl100, collectionName } = albumData;

    const generateMusicList = () => musicList.map((music) => (
      <MusicCard
        key={ music.trackId }
        music={ music }
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
