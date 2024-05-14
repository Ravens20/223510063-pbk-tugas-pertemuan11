import { createApp } from 'vue';
import './style.css'
import App from './App.vue';

const app = createApp(App);

app.config.globalProperties.$successMessage = function (message) {
  alert(message);
};

app.mount('#app');

