import logo from './logo.svg';
import './App.css';
import { useNavigate } from "react-router-dom";

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

function App() {
  const navigate = useNavigate();
  ipcRenderer.on('navigate',(event,data) =>{
    navigate(data);
    console.log(data);
    return;
    
  });
  ipcRenderer.on('change-theme',(event,data) =>{
    console.log(data);
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>

  );
}

export default App;
