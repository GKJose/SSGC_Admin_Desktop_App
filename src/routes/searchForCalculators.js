const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

export default function SearchForCalculators() {
    return (
        <main style={{ padding: "1rem 0" }}>
          <h2>Search For Calculators</h2>
          <table id="table" align = "center" border="1px"></table>
        </main>
      );
}