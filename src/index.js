import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,Route,Routes} from "react-router-dom";
import './index.css';

import App from './App'
import AboutUs from './routes/aboutUs';
import CheckForUpdates from './routes/checkForUpdates'
import GettingStarted from './routes/gettingStarted'
import RecordIO from './routes/recordIO'
import RemoteViewCalculators from './routes/remoteViewCalculators'
import RestrictPermissions from './routes/restrictPermissions'

import reportWebVitals from './reportWebVitals';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;


ipcRenderer.on('change-theme',(event,data) =>{
  renderPaths(data);
});
function renderPaths(theme){
    ReactDOM.render(
      <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<App theme = {theme}/>} />,
        <Route path = "/routes/aboutUs" element = {<AboutUs theme = {theme} />}/>,
        <Route path = "/routes/checkForUpdates" element = {<CheckForUpdates theme = {theme} />}/>,
        <Route path = "/routes/gettingStarted" element = {<GettingStarted  theme = {theme}/>}/>,
        <Route path = "/routes/recordIO" element = {<RecordIO  theme = {theme}/>}/>,
        <Route path = "/routes/remoteViewCalculators" element = {<RemoteViewCalculators key = "RemoteViewCalculators" theme = {theme}/>}/>,
        <Route path = "/routes/restrictPermissions" element = {<RestrictPermissions  theme = {theme}/>}/>    
      </Routes>
    </BrowserRouter>,
      document.getElementById('root')
    );
}



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
