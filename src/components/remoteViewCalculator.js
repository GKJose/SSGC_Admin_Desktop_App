import React from 'react';

  // converting to from funct to class component
class RemoteViewCalculator extends React.Component{
  constructor(props){
        super(props);       
  }
  render() {
    return(
      <React.Fragment>
          <h1>Client Name: {this.props.clientName}</h1>
          <h3>Client IP: {this.props.clientIP}</h3>
          <img src =  {this.props.URL} alt =""></img>
      </React.Fragment>
    );
  }
}

export default RemoteViewCalculator;