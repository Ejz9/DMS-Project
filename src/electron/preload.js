const { contextBridge, ipcRenderer } = require('electron');

// Expose APIs to the renderer process
contextBridge.exposeInMainWorld('api', {
    getPlayersBySeason: (season) => ipcRenderer.invoke('get-players-by-season', season),
    getPlayerStats: (player) => ipcRenderer.invoke('get-player-stats', player),
    getPlayersWithRushingTD: () => ipcRenderer.invoke('get-player-with-rushingTD'),
    getPlayersWithReceivingTD: () => ipcRenderer.invoke('get-player-with-receivingTD'),
    getPlayersWithPRTD: () => ipcRenderer.invoke('get-player-with-prtd'),
    getPlayersByName: (name) => ipcRenderer.invoke('get-players-by-name', name),
});
