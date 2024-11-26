import {app, BrowserWindow, ipcMain} from 'electron';
import path from 'path';
import database from './database.js'; // Assuming this file is using ES module syntax

if (process.env.NODE_ENV === 'development') {
    try {
        // Enable live reload for Electron main process
        await import('electron-reloader')(module);
    } catch (err) {
        console.error('Failed to load electron-reloader:', err);
    }
}

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.resolve('src/electron/preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
        },
    });

    // Check if NODE_ENV is set correctly
    if (process.env.NODE_ENV === 'development') {
        console.log('Loading Vite Dev Server...');
        win.loadURL('http://localhost:5173/index.html'); // Load Vite Dev Server in development
    } else {
        console.log('Loading production build...');
        win.loadFile(path.resolve('dist/index.html')); // Load built files in production
    }
};

app.whenReady().then(() => {
    createWindow();

    // IPC handler to get players by season
    ipcMain.handle('get-players-by-season', async (event, season) => {
        try {
            return await database.getPlayersBySeason(season);
        } catch (err) {
            console.error('Error fetching players by season:', err);
            return {error: err.message};
        }
    });

    // IPC handler to get stats for a specific player
    ipcMain.handle('get-player-stats', async (event, player) => {
        try {
            return await database.getPlayerStats(player);
        } catch (err) {
            console.error('Error fetching player stats:', err);
            return {error: err.message};
        }
    });
    ipcMain.handle('get-player-with-rushingTD', async () => {
        try {
            console.log('Fetching players with rushing TDs'); // Log when the handler is called
            const players = await database.getPlayersWithRushingTD();
            console.log('Players with rushing TDs (from main process):', players); // Log the fetched players
            return players;
        } catch (err) {
            console.error('Error fetching player stats:', err);
            return {error: err.message};
        }
    });
});


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});