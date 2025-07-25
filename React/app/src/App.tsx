import { Routes, Route} from 'react-router-dom';
import './App.css';
import ProfilePage from './pages/ProfilePage';
import MarketPage from './pages/MarketPage';
import NewListingPage from './pages/newListingPage';
import LogoutPage from './pages/LogoutPage';
import ListingPage from './pages/ListingPage';
import PrivateRoute from './components/auth/PrivateRoute';

function App() {

  return (
    <Routes>
      <Route path="/" element={<MarketPage></MarketPage>}/>
      <Route path="/market" element={<MarketPage></MarketPage>}/>
      <Route path="/profile" element={
        <PrivateRoute>
          <ProfilePage></ProfilePage>
        </PrivateRoute>
      }/>
      <Route path="/newListing" element={
        <PrivateRoute>
          <NewListingPage></NewListingPage>
        </PrivateRoute>
      }/>
      <Route path='/logout' element={<LogoutPage></LogoutPage>}/>
      <Route path="/listing/:listingNumber" element={<ListingPage></ListingPage>}/>
    </Routes>
  );
}

export default App;
