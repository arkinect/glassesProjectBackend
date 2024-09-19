import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import ProfilePage from './pages/ProfilePage';
import MarketPage from './pages/MarketPage';

import testData from './TestData/testData.json'

function App() {

  const onClick = () => {
    console.log("the button was clicked")
  }


  return (
    // <div className="App">
    //   <div>This is the title of the website</div>
    //   <PrimaryButton text="this is a default button" handleClick={onClick}></PrimaryButton>
    //   <LinkButton text='This is a link button' handleClick={onClick}></LinkButton>

    <Router>
      <Routes>
        <Route path="/" element={<MarketPage testData={Object.values(testData.testArray1)}></MarketPage>}/>
        <Route path="/market" element={<MarketPage testData={Object.values(testData.testArray1)}></MarketPage>}/>
        <Route path="/profile" element={<ProfilePage></ProfilePage>}/>
      </Routes>
    </Router>
    // </div>
  );
}

export default App;
