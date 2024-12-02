const { contextBridge, ipcRenderer } = require('electron');

// Expose APIs to the renderer process
contextBridge.exposeInMainWorld('api', {
    getPlayersBySeason: (season) => ipcRenderer.invoke('get-players-by-season', season),
    getPlayerStats: (player) => ipcRenderer.invoke('get-player-stats', player),
    getPlayersWithRushingTD: () => ipcRenderer.invoke('get-player-with-rushingTD'),
    getPlayersWithReceivingTD: () => ipcRenderer.invoke('get-player-with-receivingTD'),
    getPlayersWithPRTD: () => ipcRenderer.invoke('get-player-with-prtd'),
    getPlayersByName: (name) => ipcRenderer.invoke('get-players-by-name', name),
    getGamesPlayed: (playerName, seasonYear) => ipcRenderer.invoke('get-games-played', playerName, seasonYear),
    getGamesScored: (playerName, seasonYear) => ipcRenderer.invoke('get-games-scored', playerName, seasonYear),
    getTotalGamesScored: (playerName) => ipcRenderer.invoke('get-total-games-scored', playerName),
    getTotalGamesPlayed: (playerName) => ipcRenderer.invoke('get-total-games-played', playerName),
    getPlayersByAge: (age) => ipcRenderer.invoke('get-players-by-age', age),
    getPlayersByPosition: (position) => ipcRenderer.invoke('get-players-by-position', position),
    getPlayersByTeam: (teamName, page, limit) => ipcRenderer.invoke('get-players-by-team', teamName, page, limit),
    getPlayerCountBySeason: (seasonYear) => ipcRenderer.invoke('getPlayerCountBySeason', seasonYear),
    getNumPlayersScored: (seasonYear) => ipcRenderer.invoke('get-num-players-scored', seasonYear),
    getAllPlayerNames: () => ipcRenderer.invoke('get-all-player-names'),
    getAllTeamNames: () => ipcRenderer.invoke('get-all-team-names'),
});
