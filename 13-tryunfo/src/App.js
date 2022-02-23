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
    };
    // onSaveButtonClick: false,
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

  render() {
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          { ...this.state }
          onInputChange={ this.handleChange }
        />
        <Card
          { ...this.state }
        />
      </div>
    );
  }
}

export default App;
