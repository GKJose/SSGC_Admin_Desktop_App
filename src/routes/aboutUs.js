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
      </div>
    );
  }
}

export default aboutUs;