import React from 'react';
const ipcRenderer = window.require("electron").ipcRenderer;
let children = [];
ipcRenderer.on("connectionRequest",(event,data)=>{
  console.log(data);
  children.push(<option key ={data.clientIP} value = {data.clientIP}>{data.clientName}</option>);
  //this.setState(prevState =>({
   // clients:[...prevState.clients,data.clientIP]
//}));
});
ipcRenderer.on("connectionRevoke",(event,data)=>{
this.filterChildren(data.clientIP);
//this.setState({clients:this.state.clients.filter((client)=>{
  //  return client !==data.clientIP;
//})});
});
class ClientsDropDownList extends React.Component{
  constructor(props){
        super(props);
        this.state = {clients:[]};    
        //this.children = [];
        
  
  }
  componentDidMount(){
  }
  filterChildren(clientIP){
      return children.filter((clientElement)=>{
          return clientElement.value !== clientIP;
      });
  }
  sendPermissionsToClient(e){
      var clientIP = document.getElementById("clients").value;
      ipcRenderer.send("sendPermissionsToClient",{clientIP:clientIP,permissions:this.props.permissions});
  }
  render() {
    return(
    <div>  
      <form align = "right">
      <label >Clients</label>
          <select id = "clients">
              {children}
          </select>
      </form>
      <button id = "sendPermissionToClient" onClick={(e)=>this.sendPermissionsToClient(e)}>Send Permissions to Client</button>
    </div>
    );
  }
}

export default ClientsDropDownList;