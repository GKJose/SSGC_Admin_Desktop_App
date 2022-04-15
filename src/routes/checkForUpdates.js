/*
export default function CheckForUpdates() {
    return (
        <main style={{ padding: "1rem 0" }}>
          <h2>CheckForUpdates</h2>
        </main>
      );
}
*/
import './routes.css'
import React from "react";
const ipcRenderer = window.require("electron").ipcRenderer;
class checkForUpdates extends React.Component{
  constructor(props){
    super(props);

  }
  render(){
    return(
      <div className="checkForUpdates" data-theme ={this.props.theme}>
          <h2>Updates</h2>
        </div>
      );
  }
}

export default checkForUpdates;