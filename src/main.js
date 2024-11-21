// main.js
import './assets/styles.css';  // Make sure this is the correct path to your Tailwind CSS file
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Buefy from '@ntohq/buefy-next'; // Import Buefy for Vue 3
import '@ntohq/buefy-next/dist/buefy.css'; // Import Buefy CSS
import Vuetify from "./plugins/vuetify.js"; // Import Vuetify plugin

const app = createApp(App);
app.use(router);
app.use(Buefy); // Use Buefy as a plugin
app.use(Vuetify);

app.mount('#app');
