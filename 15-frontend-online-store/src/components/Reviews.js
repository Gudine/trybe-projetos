import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './Reviews.css';

class Reviews extends Component {
  render() {
    const { productId, reviews } = this.props;
    const genReviews = () => reviews
      .filter((review) => review.id === productId)
      .map(({ email, stars, message }, index) => (
        <div className="reviews" key={ index }>
          <div className="rev-email">{ email }</div>
          <div>{ ''.padStart(Number(stars), '⭐') }</div>
          <div className="message">{ message }</div>
        </div>
      ));

    return (
      <>
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
