import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import './Form.css';

class Form extends Component {
  render() {
    const {
      cardName, cardDescription, cardAttr1,
      cardAttr2, cardAttr3, cardImage, cardRare,
      cardTrunfo, hasTrunfo, isSaveButtonDisabled,
      onInputChange, onSaveButtonClick,
    } = this.props;

    return (
      <form>
        <Input
          label="Nome:"
          type="text"
          name="cardName"
          value={ cardName }
          handleChange={ onInputChange }
          testid="name-input"
        />
        <label htmlFor="description">
          {'Descrição: '}
          <textarea
            name="cardDescription"
            value={ cardDescription }
            onChange={ onInputChange }
            data-testid="description-input"
          />
        </label>
        <Input
          label="Atributo 1:"
          type="number"
          name="cardAttr1"
          value={ cardAttr1 }
          handleChange={ onInputChange }
          testid="attr1-input"
        />
        <Input
          label="Atributo 2:"
          type="number"
          name="cardAttr2"
          value={ cardAttr2 }
          handleChange={ onInputChange }
          testid="attr2-input"
        />
        <Input
          label="Atributo 3:"
          type="number"
          name="cardAttr3"
          value={ cardAttr3 }
          handleChange={ onInputChange }
          testid="attr3-input"
        />
        <Input
          label="URL da Imagem:"
          type="text"
          name="cardImage"
          value={ cardImage }
          handleChange={ onInputChange }
          testid="image-input"
        />
        <label htmlFor="rare">
          Raridade:
          {' '}
          <select
            name="cardRare"
            value={ cardRare }
            onChange={ onInputChange }
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
          name="cardTrunfo"
          value={ cardTrunfo }
          handleChange={ onInputChange }
          testid="trunfo-input"
        />
        <button
          type="submit"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
          data-testid="save-button"
        >
          Salvar
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.number.isRequired,
  cardAttr2: PropTypes.number.isRequired,
  cardAttr3: PropTypes.number.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
