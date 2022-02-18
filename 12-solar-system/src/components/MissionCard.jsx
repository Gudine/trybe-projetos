import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MissionCard extends Component {
  render() {
    const { name, year, country, destination } = this.props;
    return (
      <div className="mission-card" data-testid="mission-card">
        <p className="mission-name" data-testid="mission-name">
          {name}
        </p>
        <p data-testid="mission-year">
          Ano de execução:
          {' '}
          {year}
        </p>
        <p data-testid="mission-country">
          Pais de origem:
          {' '}
          {country}
        </p>
        <p data-testid="mission-destination">
          Destino:
          {' '}
          {destination}
        </p>
      </div>
    );
  }
}

MissionCard.propTypes = {
  name: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
};

export default MissionCard;
