// imports
import React, { useEffect, useState } from 'react';

import './FullPageListing.scss'
import PrescriptionGrid from './primitives/PrescriptionGrid';
import {DetailedPosting } from '../interfaces';

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
                <PrescriptionGrid prescription={details?.prescription ?? null}></PrescriptionGrid>    
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