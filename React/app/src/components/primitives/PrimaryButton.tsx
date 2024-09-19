// imports
import React from 'react';
import './PrimaryButton.scss'

// prop interface
interface props {
    text: string;
}

// 
const PrimaryButton: React.FC<props> = ({ text }) => {
    return (
      <button className="button_default">{text}</button>
    );
  };

export default PrimaryButton;
