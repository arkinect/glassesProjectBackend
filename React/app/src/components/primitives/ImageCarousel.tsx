// imports
import React, { useEffect, useState } from 'react';

// props
interface props {
    listingNumber: number
}

// class
const ImageCarousel: React.FC<props> = ({listingNumber}) => {

    // get listing info
    const [details, setDetails] = useState<DetailedPosting>();
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        fetch(`http://localhost:8000/posts/getImages/${listingNumber}`)
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
        <div></div>
    );
};

export default ImageCarousel
