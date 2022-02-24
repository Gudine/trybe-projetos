import React, { Component } from 'react';
import trunfoImg from '../img/Super.png';

class TrunfoSymbol extends Component {
  render() {
    return (
      <div className="trunfo-cont">
        <img
          src={ trunfoImg }
          alt="Esta carta é um Super Trunfo"
          title="Esta carta é um Super Trunfo"
        />
      </div>
    );
  }
}

export default TrunfoSymbol;
