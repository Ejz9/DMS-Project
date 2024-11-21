// main.js
import './assets/styles.css';  // Make sure this is the correct path to your Tailwind CSS file
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(router);

app.mount('#app');
