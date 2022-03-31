const WebSocketServer = require('ws');
const Ajv = require("ajv")
const addFormats = require("ajv-formats");
const electron = require('electron');

const schema_clientLog = require("../src/schemas/clientLog.schema.json");
const schema_connectionPermissionReply = require("../src/schemas/connectionPermissionReply.schema.json");
const schema_connectionRequest = require("../src/schemas/connectionRequest.schema.json");
const schema_connectionRevoke = require("../src/schemas/connectionRevoke.schema.json");
const schema_ssgcData = require("../src/schemas/ssgcData.schema.json");

const ipcMain  = electron;

const serverPort = 6969;



class JsonHandler{

    constructor(mainWindow){
        this.ajv = new Ajv();
        addFormats(this.ajv);
        this.wss = new WebSocketServer.Server({port:serverPort});
        this.window = mainWindow;
        this.ajv.addSchema(schema_clientLog,"clientLog");
        this.ajv.addSchema(schema_connectionPermissionReply,"permissionReply");
        this.ajv.addSchema(schema_connectionRequest,"connectionRequest");
        this.ajv.addSchema(schema_connectionRevoke,"connectionRevoke");
        this.ajv.addSchema(schema_ssgcData,"ssgcData");
        this.clients = [];
    }

    handleConnection(){

        this.wss.on("connection",(ws,req) =>{
            //On new connection, send event new-connection, with the ip address of the new calculator.
            console.log("new client connected: "+req.socket.remoteAddress);
            //Add new client to list of clients
            this.clients.push(ws);
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
                    this.window.webContents.send("connectionRequest",jsonObject);
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
                console.log("the client has disconnected");
            });
            // handling client connection error
            ws.onerror = function () {
                console.log("Some Error occurred");
            }
        });     
    }
    sendJSONToClients(jsonObject){
        //Iterate through every client stored, and send them a message
        for(var i = 0; i < this.clients.length; i++){
            //Send them a message only if the client is actively open.
            if(this.clients[i].readyState === WebSocket.OPEN ){
                this.clients[i].send(JSON.stringify(jsonObject));
            }
        }
    }
    
}
module.exports = JsonHandler;
