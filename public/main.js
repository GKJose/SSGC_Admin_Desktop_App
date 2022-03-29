/** Import/Require Declaractions */
const electron = require("electron");
const url = require("url");
const path = require("path");

const {app, BrowserWindow,Menu,ipcMain} = electron;

//Static Variable Declarations
let mainWindow;
let BroadcastedName = "";
let listeningPort = 6969;

//Listen for app to be ready
app.on('ready', function(){
    mainWindow = new BrowserWindow({});
    //Load html into window
    mainWindow.loadURL('http://localhost:3000');
    //Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //Insert menu
    Menu.setApplicationMenu(mainMenu);
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

                }
            },
            {
                label:'Restrict Permissions',
                click(){

                }
            },
            {
                label:'Remote View Calculator(s)',
                click(){

                }
            },
            {
                label:'Record Input/Output of Calculator(s)',
                click(){

                }
            }
        ]
    },
    {
        label:'View',
        submenu:[
            {
                label:'Fullscreen Mode',
                accelerator: process.platform == 'darwin' ? 'Command+F':'Ctrl+F',
                click(){
                    if(mainWindow.isMaximized() == false){
                        mainWindow.maximize();
                        mainWindow.show();
                        console.log("FS Toggled!");
                    }else{
                        mainWindow.minimize();
                        mainWindow.show();
                        console.log("FS UnToggled!");
                    }
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
                    //Open a new window
                }
            },
            {
                label:'Check for Updates',
                click(){

                }
            },

            {
                label:'About Us',
                click(){
                    //Open a new window.
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