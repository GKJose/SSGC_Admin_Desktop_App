/* original code - functional export default function AboutUs() {
    return (
      <main style={{ padding: "1rem 0" }}>
        <h2>About Us</h2>
      </main>
    );
  }
  */

  import React from "react";
import './routes.css';
const ipcRenderer = window.require("electron").ipcRenderer;
  // converting to from funct to class component
class aboutUs extends React.Component{
  constructor(props){
    super(props);

  }
  render() {
    return(
      <div className="AboutUs" data-theme ={this.props.theme}>
        <h2>About Us</h2>
        <hr></hr>
        <h3>UHCL Spring class of 2022. Computer Engineering undergraduate students.</h3>
        <h4>Julian Alvarez</h4>
        <li>GIAC, Graphing, Wi-Fi, optimization, cross-platform compatibility</li>
        <h4>Jose Mendez</h4>
        <li>Button matrix, prototype, permissions handling, JSON, web sockets</li>
        <h4>Osvaldo Rodriguez</h4>
        <li>Settings, button matrix, refactor routes</li>
        <h4>Michael Gober</h4>
        <li>Tabs and main screen, JSON, prototype, Git</li>
      </div>
    );
  }
}

export default aboutUs;