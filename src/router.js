import { createRouter, createWebHashHistory } from 'vue-router';

// Import your components
import Home from '@/views/Home.vue';
import SimpleSearch from "@/views/SimpleSearch.vue";
import TeamHistory from "@/views/TeamHistory.vue";
import PlayerInfo from "@/views/PlayerInfo.vue";
import Players from "@/views/Players.vue";

// Define routes
const routes = [
    { path: '/', component: Home },
    { path: '/simplesearch', component: SimpleSearch },
    { path: '/teamhistory', component: TeamHistory },
    { path: '/playerinfo', component: PlayerInfo },
    { path: '/players', component: Players },
];

// Create the router instance
const router = createRouter({
    history: createWebHashHistory(), // Use hash mode for Electron compatibility
    routes,
});

export default router;
