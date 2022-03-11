import React from 'react';
import Card from './components/Card';
import Form from './components/Form';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      cards: [],
      nextId: 0,
    };
  }

  validateSaveButton = () => {
    const {
      cardName, cardDescription, cardAttr1,
      cardAttr2, cardAttr3, cardImage, cardRare,
    } = this.state;
    const singleCap = 90;
    const totalCap = 210;
    console.log(this.state);
    console.log(cardAttr1, cardAttr2, cardAttr3);

    if (
      cardName && cardDescription && cardImage && cardRare
      && (cardAttr1 + cardAttr2 + cardAttr3) <= totalCap
      && cardAttr1 >= 0 && cardAttr1 <= singleCap
      && cardAttr2 >= 0 && cardAttr2 <= singleCap
      && cardAttr3 >= 0 && cardAttr3 <= singleCap
    ) this.setState({ isSaveButtonDisabled: false });
    else this.setState({ isSaveButtonDisabled: true });
  }

  handleChange = ({ target }) => {
    const { type, name } = target;
    let value = type === 'checkbox' ? target.checked : target.value;
    if (type === 'number') value = parseInt(value, 10);
    this.setState({ [name]: value }, this.validateSaveButton);
  }

  handleSaveButton = (ev) => {
    ev.preventDefault();
    this.setState((prev) => {
      const newCard = { id: prev.nextId, ...prev };
      delete newCard.hasTrunfo;
      delete newCard.isSaveButtonDisabled;
      delete newCard.cards;
      delete newCard.nextId;

      return {
        cardName: '',
        cardDescription: '',
        cardAttr1: 0,
        cardAttr2: 0,
        cardAttr3: 0,
        cardImage: '',
        cardRare: 'normal',
        cardTrunfo: false,
        hasTrunfo: (newCard.cardTrunfo || prev.hasTrunfo),
        isSaveButtonDisabled: true,
        cards: [...prev.cards, newCard],
        nextId: prev.nextId + 1,
      };
    });
  }

  handleCardDelete = (delCard) => {
    this.setState((prev) => ({
      hasTrunfo: delCard.cardTrunfo ? false : prev.hasTrunfo,
      cards: prev.cards.filter((card) => card.id !== delCard.id),
    }));
  }

  render() {
    const cardBacklog = () => {
      const { cards } = this.state;
      return cards.map((card) => (
        <Card
          key={ card.id }
          { ...card }
          onDeleteCard={ () => this.handleCardDelete(card) }
        />
      ));
    };

    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          { ...this.state }
          onInputChange={ this.handleChange }
          onSaveButtonClick={ this.handleSaveButton }
        />
        <Card
          { ...this.state }
        />
        {cardBacklog()}
      </div>
    );
  }
}

export default App;
