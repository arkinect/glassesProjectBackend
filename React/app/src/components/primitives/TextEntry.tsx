// imports
import React, { useEffect, useState } from 'react';
import './TextEntry.scss';

// prop interface
interface props {
    inputLabel: string;
    isRequired: boolean;
    groupName: string;
    handleChange : (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// class
const TextEntry: React.FC<props> = ({inputLabel, isRequired, groupName, handleChange}) => {

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        handleChange(event);
    };

    return (
        <div className={"input_border"} data-placeholder={inputLabel}>
            {/* {inputLabel} */}
            <input className={"input-field"}
                type="text"
                name={groupName}
                onChange={handleInputChange}
                required = {isRequired}
                placeholder={inputLabel}
            />
        </div>
  );
};

export default TextEntry;
