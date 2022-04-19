import { render } from "@testing-library/react";
import React,{ useState } from "react";
const electron= window.require("electron");
const ipcRenderer = electron.ipcRenderer;

const columnNames = ["Log Type","Client IP","Client Name","Data"];
const clientLogs = [];

class RecordIO extends React.Component {
  constructor(props){
    super(props);
    this.state = {count:0};
}
  componentDidMount(){
    let table = document.createElement("table");
    let trow = table.insertRow(-1);

    for(var i = 0; i < columnNames.length; i++){
      let theader = document.createElement("th");
      theader.innerHTML =  columnNames[i];
      trow.appendChild(theader);
    }
    
    for(i = 0; i < clientLogs.length; i++){
      var clientLog = clientLogs[i];
      console.log(clientLog);
      trow = table.insertRow(-1);
      let cell = trow.insertCell(-1);
      cell.innerHTML = clientLog.ssgcType;
      cell = trow.insertCell(-1);
      cell.innerHTML = clientLog.clientIP;
      cell = trow.insertCell(-1);
      cell.innerHTML = clientLog.clientName;
      cell = trow.insertCell(-1);
      cell.innerHTML = clientLog.data;
    }

    let tableElement = document.getElementById("table");
    tableElement.innerHTML = "";
    tableElement.appendChild(table);
    ipcRenderer.on("clientLog",(event,data) => {
      clientLogs.push(data);
      this.setState(count => count + 1);
    });
  }
  render(){
    return (
        <div className='recordIO' data-theme ={this.props.theme}>
          <h2>Record I/O</h2>
          <hr></hr>
          <table id="table" align = "center" border="1px"></table>
        </div>
      );
  }
}
export default RecordIO;