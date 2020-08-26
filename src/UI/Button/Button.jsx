import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = (props) => {
  const { disabled, onClick, text } = props;
  return (
    <button
      type='button'
      className='button'
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;

Button.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired
};
