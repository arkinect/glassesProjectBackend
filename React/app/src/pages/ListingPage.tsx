// imports
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './PageStylings.scss';
import SiteHeader from '../components/SiteHeader';
import FullPageListing from '../components/FullPageListing';

// prop interface
interface props {
}

// class
const ListingPage: React.FC<props> = ({}) => {
    const navigate = useNavigate();
    const { listingNumber } = useParams();
    const listingNumberTyped = Number(listingNumber);

    useEffect(() => {
        if (isNaN(listingNumberTyped) || !Number.isInteger(listingNumberTyped)) {
            navigate("/market")
            throw new Error('Invalid Listing Code');
        }
    })

    return (
      <div>
        <header>
          <SiteHeader></SiteHeader>
        </header>
        <main>
          <div className={"spacing_page_margins"}> {/* page margins  */}
            <FullPageListing listingNumber={listingNumberTyped}></FullPageListing>
          </div>
        </main>
    </div>
  );
};

export default ListingPage;
