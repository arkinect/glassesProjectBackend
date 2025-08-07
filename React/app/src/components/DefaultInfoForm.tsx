// imports
import React, { useState } from 'react';
import './DefaultInfoForm.scss';
import TextEntry from './primitives/TextEntry';
import PrimaryButton from './primitives/PrimaryButton';
import BlankTextEntry from './primitives/BlankTextEntry';
import { Prescription, UserInfoForm } from '../interfaces';
import { BackendURL } from '..';

// prop interface
interface props {
    
}

// class
const DefaultInfoForm: React.FC<props> = ({}) => {
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

    // define submission structure
    const [formData, setFormData] = useState<UserInfoForm>({
        prescription: getEmptyPrescription(),
        defaultLocation: '',
        defaultContact: ''
    });
    
    // handle submit button
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const updatedFormData = { ...formData };
        const formDataPackage = new FormData();
        formDataPackage.append('post', JSON.stringify(updatedFormData));

        fetch(`${BackendURL}/user/info/`, {
            method: 'POST',
            credentials: 'include',
            body: formDataPackage
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
                setFormData({
                    prescription: getEmptyPrescription(),
                    defaultLocation: '',
                    defaultContact: ''
                });
            }
        })
        .catch(error => {
            console.error('Error submitting form:', error);
        });
    };
    

    return(
        <div>
            <form onSubmit={handleSubmit} className="data-entry-form">
                <div>
                    <TextEntry 
                        inputLabel='City'
                        isRequired={false}
                        groupName={"defaultLocation"}
                        handleChange={handleChange}
                        displayValue={formData.defaultLocation}
                    ></TextEntry>
                </div>
                <div>
                    <TextEntry 
                        inputLabel='Contact'
                        isRequired={false}
                        groupName={"defaultContact"}
                        handleChange={handleChange}
                        displayValue={formData.defaultContact}
                    ></TextEntry>
                </div>
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
                <PrimaryButton text='Save' handleClick={handleSubmit}></PrimaryButton>
            </form>
        </div>
    );
};

export default DefaultInfoForm