import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './SendReview.css';

class SendReview extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      stars: '',
      message: '',
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { productId, handleSendReview } = this.props;
    const { email, stars, message } = this.state;
    handleSendReview({ id: productId, email, stars, message });
    this.setState({ email: '', stars: '', message: '' });
  };

  render() {
    const MAX_STARS = 5;
    const STAR_ARRAY = [...Array(MAX_STARS).keys()].map((num) => num + 1);
    const { email, stars, message } = this.state;

    return (
      <div className="send-review">
        <h3>Avalie o produto</h3>
        <form
          onSubmit={ this.handleSubmit }
          className="review-form"
        >
          <input
            data-testid="product-detail-email"
            type="email"
            name="email"
            placeholder="Email"
            value={ email }
            onChange={ this.handleChange }
            className="email"
          />
          <div className="stars-div">
            {STAR_ARRAY.map((num) => (
              <label key={ num } htmlFor={ `${num}-stars` }>
                <input
                  data-testid={ `${num}-rating` }
                  type="radio"
                  id={ `${num}-stars` }
                  name="stars"
                  value={ num }
                  checked={ stars === String(num) }
                  onChange={ this.handleChange }
                />
                ⭐
              </label>
            ))}
          </div>
          <textarea
            data-testid="product-detail-evaluation"
            name="message"
            rows={ 5 }
            placeholder="Mensagem (opcional)"
            value={ message }
            onChange={ this.handleChange }
          />
          <button
            data-testid="submit-review-btn"
            type="submit"
          >
            Avaliar
          </button>
        </form>
      </div>
    );
  }
}

SendReview.propTypes = {
  productId: PropTypes.string.isRequired,
  handleSendReview: PropTypes.func.isRequired,
};

export default SendReview;
