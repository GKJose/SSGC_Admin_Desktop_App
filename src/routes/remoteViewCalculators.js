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
import RemoteViewCalculator from '../components/remoteViewCalculator';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class RemoteViewCalculators extends React.Component{
  constructor(props){
    super(props);
    this.clients = [];
    this.children = [];
    ipcRenderer.on("ssgcData",(event,data)=>{
     
      for(var i=0; i<this.clients.length;i++){
        if(this.clients[i] === data.clientIP) return;
      }
      this.clients.push(data.clientIP);
      this.children.push(<RemoteViewCalculator key = {this.clients[i]} clientIP ={this.clients[i]}></RemoteViewCalculator>);
      this.forceUpdate();
  });

}
componentDidUpdate(){
}
componentDidMount(){
}
  render(){
    console.log(this.children.length);
    return(
      [<h1 key="h1">Remote View Calculators</h1>,<div key="remoteViews">{this.children}</div>]
    );
  }
}


export default RemoteViewCalculators;