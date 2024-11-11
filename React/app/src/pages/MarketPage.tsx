// imports
import React, { useEffect, useState } from 'react';
import './PageStylings.scss';
import SiteHeader from '../components/SiteHeader';
import MarketTile from '../components/MarketTile';

// prop interface
interface props {
}

// return data interface
interface TestPosting {
  prescription: string,
  owner_name: string,
  contact: string,
  location: {
    city: string
      }
}

interface Posting {
  postNumb: number,
  location: string,
  sphere: number,
  flagged: boolean,
}

// class
const MarketPage: React.FC<props> = ({}) => {

  const [postings, setPostings] = useState<Posting[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Fetching data from backend');
    fetch('http://localhost:8000/market/')
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
          ):(
            <div className={"grid_container"}>
            {/* {postings.map((glasses: { location: { city: string; }; prescription: string; }) => (
              <MarketTile location={glasses.location.city} sphere={glasses.prescription}></MarketTile>
            ))}    */}
            {postings.map((glasses: { location: string; sphere: number}) => (
              <MarketTile location={glasses.location} sphere={glasses.sphere}></MarketTile>
            ))}   
          </div>  
          )}
          
        </div>
      </main>
    </div>
  );
};

export default MarketPage;
