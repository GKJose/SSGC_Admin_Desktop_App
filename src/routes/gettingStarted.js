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
        </div>
      );
  }
}

export default gettingStarted;