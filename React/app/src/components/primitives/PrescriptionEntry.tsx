// imports
import React, { useEffect, useMemo } from "react";
import './PrescriptionGrid.scss'
import { Prescription } from "../../interfaces";

// prop interface
interface props {
    inputLabel: string;
    isRequired: boolean;
    groupName: string;
    displayPrescription: Prescription;
    handleChange : (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// class
const PrescriptionEntry: React.FC<props> = ({inputLabel, isRequired, groupName, displayPrescription, handleChange}) => {
    
    const formattedDisplayPrescription = useMemo(() => {
        return {
            leftEye: { 
                sphere: displayPrescription?.leftEye.sphere ?? "",
                cylinder: displayPrescription?.leftEye.cylinder ?? "",
                axis: displayPrescription?.leftEye.axis ?? "",
                prism: displayPrescription?.leftEye.prism ?? "",
                base: displayPrescription?.leftEye.base ?? "",
            },
            rightEye: {
                sphere: displayPrescription?.rightEye.sphere ?? "",
                cylinder: displayPrescription?.rightEye.cylinder ?? "",
                axis: displayPrescription?.rightEye.axis ?? "",
                prism: displayPrescription?.rightEye.prism ?? "",
                base: displayPrescription?.rightEye.base ?? "",
            },   
        };      
    }, [displayPrescription]);

    return (
        <div>
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
                        <input className={"input-field"}
                            type='text'
                            name={groupName} // groupName should match the category in formData
                            onChange={handleChange}
                            required = {isRequired}
                            placeholder={inputLabel}
                            value={formattedDisplayPrescription.rightEye.sphere === 0 ? '' : formattedDisplayPrescription.rightEye.sphere}
                        />
                    </div>
                    <div>{}</div>
                    <div>{}</div>
                    <div>{}</div>
                    <div>{}</div>

                    <div className="eye-label">Left Eye (OS)</div>
                    <div>{}</div>
                    <div>{}</div>
                    <div>{}</div>
                    <div>{}</div>
                    <div>{}</div>
                </div>
            </div>
        </div>
    );

};

export default PrescriptionEntry;