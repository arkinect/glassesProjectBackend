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
        pseudoPrescription: '',
        ownerName: '',
        contact: '',
        city: ''
    });


    // handle tick box
    const [isSpecific, setIsSpecific] = useState(false);

    const handleCheckboxChange = () => {
        setIsSpecific(!isSpecific);
    };

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value
        });
    };

    // Handle form submission
    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     // You can add your data submission logic here
    //     console.log('Form submitted:', formData);
    //     // Reset form fields after submission if needed
    //     setFormData({
    //     prescription: '',
    //     pseudoPrescription: '',
    //     ownerName: '',
    //     contact: '',
    //     city: ''
    //     });
    // };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch('http://your-backend-url/api/listings', { // Update with your backend URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData), // Convert the form data to JSON
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Response from backend:', data);
            setFormData({
                prescription: '',
                pseudoPrescription: '',
                ownerName: '',
                contact: '',
                city: ''
            });
        })
        .catch(error => {
            console.error('Error submitting form:', error);
        });
    };



    return (
        <form onSubmit={handleSubmit} className="data-entry-form">
            <h1 className='font_formHeading'>New Glasses Listing</h1>

            <label className='font_defaultText'>
                <input
                    type="checkbox"
                    checked={isSpecific}
                    onChange={handleCheckboxChange}
                />
                I know my prescription
            </label>

            {isSpecific ? (
                <div>Blank div, this doesnt work yet</div>
            ) : (
                <div>
                    <TextEntry 
                        inputLabel='Prescription'
                        isRequired={true}
                        groupName={formData.prescription}
                        handleChange={handleChange}
                    ></TextEntry>
                </div>
            )}

            <div>
                <TextEntry 
                    inputLabel='Name'
                    isRequired={true}
                    groupName={formData.ownerName}
                    handleChange={handleChange}
                ></TextEntry>
            </div>

            <div>
                <TextEntry 
                    inputLabel='Contact'
                    isRequired={true}
                    groupName={formData.contact}
                    handleChange={handleChange}
                ></TextEntry>
            </div>

            <div>
                <TextEntry 
                    inputLabel='City'
                    isRequired={true}
                    groupName={formData.city}
                    handleChange={handleChange}
                ></TextEntry>
            </div>

            <PrimaryButton text='Post Glasses' handleClick={NaN}></PrimaryButton>
        </form>
  );
};

export default ListingForm;
