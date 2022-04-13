/*
export default function RemoteViewCalculators() {
    return (
        <main style={{ padding: "1rem 0" }}>
          <h2>Remote View Calculators</h2>
        </main>
      );
}
*/

import React from 'react';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class remoteViewCalculators extends React.Component{
  
  render(){
    let image = new Image();
    let buffer;
    let imageLoaded = false;
    let blob;
    ipcRenderer.on("ssgcData",(event,jsonObject)=>{
      imageLoaded = true;
      buffer = Buffer.from(jsonObject.data,"base64");
      blob = new Blob(buffer);
      image.src = URL.createObjectURL(blob);
      if(this.componentDidMount){
        document.getElementById("screenshot").src = image.src
        this.forceUpdate();
      }
      
    });
    if(imageLoaded){
    return(
      <main style={{ padding: "1rem 0" }}>
          <h2>Remote View Calculators</h2>
          <img id ="screenshot" src=""/>
        </main>
      );
    }else{
      return(
      <main style={{ padding: "1rem 0" }}>
      <h2>Remote View Calculators</h2>
    </main>);
    }
  }
}

export default remoteViewCalculators;