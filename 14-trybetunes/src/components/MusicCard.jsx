import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import './MusicCard.css';

class MusicCard extends Component {
  render() {
    const { music, handleCheckbox, favoriteList, final } = this.props;
    const {
      artworkUrl100, collectionName, previewUrl, trackId, trackName, isFavorited,
    } = music;

    return (
      <>
        { favoriteList && (<img
          className="card-album-img"
          src={ artworkUrl100 }
          alt={ collectionName }
        />)}
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
          <input
            data-testid={ `checkbox-music-${trackId}` }
            id={ `favorite-${trackId}` }
            type="checkbox"
            onChange={ (ev) => handleCheckbox(ev, music) }
            checked={ isFavorited }
          />
          { isFavorited ? <BsHeartFill /> : <BsHeart /> }
        </label>
        { !final && <hr /> }
      </>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    artworkUrl100: PropTypes.string.isRequired,
    collectionName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
    isFavorited: PropTypes.bool.isRequired,
  }).isRequired,
  handleCheckbox: PropTypes.func.isRequired,
  favoriteList: PropTypes.bool,
  final: PropTypes.bool,
};

MusicCard.defaultProps = { favoriteList: false, final: false };

export default MusicCard;
