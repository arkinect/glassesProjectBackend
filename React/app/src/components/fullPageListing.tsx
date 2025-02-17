// imports
import React, { useEffect, useState } from 'react';

import './FullPageListing.scss'
import PrescriptionGrid from './primitives/PrescriptionGrid';

// props interface
interface props {
    listingNumber: number
}

// return data interfaces
interface DetailedPosting {
    comment: string,
    contact?: string | null,
    flagged: boolean,
    location: string,
    pictures? : Image[],
    postNumb: number,
    prescription?: Prescription | null,
    pseudoPrescription?: number | null,
    user: string,
}

interface EyePrescription {
    sphere: number | null;
    cylinder: number | null;
    axis: number | null;
    prism: number | null;
    base: string | null;
}
  
interface Prescription {
    leftEye: EyePrescription;
    rightEye: EyePrescription;
}

interface Image {
    id: number,
    imagePath: string,
}

// class
const FullPageListing: React.FC<props> = ({listingNumber}) => {

    // get listing info
    const [details, setDetails] = useState<DetailedPosting>();
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
        fetch(`http://localhost:8000/market/listing/${listingNumber}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }   
            return response.json();
        })
        .then(data => {
            console.log(data)
            setDetails(data)
        })
        .catch(error => setError(error.message));
    }, []);

    return(
        <div>
            {error? (
                <div>Error fetching post data: {error}</div>
            ):(
                <PrescriptionGrid pseudoPrescription={details?.pseudoPrescription ?? null} prescription={details?.prescription ?? null}></PrescriptionGrid>    
            )}
            {/* {error? (
                <div>Error fetching post data: {error}</div>
            ): details? (
                <div className='flexbox'>
                    <div className='flexbox_internal'></div>
                    <div className='flexbox_internal'>
                        <PrescriptionGrid pseudoPrescription={details.pseudoPrescription}></PrescriptionGrid>

                    </div>   
                </div>
                
            ): (
                <div>loading...</div>
            )} */}
        </div>
    );
};

export default FullPageListing;