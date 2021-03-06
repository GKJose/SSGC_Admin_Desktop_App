const websocket = require("ws");
const Ajv = require("ajv")
const addFormats = require("ajv-formats");
const {dialog, ipcMain}= require('electron');
const http = require("http");
const schema_clientLog = require("../src/schemas/clientLog.schema.json");
const schema_connectionPermissionReply = require("../src/schemas/connectionPermissionReply.schema.json");
const schema_connectionRequest = require("../src/schemas/connectionRequest.schema.json");
const schema_connectionRevoke = require("../src/schemas/connectionRevoke.schema.json");
const schema_ssgcData = require("../src/schemas/ssgcData.schema.json");
const serverPort = 6969;
const serverHost = '0.0.0.0';


class JsonHandler{

    constructor(mainWindow){
        this.ajv = new Ajv();
        addFormats(this.ajv);
        this.wss = new websocket.Server({port:serverPort,host:serverHost});
        this.window = mainWindow;
        this.ajv.addSchema(schema_clientLog,"clientLog");
        this.ajv.addSchema(schema_connectionPermissionReply,"permissionReply");
        this.ajv.addSchema(schema_connectionRequest,"connectionRequest");
        this.ajv.addSchema(schema_connectionRevoke,"connectionRevoke");
        this.ajv.addSchema(schema_ssgcData,"ssgcData");
        this.clients = [];
        this.majorVersion = 0;
        this.minorVersion = 0;
        this.bugFixVersion = 0;
        this.adminInfoJSON = {
            ssgcType:"adminInfo",
            adminIP:"192.168.1.158",
            adminName:" "//,
            //adminExtra:" "
        };
        this.permissions = {
  
            "ssgcType":"connectionPermissionReply",
            "permissions":{
                "functionRestrictionsEnable":false,
                "graphingRestrictionsEnable":false,
                "historyTrackingEnable":false,
                "screenCaptureEnable":true,
                "remoteConnectionEnable":false,
                "settingOverrideEnable":false,
                "payloadEnable":false
            },
            "functionBlacklist":["sin","cos"],
            "graphingInfo":{
                "graphingEnable":true,
                "graphingBlacklist":["sin","cos"]
            },
            "calculationHistoryInfo":{
                "historyTypes":[]
            },
            "screenCaptureInfo":{
                "screenshotFrequency":1000,
                "recordingEnable":true
            },
            "settingOverrideInfo":[],
            "rejectionReason":""
          
          }
        ipcMain.on("savePermissions",(event,data)=>{
            console.log(data);
            this.permissions = data;
        });

    }

    handleConnection(){

        this.wss.on("connection",(ws,req) =>{
            console.log("A client is searching for admins.");
            //Add new client to list of clients
            this.clients.push({ip:req.socket.remoteAddress,socket:ws});
            ws.on("message", (msg) => {
               let jsonObject = JSON.parse(msg);
               //Check to see if its a client log
                let validate = this.ajv.getSchema("clientLog");
                if(validate(jsonObject)){
                    this.window.webContents.send("clientLog",jsonObject);
                }

                validate = this.ajv.getSchema("permissionReply");
                if(validate(jsonObject)){
                    console.log("permission reply recieved!");
                    if(jsonObject.ssgcType === "connectionPermissionAccept"){
                    }else{
                        console.log("Client rejected permissions.")
                        //ws.send(JSON.stringify(this.generateRevokeJSON("adminClientRemoval")));
                        ws.close();
                    }
                }
                
                validate = this.ajv.getSchema("connectionRequest");
                if(validate(jsonObject)){
                    if(jsonObject.ssgcType === "connectionInfo"){
                        console.log("client is asking for admin info.");
                        ws.send(JSON.stringify(this.adminInfoJSON));
                    }
                    if(jsonObject.ssgcType === "connectionRequest" && !this.isSSGCCurrent(jsonObject)){
                        console.log("not up to date!");
                        ws.send(JSON.stringify(this.generateRevokeJSON("adminClientRemoval")));
                        //ws.close();
                    }else{
                        ws.send(JSON.stringify(this.permissions));
                    }
                }
                validate = this.ajv.getSchema("connectionRevoke");
                if(validate(jsonObject)){
                    console.log(jsonObject);
                    ws.close();
                }
                validate = this.ajv.getSchema("ssgcData");
                if(validate(jsonObject)){
                    this.window.webContents.send("ssgcData",jsonObject);
                  
                    
                }

            });
            // handling what to do when clients disconnects from server
            ws.on("close", () => {
                console.log("Client disconnected");
                this.window.webContents.send("clientDisconnected",req.socket.remoteAddress);
            });
            // handling client connection error
            ws.onerror = function (event) {
                console.log("Some Error occurred: code: "+event.code);
            }
        });     
    }
    sendJSONToClients(jsonObject){
        //Iterate through every client stored, and send them a message
        for(var i = 0; i < this.clients.length; i++){
            //Send them a message only if the client is actively open.
            if(this.clients[i].socket.readyState === websocket.OPEN ){
                this.clients[i].socket.send(JSON.stringify(jsonObject));
            }
        }
    }
    sendJSONToClient(clientIP,jsonObject){
        for(var i = 0; i<this.clients.length;i++){
            if(this.clients[i].ip == clientIP && this.clients[i].socket.readyState === websocket.OPEN  ){
                this.clients[i].socket.send(JSON.stringify(jsonObject));
            }
        }
    }
    setAdminName(name){
        this.adminInfoJSON.adminName = name;
    }
    setAdminDescription(description){
        //this.adminInfoJSON.adminExtra = description;
    }
    setSSGCVersion(version){
       if(!version) return;
       var versions = version.split(",");
       this.majorVersion = versions[0];
       this.minorVersion = versions[1];
       this.bugFixVersion = versions[2];
    }
    isSSGCCurrent(jsonObject){
        return jsonObject.clientVersion.major >= this.majorVersion && jsonObject.clientVersion.minor >= this.minorVersion && jsonObject.clientVersion.bugfix >= this.bugFixVersion;
    }
    generateRevokeJSON(reason,ip){
        return {
            ssgcType:"adminRevoke",
            revokeReason:reason,
            clientIP:ip,
            clientName:"PLACEHOLDER"
        };
    }
    ejectAllClients(){
        for(var i = 0; i < this.clients.length;i++){
            this.clients[i].socket.send(JSON.stringify(this.generateRevokeJSON("adminSessionTermination",this.clients[i].ip)));
        }
        this.clients = [];
    }
}
module.exports = JsonHandler;
