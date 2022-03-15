import React, { Component } from 'react';
import { BsTruck } from 'react-icons/bs';
import './FreeShipping.css';

class FreeShipping extends Component {
  render() {
    return (
      <div className="free-shipping">
        <BsTruck />
        <div data-testid="free-shipping">Frete Grátis</div>
      </div>
    );
  }
}

export default FreeShipping;
