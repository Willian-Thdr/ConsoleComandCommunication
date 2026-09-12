const { app, BrowserWindow, ipcMain} = require('electron');

ipcMain.on('open-MessageWindow', () => {
    console.log("open message window");
    const window = new BrowserWindow({
        width: 665,
        height: 411,
        useContentSize: true
    });

    console.log("load window elements");
    window.loadFile('Source/View/CommunicateWindow.html');
});