// imports
import React, { useEffect, useState } from 'react';
import './TextEntry.scss';

// prop interface
interface props {
    inputLabel: string;
    isRequired: boolean;
    groupName: string;
    displayValue: string | number | null;
    handleChange : (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// class
const TextEntry: React.FC<props> = ({inputLabel, isRequired, groupName, displayValue, handleChange}) => {

    const display = displayValue === null || displayValue === undefined ? '' : displayValue;

    return (
        <div className={"input_border"} data-placeholder={inputLabel}>
            <input className={"input-field"}
                type='text'
                name={groupName} // groupName should match the category in formData
                onChange={handleChange}
                required = {isRequired}
                placeholder={inputLabel}
                value={display === 0 ? '' : display}
            />
        </div>
  );
};

export default TextEntry;
