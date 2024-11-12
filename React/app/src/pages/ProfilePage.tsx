// imports
import React from 'react';
import './PageStylings.scss';
import SiteHeader from '../components/SiteHeader';
import MarketTile from '../components/MarketTile';

// prop interface
interface props {
}

// class
const ProfilePage: React.FC<props> = ({}) => {
  return (
      <div>
      <header>
        <SiteHeader></SiteHeader>
      </header>
      <main>
        <div className={"spacing_page_margins"}> {/* page margins  */}
              This is the profile page
          </div>
        </main>
      </div>
    );
  };

export default ProfilePage;
