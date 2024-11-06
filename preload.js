const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    getPlayersBySeason: (season) => ipcRenderer.invoke('get-players-by-season', season),
    getPlayerStats: (player) => ipcRenderer.invoke('get-player-stats', player)
});
