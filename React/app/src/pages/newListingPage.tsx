// imports
import React, { useEffect, useState } from 'react';
import './PageStylings.scss';
import SiteHeader from '../components/SiteHeader';
import ListingForm from '../components/listingForm';

// prop interface
interface props {
    
}

// class
const NewListingPage: React.FC<props> = ({}) => {

    const handleChange = () => {
        console.log("Name input was changed");
    }

    return (
      <div>
      <header>
        <SiteHeader></SiteHeader>
      </header>
      <main>
        <ListingForm></ListingForm>
      </main>
    </div>
  );
};

export default NewListingPage;
