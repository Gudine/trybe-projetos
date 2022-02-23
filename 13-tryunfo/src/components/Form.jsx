import React, { Component } from 'react';
import Input from './Input';
import './Form.css';

class Form extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      description: '',
      attr1: 0,
      attr2: 0,
      attr3: 0,
      image: '',
      rare: 'normal',
      trunfo: false,
    };
  }

  handleChange = ({ target }) => {
    const { type, name } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  }

  render() {
    const {
      name, description, attr1, attr2, attr3, image, rare, trunfo,
    } = this.state;

    return (
      <form>
        <Input
          label="Nome:"
          type="text"
          name="name"
          value={ name }
          handleChange={ this.handleChange }
          testid="name-input"
        />
        <label htmlFor="description">
          {'Descrição: '}
          <textarea
            name="description"
            value={ description }
            onChange={ this.handleChange }
            data-testid="description-input"
          />
        </label>
        <Input
          label="Atributo 1:"
          type="number"
          name="attr1"
          value={ attr1 }
          handleChange={ this.handleChange }
          testid="attr1-input"
        />
        <Input
          label="Atributo 2:"
          type="number"
          name="attr2"
          value={ attr2 }
          handleChange={ this.handleChange }
          testid="attr2-input"
        />
        <Input
          label="Atributo 3:"
          type="number"
          name="attr3"
          value={ attr3 }
          handleChange={ this.handleChange }
          testid="attr3-input"
        />
        <Input
          label="URL da Imagem:"
          type="text"
          name="image"
          value={ image }
          handleChange={ this.handleChange }
          testid="image-input"
        />
        <label htmlFor="rare">
          Raridade:
          {' '}
          <select
            name="rare"
            value={ rare }
            onChange={ this.handleChange }
            data-testid="rare-input"
          >
            <option>normal</option>
            <option>raro</option>
            <option>muito raro</option>
          </select>
        </label>
        <Input
          label="Super Trunfo"
          type="checkbox"
          name="trunfo"
          value={ trunfo }
          handleChange={ this.handleChange }
          testid="trunfo-input"
        />
        <button type="submit" data-testid="save-button">
          Salvar
        </button>
      </form>
    );
  }
}

export default Form;
