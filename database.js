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

// Function to get players for a specific season with optional player name filtering
function getPlayersBySeason(season, filter = '') {
    return new Promise((resolve, reject) => {
        let query = 'SELECT Player, Tm FROM NFL_Player_Stats_1922 WHERE Season = ?';
        let params = [season];

        // If a filter is provided, we add the WHERE condition for filtering by player name
        if (filter) {
            query += ' AND Player LIKE ?';
            params.push('%' + filter + '%');
        }

        db.all(query, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}


// Function to get stats for a specific player, with sorting and filtering capabilities
function getPlayerStats(player, sortBy = 'Season', sortOrder = 'ASC', filter = '') {
    return new Promise((resolve, reject) => {
        let query = 'SELECT * FROM NFL_Player_Stats_1922 WHERE Player = ?';
        let params = [player];

        // Apply filtering based on the player's name
        if (filter) {
            query += ' AND Player LIKE ?';
            params.push('%' + filter + '%');
        }

        // Sort the data based on the provided column and order
        query += ` ORDER BY ${sortBy} ${sortOrder}`;

        db.all(query, params, (err, rows) => {
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