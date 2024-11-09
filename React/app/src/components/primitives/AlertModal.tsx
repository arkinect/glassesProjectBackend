// imports
import React from 'react';
import './AlertModal.scss';
import PrimaryButton from './PrimaryButton';

// prop interface
interface props {
    isOpen: boolean;
    bodyText?: string;
    titleText?: string;
    buttonText: string;
    onClose: () => void;
}

// class
const AlertModal: React.FC<props> = ({ isOpen, bodyText, titleText, buttonText="OK", onClose }) => {
    if (!isOpen) return null; // Don't render the modal if not open

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h1 className="font_title">{titleText}</h1>
                <h2 className="font_body">{bodyText}</h2>
                <PrimaryButton text={buttonText} handleClick={onClose}></PrimaryButton>
            </div>
        </div>
    );
};

export default AlertModal;