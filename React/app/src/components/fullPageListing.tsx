// imports
import React, { useEffect, useState } from 'react';

import './FullPageListing.scss'
import PrescriptionGrid from './primitives/PrescriptionGrid';
import { DetailedPosting } from '../interfaces';
import ImageCarousel from './primitives/ImageCarousel';

// props interface
interface props {
    listingNumber: number
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
            setDetails(data[0])
        })
        .catch(error => setError(error.message));
    }, []);

    return(
        <div>
            {error ? (
                <div>Error fetching post data: {error}</div>
            ) : (
                <div>
                    <div className={"centre_div"}>
                    {details?.postNumb ? (
                        <ImageCarousel listingNumber={details.postNumb} />
                    ) : (
                        <div>No Images</div>
                    )}
                    </div>
                    <div className={"flexbox_fullPageListing"}>
                        
                        <div className={"flexbox_internal"}>
                            {details?.prescription ? (
                                <PrescriptionGrid prescription={details.prescription} />                        
                            ) : (
                                <div></div>
                            )}
                        </div>
                        <div className='buffer_horizontal'></div>
                        <div>
                            {/* Any content here will always be shown */}
                            <div>Prescription Info: {details?.pseudoPrescription || "No Additional Information"}</div>
                            <div>Description: {details?.comment || "No Description"}</div>
                            <div>Location: {details?.location || "Location not provided"}</div>
                            <div>Contact: {details?.contact || "No contact info"}</div>
                        </div>
                    </div>
                </div>
            )}

            
        </div>
    );
};

export default FullPageListing;