import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Card.css';
import CardFrame from './CardFrame';
import TrunfoSymbol from './TrunfoSymbol';
import RaritySymbol from './RaritySymbol';
import attr1Img from '../img/Attr1.png';
import attr2Img from '../img/Attr2.png';
import attr3Img from '../img/Attr3.png';

class Card extends Component {
  render() {
    const {
      cardName, cardDescription, cardAttr1,
      cardAttr2, cardAttr3, cardImage, cardRare,
      cardTrunfo, onDeleteCard,
    } = this.props;

    return (
      <section className="card-section">
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
              <img
                src={ attr1Img }
                alt="Ataque"
                title="Ataque"
              />
              <span data-testid="attr1-card">{cardAttr1}</span>
            </p>
            <p>
              <img
                src={ attr2Img }
                alt="Defesa"
                title="Defesa"
              />
              <span data-testid="attr2-card">{cardAttr2}</span>
            </p>
            <p>
              <img
                src={ attr3Img }
                alt="Habilidade"
                title="Habilidade"
              />
              <span data-testid="attr3-card">{cardAttr3}</span>
            </p>
          </div>
          <div className="desc-cont">
            <p data-testid="description-card">{cardDescription}</p>
          </div>
        </CardFrame>
        {onDeleteCard && (
          <button
            type="button"
            className="delete-card"
            data-testid="delete-button"
            onClick={ onDeleteCard }
          >
            Excluir
          </button>
        )}
      </section>
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
