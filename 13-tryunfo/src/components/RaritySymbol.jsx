import React, { Component } from 'react';
import PropTypes from 'prop-types';
import normalImg from '../img/normal.png';
import raroImg from '../img/raro.png';
import muitoRaroImg from '../img/muito raro.png';

class RaritySymbol extends Component {
  render() {
    const { cardRare } = this.props;
    const rareImgs = {
      normal: normalImg, raro: raroImg, 'muito raro': muitoRaroImg,
    };

    return (
      <img
        className="header-rare"
        src={ rareImgs[cardRare] }
        alt={ cardRare }
        title={ cardRare }
      />
    );
  }
}

RaritySymbol.propTypes = { cardRare: PropTypes.string.isRequired };

export default RaritySymbol;
