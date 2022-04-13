/*
export default function GettingStarted() {
    return (
        <main style={{ padding: "1rem 0" }}>
          <h2>Getting Started</h2>
        </main>
      );
}
*/

import { render } from "@testing-library/react";
import React from 'react';

class gettingStarted extends React.Component{
  render(){
    return(
      <main style={{ padding: "1rem 0" }}>
          <h2>Getting Started</h2>
        </main>
      );
  }
}

export default gettingStarted;