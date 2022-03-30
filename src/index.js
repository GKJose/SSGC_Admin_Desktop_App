import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,Route,Routes} from "react-router-dom";
import './index.css';

import AboutUs from './routes/aboutUs';
import CheckForUpdates from './routes/checkForUpdates'
import GettingStarted from './routes/gettingStarted'
import RecordIO from './routes/recordIO'
import RemoteViewCalculators from './routes/remoteViewCalculators'
import RestrictPermissions from './routes/restrictPermissions'
import SearchForCalculators from './routes/searchForCalculators'

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter>
  <Routes>
    <Route path = "/" element = {<App />}/>
    <Route path = "/routes/aboutUs" element = {<AboutUs />}/>
    <Route path = "/routes/checkForUpdates" element = {<CheckForUpdates />}/>
    <Route path = "/routes/gettingStarted" element = {<GettingStarted />}/>
    <Route path = "/routes/recordIO" element = {<RecordIO />}/>
    <Route path = "/routes/remoteViewCalculators" element = {<RemoteViewCalculators />}/>
    <Route path = "/routes/restrictPermissions" element = {<RestrictPermissions />}/>
    <Route path = "/routes/searchForCalculators" element = {<SearchForCalculators />}/>    
  </Routes>
</BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
