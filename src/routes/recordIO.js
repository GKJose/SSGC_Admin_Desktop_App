import React,{ useState } from "react";
const electron= window.require("electron");
const ipcRenderer = electron.ipcRenderer;

const columnNames = ["Log Type","Client IP","Client Name","Data"];
const clientLogs = [];

function useForceUpdate(){
  const [value,setValue] = useState(0);
  return () => setValue((value) => value + 1);
}

export default function RecordIO() {
  const forceUpdate = useForceUpdate();
  let table = document.createElement("table");
  let trow = table.insertRow(-1);
  for(var i = 0; i < columnNames.length; i++){
    let theader = document.createElement("th");
    theader.innerHTML =  columnNames[i];
    trow.appendChild(theader);
  }

  ipcRenderer.on("clientLog",(event,data) => {
    clientLogs.push(data);
  });
  
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
  React.useEffect(()=>{
    let tableElement = document.getElementById("table");
    tableElement.innerHTML = "";
    tableElement.appendChild(table);
  });

    return (
        <main style={{ padding: "1rem 0" }}>
          <h2>Record I/O</h2>
          <button type="button" onClick={forceUpdate}>Refresh page</button>
          <table id="table" align = "center" border="1px"></table>
        </main>
      );
}