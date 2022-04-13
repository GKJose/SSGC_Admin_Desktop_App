/*
export default function RemoteViewCalculators() {
    return (
        <main style={{ padding: "1rem 0" }}>
          <h2>Remote View Calculators</h2>
        </main>
      );
}
*/

import { render } from "@testing-library/react";
import React from 'react';

class remoteViewCalculators extends React.Component{
  render(){
    return(
      <main style={{ padding: "1rem 0" }}>
          <h2>Remote View Calculators</h2>
        </main>
      );
  }
}

export default remoteViewCalculators;