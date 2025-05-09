// imports
import React from 'react';
import './BlankTextEntry.scss';

// prop interface
interface props {
    isRequired: boolean;
    groupName: string;
    displayValue: string | number | null;
    enforceNumbers?: boolean
    handleChange : (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// class
const BlankTextEntry: React.FC<props> = ({isRequired, groupName, displayValue, enforceNumbers = false, handleChange}) => {

    const display = displayValue === null || displayValue === undefined ? '' : displayValue;

    const isNumberKey = (evt:React.KeyboardEvent<HTMLInputElement>) => {
            // if we aren't enforcing numbers on this input dont check
            if (!enforceNumbers) return;
    
            // enable ctrl A/V/C/X etc.
            if (evt.ctrlKey || evt.metaKey) {
                return; 
            }
    
            // otherwise check what the event was
            const key = evt.key;
    
            // allow navigation
            const navigationKeys = [
                "Backspace", "Delete", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown",
                "Tab", "Home", "End", "Enter"
            ];
            if (navigationKeys.includes(key)) return;
    
            // disallow events other than numbers, hyphens, period
            const allowedPattern = /^[\d.\-‐‑‒–—−]$/;
            if (!allowedPattern.test(key)) {
                evt.preventDefault();
            }
        }

    return (
        <input className={"input_invisible"}
            type='text'
            name={groupName} // groupName should match the category in formData
            onChange={handleChange}
            required = {isRequired}
            value={display === 0 ? '' : display}
            onKeyDown={isNumberKey}
        />
  );
};

export default BlankTextEntry;
