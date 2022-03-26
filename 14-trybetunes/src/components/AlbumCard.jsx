import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiExternalLink } from 'react-icons/fi';
import './AlbumCard.css';

class AlbumCard extends Component {
  render() {
    const { artistName, collectionId, collectionName,
      artworkUrl100, releaseDate, trackCount } = this.props;
    const date = new Date(releaseDate);
    const [day, month, year] = [
      date.getDate(), date.getMonth() + 1, date.getFullYear(),
    ].map((number) => String(number).padStart(2, '0'));

    return (
      <div className="album-card">
        <span>{collectionName}</span>
        <span>{artistName}</span>
        <div className="last-row">
          <span>{`${trackCount} track${trackCount > 1 ? 's' : ''}`}</span>
          <span>{`${day}/${month}/${year}`}</span>
        </div>
        <div className="image-cont">
          <Link
            data-testid={ `link-to-album-${collectionId}` }
            to={ `/album/${collectionId}` }
          >
            <FiExternalLink />
          </Link>
          <img src={ artworkUrl100 } alt={ collectionName } />
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
  releaseDate: PropTypes.string.isRequired,
  trackCount: PropTypes.number.isRequired,
};

export default AlbumCard;
