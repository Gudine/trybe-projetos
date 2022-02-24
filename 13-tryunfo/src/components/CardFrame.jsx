import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CardFrame.css';

class CardFrame extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="card-outer">
        <div className="card-middle">
          <div className="card-inner">
            {children}
          </div>
        </div>
      </div>
    );
  }
}

CardFrame.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CardFrame;
