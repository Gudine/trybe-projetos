import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Reviews extends Component {
  render() {
    const { productId, reviews } = this.props;
    const genReviews = () => reviews
      .filter((review) => review.id === productId)
      .map(({ email, stars, message }, index) => (
        <div key={ index }>
          <div>{ email }</div>
          <div>{ ''.padStart(Number(stars), '⭐') }</div>
          <div>{ message }</div>
        </div>
      ));

    return (
      <div>
        {genReviews()}
      </div>
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
