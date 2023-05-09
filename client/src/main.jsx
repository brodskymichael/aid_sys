import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from 'react-auth-kit';
import axios from 'axios';
//import refreshApi from "./refreshApi";
//import { AuthProvider } from './context/AuthProvider';
axios.defaults.baseURL = "https://spec-server.vercel.app/" ;

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
    <AuthProvider authType = {'cookie'}
      authName={'_auth'}
      cookieDomain={window.location.hostname}
      cookieSecure={window.location.protocol === "https:"}

      >
        <App />
    </AuthProvider>
  </React.StrictMode>
  </Provider>
)
