/** Import/Require Declaractions */
const electron = require("electron");
const url = require("url");
const path = require("path");
const Store = require('electron-store');
const prompt = require('electron-prompt');
const JHandler = require("./json-handler");
const { dialog } = require("electron");
const {app, BrowserWindow,Menu,ipcMain} = electron;

const store = new Store();

//Static Variable Declarations
let mainWindow;
let jsonHandler;


//Listen for app to be ready
app.on('ready', function(){
    mainWindow = new BrowserWindow({show: false,webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
    }});
    //Load html into window
    mainWindow.loadURL('http://localhost:3000');
    //Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //Insert menu
    Menu.setApplicationMenu(mainMenu);
    mainWindow.webContents.on('did-finish-load',() =>{
        mainWindow.show();
        mainWindow.webContents.send("change-theme",store.get("settings.theme"));
    });
    jsonHandler = new JHandler(mainWindow);
    jsonHandler.handleConnection();
    jsonHandler.setAdminName(store.get("admin.name"));
    jsonHandler.setAdminDescription(store.get("admin.description"));
    jsonHandler.setSSGCVersion(store.get("settings.SSGCVersion"));

});

//Set the minimum/maximum size of the application
if(app.isReady()){

let {maxWidth,maxHeight} = electron.screen.getPrimaryDisplay().workAreaSize;
mainWindow.setResizable(false);
mainWindow.setMaximumSize(maxWidth, maxHeight);
mainWindow.setMinimumSize(800,620);
mainWindow.minimize();

}

//Create menu template
const mainMenuTemplate = [
    {
        label:'File',
        submenu:[
            {
                label:'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q':'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]

    },
    {
        label:'Navigation',
        submenu:[
            {
                label:'Home Page',
                click(){
                    mainWindow.webContents.send('navigate','/');
                }
            },
            {
                label:'Restrict Permissions Page',
                click(){
                    mainWindow.webContents
                        .send('navigate','routes/restrictPermissions');
                }
            },
            {
                label:'Remote View Calculator(s) Page',
                click(){
                    mainWindow.webContents
                        .send('navigate','routes/remoteViewCalculators'); 
                }
            },
            {
                label:'View Input/Output of Calculator(s) Page',
                click(){
                    mainWindow.webContents
                        .send('navigate','routes/recordIO');
                }
            }
        ]
    },
    {
        label:'View',
        submenu:[
            {
                label:'Toggle Fullscreen Mode',
                accelerator: process.platform == 'darwin' ? 'Command+F':'Ctrl+F',
                click(){
                    if(!mainWindow.isMaximized()){
                        mainWindow.maximize();
                        mainWindow.show();
                    }else{
                        mainWindow.minimize();
                        mainWindow.show();
                    }
                }
            },
            {
                label:'Toggle Dark Theme',
                click(){
                    if(store.get("settings.theme") == 'light'){
                        store.set("settings.theme",'dark');
                    }else{
                        store.set("settings.theme",'light')
                    }
                    
                    mainWindow.webContents.send("change-theme",store.get("settings.theme"));
                    
                }
            }
        ]
    },
    {
        label:'Settings',
        submenu:[
            {
                label:'Change Name Broadcasted',
                click(){
                    prompt({
                        title: 'Change Name Broadcasted',
                        label: 'Name:',
                        value: store.get("admin.name"),
                        inputAttrs: {
                            type: 'text'
                        },
                        type: 'input'
                    })
                    .then((r) => {
                        if(r === null) {
  
                        } else {
                            store.set("admin.name",r);
                            jsonHandler.setAdminName(store.get("admin.name"));
                        }
                    })
                    .catch(console.error);
                }
            },
            {
                label:"Set SSGC Version",
                click(){
                    prompt({
                        title: 'Set SSGC Version (Major,Minor,BugFix)',
                        label: 'Name:',
                        value: store.get("settings.SSGCVersion"),
                        inputAttrs: {
                            type: 'text'
                        },
                        type: 'input'
                    })
                    .then((r) => {
                        if(r !== null && r.split(",").length < 3) {
                            dialog.showErrorBox("Error","Incorect input string.");
                        }else if(r === null){
                            
                        }
                        else {
                            store.set("settings.SSGCVersion",r);
                            jsonHandler.setSSGCVersion(store.get("settings.SSGCVersion"));
                        }
                    })
                    .catch(console.error);
                }
            },
            {
                label:"Set admin description",
                click(){
                    prompt({
                        title: 'Change Admin Description',
                        label: 'Name:',
                        value: store.get("admin.description"),
                        inputAttrs: {
                            type: 'text'
                        },
                        type: 'input'
                    })
                    .then((r) => {
                        if(r === null) {
  
                        } else {
                            store.set("admin.description",r);
                            jsonHandler.setAdminDescription(store.get("admin.description"));
                        }
                    })
                    .catch(console.error);
                } 
            }
        ]
    },
    {
        label:'Help',
        submenu:[
            {
                label:'Getting Started',
                click(){
                    
                    mainWindow.webContents.send('navigate', "routes/gettingStarted");
                        
                }                 
            },
            {
                label:'Check for Updates',
                click(){
                    
                    mainWindow.webContents.send('navigate', "routes/checkForUpdates");
                        
                }
            },
            {
                label:'About Us',
                click(){
                    
                    mainWindow.webContents.send('navigate', "routes/aboutUs");
                      
                }
            }
        ]
    }
];
ipcMain.on("sendPermissions",(event,data)=>{
    jsonHandler.sendJSONToClients(data);
});
ipcMain.on("sendPermissionsToClient",(event,data)=>{
    jsonHandler.sendJSONToClient(data.clientIP,data.permissions);
});
//Toggle dev tools if in development
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu:[
            {
                label:'Toggle DevTools',
                click(item,focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    });
}
