// imports
import React, { useEffect, useMemo } from "react";
import './PrescriptionGrid.scss'
import { Prescription } from "../../interfaces";

// prop interface
interface props {
    pseudoPrescription : number | null;
    prescription : Prescription | null;
}

// class
const PrescriptionGrid: React.FC<props> = ({pseudoPrescription, prescription}) => {
    
    const formattedPrescription = useMemo(() => {
        return {
            leftEye: {
                sphere: prescription?.leftEye.sphere ?? "",
                cylinder: prescription?.leftEye.cylinder ?? "",
                axis: prescription?.leftEye.axis ?? "",
                prism: prescription?.leftEye.prism ?? "",
                base: prescription?.leftEye.base ?? "",
            },
            rightEye: {
                sphere: prescription?.rightEye.sphere ?? "",
                cylinder: prescription?.rightEye.cylinder ?? "",
                axis: prescription?.rightEye.axis ?? "",
                prism: prescription?.rightEye.prism ?? "",
                base: prescription?.rightEye.base ?? "",
            },   
        };      
    }, [prescription]);

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
                    <div>{formattedPrescription.rightEye.sphere}</div>
                    <div>{formattedPrescription.rightEye.cylinder}</div>
                    <div>{formattedPrescription.rightEye.axis}</div>
                    <div>{formattedPrescription.rightEye.prism}</div>
                    <div>{formattedPrescription.rightEye.base}</div>

                    <div className="eye-label">Left Eye (OS)</div>
                    <div>{formattedPrescription.leftEye.sphere}</div>
                    <div>{formattedPrescription.leftEye.cylinder}</div>
                    <div>{formattedPrescription.leftEye.axis}</div>
                    <div>{formattedPrescription.leftEye.prism}</div>
                    <div>{formattedPrescription.leftEye.base}</div>
                </div>
            </div>
        </div>
    );

};

export default PrescriptionGrid;