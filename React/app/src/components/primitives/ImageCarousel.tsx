// imports
import React, { useEffect, useState } from 'react';

import { singleImage } from '../../interfaces';

// props
interface props {
    listingNumber: number
}

// class
const ImageCarousel: React.FC<props> = ({listingNumber}) => {

    // get listing info
    const [imageList, setimageList] = useState<singleImage[]>([]);
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
            setimageList(data)
        })
        .catch(error => setError(error.message));
    }, []);



    return(
        <div>
            {error? (
              <div>Error fetching market data: {error}</div>
            ): (
              <div>
                {imageList.map((image: singleImage, index) => (
                  <img src={`http://localhost:8000/image/${image.imagePath}`}></img>
                ))}   
              </div>  
            )}
        </div>
    );
};

export default ImageCarousel
