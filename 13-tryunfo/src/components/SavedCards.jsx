import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

class SavedCards extends Component {
  render() {
    const cardBacklog = () => {
      const { cards } = this.props;
      return cards.map((card) => (
        <Card
          key={ card.id }
          { ...card }
          onDeleteCard={ () => this.handleCardDelete(card) }
        />
      ));
    };

    return (
      <div className="backlog-cont">
        {cardBacklog()}
      </div>
    );
  }
}

SavedCards.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SavedCards;
