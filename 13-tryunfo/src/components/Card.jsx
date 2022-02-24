import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Card.css';
import CardFrame from './CardFrame';
import TrunfoSymbol from './TrunfoSymbol';
import RaritySymbol from './RaritySymbol';

class Card extends Component {
  render() {
    const {
      cardName, cardDescription, cardAttr1,
      cardAttr2, cardAttr3, cardImage, cardRare,
      cardTrunfo, onDeleteCard,
    } = this.props;

    return (
      <>
        <CardFrame>
          <div className="header">
            <p data-testid="name-card">{cardName}</p>
            <RaritySymbol cardRare={ cardRare } />
          </div>
          <div className="image-cont">
            <img
              src={ cardImage }
              alt={ cardName }
              data-testid="image-card"
            />
          </div>
          {cardTrunfo && <TrunfoSymbol />}
          <div className="attrs-cont">
            <p>
              {'Atk: '}
              <span data-testid="attr1-card">{cardAttr1}</span>
            </p>
            <p>
              {'Skl: '}
              <span data-testid="attr2-card">{cardAttr2}</span>
            </p>
            <p>
              {'Def: '}
              <span data-testid="attr3-card">{cardAttr3}</span>
            </p>
          </div>
          <div className="desc-cont">
            <p data-testid="description-card">{cardDescription}</p>
          </div>
          <div className="misc-cont">
            <p>
              {'Raridade: '}
              <span data-testid="rare-card">{cardRare}</span>
            </p>
            {cardTrunfo && (<p data-testid="trunfo-card">Super Trunfo!</p>)}
          </div>
        </CardFrame>
        {onDeleteCard && (
          <button
            type="button"
            data-testid="delete-button"
            onClick={ onDeleteCard }
          >
            Excluir
          </button>
        )}
      </>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.number.isRequired,
  cardAttr2: PropTypes.number.isRequired,
  cardAttr3: PropTypes.number.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  onDeleteCard: PropTypes.func,
};

Card.defaultProps = {
  onDeleteCard: null,
};

export default Card;
