// imports
import React, { useEffect, useState } from 'react';
import './listingForm.scss';

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
                <input
                type="text"
                id="prescription"
                name="prescription"
                value={formData.prescription}
                onChange={handleChange}
                required
                />
            </div>

            <div>
                <label htmlFor="ownerName">Owner Name:</label>
                <input
                type="text"
                id="ownerName"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                required
                />
            </div>

            <div>
                <label htmlFor="contact">Contact:</label>
                <input
                type="text"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                />
            </div>

            <div>
                <label htmlFor="city">City:</label>
                <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                />
            </div>

            <button type="submit">Submit</button>
        </form>
  );
};

export default ListingForm;
