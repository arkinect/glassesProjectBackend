import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const Auth0Domain = process.env.REACT_APP_AUTH0_DOMAIN;
const Auth0ClientID = process.env.REACT_APP_AUTH0_CLIENT_ID;

if (!Auth0Domain || !Auth0ClientID) {
  throw new Error('Auth0 credentials are missing.');
}

root.render(
  <Auth0Provider
    domain={Auth0Domain}
    clientId={Auth0ClientID}
    authorizationParams={{redirect_uri: window.location.origin + '/callback'}}>
      <App />
  </Auth0Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
