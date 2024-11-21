<template>
  <div>
    <h2>Welcome to the NFL Stats Viewer</h2>
    <p>Explore players, teams, and more!</p>

    <!-- Search Box -->
    <input id="searchBox" v-model="searchQuery" @input="handleInput()" type="text" placeholder="Search for stats:" />

    <!-- Display currently searching value -->
    <p>Currently searching for: {{ searchQuery }}</p>

    <!-- Display number of results found -->
    <p v-if="results.length > 0">Found {{ results.length }} result(s)</p>
    <p v-else v-if="searchQuery.length > 0">No results found</p>

    <!-- List of search results -->
    <ul v-if="results.length > 0">
      <li v-for="(result, index) in results" :key="index">
        <a @click="goToResultPage(result)">{{ result.name }}</a> <!-- Replace 'name' with your result's property -->
      </li>
    </ul>

    <h3>Criteria to search by:</h3>
    <ul>
      <li><b>Player Name:</b> <em>Firstname Lastname, Firstname, or Lastname</em></li>
      <li><b>Player Age:</b> <em>Age</em></li>
      <li><b>Team Name:</b> <em>Team-name</em></li>
    </ul>
  </div>
</template>
<script>
//import {getPlayersBySeason} from "@/electron/database.js";

export default {
  data() { //Allows for reactivity on the page.
    return { //returns the method.
      searchQuery: "", //Holds the value of the input box.
      results: [], //Array to store search results
    };
  },
  methods: {
    //Checks if input is a number or text.
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
        this.searchForPlayer(this.searchQuery); //Handle Text Based Searches
      }
    },

    //Method to check if a value is numeric
    isNumeric(value) {
      return !isNaN(value) && value.trim() !== '';
    },

    //Mock method to example the output. Need to process the input and filter the output as searching.
    searchForPlayer() {
      if (this.searchQuery.length > 0) {
        this.results = [{name: "Tom Brady"}, {name: "Aaron Rodgers" }];
      } else {
      }
    },

    goToResultPage(result) {
      console.log("Navigating to result page for:", result.name);
      this.$router.push(`/results/${result.name}`);
    }
  }
};
</script>
<style>
body {
  background-color: #333;
  font-family: 'Arial', sans-serif;
}
</style>