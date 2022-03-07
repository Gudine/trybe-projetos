import React, { Component } from 'react';

class MusicCard extends Component {
  render() {
    const { previewUrl, trackId, trackName } = this.props;

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
        <span className="music-favorited">♡</span>
      </>
    );
  }
}

export default MusicCard;
