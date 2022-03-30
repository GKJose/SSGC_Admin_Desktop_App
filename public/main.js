/** Import/Require Declaractions */
const electron = require("electron");
const url = require("url");
const path = require("path");
const Store = require('electron-store');
const prompt = require('electron-prompt');
const {app, BrowserWindow,Menu,ipcMain,dialog} = electron;

const store = new Store();

//Static Variable Declarations
let mainWindow;
let BroadcastedName = "";
let listeningPort = 6969;

//Listen for app to be ready
app.on('ready', function(){
    mainWindow = new BrowserWindow({show: false,webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
    }});
    //Load html into window
    mainWindow.loadURL('http://localhost:3000');
    //Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //Insert menu
    Menu.setApplicationMenu(mainMenu);
    //Set initial theme
    store.set("settings.theme","light");
    mainWindow.webContents.on('did-finish-load',() =>{
        mainWindow.show();
        mainWindow.webContents.send("change-theme",store.get("settings.theme"));
    });
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
        label:'Options',
        submenu:[
            {
                label:'Search for Calculator(s)',
                click(){ 
                mainWindow.webContents
                .send('will-navigate','/');

                }
            },
            {
                label:'Restrict Permissions',
                click(){
                    mainWindow.webContents
                    .send('will-navigate','/restrictPermissions');
                }
            },
            {
                label:'Remote View Calculator(s)',
                click(){
                    mainWindow.webContents
                    .send('will-navigate','/remoteViewCalculators'); 
                }
            },
            {
                label:'Record Input/Output of Calculator(s)',
                click(){
                    mainWindow.webContents
                    .send('will-navigate','/recordIO');
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
                    if(store.get("settings.theme") == "light"){
                        store.set("settings.theme","dark");
                    }else{
                        store.set("settings.theme","light")
                    }
                    mainWindow.webContents.on('did-finish-load',() =>{
                        mainWindow.webContents.send("change-theme",store.get("settings.theme"));
                    });
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
                    mainWindow.webContents.on('did-finish-load', () => {
                        mainWindow.webContents.send('change-page', "/gettingStarted");
                      });  
                }                 
            },
            {
                label:'Check for Updates',
                click(){
                    mainWindow.webContents.on('did-finish-load', () => {
                        mainWindow.webContents.send('change-page', "/checkForUpdates");
                      });  
                }
            },
            {
                label:'About Us',
                click(){
                    mainWindow.webContents.on('did-finish-load', () => {
                        mainWindow.webContents.send('change-page', "/aboutUs");
                      });  
                }
            }
        ]
    }
];

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

