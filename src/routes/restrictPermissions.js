import './routes.css';
import React from "react";
import ClientsDropDownList from '../components/clientsDropDownList';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class restrictPermissions extends React.Component{
  constructor(props){
    super(props);
    this.state = {count:0};
    this.permissionsJSON = {
  
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
    ipcRenderer.send("savePermissions",this.permissionsJSON);
  }
  render(){
    const clickedCheckBox = (e) =>{
      this.setState(count => count + 1);
      switch(e.target.id){
        case "Functions":
          this.permissionsJSON.permissions.functionRestrictionsEnable = e.target.checked;
          break;
        case "Graphing":
          this.permissionsJSON.permissions.graphingRestrictionsEnable = e.target.checked;
          break;
        case "History_Tracking":
          this.permissionsJSON.permissions.historyTrackingEnable = e.target.checked;
          break;
        case "Screen_Capture":
          this.permissionsJSON.permissions.screenCaptureEnable = e.target.checked;
          break;
        case "Remote Connection":
          this.permissionsJSON.permissions.remoteConnectionEnable = e.target.checked;
          break;
        case "Settings_Override":
          this.permissionsJSON.permissions.settingOverrideEnable = e.target.checked;
          break;
        case "Payload_Enable":
          this.permissionsJSON.permissions.payloadEnable = e.target.checked;
          break;
      }
      ipcRenderer.send("savePermissions",this.permissionsJSON);
      
    }; 
    return (
        <div className='restrictPermissions' data-theme ={this.props.theme}>
          <h2>Restrict Permissions</h2>
          <table>
            <thead>
              <tr>
                <th>Permissions</th>
              </tr>
            </thead>
          <tbody>
            <tr>
              <td><input id = "Functions" type ="checkbox" checked = {this.permissionsJSON.functionRestrictionsEnable} onClick={(e)=>{clickedCheckBox(e)}}></input></td>
              <td>Functions</td>
            </tr>
            <tr>
              <td><input id = "Graphing" type ="checkbox" checked = {this.permissionsJSON.graphingRestrictionsEnable} onClick={(e)=>{clickedCheckBox(e)}} ></input></td>
              <td>Graphing</td>
            </tr>
            <tr>
              <td><input id = "History_Tracking" type ="checkbox" checked = {this.permissionsJSON.historyTrackingEnable} onClick={(e)=>{clickedCheckBox(e)}}></input></td>
              <td>History Tracking</td>
            </tr>
            <tr>
              <td><input id = "Screen_Capture" type ="checkbox" checked = {this.permissionsJSON.screenCaptureEnable} onClick={(e)=>{clickedCheckBox(e)}}></input></td>
              <td>Screen Capture</td>
            </tr>
            <tr>
              <td><input id = "Remote_Connection" type ="checkbox" checked = {this.permissionsJSON.remoteConnectionEnable} onClick={(e)=>{clickedCheckBox(e)}}></input></td>
              <td>Remote Connection</td>
            </tr>
            <tr>
              <td><input id = "Settings_Override" type ="checkbox" checked = {this.permissionsJSON.permissions.settingOverrideEnable} onClick={(e)=>{clickedCheckBox(e)}}></input></td>
              <td>Settings Override</td>
            </tr>
            <tr>
              <td><input id = "Payload_Enable" type ="checkbox" checked = {this.permissionsJSON.permissions.payloadEnable} onClick={(e)=>{clickedCheckBox(e)}}></input></td>
              <td>Enable Payload</td>
            </tr>
          </tbody>
          </table>
        </div>
      );
    }
}
export default restrictPermissions;