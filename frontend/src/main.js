

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueTheMask from 'vue-the-mask'
import './assets/style.scss'
const app = createApp(App)

app.use(router);
app.use(VueTheMask);

app.mount('#app')
