// imports
import React, { useEffect, useState } from 'react';
import './PageStylings.scss';
import SiteHeader from '../components/SiteHeader';
import MarketTile from '../components/MarketTile';

// prop interface
interface props {
    testData: any;
}

// return data interface
interface Posting {
  prescription: string,
  owner_name: string,
  contact: string,
  location: {
    city: string
      }
}

// class
const MarketPage: React.FC<props> = ({testData}) => {

  const [postings, setPostings] = useState<Posting[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Fetching data from backend');
    fetch('http://localhost:8000/api/market/')
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
            {postings.map((glasses: { location: { city: string; }; prescription: string; }) => (
              <MarketTile location={glasses.location.city} sphere={glasses.prescription}></MarketTile>
            ))}   
          </div>  
          )}
          
        </div>
      </main>
    </div>
  );
};

export default MarketPage;
