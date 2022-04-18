const websocket = require("ws");
const Ajv = require("ajv")
const addFormats = require("ajv-formats");
const {dialog}= require('electron');
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
            adminName:this.adminName,
            adminExtra:" "
        };

    }

    handleConnection(){

        this.wss.on("connection",(ws,req) =>{
            //Add new client to list of clients
            this.clients.push({ip:req.socket.remoteAddress,socket:ws});
            ws.send(JSON.stringify(this.adminInfoJSON));
            ws.on("message", (msg) => {
               let jsonObject = JSON.parse(msg);
               //Check to see if its a client log
                let validate = this.ajv.getSchema("clientLog");
                if(validate(jsonObject)){
                    this.window.webContents.send("clientLog",jsonObject);
                }
    
                validate = this.ajv.getSchema("permissionReply");
                if(validate(jsonObject)){
                    this.window.webContents.send("permissionReply",jsonObject);
                }
                
                validate = this.ajv.getSchema("connectionRequest");
                if(validate(jsonObject)){
                    console.log("connection request recieved!");
                    if(jsonObject.ssgcType === "connectionInfo"){
                        ws.send(JSON.stringify(this.adminInfoJSON));
                    }
                    else if(jsonObject.ssgcType === "connectionRequest" && !this.isSSGCCurrent(jsonObject)){
                        console.log("not up to date!");
                        ws.send(this.generateRevokeJSON("adminClientRemoval"));
                        ws.close();
                    }else{
                        dialog.showMessageBox(this.window,{type:"info",title:"Client Connection Info.",message:"A new calculator has connected!"});
                        this.window.webContents.send("connectionRequest",jsonObject);
                    }
                }
                validate = this.ajv.getSchema("connectionRevoke");
                if(validate(jsonObject)){
                    this.window.webContents.send("connectionRevoke",jsonObject);
                }
                validate = this.ajv.getSchema("ssgcData");
                if(validate(jsonObject)){
                    this.window.webContents.send("ssgcData",jsonObject);
                  
                    
                }

            });
            // handling what to do when clients disconnects from server
            ws.on("close", () => {
                dialog.showMessageBox(this.window,{type:"info",title:"Client Connection Info.",message:"A calculator has disconnected! IP:"});
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
        this.adminInfoJSON.adminExtra = description;
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
    generateRevokeJSON(reason){
        return {
            ssgcType:"adminRevoke",
            revokeReason:reason
        };
    }
  
}
module.exports = JsonHandler;
