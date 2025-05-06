import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import ProfilePage from './pages/ProfilePage';
import MarketPage from './pages/MarketPage';
import NewListingPage from './pages/newListingPage';
import LogoutPage from './pages/LogoutPage';
import LoginPage from './pages/LoginPage';
import ListingPage from './pages/ListingPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MarketPage></MarketPage>}/>
        <Route path="/market" element={<MarketPage></MarketPage>}/>
        <Route path="/profile" element={<ProfilePage></ProfilePage>}/>
        <Route path="/newListing" element={<NewListingPage></NewListingPage>}/>
        <Route path='/logout' element={<LogoutPage></LogoutPage>}/>
        <Route path='/callback' element={<LoginPage></LoginPage>}/>
        <Route path="/listing/:listingNumber" element={<ListingPage></ListingPage>}/>
      </Routes>
    </Router>
  );
}

export default App;
