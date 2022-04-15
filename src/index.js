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
let theme = "light";
let lightPaths = [
  <Route path = "/" element = {<App theme = "light"/>}/>,
  <Route path = "/routes/aboutUs" element = {<AboutUs theme = "light" />}/>,
  <Route path = "/routes/checkForUpdates" element = {<CheckForUpdates theme = "light" />}/>,
  <Route path = "/routes/gettingStarted" element = {<GettingStarted theme = "light"/>}/>,
  <Route path = "/routes/recordIO" element = {<RecordIO theme = "light"/>}/>,
  <Route path = "/routes/remoteViewCalculators" element = {<RemoteViewCalculators theme = "light"/>}/>,
  <Route path = "/routes/restrictPermissions" element = {<RestrictPermissions theme = "light"/>}/>    
]
let darkPaths = [
  <Route path = "/" element = {<App theme = "dark"/>}/>,
  <Route path = "/routes/aboutUs" element = {<AboutUs theme = "dark" />}/>,
  <Route path = "/routes/checkForUpdates" element = {<CheckForUpdates theme = "dark" />}/>,
  <Route path = "/routes/gettingStarted" element = {<GettingStarted theme = "dark"/>}/>,
  <Route path = "/routes/recordIO" element = {<RecordIO theme = "dark"/>}/>,
  <Route path = "/routes/remoteViewCalculators" element = {<RemoteViewCalculators theme = "dark"/>}/>,
  <Route path = "/routes/restrictPermissions" element = {<RestrictPermissions theme = "dark"/>}/>    
]
ipcRenderer.on('change-theme',(event,data) =>{
  theme = data;
  renderPaths();
});
function renderPaths(){
  if(theme === "light"){
    ReactDOM.render(
      <BrowserRouter>
      <Routes>
        {lightPaths} 
      </Routes>
    </BrowserRouter>,
      document.getElementById('root')
    );
  }else{
    ReactDOM.render(
      <BrowserRouter>
      <Routes>
        {darkPaths} 
      </Routes>
    </BrowserRouter>,
      document.getElementById('root')
    );
  }
}
renderPaths();


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
