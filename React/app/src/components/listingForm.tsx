// imports
import React, { useState } from 'react';
import './listingForm.scss';
import TextEntry from './primitives/TextEntry';
import PrimaryButton from './primitives/PrimaryButton';
import AlertModal from './primitives/AlertModal';
import FileUpload from './primitives/FileUpload';
import BlankTextEntry from './primitives/BlankTextEntry';
import { Prescription, NewPostForm } from '../interfaces';
import { useAuth0 } from '@auth0/auth0-react';
import { BackendURL } from '..';

// prop interface
interface props {
    
}

// class
const ListingForm: React.FC<props> = ({}) => {

    // handle creating a blank prescription object
    const getEmptyPrescription = (): Prescription => ({
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
        prescription: getEmptyPrescription(),
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
    const { getAccessTokenSilently } = useAuth0();
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

        fetch(`${BackendURL}/posts/new/`, {
            method: 'POST',
            credentials: 'include',
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
                    prescription: getEmptyPrescription(),
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
                    <div className="prescription-container">
                        <h3>Glasses Prescription</h3>
                        <div className="prescription-table">
                            <div className="header"></div>
                            <div className="header">Sphere</div>
                            <div className="header">Cylinder</div>
                            <div className="header">Axis</div>
                            <div className="header">Prism</div>
                            <div className="header">Base</div>

                            <div className="eye-label">Right Eye (OD)</div>
                            <div>
                                <BlankTextEntry
                                isRequired={true}
                                groupName="prescription.rightEye.sphere"
                                handleChange={handleChange}
                                enforceNumbers = {true}
                                displayValue={formData.prescription.rightEye.sphere}
                            /></div>
                            <div>
                                <BlankTextEntry
                                isRequired={false}
                                groupName="prescription.rightEye.cylinder"
                                handleChange={handleChange}
                                enforceNumbers = {true}
                                displayValue={formData.prescription.rightEye.cylinder}
                            /></div>
                            <div>
                                <BlankTextEntry
                                isRequired={false}
                                groupName="prescription.rightEye.axis"
                                handleChange={handleChange}
                                enforceNumbers = {true}
                                displayValue={formData.prescription.rightEye.axis}
                            /></div>
                            <div>
                                <BlankTextEntry
                                isRequired={false}
                                groupName="prescription.rightEye.prism"
                                handleChange={handleChange}
                                enforceNumbers = {true}
                                displayValue={formData.prescription.rightEye.prism}
                            /></div>
                            <div>
                                <BlankTextEntry
                                isRequired={false}
                                groupName="prescription.rightEye.base"
                                handleChange={handleChange}
                                enforceNumbers = {true}
                                displayValue={formData.prescription.rightEye.base}
                            /></div>
                            
                            <div className="eye-label">Left Eye (OS)</div>
                            <div>
                                <BlankTextEntry
                                isRequired={true}
                                groupName="prescription.leftEye.sphere"
                                handleChange={handleChange}
                                enforceNumbers = {true}
                                displayValue={formData.prescription.leftEye.sphere}
                            /></div>
                            <div>
                                <BlankTextEntry
                                isRequired={false}
                                groupName="prescription.leftEye.cylinder"
                                handleChange={handleChange}
                                enforceNumbers = {true}
                                displayValue={formData.prescription.leftEye.cylinder}
                            /></div>
                            <div>
                                <BlankTextEntry
                                isRequired={false}
                                groupName="prescription.leftEye.axis"
                                handleChange={handleChange}
                                enforceNumbers = {true}
                                displayValue={formData.prescription.leftEye.axis}
                            /></div>
                            <div>
                                <BlankTextEntry
                                isRequired={false}
                                groupName="prescription.leftEye.prism"
                                handleChange={handleChange}
                                enforceNumbers = {true}
                                displayValue={formData.prescription.leftEye.prism}
                            /></div>
                            <div>
                                <BlankTextEntry
                                isRequired={false}
                                groupName="prescription.leftEye.base"
                                handleChange={handleChange}
                                enforceNumbers = {true}
                                displayValue={formData.prescription.leftEye.base}
                            /></div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <TextEntry 
                            inputLabel='Prescription'
                            isRequired={true}
                            groupName="pseudoPrescription"
                            handleChange={handleChange}
                            enforceNumbers = {true}
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
