// imports
import React, { useEffect, useState } from 'react';
import './listingForm.scss';
import TextEntry from './primitives/TextEntry';
import PrimaryButton from './primitives/PrimaryButton';

// prop interface
interface props {
    
}

// class
const ListingForm: React.FC<props> = ({}) => {

    // define submission structure
    const [formData, setFormData] = useState({
        prescription: '',
        ownerName: '',
        contact: '',
        city: ''
    });

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // You can add your data submission logic here
        console.log('Form submitted:', formData);
        // Reset form fields after submission if needed
        setFormData({
        prescription: '',
        ownerName: '',
        contact: '',
        city: ''
        });
    };

    return (
        <form onSubmit={handleSubmit} className="data-entry-form">
            <h1>New Glasses Listing</h1>

            <div>
                <TextEntry 
                    inputLabel='Prescription'
                    isRequired={true}
                    groupName='prescription'
                    handleChange={handleChange}
                ></TextEntry>
            </div>

            <div>
                <TextEntry 
                    inputLabel='Name'
                    isRequired={true}
                    groupName='ownerName'
                    handleChange={handleChange}
                ></TextEntry>
            </div>

            <div>
                <TextEntry 
                    inputLabel='Contact'
                    isRequired={true}
                    groupName='contact'
                    handleChange={handleChange}
                ></TextEntry>
            </div>

            <div>
                <TextEntry 
                    inputLabel='City'
                    isRequired={true}
                    groupName='city'
                    handleChange={handleChange}
                ></TextEntry>
            </div>

            <PrimaryButton text='Post Glasses' handleClick={NaN}></PrimaryButton>
        </form>
  );
};

export default ListingForm;
