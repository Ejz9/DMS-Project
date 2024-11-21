import { createRouter, createWebHistory } from 'vue-router';

// Import views
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Players from '@/views/Players.vue';
import Teams from '@/views/Teams.vue';
import Search from '@/views/Search.vue';

// Define routes
const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/about', name: 'About', component: About },
    { path: '/players', name: 'Players', component: Players },
    { path: '/teams', name: 'Teams', component: Teams },
    { path: '/search', name: 'Search', component: Search },
];

// Create the router instance
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
