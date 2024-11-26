<template>
  <div>
    <!-- Input for Age -->
    <div>
      <b-input
          v-model="playerAge"
          placeholder="Enter Player Age"
          type="number"
          class="input is-medium"
      ></b-input>
    </div>

    <!-- Input for Position -->
    <div>
      <b-input
          v-model="playerPosition"
          placeholder="Enter Player Position"
          type="text"
          class="input is-medium"
      ></b-input>
    </div>

    <!-- Buttons -->
    <div>
      <b-button @click="fetchPlayersByAge" :disabled="loading || !playerAge">
        Get Players by Age
      </b-button>
      <b-button @click="fetchPlayersByPosition" :disabled="loading || !playerPosition">
        Get Players by Position
      </b-button>
    </div>

    <!-- Loading Indicator -->
    <div v-if="loading">Loading...</div>

    <!-- Display Players by Age -->
    <div v-if="playersByAgeResult.length > 0">
      <strong>Players with Age {{ playerAge }}:</strong>
      <ul>
        <li v-for="(player, index) in playersByAgeResult" :key="index">{{ player["Player Name"] }}</li>
      </ul>
    </div>

    <!-- Display Players by Position -->
    <div v-if="playersByPositionResult.length > 0">
      <strong>Players who played as {{ playerPosition }}:</strong>
      <ul>
        <li v-for="(player, index) in playersByPositionResult" :key="index">{{ player["Player Name"] }}</li>
      </ul>
    </div>

    <!-- No Results -->
    <div v-if="!loading && !playersByAgeResult.length && !playersByPositionResult.length">
      No players found for the given criteria.
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playerAge: null, // Input for player age
      playerPosition: "", // Input for player position
      playersByAgeResult: [], // Store the result of players by age
      playersByPositionResult: [], // Store the result of players by position
      loading: false, // Show loading state
    };
  },

  methods: {
    async fetchPlayersByAge() {
      if (!this.playerAge) return;

      this.loading = true;
      try {
        const response = await window.api.getPlayersByAge(this.playerAge);
        console.log('Fetched players by age:', response);

        if (response.length > 0) {
          this.playersByAgeResult = response;
        } else {
          this.playersByAgeResult = [];
        }
      } catch (error) {
        console.error('Error fetching players by age:', error);
        this.playersByAgeResult = [];
      } finally {
        this.loading = false;
      }
    },

    async fetchPlayersByPosition() {
      if (!this.playerPosition) return;

      this.loading = true;
      try {
        const response = await window.api.getPlayersByPosition(this.playerPosition);
        console.log('Fetched players by position:', response);

        if (response.length > 0) {
          this.playersByPositionResult = response;
        } else {
          this.playersByPositionResult = [];
        }
      } catch (error) {
        console.error('Error fetching players by position:', error);
        this.playersByPositionResult = [];
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
/* Optional: Add custom styles for inputs and results */
.input {
  margin-bottom: 1rem;
}

button {
  margin-top: 1rem;
}

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