import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './AlbumCard.css';

class AlbumCard extends Component {
  render() {
    const { artistName, collectionId, collectionName, artworkUrl100 } = this.props;
    return (
      <div className="album-card">
        <img src={ artworkUrl100 } alt={ collectionName } />
        <div className="album-data">
          <span>{collectionName}</span>
          <span>{artistName}</span>
          <Link
            data-testid={ `link-to-album-${collectionId}` }
            to={ `/album/${collectionId}` }
          >
            Ver Album Completo
          </Link>
        </div>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  artistName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  collectionName: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
};

export default AlbumCard;
