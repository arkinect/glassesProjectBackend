// imports
import React, { useEffect, useState } from 'react';

import './ImageCarousel.scss';
import { singleImage } from '../../interfaces';
import PrimaryButton from './PrimaryButton';

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

    const [imageIndex, setIndex] = useState<number>(0);

    const incrementImage = () => {
      setIndex((imageIndex + 1)%imageList.length)
    }

    const decrementImage = () => {
      setIndex((imageIndex - 1 + imageList.length)%imageList.length)
    }

    return(
      <div>
        {error? (
          <div>Error fetching market data: {error}</div>
        ): (
          <div className={'flexbox_carousel'}>
            <div className={'flexbox_internal'} onClick={decrementImage}>
              <PrimaryButton handleClick={decrementImage} text='<'></PrimaryButton>
            </div>
            <div className={"image_container"}>
              {imageList.map((image: singleImage, index) => (
                <img 
                  src={`http://localhost:8000/image/${image.imagePath}`} 
                  className={"image_scaling"}
                  style={{ display: index === imageIndex ? 'block' : 'none' }}>
                </img>
              ))}
            </div>
            <div className={'flexbox_internal'}>
              <PrimaryButton handleClick={incrementImage} text='>'></PrimaryButton>
            </div>
          </div>
        )}
      </div>
    );
};

export default ImageCarousel
