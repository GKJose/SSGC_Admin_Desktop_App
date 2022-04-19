/*
export default function GettingStarted() {
    return (
        <main style={{ padding: "1rem 0" }}>
          <h2>Getting Started</h2>
        </main>
      );
}
*/

import './routes.css';
import React from "react";
const ipcRenderer = window.require("electron").ipcRenderer;

class gettingStarted extends React.Component{
  constructor(props){
    super(props);

  }

  render(){
    return(
      <div className='gettingStarted' data-theme ={this.props.theme}>
          <h2>Getting Started</h2>
          <hr></hr>
          <h3>The purpose of the Admin app is to:</h3>
          <li>Display who is connected to the server</li>
          <li>Restrict client calculator's functionalities</li>
          <li>Allow remote view of client calculator(s)</li>
          <li>And receive a record of the inputs and outputs</li>
          <hr></hr>
          <a
            className="App-link"
            href="https://github.com/UHCL-Senior-Projects"
            target="_blank"
            rel="noopener noreferrer"
          >
            Click here to visit our Github Repo
          </a>
        </div>
      );
  }
}

export default gettingStarted;