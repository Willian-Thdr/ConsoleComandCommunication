const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    openMessageWindow: () => {
        ipcRenderer.send('open-MessageWindow');
    }
})