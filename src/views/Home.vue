<template>
  <div class="container">


    <b-message title="ALERT: In Progress!" type="is-info">
      <p>This page currently in is progress! Come back soon to check when it's updated!</p>
    </b-message>

    <!-- Search Box -->
    <div class="search-container">
      <b-field label="Search for stats:">
        <b-input
            id="searchBox"
            v-model="searchQuery"
            @input="handleInput()"
            type="text"
            placeholder="Search for stats:"
            class="input is-medium"
        ></b-input>
      </b-field>
    </div>

    <!-- Select Search Type -->
    <div>
    <b-select v-model="searchType" placeholder="Select Search Type">
      <option value="playerByName">Player by Name</option>
      <option value="playerByTeam">Player by Team</option>
      <option value="gamesBySeason">Games by Season</option>
      <option value="playersByPosition">Players by Position</option>
      <option value="playersByAge">Players by Age</option>
    </b-select>
    </div>

    <!-- Display currently searching value -->
    <p>Currently searching for: {{ searchQuery }}</p>

    <!-- Display number of results found -->
    <p v-if="results.length > 0">Found {{ results.length }} result(s)</p>
    <p v-else v-if="searchQuery.length > 0">No results found</p>

    <!-- List of search results -->
    <ul v-if="results.length > 0" class="list">
      <li v-for="(result, index) in results" :key="index" class="list-item">
        <a @click="goToResultPage(result)">{{ result.name }}</a> <!-- Replace 'name' with your result's property -->
      </li>
    </ul>

    <b-message title="Search Criteria" type="is-info">
      <ul>
        <li><b>Player Name:</b> <em>Firstname Lastname, Firstname, or Lastname</em></li>
        <li><b>Player Age:</b> <em>Age</em></li>
        <li><b>Team Name:</b> <em>Team-name</em></li>
      </ul>
    </b-message>
  </div>
</template>


<script>
export default {
  data() {
    return {
      searchQuery: "",
      results: [],
    };
  },
  methods: {
    handleInput() {
      if (this.isNumeric(this.searchQuery)) {
        let length = this.searchQuery.length;
        switch (length) {
          case 4: {
            getPlayersBySeason(this.searchQuery);
            break;
          }
          default: {
            this.results = [];
            break;
          }
        }
      } else {
        this.searchForPlayer(this.searchQuery);
      }
    },

    isNumeric(value) {
      return !isNaN(value) && value.trim() !== '';
    },

    searchForPlayer() {
      if (this.searchQuery.length > 0) {
        this.results = [];
      } else {
        this.results = [];
      }
    },

    goToResultPage(result) {
      console.log("Navigating to result page for:", result.name);
      this.$router.push(`/results/${result.name}`);
    }
  }
};
</script>

<style scoped>
/* Centering content using flexbox */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #ffffff;
  text-align: center;
}

.search-container {
  width: 100%;
  display: compact;
  justify-content: center;
  margin-bottom: 2rem;
}

/* Shrink and center the search box */
.input {
  width: 50%; /* Controls size of the search box */
  max-width: 500px;
  padding: 0.5rem;
  font-size: 1.2rem;
}

.list {
  list-style-type: none;
  padding: 0;
}

.list-item {
  margin: 0.5em 0;
  padding: 0.5em;
  background-color: #f5f5f5;
  border-radius: 5px;
  transition: background-color 0.2s;
}

.list-item:hover {
  background-color: #e8e8e8;
  cursor: pointer;
}

/* Message Box Styling */
b-message {
  margin-top: 2rem;
}
</style>