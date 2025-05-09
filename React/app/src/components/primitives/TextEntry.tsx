// imports
import React from 'react';
import './TextEntry.scss';

// prop interface
interface props {
    inputLabel: string;
    isRequired: boolean;
    groupName: string;
    displayValue: string | number | null;
    enforceNumbers?: boolean
    handleChange : (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// class
const TextEntry: React.FC<props> = ({inputLabel, isRequired, groupName, displayValue, enforceNumbers = false, handleChange}) => {

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
        <div className={"input_border"} data-placeholder={inputLabel}>
            <input className={"input_field"}
                type='text'
                name={groupName} // groupName should match the category in formData
                onChange={handleChange}
                required = {isRequired}
                placeholder={inputLabel}
                value={display === 0 ? '' : display}
                onKeyDown={isNumberKey}
            />
        </div>
  );
};

export default TextEntry;
