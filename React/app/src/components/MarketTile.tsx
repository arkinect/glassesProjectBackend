// imports
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MarketTile.scss';

// prop interface
interface props {
  postNumb: number;
  location: string;
  sphere: number;
  coverImage: string;
}

// class
const MarketTile: React.FC<props> = ({postNumb, location, sphere, coverImage}) => {
  const navigate = useNavigate();

  const navToProduct = () => {
    navigate(`/listing/${postNumb}`)
  };

  return (
    <button className='button_tile' onClick={navToProduct}>
      <div className={"border_glasses_tile"}>
        <div className={"grid_item block_purple"}>
            <img src={`http://localhost:8000/image/${coverImage}`} alt={"a"} className={"image_placeholder"}></img>
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
