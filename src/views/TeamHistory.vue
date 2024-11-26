<template>
  <div>
    <!-- Player Name Input -->
    <div>
      <b-input
          v-model="playerName"
          placeholder="Enter Player Name (First name or Full name)"
          @input="fetchPlayerHistory"
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
      playerName: "",
      results: [],
      loading: false,
      page: 1,
      limit: 20,
      hasMore: true, // To control if there are more results to load
    };
  },

  methods: {
    async fetchPlayerHistory() {
      if (!this.playerName) {
        this.results = [];
        return;
      }

      this.loading = true;
      try {
        const players = await window.api.getPlayersByName(this.playerName, this.page, this.limit);
        console.log('Fetched players for team history:', players);

        if (players.length > 0) {
          if (this.page === 1) {
            this.results = players; // Set results for the first page
          } else {
            this.results = [...this.results, ...players]; // Append more results
          }
          this.hasMore = players.length === this.limit; // Check if there are more results to load
        } else {
          this.hasMore = false; // No more results to load
        }
      } catch (error) {
        console.error('Error fetching team history:', error);
        this.results = [];
      } finally {
        this.loading = false;
      }
    },

    loadMore() {
      if (this.hasMore) {
        this.page += 1;
        this.fetchPlayerHistory(); // Fetch the next page of results
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