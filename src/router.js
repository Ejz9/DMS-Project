import { createRouter, createWebHashHistory } from 'vue-router';

// Import your components
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Players from '@/views/Players.vue';
import SimpleSearch from "@/views/SimpleSearch.vue";
import Search from '@/views/Search.vue';
import TeamHistory from "@/views/TeamHistory.vue";

// Define routes
const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/players', component: Players },
    { path: '/teams', component: SimpleSearch },
    { path: '/teamhistory', component: TeamHistory },
    { path: '/search', component: Search },
];

// Create the router instance
const router = createRouter({
    history: createWebHashHistory(), // Use hash mode for Electron compatibility
    routes,
});

export default router;
