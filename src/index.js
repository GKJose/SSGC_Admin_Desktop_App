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
  <Route path = "/" element = {<App key = "App" theme = "light"/>}/>,
  <Route path = "/routes/aboutUs" element = {<AboutUs key = "AboutUs" theme = "light" />}/>,
  <Route path = "/routes/checkForUpdates" element = {<CheckForUpdates key = "CheckForUpdates" theme = "light" />}/>,
  <Route path = "/routes/gettingStarted" element = {<GettingStarted key = "GettingStarted" theme = "light"/>}/>,
  <Route path = "/routes/recordIO" element = {<RecordIO key = "RecordIO" theme = "light"/>}/>,
  <Route path = "/routes/remoteViewCalculators" element = {<RemoteViewCalculators key = "RemoteViewCalculators" theme = "light"/>}/>,
  <Route path = "/routes/restrictPermissions" element = {<RestrictPermissions key = "RestrictPermissions"  theme = "light"/>}/>    
]
let darkPaths = [
  <Route path = "/" element = {<App key = "App" theme = "dark"/>}/>,
  <Route path = "/routes/aboutUs" element = {<AboutUs key = "AboutUs" theme = "dark" />}/>,
  <Route path = "/routes/checkForUpdates" element = {<CheckForUpdates key = "CheckForUpdates" theme = "dark" />}/>,
  <Route path = "/routes/gettingStarted" element = {<GettingStarted key = "GettingStarted" theme = "dark"/>}/>,
  <Route path = "/routes/recordIO" element = {<RecordIO key = "RecordIO" theme = "dark"/>}/>,
  <Route path = "/routes/remoteViewCalculators" element = {<RemoteViewCalculators key = "RemoteViewCalculators" theme = "dark"/>}/>,
  <Route path = "/routes/restrictPermissions" element = {<RestrictPermissions key = "RestrictPermissions" theme = "dark"/>}/>    
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
