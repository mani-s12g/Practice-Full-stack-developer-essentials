import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')


// for vue: 3.3.4
// const { createApp } = require('vue');
// import App from "./App.vue";

// createApp(App).mount("#app");
