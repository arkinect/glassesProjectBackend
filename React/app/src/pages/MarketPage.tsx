// imports
import React from 'react';
import SiteHeader from '../components/SiteHeader';

// prop interface
interface props {
}

// class
const MarketPage: React.FC<props> = ({}) => {
    return (
        <div>
            <SiteHeader></SiteHeader>
            <div>THis is the market page</div>
        </div>
    );
  };

export default MarketPage;
