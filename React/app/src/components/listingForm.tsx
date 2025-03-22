// imports
import React, { useEffect, useState } from 'react';
import './listingForm.scss';
import TextEntry from './primitives/TextEntry';
import PrimaryButton from './primitives/PrimaryButton';
import AlertModal from './primitives/AlertModal';
import FileUpload from './primitives/FileUpload';
import PrescriptionEntry from './primitives/PrescriptionEntry';
import { Prescription } from '../interfaces';

// prop interface
interface props {
    
}

// form interface
interface NewPostForm {
    prescription: Prescription;
    pseudoPrescription: number | null;
    comment: string | null;
    location: string;
    contact: string;
}

// class
const ListingForm: React.FC<props> = ({}) => {

    // handle creating a blank prescription object
    const getDefaultPrescription = (): Prescription => ({
        leftEye: {
            sphere: null,
            cylinder: null,
            axis: null,
            prism: null,
            base: null,
        },
        rightEye: {
            sphere: null,
            cylinder: null,
            axis: null,
            prism: null,
            base: null,
        },
    });

    // define submission structure
    const [formData, setFormData] = useState<NewPostForm>({
        prescription: getDefaultPrescription(),
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

    // manage files from file upload
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

    const handleFileUpload = (files: File[]) => {
        setUploadedFiles(files);
    };

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const keys = name.split("."); // split for nested interfaces / objects
    
        setFormData(prevState => {
            let updatedData: any = { ...prevState }; // copy existing data

            if (!updatedData.prescription) {
                updatedData.prescription = getDefaultPrescription();
            }

            // traverse updated data (existing data)
            let temp = updatedData;
            for (let i = 0; i < keys.length - 1; i++) {
                const key = keys[i] as keyof typeof temp;
                temp[key] = { ...temp[key] };
                temp = temp[key];
            }
    
            // batch update
            temp[keys[keys.length - 1]] = value || null;
    
            return updatedData;
        });
    };
    
    // handle submit button
    const [resetFileUpload, setResetFileUpload] = useState(false);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const updatedFormData = { ...formData };

        if (updatedFormData.pseudoPrescription) {
            updatedFormData.pseudoPrescription = parseFloat(updatedFormData.pseudoPrescription.toString());
        }

        const formDataWithFiles = new FormData();
        formDataWithFiles.append('post', JSON.stringify(updatedFormData));
        uploadedFiles.forEach((file) => {
            formDataWithFiles.append('images', file);
        });

        console.log(formDataWithFiles)
        fetch('http://localhost:8000/posts/new/', {
            method: 'POST',
            body: formDataWithFiles
        })
        .then((response) => 
            response
                .json()
                .then((data) => ({status: response.status, data}))
                .catch(() => ({status: response.status, data: null}))
        )  
        .then(({status, data}) => {
            if (status >= 400) {
                console.error("Backend Error:", status, data);
                throw new Error(`Request failed with status ${status}`);
            }

            console.log('Response from backend:', status, data);
            if (status === 201) {
                setIsModalOpen(true);
                setFormData({
                    prescription: getDefaultPrescription(),
                    pseudoPrescription: 0,
                    comment: '',
                    location: '',
                    contact: ''
                });
                setUploadedFiles([])
                setResetFileUpload(prev => !prev);
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

                <FileUpload onFileUpload={handleFileUpload} resetPreviews={resetFileUpload}/>

                <label className='font_defaultText'>
                    <input
                        type="checkbox"
                        checked={isSpecific}
                        onChange={handleCheckboxChange}
                    />
                    I know my prescription
                </label>

                {isSpecific ? (
                    <div>
                        <PrescriptionEntry
                            inputLabel=''
                            isRequired={true}
                            groupName="prescription"
                            handleChange={handleChange}
                            displayPrescription={formData.prescription ?? getDefaultPrescription()}
                        ></PrescriptionEntry>
                    </div>
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
