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
    ipcMain.handle('get-player-with-receivingTD', async () => {
        try {
            return await database.getPlayersWithReceivingTD(); // Fetch players with receiving touchdowns
        } catch (err) {
            console.error('Error fetching player stats:', err);
            return { error: err.message };
        }
    });
    ipcMain.handle('get-player-with-prtd', async () => {
        try {
            return await database.getPlayersWithPRTD(); // Fetch players with Punt Return TDs
        } catch (err) {
            console.error('Error fetching player stats:', err);
            return { error: err.message };
        }
    });
    ipcMain.handle('get-players-by-name', async (event, playerName, page = 1, limit = 20) => {
        try {
            return await database.getPlayersByName(playerName, page, limit); // Fetch players by name with pagination
        } catch (err) {
            console.error('Error fetching player team history:', err);
            return { error: err.message };
        }
    });
    ipcMain.handle('get-games-played', async (event, playerName, seasonYear) => {
        try {
            return await database.getGamesPlayed(playerName, seasonYear); // Fetch total games played
        } catch (err) {
            console.error('Error fetching games played:', err);
            return { error: err.message };
        }
    });
    ipcMain.handle('get-games-scored', async (event, playerName, seasonYear) => {
        try {
            return await database.getGamesScored(playerName, seasonYear); // Fetch total games scored
        } catch (err) {
            console.error('Error fetching games scored:', err);
            return { error: err.message };
        }
    });
    ipcMain.handle('get-total-games-scored', async (event, playerName) => {
        try {
            return await database.getTotalGamesScored(playerName); // Fetch total games scored
        } catch (err) {
            console.error('Error fetching total games scored:', err);
            return { error: err.message };
        }
    });
    ipcMain.handle('get-total-games-played', async (event, playerName) => {
        try {
            return await database.getTotalGamesPlayed(playerName); // Fetch total games played
        } catch (err) {
            console.error('Error fetching total games played:', err);
            return { error: err.message };
        }
    });
    ipcMain.handle('get-players-by-age', async (event, age) => {
        try {
            return await database.getPlayersByAge(age); // Fetch players by age
        } catch (err) {
            console.error('Error fetching players by age:', err);
            return { error: err.message };
        }
    });
    ipcMain.handle('get-players-by-position', async (event, position) => {
        try {
            return await database.getPlayersByPosition(position); // Fetch players by position
        } catch (err) {
            console.error('Error fetching players by position:', err);
            return { error: err.message };
        }
    });
    ipcMain.handle('get-players-by-team', async (event, teamName, page = 1, limit = 20) => {
        try {
            return await database.getPlayersByTeam(teamName, page, limit); // Fetch players by team name with pagination
        } catch (err) {
            console.error('Error fetching players by team:', err);
            return { error: err.message };
        }
    });
    ipcMain.handle('getPlayerCountBySeason', async (event, seasonYear) => {
        try {
            const count = await database.getPlayerCountBySeason(seasonYear);
            return count;
        } catch (error) {
            console.error('Error fetching player count for season:', error);
            return { error: error.message };
        }
    });



});


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});