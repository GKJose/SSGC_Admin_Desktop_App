import React from 'react';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;
  // converting to from funct to class component
class RemoteViewCalculator extends React.Component{
    constructor(props){
      console.log("child created...");
        super(props);
        this.clientIP = props.clientIP;
        ipcRenderer.on("ssgcData",(event,data)=>{
            if(this.props.clientIP !== data.clientIP) return;
            
            this.jsonObject = data;
            this.url = 'data:image/bmp;base64,' +this.jsonObject.data; 
            this.forceUpdate();   
          });
          
    }
    
  render() {
    return(
      <React.Fragment>
          <h2>Client IP: {(this.clientIP !== null)? this.clientIP:""}</h2>
          <img src = {(this.url !== null)? this.url:""} alt =""></img>
      </React.Fragment>
    );
  }
}

export default RemoteViewCalculator;