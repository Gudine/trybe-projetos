import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MusicCard.css';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };
  }

  handleCheckbox = ({ target }) => {
    if (!target.checked) return;

    const { music } = this.props;

    this.setState({ loading: true });

    addSong(music)
      .then(() => this.setState({ loading: false }));
  };

  render() {
    const { loading } = this.state;
    const { music } = this.props;
    const { previewUrl, trackId, trackName } = music;

    return (
      <>
        {loading && <Loading />}
        <span className="music-name">{trackName}</span>
        <audio
          data-testid="audio-component"
          className="music-preview"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ `favorite-${trackId}` } className="music-favorited">
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            id={ `favorite-${trackId}` }
            type="checkbox"
            onChange={ this.handleCheckbox }
          />
          <span className="checkmark" />
        </label>
      </>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
  }).isRequired,
};

export default MusicCard;
