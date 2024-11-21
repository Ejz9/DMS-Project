<template>
  <div>
    <h2>Search Player Stats</h2>
    <input v-model="filterText" type="text" placeholder="Search by player name" />
    <button @click="fetchPlayerStats">Get Stats</button>

    <!-- Displaying the stats in a table with sorting functionality -->
    <table v-if="filteredStats.length > 0">
      <thead>
      <tr>
        <th @click="sortTable('Player')">Player</th>
        <th @click="sortTable('Season')">Season</th>
        <th @click="sortTable('Tm')">Team</th>
        <th @click="sortTable('Pos')">Position</th>
        <th @click="sortTable('G')">Games Played</th>
        <th @click="sortTable('GS')">Games Started</th>
        <th @click="sortTable('RshTD')">Rushing TDs</th>
        <th @click="sortTable('RecTD')">Receiving TDs</th>
        <th @click="sortTable('PR TD')">PR TDs</th>
        <th @click="sortTable('KR TD')">KR TDs</th>
        <th @click="sortTable('FblTD')">Fumble TDs</th>
        <th @click="sortTable('IntTD')">Interception TDs</th>
        <th @click="sortTable('OthTD')">Other TDs</th>
        <th @click="sortTable('AllTD')">Total TDs</th>
        <th @click="sortTable('Pts')">Points</th>
        <th @click="sortTable('Pts/G')">Points Per Game</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="stat in sortedStats" :key="stat.Season">
        <td>{{ stat.Player }}</td>
        <td>{{ stat.Season }}</td>
        <td>{{ stat.Tm }}</td>
        <td>{{ stat.Pos }}</td>
        <td>{{ stat.G }}</td>
        <td>{{ stat.GS }}</td>
        <td>{{ stat.RshTD }}</td>
        <td>{{ stat.RecTD }}</td>
        <td>{{ stat['PR TD'] }}</td>
        <td>{{ stat['KR TD'] }}</td>
        <td>{{ stat.FblTD }}</td>
        <td>{{ stat.IntTD }}</td>
        <td>{{ stat.OthTD }}</td>
        <td>{{ stat.AllTD }}</td>
        <td>{{ stat.Pts }}</td>
        <td>{{ stat['Pts/G'] }}</td>
      </tr>
      </tbody>
    </table>

    <!-- Show message if no results -->
    <p v-else>No stats found for this player.</p>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      filterText: '',
      filteredStats: [],
      sortBy: '', // Column to sort by
      sortOrder: 'asc', // 'asc' or 'desc'
    };
  },
  computed: {
    sortedStats() {
      // Sort the filtered stats based on the selected column and order
      if (!this.sortBy) return this.filteredStats;

      return this.filteredStats.slice().sort((a, b) => {
        let valA = a[this.sortBy];
        let valB = b[this.sortBy];

        // Handle cases where values might be numeric or string
        if (typeof valA === 'string') {
          valA = valA.toLowerCase();
          valB = valB.toLowerCase();
        }

        if (this.sortOrder === 'asc') {
          return valA > valB ? 1 : valA < valB ? -1 : 0;
        } else {
          return valA < valB ? 1 : valA > valB ? -1 : 0;
        }
      });
    },
  },
  methods: {
    async fetchPlayerStats() {
      if (!this.filterText) {
        alert("Please enter a player name.");
        return;
      }

      try {
        // API call to get player stats from the database
        const result = await window.api.getPlayerStats(this.filterText);

        if (result.error) {
          alert("Error fetching player stats: " + result.error);
        } else {
          this.filteredStats = result; // Assuming result is an array of player stats
        }
      } catch (error) {
        alert("Error fetching player stats: " + error);
      }
    },

    // Toggle sort order and set the column to sort by
    sortTable(column) {
      if (this.sortBy === column) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortBy = column;
        this.sortOrder = 'asc';
      }
    },
  },
};
</script>
