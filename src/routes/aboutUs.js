/* original code - functional export default function AboutUs() {
    return (
      <main style={{ padding: "1rem 0" }}>
        <h2>About Us</h2>
      </main>
    );
  }
  */

import { render } from "@testing-library/react";
import React from 'react';

  // converting to from funct to class component
class aboutUs extends React.Component{
  render() {
    return(
      <main style={{ padding: "1rem 0" }}>
        <h2>About Us</h2>
      </main>
    );
  }
}

export default aboutUs;