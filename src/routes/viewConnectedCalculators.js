import './routes.css'
import React from "react";
const ipcRenderer = window.require("electron").ipcRenderer;

class ViewConnectedCalculators extends React.Component{
  constructor(props){
    super(props);
    ipcRenderer.on("",(event,data)=>{

    });
  }
  render(){
    return(
      <div className="viewConnectedCalculators" data-theme ={this.props.theme}>
          <h2>Updates</h2>
          <hr></hr>
        </div>
      );
  }
}

export default ViewConnectedCalculators;