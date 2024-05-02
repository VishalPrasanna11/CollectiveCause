import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Auth0Provider, AppState, User } from '@auth0/auth0-react'; // Import AppState and User types
import { getConfig } from './config';
import history from './utils/history';
import { Provider } from 'react-redux';
import { Theme } from '@mui/material/styles';
import store from './store/store';
import { BrowserRouter } from 'react-router-dom';
const config = getConfig();

const onRedirectCallback = (appState?: AppState) => { // Modify onRedirectCallback to accept undefined
  const returnToPath = appState?.returnTo || window.location.pathname;
  history.push(returnToPath);
};

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  redirect_uri: window.location.origin,
  onRedirectCallback,
  authorizationParams: {
    redirect_uri: window.location.origin,
    ...(config.audience ? { audience: config.audience } : null),
  },
};

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider {...providerConfig}>
    <Provider store={store}>
      
      <App />
      
    </Provider>  
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
