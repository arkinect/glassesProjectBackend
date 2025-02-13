// imports
import React, { useEffect, useState } from 'react';

import './FullPageListing.scss'

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
    prescription?: object | null,
    pseudoPrescription?: number | null,
    user: string,
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
            ): details? (
                <div>{details.flagged}</div>
            ): (
                <div>loading...</div>
            )}
        </div>
    );
};

export default FullPageListing;