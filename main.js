const { app, BrowserWindow } = require("electron")


function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: 'src/public/tempIcon.ico'
    })
    mainWindow.loadFile('src/ui/index.html')
}

app.whenReady().then(() => {
    createWindow()
})
