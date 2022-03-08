import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MusicCard.css';

class MusicCard extends Component {
  render() {
    const { music, handleCheckbox } = this.props;
    const { previewUrl, trackId, trackName, isFavorited } = music;

    return (
      <>
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
            onChange={ (ev) => handleCheckbox(ev, music) }
            checked={ isFavorited }
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
    isFavorited: PropTypes.bool.isRequired,
  }).isRequired,
  handleCheckbox: PropTypes.func.isRequired,
};

export default MusicCard;
