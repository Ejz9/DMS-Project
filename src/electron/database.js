import sqlite3 from 'sqlite3'; // ES module import
import path from 'path';

const dbPath = path.resolve('DMS-Project');

// Open the SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the DMS-Project database.');
    }
});

// Function to get players for a specific season with optional player name filtering
export function getPlayersBySeason(season, filter = '') {
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
export function getPlayerStats(player, sortBy = 'Season', sortOrder = 'ASC', filter = '') {
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

export function getPlayersWithRushingTD() {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT DISTINCT p."Player Name"
            FROM Player p
            JOIN Touchdowns t ON p."player ID" = t."Touchdown ID"
            WHERE t."Rushing TDs" > 0;
        `;
        db.all(query, [], (err, rows) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                console.log('Players with rushing TDs:', rows); // Log the query result
                resolve(rows);
            }
        });
    });
}

export function getPlayersWithReceivingTD() {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT DISTINCT p."Player Name"
            FROM Player p
            JOIN Touchdowns t ON p."Player ID" = t."Touchdown ID"
            WHERE t."Receiving TDs" > 0;
        `;
        db.all(query, [], (err, rows) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                resolve(rows); // Return the player data
            }
        });
    });
}

export function getPlayersWithPRTD() {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT DISTINCT p."Player Name"
            FROM Player p
            JOIN Touchdowns t ON p."Player ID" = t."Touchdown ID"
            WHERE t."PR TD" > 0;
        `;
        db.all(query, [], (err, rows) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                resolve(rows); // Return the player data
            }
        });
    });
}

export function getPlayersByName(playerName, page = 1, limit = 20) {
    return new Promise((resolve, reject) => {
        const offset = (page - 1) * limit; // Calculate the offset based on the page number
        const query = `
            SELECT DISTINCT pf."Player ID", t.C1 AS "Team", p."Player Name", s."Year" AS "Season"
            FROM Teams t
            JOIN PlaysFor pf ON t.C1 = pf."Team Name"
            JOIN Player p ON pf."Player ID" = p."Player ID"
            JOIN PlayedIn pi ON pi."Player ID" = p."Player ID"
            JOIN Season s ON s."Year" = pi."Year"
            WHERE p."Player Name" LIKE ?
            LIMIT ? OFFSET ?;  -- Use LIMIT and OFFSET for pagination
        `;
        db.all(query, [`%${playerName}%`, limit, offset], (err, rows) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                resolve(rows); // Return the player data
            }
        });
    });
}

export function getGamesPlayed(playerName, seasonYear) {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT SUM(DISTINCT pi."Games played") AS "Total Games Played"
            FROM PlayedIn pi
            JOIN Player p ON p."Player ID" = pi."Player ID"
            JOIN Season s ON pi.Year = s.Year
            WHERE p."Player Name" LIKE ? AND s.Year = ?;
        `;
        db.all(query, [`%${playerName}%`, seasonYear], (err, rows) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                resolve(rows); // Return the result
            }
        });
    });
}

export function getGamesScored(playerName, seasonYear) {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT SUM(DISTINCT pi."Games Scored") AS "Total Games Scored"
            FROM PlayedIn pi
            JOIN Player p ON p."Player ID" = pi."Player ID"
            JOIN Season s ON pi.Year = s.Year
            WHERE p."Player Name" LIKE ? AND s.Year = ?;
        `;
        db.all(query, [`%${playerName}%`, seasonYear], (err, rows) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                resolve(rows); // Return the result
            }
        });
    });
}

export function getTotalGamesScored(playerName) {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT SUM(DISTINCT pi."Games Scored") AS "Total Games Scored"
            FROM PlayedIn pi
            JOIN Player p ON p."Player ID" = pi."Player ID"
            JOIN Season s ON pi.Year = s.Year
            WHERE p."Player Name" LIKE ?;
        `;
        db.all(query, [`%${playerName}%`], (err, rows) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                resolve(rows); // Return the result
            }
        });
    });
}

