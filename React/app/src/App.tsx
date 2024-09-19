import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import PrimaryButton from './components/primitives/PrimaryButton';
import MarketPage from './pages/MarketPage';

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
        <Route path="/" element={<PrimaryButton text='This is a standin for a blank page' handleClick={onClick}/>}/>
        <Route path="/market" element={<MarketPage></MarketPage>}/>
      </Routes>
    </Router>
    // </div>
  );
}

export default App;
