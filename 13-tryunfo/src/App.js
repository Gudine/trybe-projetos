import React from 'react';
import Card from './components/Card';
import Form from './components/Form';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: false,
    };
    // onSaveButtonClick: false,
  }

  handleChange = ({ target }) => {
    const { type, name } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
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
