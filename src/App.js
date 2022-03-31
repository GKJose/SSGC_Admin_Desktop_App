import logo from './assets/University_of_Houston-Clear_Lake_seal.svg.png';
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
          Welcome to UHCL's Smart Symbolic Graphing Calculator Administrator App!
        </p>
        <a
          className="App-link"
          href="https://github.com/UHCL-Senior-Projects"
          target="_blank"
          rel="noopener noreferrer"
        >
          Click here to visit our Github Repo
        </a>
      </header>
    </div>

  );
}

export default App;
