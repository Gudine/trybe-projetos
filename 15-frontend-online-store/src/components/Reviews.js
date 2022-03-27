import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './Reviews.css';
import { AiFillStar } from 'react-icons/ai';

class Reviews extends Component {
  render() {
    const { productId, reviews } = this.props;
    const genReviews = () => reviews
      .filter((review) => review.id === productId)
      .map(({ email, stars, message }, index) => (
        <div className="reviews" key={ index }>
          <div className="rev-email">{ email }</div>
          <div className="stars-div">
            {Array(Number(stars)).fill()
              .map((_, starI) => (<AiFillStar key={ starI } />))}
          </div>
          <div className="message">{ message }</div>
        </div>
      ));

    return (
      <>
        <h3 className="reviews-title">Avaliações</h3>
        {genReviews()}
      </>
    );
  }
}

Reviews.propTypes = {
  productId: PropTypes.string.isRequired,
  reviews: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    stars: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  })).isRequired,
};

export default Reviews;
