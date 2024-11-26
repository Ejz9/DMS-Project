<template>
  <div>
    <!-- Select Search Type -->
    <div>
      <b-select v-model="searchType" @change="simpleInput" placeholder="Select Search Type">
        <option value="getPlayersWithRushingTD">Players with Rushing TDs</option>
        <option value="playerByTeam">Players who scored a receiving touchdown</option>
        <option value="gamesBySeason">Games by Season</option>
        <option value="playersByPosition">Players by Position</option>
        <option value="playersByAge">Players by Age</option>
      </b-select>
    </div>

    <!-- Loading Indicator -->
    <div v-if="loading">Loading...</div>

    <!-- Scrollable Results Box -->
    <div v-if="results.length > 0" class="scrollable-results">
      <ul>
        <li v-for="(result, index) in results" :key="index">{{ result["Player Name"] }}</li>
      </ul>
    </div>

    <!-- No Results Message -->
    <div v-if="results.length === 0 && !loading">No results found.</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      results: [],
      searchType: "",
      loading: false, // Show loading state
    };
  },

  methods: {
    async simpleInput() {
      this.results = []; // Clear previous results
      this.loading = true; // Show loading indicator

      try {
        switch (this.searchType) {
          case 'getPlayersWithRushingTD':
            const players = await window.api.getPlayersWithRushingTD(); // Get the players from the main process
            console.log('Fetched players:', players);
            if (players.length > 0) {
              this.results = players;
            } else {
              console.log('No players found with rushing touchdowns.');
              this.results = [];
            }
            break;
            // Handle other search types...
          default:
            break;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        this.loading = false; // Hide loading indicator
      }
    },
  },
};
</script>

<style scoped>
/* Scrollable Results Box */
.scrollable-results {
  max-height: 400px; /* Adjust the height as per your design */
  overflow-y: auto; /* Enable vertical scrolling */
  margin-top: 20px;
  border: 1px solid #ddd; /* Optional: add a border for better separation */
  border-radius: 5px; /* Optional: rounded corners */
  padding: 10px; /* Optional: padding inside the scrollable area */
}

/* Optional: Styling the individual list items */
.scrollable-results ul {
  padding: 0;
  list-style-type: none;
  margin: 0;
}

.scrollable-results li {
  padding: 8px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.scrollable-results li:hover {
  background-color: #f5f5f5;
}
</style>