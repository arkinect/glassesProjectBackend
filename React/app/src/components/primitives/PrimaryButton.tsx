// imports
import React from 'react';
import './PrimaryButton.scss'

// prop interface
interface props {
    text: string;
    handleClick: any;
}

// class
const PrimaryButton: React.FC<props> = ({ text, handleClick}) => {
    return (
      <button 
        className="button_default font_button"
        onClick={handleClick}>
          {text}
      </button>
    );
  };

export default PrimaryButton;
