const { app, BrowserWindow, ipcMain} = require('electron');

ipcMain.on('open-MessageWindow', () => {
    console.log("open message window");
    const window = new BrowserWindow({
        width: 400,
        height: 300
    });

    console.log("load window elements");
    window.loadFile('Source/View/CommunicateWindow.html');
});