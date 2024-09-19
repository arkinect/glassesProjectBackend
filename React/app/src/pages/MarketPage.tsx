// imports
import React from 'react';
import './MarketPage.scss';
import SiteHeader from '../components/SiteHeader';
import MarketTile from '../components/MarketTile'

// prop interface
interface props {
    testData: any;
}

// class
const MarketPage: React.FC<props> = ({testData}) => {
    return (
        <div>
        <header>
          <SiteHeader></SiteHeader>
        </header>
        <main>
          <div className={"spacing_page_margins"}> {/* page margins  */}
            <div className={"grid_container"}>
              {testData.map((glasses: { location: { city: string; }; prescription: string; }) => (
                <MarketTile location={glasses.location.city} sphere={glasses.prescription}></MarketTile>
              ))}   
            </div>  
          </div>
        </main>
      </div>
    );
  };

export default MarketPage;
