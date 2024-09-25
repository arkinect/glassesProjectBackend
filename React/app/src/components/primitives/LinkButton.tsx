// imports
import React from 'react';
import './LinkButton.scss'

// prop interface
interface props {
    text: string;
    handleClick: any;
}

// class
const LinkButton: React.FC<props> = ({ text, handleClick}) => {
    return (
      <button 
        className="button_link font_button_link"
        onClick={handleClick}>
          {text}
      </button>
    );
  };

export default LinkButton;
