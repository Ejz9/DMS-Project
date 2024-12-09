<template>
  <div>
    <!-- Input for Season Year -->
    <div>
      <b-input
          v-model="seasonYear"
          placeholder="Enter Season Year"
          type="number"
          class="input is-medium"
      ></b-input>
    </div>

    <!-- Buttons to fetch data -->
    <div>
      <b-button @click="fetchPlayerCountBySeason" :disabled="loading || !seasonYear">
        Get Player Count for Season
      </b-button>
      <b-button @click="fetchAllPlayerNames" :disabled="loading">
        Get All Player Names
      </b-button>
      <b-button @click="fetchAllTeamNames" :disabled="loading">
        Get All Team Names
      </b-button>
    </div>

    <!-- Loading Indicator -->
    <div v-if="loading">Loading...</div>

    <!-- Display Result for Player Count in Season -->
    <div v-if="playerCountResult !== null">
      <strong>Number of Players in Season {{ seasonYear }}:</strong> {{ playerCountResult || 0 }}
    </div>

    <!-- Display Result for All Player Names -->
    <div v-if="playerNames.length > 0">
      <strong>Player Names:</strong>
      <ul>
        <li v-for="(name, index) in playerNames" :key="index">{{ name["Player Name"] }}</li>
      </ul>
    </div>

    <!-- Display Result for All Team Names -->
    <div v-if="teamNames.length > 0">
      <strong>Team Names:</strong>
      <ul>
        <li v-for="(team, index) in teamNames" :key="index">{{ team["C1"] }}</li>
      </ul>
    </div>

    <!-- No Results -->
    <div v-if="!loading && !playerCountResult && !playerNames.length && !teamNames.length">
      No data found for the given inputs.
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      seasonYear: null, // Input for season year
      playerCountResult: null, // Store the result for player count in season
      playerNames: [], // Store player names
      teamNames: [], // Store team names
      loading: false, // Show loading state
    };
  },

  methods: {
    // Method to fetch the number of players for the given season
    async fetchPlayerCountBySeason() {
      if (!this.seasonYear) return;

      this.loading = true;
      try {
        const response = await window.api.getNumPlayersScored(this.seasonYear);
        console.log("Fetched player count for season:", response);

        if (response && response["COUNT(distinct p.\"Player ID\")"] !== undefined) {
          this.playerCountResult = response["COUNT(distinct p.\"Player ID\")"];
        } else {
          this.playerCountResult = null;
        }
      } catch (error) {
        console.error("Error fetching player count for season:", error);
        this.playerCountResult = null;
      } finally {
        this.loading = false;
      }
    },

    // Method to fetch all player names
    async fetchAllPlayerNames() {
      this.loading = true;
      try {
        const response = await window.api.getAllPlayerNames();
        console.log("Fetched player names:", response);

        if (response.length > 0) {
          this.playerNames = response;
        } else {
          this.playerNames = [];
        }
      } catch (error) {
        console.error("Error fetching player names:", error);
        this.playerNames = [];
      } finally {
        this.loading = false;
      }
    },

    // Method to fetch all team names
    async fetchAllTeamNames() {
      this.loading = true;
      try {
        const response = await window.api.getAllTeamNames();
        console.log("Fetched team names:", response);

        if (response.length > 0) {
          this.teamNames = response;
        } else {
          this.teamNames = [];
        }
      } catch (error) {
        console.error("Error fetching team names:", error);
        this.teamNames = [];
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
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