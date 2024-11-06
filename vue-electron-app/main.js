const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const database = require('./database');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false
        }
    });

    win.loadFile('index.html');
};

app.whenReady().then(() => {
    createWindow();

    // IPC handler to get players by season
    ipcMain.handle('get-players-by-season', async (event, season) => {
        try {
            const players = await database.getPlayersBySeason(season);
            return players;
        } catch (err) {
            console.error('Error fetching players by season:', err);
            return { error: err.message };
        }
    });

    // IPC handler to get stats for a specific player
    ipcMain.handle('get-player-stats', async (event, player) => {
        try {
            const stats = await database.getPlayerStats(player);
            return stats;
        } catch (err) {
            console.error('Error fetching player stats:', err);
            return { error: err.message };
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
