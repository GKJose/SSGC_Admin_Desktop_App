/*
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
*/

import { render } from "@testing-library/react";
import React from 'react';

class searchForCalculators extends React.Component{
  electron = window.require("electron");  

  render(){
    return(
      <main style={{ padding: "1rem 0" }}>
      <h2>Search For Calculators</h2>
      <table id="table" align = "center" border="1px"></table>
    </main>
  );
  }
}

export default searchForCalculators;