<template>
  <div>
    <!-- Player Name Input -->
    <div>
      <b-input
          v-model="playerName"
          placeholder="Enter Player Name (First name or Full name)"
          @input="handleInputChange('playerName')"
          type="text"
          class="input is-medium"
      ></b-input>
    </div>

    <!-- Team Name Input -->
    <div>
      <b-input
          v-model="teamName"
          placeholder="Enter Team Name"
          @input="handleInputChange('teamName')"
          type="text"
          class="input is-medium"
      ></b-input>
    </div>

    <!-- Loading State -->
    <div v-if="loading">Loading...</div>

    <!-- Display Results -->
    <div v-if="results.length > 0">
      <ul>
        <li v-for="(result, index) in results" :key="index">
          <strong>Player ID:</strong> {{ result["Player ID"] }},
          <strong>Team:</strong> {{ result.Team }},
          <strong>Season:</strong> {{ result.Season }}
        </li>
      </ul>
    </div>

    <!-- No Results -->
    <div v-if="results.length === 0 && !loading">No results found.</div>

    <!-- Pagination Controls -->
    <b-button @click="loadMore" :disabled="loading || !hasMore">Load More</b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playerName: "",   // Store the player name input
      teamName: "",     // Store the team name input
      results: [],      // Store the query results
      loading: false,   // Show loading indicator
      page: 1,          // Pagination page number
      limit: 20,        // Number of results per page
      hasMore: true,    // Check if more results are available
    };
  },

  methods: {
    handleInputChange(inputType) {
      // Clear results if input changes
      this.results = [];

      // Reset the other input based on which is being used
      if (inputType === "playerName") {
        this.teamName = ""; // Clear the team name input when player name is used
      } else if (inputType === "teamName") {
        this.playerName = ""; // Clear the player name input when team name is used
      }

      // Trigger the appropriate method based on the active input
      if (this.playerName) {
        this.fetchPlayerHistory(); // Fetch player history based on player name
      } else if (this.teamName) {
        this.fetchPlayersByTeam(); // Fetch players based on team name
      }
    },

    async fetchPlayerHistory() {
      // Only fetch if player name is provided
      if (!this.playerName) {
        this.results = [];
        return;
      }

      this.loading = true;
      try {
        // Fetch players matching the player name, paginated
        const players = await window.api.getPlayersByName(this.playerName, this.page, this.limit);
        console.log('Fetched players for team history:', players);

        if (players.length > 0) {
          if (this.page === 1) {
            this.results = players; // Set results for the first page
          } else {
            this.results = [...this.results, ...players]; // Append more results for subsequent pages
          }
          this.hasMore = players.length === this.limit; // Check if more results are available
        } else {
          this.hasMore = false; // No more results
        }
      } catch (error) {
        console.error('Error fetching team history:', error);
        this.results = [];
      } finally {
        this.loading = false;
      }
    },

    async fetchPlayersByTeam() {
      // Only fetch if team name is provided
      if (!this.teamName) {
        this.results = [];
        return;
      }

      this.loading = true;
      try {
        // Fetch players who played for the specified team
        const players = await window.api.getPlayersByTeam(this.teamName, this.page, this.limit);
        console.log('Fetched players for team:', players);

        if (players.length > 0) {
          if (this.page === 1) {
            this.results = players; // Set results for the first page
          } else {
            this.results = [...this.results, ...players]; // Append more results
          }
          this.hasMore = players.length === this.limit; // Check if more results are available
        } else {
          this.hasMore = false; // No more results
        }
      } catch (error) {
        console.error('Error fetching players by team:', error);
        this.results = [];
      } finally {
        this.loading = false;
      }
    },

    loadMore() {
      if (this.hasMore) {
        this.page += 1;
        this.fetchPlayerHistory(); // Fetch the next page of results for player history
      }
    },
  },
};
</script>

<style scoped>
/* Optional: Add custom styles for the results */
ul {
  padding-left: 0;
  list-style-type: none;
}

li {
  padding: 8px;
  border-bottom: 1px solid #eee;
}

li:hover {
  background-color: #f5f5f5;
}
</style>
