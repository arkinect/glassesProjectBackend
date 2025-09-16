// imports
import React, { useEffect, useState } from 'react';
import './PageStylings.scss';
import SiteHeader from '../components/SiteHeader';
import MarketTile from '../components/MarketTile';
import { Posting } from '../interfaces';
import { BackendURL } from '..';

// prop interface
interface props {
}

// class
const MarketPage: React.FC<props> = ({}) => {

  const [postings, setPostings] = useState<Posting[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${BackendURL}/market/all/`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => setPostings(data))
    .catch(error => setError(error.message));
  }, []);

  return (
      <div>
        <header>
          <SiteHeader></SiteHeader>
        </header>
        <main>
          <div className={"spacing_page_margins"}> {/* page margins  */}
            {error? (
              <div>Error fetching market data: {error}</div>
            ): (
              <div className={"grid_container"}>
                {postings.map((glasses: Posting, index) => {
                  return(
                    <MarketTile postNumb={glasses.postNumb} location={glasses.location} sphere={glasses.sphere} coverImage={glasses.imageCard} key={index}></MarketTile>
                  )
                })}   
              </div>  
            )}
          </div>
        </main>
    </div>
  );
};

export default MarketPage;
