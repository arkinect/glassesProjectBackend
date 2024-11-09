// imports
import React, { useEffect, useState } from 'react';
import './listingForm.scss';
import TextEntry from './primitives/TextEntry';
import PrimaryButton from './primitives/PrimaryButton';
import AlertModal from './primitives/AlertModal';

// prop interface
interface props {
    
}

// prescription interface
interface Prescription {
    left_eye?: { 
      sphere: number | null
      cylinder: number | null 
      axis: number | null
      prism: number | null
      base: string | null
      add: number | null
    };
    right_eye?: { 
      sphere: number | null
      cylinder: number | null 
      axis: number | null
      prism: number | null
      base: string | null
      add: number | null
     };
  }
  
  // form interface
  interface NewPostForm {
    prescription?: Prescription | null;
    pseudoPrescription: number | null;
    comment: string | null;
    location: string;
    contact: string;
  }

// class
const ListingForm: React.FC<props> = ({}) => {

    // define submission structure
    const [formData, setFormData] = useState<NewPostForm>({
        prescription: null,
        pseudoPrescription: null,
        comment: '',
        location: '',
        contact: ''
    });
    
    // handle modal state
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalClose = () => {
        setIsModalOpen(false); // Close the modal when OK button is clicked
    };

    // handle tick box
    const [isSpecific, setIsSpecific] = useState(false);

    const handleCheckboxChange = () => {
        setIsSpecific(!isSpecific);
    };

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Update formData based on field name
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // handle submit button
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const updatedFormData = { ...formData };

        if (updatedFormData.pseudoPrescription) {
            updatedFormData.pseudoPrescription = parseFloat(updatedFormData.pseudoPrescription.toString());
        }
        console.log(JSON.stringify(updatedFormData))
        fetch('http://localhost:8000/postCreate/', { // Update with your backend URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedFormData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json().then(data => ({ status: response.status, data }));
            })
            .then(({status, data}) => {
                console.log('Response from backend:', status, data);
                if (status === 201) {
                    // alert("Glasses Posted Successfully!");
                    setIsModalOpen(true);
                    setFormData({
                        prescription: null,
                        pseudoPrescription: 0,
                        comment: '',
                        location: '',
                        contact: ''
                    });
                }
            })
        .catch(error => {
            console.error('Error submitting form:', error);
        });
    };

    return (
        <div>
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
                            groupName="pseudoPrescription"
                            handleChange={handleChange}
                            displayValue={formData.pseudoPrescription}
                        ></TextEntry>
                    </div>
                )}

                <div>
                    <TextEntry 
                        inputLabel='Notes'
                        isRequired={true}
                        groupName={"comment"}
                        handleChange={handleChange}
                        displayValue={formData.comment}
                    ></TextEntry>
                </div>

                <div>
                    <TextEntry 
                        inputLabel='Contact'
                        isRequired={true}
                        groupName={"contact"}
                        handleChange={handleChange}
                        displayValue={formData.contact}
                    ></TextEntry>
                </div>

                <div>
                    <TextEntry 
                        inputLabel='City'
                        isRequired={true}
                        groupName={"location"}
                        handleChange={handleChange}
                        displayValue={formData.location}
                    ></TextEntry>
                </div>

                <PrimaryButton text='Post Glasses' handleClick={handleSubmit}></PrimaryButton>
            </form>

            <AlertModal
                isOpen={isModalOpen}
                bodyText="Your Post Has Been Added To The Market"
                titleText="Success!"
                buttonText="OK"
                onClose={handleModalClose}  // Close the modal on OK click
                />
        </div>
  );
};

export default ListingForm;