export function getTotalGamesPlayed(playerName) {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT SUM(DISTINCT pi."Games played") AS "Total Games Played"
            FROM PlayedIn pi
            JOIN Player p ON p."Player ID" = pi."Player ID"
            JOIN Season s ON pi.Year = s.Year
            WHERE p."Player Name" LIKE ?;
        `;
        db.all(query, [`%${playerName}%`], (err, rows) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                resolve(rows); // Return the result
            }
        });
    });
}

export function getPlayersByAge(age) {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT "Player Name"
            FROM Player
            WHERE Age = ?;
        `;
        db.all(query, [age], (err, rows) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                resolve(rows); // Return the result
            }
        });
    });
}

export function getPlayersByPosition(position) {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT "Player Name"
            FROM Player
            WHERE position = ?;
        `;
        db.all(query, [position], (err, rows) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                resolve(rows); // Return the result
            }
        });
    });
}

export function getPlayersByTeam(teamName, page = 1, limit = 20) {
    return new Promise((resolve, reject) => {
        const offset = (page - 1) * limit; // Calculate the offset based on the page number
        const query = `
            SELECT DISTINCT pf."Player ID", t.C1 AS "Team", p."Player Name", s."Year" AS "Season"
            FROM Teams t
            JOIN PlaysFor pf ON t.C1 = pf."Team Name"
            JOIN Player p ON pf."Player ID" = p."Player ID"
            JOIN PlayedIn pi ON pi."Player ID" = p."Player ID"
            JOIN Season s ON s."Year" = pi."Year"
            WHERE t.C1 LIKE ?
            LIMIT ? OFFSET ?;  -- Use LIMIT and OFFSET for pagination
        `;
        db.all(query, [`%${teamName}%`, limit, offset], (err, rows) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                resolve(rows); // Return the player data
            }
        });
    });
}

export function getPlayerCountBySeason(seasonYear) {
    return new Promise((resolve, reject) => {
        const query = `
      SELECT COUNT(distinct p."Player ID")
      FROM Player p
      JOIN PlayedIn pi ON p."Player ID" = pi."Player ID"
      JOIN Season s ON s.Year = pi.Year
      WHERE s.Year = ?;
    `;
        db.get(query, [seasonYear], (err, row) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                resolve(row); // Return the player count
            }
        });
    });
}

export function getNumPlayersScored(year) {
    return new Promise((resolve, reject) => {
        const query = `
      SELECT COUNT(distinct p."Player Name")
      FROM Player p
      JOIN PlayedIn pi ON p."Player ID" = pi."Player ID"
      JOIN Season s ON s.Year = pi.Year
      WHERE s.Year = ? AND pi."Games Scored" > 0;
    `;

        db.get(query, [year], (err, row) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                resolve(row); // This should return the count of players who scored
            }
        });
    });
}

export function getAllPlayerNames() {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT distinct "Player Name"
            FROM Player
    `;

        db.all(query, [], (err, rows) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                resolve(rows); // This will return an array of player names
            }
        });
    });
}


export function getAllTeamNames() {
    return new Promise((resolve, reject) => {
        const query = `
      SELECT DISTINCT "C1"
      FROM Teams
    `;

        db.all(query, [], (err, rows) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                resolve(rows); // This will return an array of team names
            }
        });
    });
}



// In database.js
export function executeQuery(query, params) {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

// Add this export to enable the default import in main.js
export default {
    getPlayersBySeason,
    getPlayerStats,
    //executeQuery,
    getPlayersWithRushingTD,
    getPlayersWithReceivingTD,
    getPlayersWithPRTD,
    getPlayersByName,
    getGamesPlayed,
    getGamesScored,
    getTotalGamesScored,
    getTotalGamesPlayed,
    getPlayersByAge,
    getPlayersByPosition,
    getPlayersByTeam,
    getPlayerCountBySeason,
    getNumPlayersScored,
    getAllPlayerNames,
    getAllTeamNames,


};
