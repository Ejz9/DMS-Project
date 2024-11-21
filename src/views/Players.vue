<template>
  <div>
    <h2>Players by Season</h2>
    <input v-model="season" type="number" placeholder="Enter a season" />
    <button @click="fetchPlayersBySeason">Get Players</button>
    <div v-if="groupedPlayers.length">
      <div v-for="group in groupedPlayers" :key="group.team" class="team-group">
        <h3 @click="toggleGroup(group.team)">{{ group.team }}</h3>
        <ul v-show="group.expanded">
          <li v-for="player in group.players" :key="player.Player">
            {{ player.Player }} ({{ player.Season }})
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Players',
  data() {
    return {
      season: '', // The season input from the user
      groupedPlayers: [], // To store players grouped by team
    };
  },
  methods: {
    async fetchPlayersBySeason() {
      try {
        // Ensure season is entered
        if (!this.season) {
          alert('Please enter a season');
          return;
        }

        // Debug log to ensure correct season is being passed
        console.log('Fetching players for season:', this.season);

        // Fetch players for the given season via the exposed API
        const players = await window.api.getPlayersBySeason(this.season);

        // Log the players fetched from the API
        console.log('Fetched players:', players);

        // Check if an error was returned from the backend
        if (players.error) {
          console.error('Error fetching players:', players.error);
          return;
        }

        // Group players by team and log the result
        const grouped = this.groupPlayersByTeam(players);
        console.log('Grouped players:', grouped);

        this.groupedPlayers = grouped;
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    },

    groupPlayersByTeam(players) {
      // Log the input players before grouping
      console.log('Grouping players:', players);

      // Group players by their team
      const groups = [];

      players.forEach(player => {
        let group = groups.find(g => g.team === player.Tm); // Match team name
        if (!group) {
          // If no group exists for the team, create one
          group = { team: player.Tm, players: [], expanded: false };
          groups.push(group);
        }
        group.players.push(player); // Add player to the group
      });

      // Log the final grouped data
      console.log('Final grouped teams:', groups);
      return groups;
    },

    toggleGroup(team) {
      // Debug log to check which team is being toggled
      console.log('Toggling group for team:', team);

      // Toggle the visibility of a team group
      const group = this.groupedPlayers.find((g) => g.team === team);
      if (group) group.expanded = !group.expanded;

      // Log the updated group visibility
      console.log('Updated group visibility:', group);
    },
  },
};
</script>

<style scoped>
/* Optional: Add some styles for the components */
.team-group {
  margin-bottom: 10px;
}

button {
  margin-top: 10px;
}
</style>
