import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SavedCards.css';
import Card from './Card';
import Input from './Input';

class SavedCards extends Component {
  constructor() {
    super();

    this.state = {
      nameFilter: '',
      rareFilter: '',
      trunfoFilter: false,
    };
  }

  handleFilterChange = ({ target }) => {
    const { type, name } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  }

  render() {
    const cardBacklog = () => {
      const { cards, handleCardDelete } = this.props;
      const { nameFilter, rareFilter, trunfoFilter } = this.state;

      if (trunfoFilter) {
        const trunfoCard = cards.find((card) => card.cardTrunfo);
        if (trunfoCard) {
          return (
            <Card
              key={ trunfoCard.id }
              { ...trunfoCard }
              onDeleteCard={ () => handleCardDelete(trunfoCard) }
            />
          );
        }
        return;
      }
      return cards
        .filter((card) => card.cardName.toLowerCase()
          .includes(nameFilter.toLowerCase()))
        .filter((card) => !rareFilter || card.cardRare === rareFilter.toLowerCase())
        .map((card) => (
          <Card
            key={ card.id }
            { ...card }
            onDeleteCard={ () => handleCardDelete(card) }
          />
        ));
    };

    const { nameFilter, rareFilter, trunfoFilter } = this.state;
    return (
      <div className="backlog-cont screen">
        <div className="backlog-filters">
          <h2>Filtros</h2>
          <input
            name="nameFilter"
            type="text"
            placeholder="Nome da Carta"
            value={ nameFilter }
            onChange={ this.handleFilterChange }
            data-testid="name-filter"
          />
          <select
            name="rareFilter"
            value={ rareFilter }
            onChange={ this.handleFilterChange }
            data-testid="rare-filter"
          >
            <option value="">todas</option>
            <option>normal</option>
            <option>raro</option>
            <option>muito raro</option>
          </select>
          <Input
            label="Super Trunfo"
            type="checkbox"
            name="trunfoFilter"
            value={ trunfoFilter }
            handleChange={ this.handleFilterChange }
            testid="trunfo-filter"
          />
        </div>
        <div className="backlog-cards">
          {cardBacklog()}
        </div>
      </div>
    );
  }
}

SavedCards.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleCardDelete: PropTypes.func.isRequired,
};

export default SavedCards;
