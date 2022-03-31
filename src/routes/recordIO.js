const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;
const columnNames = ["Log Type","Client IP","Client Name","Data"];
export default function RecordIO() {
  let table = document.createElement("table");
  let trow = table.insertRow(-1);
  for(var i = 0; i < columnNames.length; i++){
    let theader = document.createElement("th");
    theader.innerHTML =  columnNames[i];
    trow.appendChild(theader);
  }
  ipcRenderer.on("clientLog",(event,data) => {
    console.log("Client log json obj rec'd by renderer process.")
    trow = table.insertRow(-1);
    for(var key in data) {
      let cell = trow.insertCell(-1);
      cell.innerHTML = data[key];
    } 
    let tableElement = document.getElementById("table");
    tableElement.innerHTML = "";
    tableElement.appendChild(table);
  });
    return (
        <main style={{ padding: "1rem 0" }}>
          <h2>Record I/O</h2>
          <table id="table" align = "center" border="1px"></table>
        </main>
      );
}