/*
export default function RemoteViewCalculators() {
    return (
        <main style={{ padding: "1rem 0" }}>
          <h2>Remote View Calculators</h2>
        </main>
      );
}
*/
import './routes.css'
import React from "react";
import RemoteViewCalculator from '../components/remoteViewCalculator';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;
let children = [<h1 key="title">Remote View Calculators</h1>];

class RemoteViewCalculators extends React.Component{
  constructor(props){
    super(props);
    this.state = {childrenCount:0};
}
  componentDidMount(){
    
    ipcRenderer.on("clientDisconnected",(event,data)=>{
      for(var i = 1; i < children.length; i++){
        if(children[i].props.clientIP === data){
         children.splice(i,1);
         this.setState(childrenCount => childrenCount - 1);
        }
      }
    });
    ipcRenderer.on("ssgcData",(event,data)=>{
      let URL = 'data:image/bmp;base64,'+data.data;
      //Check to make sure we do not re-add the child, if child exists then update its image and update the state
      for(var i = 1; i < children.length; i++){
        if(children[i].props.clientIP === data.clientIP){
          children[i] = <RemoteViewCalculator className="remoteView" data-theme = {this.props.theme} key = {data.clientIP} clientIP ={data.clientIP} clientName = {data.clientName}URL = {URL}/>;
          this.setState(childrenCount => childrenCount);
          return;
        }
      }
      //If child is new, add it to children and update state
      children.push(<RemoteViewCalculator className="remoteView" data-theme = {this.props.theme} key = {data.clientIP} clientIP ={data.clientIP} clientName ={data.clientName} URL = {URL}/>);
      this.setState(childrenCount => childrenCount + 1);
    });
  }
  render(){
    return(
      [<div className='remoteViewCalculators' data-theme ={this.props.theme} key="remoteViews">{children}</div>]
    );
  }
}


export default RemoteViewCalculators;