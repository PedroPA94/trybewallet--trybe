import PropTypes from 'prop-types';
import React from 'react';

class Input extends React.Component {
  render() {
    const { name, type, placeholder, min, dataTestId, value, onChange } = this.props;
    return (
      <label htmlFor={ name }>
        <input
          type={ type }
          name={ name }
          placeholder={ placeholder }
          min={ min }
          data-testid={ dataTestId }
          value={ value }
          onChange={ (event) => onChange(event) }
        />
      </label>
    );
  }
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  dataTestId: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;
