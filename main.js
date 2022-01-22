const { app, BrowserWindow, Menu } = require("electron")
require('electron-reload')(__dirname)

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1020,
        height: 770,
        icon: 'src/public/tempIcon.ico'
    })
    mainWindow.loadFile('src/ui/index.html')
    
    // mainWindow.webContents.openDevTools()
    let menu = Menu.buildFromTemplate([
        {
            label:"File",
            submenu:[
                {label:'Get Article'},
                {label:'Exit',
                click() {
                    app.quit()
                }}
            ],
            label:'About'
        }
    ])
    Menu.setApplicationMenu(menu)
}

app.whenReady().then(() => {
    createWindow()
})
