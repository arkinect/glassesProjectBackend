import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import ProfilePage from './pages/ProfilePage';
import MarketPage from './pages/MarketPage';

import testData from './TestData/testData.json'

function App() {

  const onClick = () => {
    console.log("the button was clicked")
  }
  
  // const [glassesMarket, fetchMarketData] = useState([]); // [place where data is stored, function to update value of data]

  // useEffect( () => {
  //   console.log("fetching data")
  //   fetch('http://localhost:8000/api/market/')
  //   .then(response => response.json())
  //   .then(data => fetchMarketData(data))
  //   .catch(error => console.log('Error fetching market data: ', error))
  // }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MarketPage testData={Object.values(testData.testArray1)}></MarketPage>}/>
        <Route path="/market" element={<MarketPage testData={Object.values(testData.testArray1)}></MarketPage>}/>
        <Route path="/profile" element={<ProfilePage></ProfilePage>}/>
      </Routes>
    </Router>
  );
}

export default App;
