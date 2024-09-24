// imports
import React, { useEffect, useState } from 'react';
import './TextEntry.scss';

// prop interface
interface props {
    inputLabel: string;
    isRequired: boolean;
    groupName: string;
    handleChange : () => void;
}

// class
const TextEntry: React.FC<props> = ({inputLabel, isRequired, groupName, handleChange}) => {

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        handleChange(event);
    };

    // clear input on focus
    const handleFocus = () => {
        if (inputValue === '') {
            setInputValue('');
        }
    };

    const handleBlur = () => {
        if (inputValue === '') {
            setInputValue(''); // optional: reset value on blur if empty
        }
    };



    return (
        <input
            type="text"
            name={groupName}
            value={inputLabel}
            onChange={handleChange}
            required = {isRequired}
        />
  );
};

export default TextEntry;
