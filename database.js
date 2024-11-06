const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'DMS-Project.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the DMS-Project database.');
    }
});

// Function to get players for a specific season
function getPlayersBySeason(season) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT Player FROM NFL_Player_Stats_1922 WHERE Season = ?';
        db.all(query, [season], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

// Function to get stats for a specific player
function getPlayerStats(player) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM NFL_Player_Stats_1922 WHERE Player = ?';
        db.all(query, [player], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

module.exports = {
    getPlayersBySeason,
    getPlayerStats
};
