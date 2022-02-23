import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { label, type, name, value, testid, handleChange } = this.props;
    return (
      <label htmlFor={ name }>
        {`${label} `}
        <input
          type={ type }
          name={ name }
          { ...(type === 'checkbox' ? { checked: value } : { value }) }
          onChange={ handleChange }
          data-testid={ testid }
        />
      </label>
    );
  }
}

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]).isRequired,
  testid: PropTypes.string.isRequired,
};

Input.defaultProps = {
  label: '',
  type: 'text',
};

export default Input;
