// imports
import React from 'react';
import './BlankTextEntry.scss';

// prop interface
interface props {
    isRequired: boolean;
    groupName: string;
    displayValue: string | number | null;
    handleChange : (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// class
const BlankTextEntry: React.FC<props> = ({isRequired, groupName, displayValue, handleChange}) => {

    const display = displayValue === null || displayValue === undefined ? '' : displayValue;

    return (
        <input className={"input_invisible"}
            type='text'
            name={groupName} // groupName should match the category in formData
            onChange={handleChange}
            required = {isRequired}
            value={display === 0 ? '' : display}
        />
  );
};

export default BlankTextEntry;
