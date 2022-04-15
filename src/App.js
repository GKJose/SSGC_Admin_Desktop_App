import logo from './assets/University_of_Houston-Clear_Lake_seal.svg.png';
import './App.css';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

function App(props){
  console.log(props);
   const navigate = useNavigate();
   ipcRenderer.on("navigate",(event,data)=>{
     navigate(data);
   }); 
    return (
      <div className="App" data-theme ={props.theme}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to UHCL's Smart Symbolic Graphing Calculator Administrator App!
          </p>
          <a
            className="App-link"
            href="https://github.com/UHCL-Senior-Projects"
            target="_blank"
            rel="noopener noreferrer"
          >
            Click here to visit our Github Repo
          </a>
        </header>
      </div>
  
    );
}

export default App;
