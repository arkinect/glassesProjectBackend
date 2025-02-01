// imports
import React, { useEffect, useState } from 'react';
import './PageStylings.scss';
import SiteHeader from '../components/SiteHeader';
import ListingForm from '../components/listingForm';
import FileUpload from '../components/primitives/FileUpload'

// prop interface
interface props {
    
}

// class
const NewListingPage: React.FC<props> = ({}) => {
  return (
    <div>
      <header>
        <SiteHeader></SiteHeader>
      </header>
      <main>
        <div className={"spacing_page_margins"}> {/* page margins  */}
          <ListingForm></ListingForm>
        </div>
      </main>
    </div>
  );
};

export default NewListingPage;
