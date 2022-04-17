import './routes.css';
import React from "react";
import ClientsDropDownList from '../components/clientsDropDownList';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

  let permissionsJSON = {
  
  "ssgcType":"connectionPermissionReply",
  "permissions":{
      "functionRestrictionsEnable":false,
      "graphingRestrictionsEnable":false,
      "historyTrackingEnable":false,
      "screenCaptureEnable":false,
      "remoteConnectionEnable":false,
      "settingOverrideEnable":false,
      "payloadEnable":false
  },
  "functionWhitelist":[],
  "graphingInfo":{
      "graphingEnable":true,
      "graphingWhitelist":[]
  },
  "calculationHistoryInfo":{
      "historyTypes":[]
  },
  "screenCaptureInfo":{
      "screenshotFrequency":1000,
      "recordingEnable":false
  },
  "settingOverrideInfo":[],
  "rejectionReason":""

}

class restrictPermissions extends React.Component{
  constructor(props){
    super(props);
    this.state = {count:0};
  }
  render(){
    const clickedCheckBox = (e) =>{
      this.setState(count => count + 1);
      switch(e.target.id){
        case "Functions":
          permissionsJSON.permissions.functionRestrictionsEnable = e.target.checked;
          break;
        case "Graphing":
          permissionsJSON.permissions.graphingRestrictionsEnable = e.target.checked;
          break;
        case "History_Tracking":
          permissionsJSON.permissions.historyTrackingEnable = e.target.checked;
          break;
        case "Screen_Capture":
          permissionsJSON.permissions.screenCaptureEnable = e.target.checked;
          break;
        case "Remote Connection":
          permissionsJSON.permissions.remoteConnectionEnable = e.target.checked;
          break;
        case "Settings_Override":
          permissionsJSON.permissions.settingOverrideEnable = e.target.checked;
          break;
        case "Payload_Enable":
          permissionsJSON.permissions.payloadEnable = e.target.checked;
          break;
      }
    };
    const sendPermissionsToClients = (e) =>{
      ipcRenderer.send("sendPermissions",permissionsJSON);
      
    };
    return (
        <div className='gettingStarted' data-theme ={this.props.theme}>
          <h2>Restrict Permissions</h2>
          <table>
            <thead>
              <tr>
                <th>Permissions</th>
              </tr>
            </thead>
          <tbody>
            <tr>
              <td><input id = "Functions" type ="checkbox" onClick={(e)=>{clickedCheckBox(e)}}></input></td>
              <td>Functions</td>
            </tr>
            <tr>
              <td><input id = "Graphing" type ="checkbox" onClick={(e)=>{clickedCheckBox(e)}} ></input></td>
              <td>Graphing</td>
            </tr>
            <tr>
              <td><input id = "History_Tracking" type ="checkbox" onClick={(e)=>{clickedCheckBox(e)}}></input></td>
              <td>History Tracking</td>
            </tr>
            <tr>
              <td><input id = "Screen_Capture" type ="checkbox" onClick={(e)=>{clickedCheckBox(e)}}></input></td>
              <td>Screen Capture</td>
            </tr>
            <tr>
              <td><input id = "Remote_Connection" type ="checkbox" onClick={(e)=>{clickedCheckBox(e)}}></input></td>
              <td>Remote Connection</td>
            </tr>
            <tr>
              <td><input id = "Settings_Override" type ="checkbox" onClick={(e)=>{clickedCheckBox(e)}}></input></td>
              <td>Settings Override</td>
            </tr>
            <tr>
              <td><input id = "Payload_Enable" type ="checkbox" onClick={(e)=>{clickedCheckBox(e)}}></input></td>
              <td>Enable Payload</td>
            </tr>
          </tbody>
          </table>
          <ClientsDropDownList permissions = {permissionsJSON}></ClientsDropDownList>
          <button id = "submitToAllClients" type = "button" onClick={(e)=>{sendPermissionsToClients(e)}}>Send Permissions to all Clients</button>
        </div>
      );
    }
}
export default restrictPermissions;