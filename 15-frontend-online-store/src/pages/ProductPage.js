import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductPage extends Component {
  render() {
    const { match } = this.props;
    const { product } = match.params;
    const productObj = JSON.parse(product);
    const { title, thumbnail_id: thumbnailId, price, attributes } = productObj;
    console.log(attributes);

    return (
      <div className="product-page">
        <span data-testid="product-detail-name">{ title }</span>
        <img
          src={ `http://http2.mlstatic.com/D_${thumbnailId}-I.jpg` }
          alt={ title }
        />
        <span>{ price }</span>
        <ul>
          {attributes.map(({ id, name, value_name: valueName }) => (
            <li key={ id }>{`${name}: ${valueName}`}</li>
          ))}
        </ul>
      </div>
    );
  }
}

ProductPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      product: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductPage;
