<template>
  <div>
    <!-- Input for Player Name -->
    <div>
      <b-input
          v-model="playerName"
          placeholder="Enter Player Name"
          type="text"
          class="input is-medium"
      ></b-input>
    </div>

    <!-- Input for Season Year -->
    <div>
      <b-input
          v-model="seasonYear"
          placeholder="Enter Season Year"
          type="number"
          class="input is-medium"
      ></b-input>
    </div>

    <!-- Buttons -->
    <div>
      <b-button @click="fetchGamesPlayed" :disabled="loading || !playerName || !seasonYear">
        Get Games Played
      </b-button>
      <b-button @click="fetchGamesScored" :disabled="loading || !playerName || !seasonYear">
        Get Games Scored
      </b-button>
      <b-button @click="fetchTotalGamesScored" :disabled="loading || !playerName">
        Get Total Games Scored Throughout Career
      </b-button>
      <b-button @click="fetchTotalGamesPlayed" :disabled="loading || !playerName">
        Get Total Games Played in Career
      </b-button>
    </div>

    <!-- Loading Indicator -->
    <div v-if="loading">Loading...</div>

    <!-- Display Result for Games Played -->
    <div v-if="gamesPlayedResult">
      <strong>Total Games Played:</strong> {{ gamesPlayedResult["Total Games Played"] || 0 }}
    </div>

    <!-- Display Result for Games Scored -->
    <div v-if="gamesScoredResult">
      <strong>Total Games Scored:</strong> {{ gamesScoredResult["Total Games Scored"] || 0 }}
    </div>

    <!-- Display Result for Total Career Games Scored -->
    <div v-if="totalGamesScoredResult">
      <strong>Total Games Scored Throughout Career:</strong> {{ totalGamesScoredResult["Total Games Scored"] || 0 }}
    </div>

    <!-- Display Result for Total Career Games Played -->
    <div v-if="totalGamesPlayedResult">
      <strong>Total Games Played in Career:</strong> {{ totalGamesPlayedResult["Total Games Played"] || 0 }}
    </div>

    <!-- No Results -->
    <div v-if="!loading && !gamesPlayedResult && !gamesScoredResult && !totalGamesScoredResult && !totalGamesPlayedResult">
      No data found for the given player and season.
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playerName: "", // Input for player's name
      seasonYear: null, // Input for season year
      gamesPlayedResult: null, // Store the query result for games played
      gamesScoredResult: null, // Store the query result for games scored
      totalGamesScoredResult: null, // Store the query result for total games scored throughout career
      totalGamesPlayedResult: null, // Store the query result for total games played throughout career
      loading: false, // Show loading state
    };
  },

  methods: {
    async fetchGamesPlayed() {
      if (!this.playerName || !this.seasonYear) return;

      this.loading = true;
      try {
        const response = await window.api.getGamesPlayed(this.playerName, this.seasonYear);
        console.log('Fetched games played:', response);

        if (response.length > 0) {
          this.gamesPlayedResult = response[0];
        } else {
          this.gamesPlayedResult = null;
        }
      } catch (error) {
        console.error('Error fetching games played:', error);
        this.gamesPlayedResult = null;
      } finally {
        this.loading = false;
      }
    },

    async fetchGamesScored() {
      if (!this.playerName || !this.seasonYear) return;

      this.loading = true;
      try {
        const response = await window.api.getGamesScored(this.playerName, this.seasonYear);
        console.log('Fetched games scored:', response);

        if (response.length > 0) {
          this.gamesScoredResult = response[0];
        } else {
          this.gamesScoredResult = null;
        }
      } catch (error) {
        console.error('Error fetching games scored:', error);
        this.gamesScoredResult = null;
      } finally {
        this.loading = false;
      }
    },

    async fetchTotalGamesScored() {
      if (!this.playerName) return;

      this.loading = true;
      try {
        const response = await window.api.getTotalGamesScored(this.playerName);
        console.log('Fetched total games scored:', response);

        if (response.length > 0) {
          this.totalGamesScoredResult = response[0];
        } else {
          this.totalGamesScoredResult = null;
        }
      } catch (error) {
        console.error('Error fetching total games scored:', error);
        this.totalGamesScoredResult = null;
      } finally {
        this.loading = false;
      }
    },

    async fetchTotalGamesPlayed() {
      if (!this.playerName) return;

      this.loading = true;
      try {
        const response = await window.api.getTotalGamesPlayed(this.playerName);
        console.log('Fetched total games played:', response);

        if (response.length > 0) {
          this.totalGamesPlayedResult = response[0];
        } else {
          this.totalGamesPlayedResult = null;
        }
      } catch (error) {
        console.error('Error fetching total games played:', error);
        this.totalGamesPlayedResult = null;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
