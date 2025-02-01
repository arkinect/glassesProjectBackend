// imports
import React from 'react';
import {useNavigate } from 'react-router-dom';
import './MarketTile.scss';

// prop interface
interface props {
  location: string;
  sphere: number;
  coverImage: string;
}

// class
const MarketTile: React.FC<props> = ({location, sphere, coverImage}) => {
  const navigate = useNavigate();

  const navToProduct = () => {
    //   navigate('/market'); 
    console.log("Navigate to product page");
    console.log(coverImage);
  };

  return (
    <button className='button_tile' onClick={navToProduct}>
        <div className={"border_glasses_tile"}>
        <div className={"grid_item block_purple"}>
            {/* <div className={"image_placeholder"}></div> */}
            <img src={`http://localhost:8000/market/image/${coverImage}`} alt={"a"} className={"image_placeholder"}></img>
        </div>
        <div className={"flexbox"}>
            <div className={"font_prescription"}>{sphere}</div>
            <div className={"font_location"}>{location}</div>
        </div>
        </div>
        
    </button>
  );
  };

export default MarketTile;
