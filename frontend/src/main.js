

import { createApp } from 'vue'
import { createStore } from 'vuex'

import App from './App.vue'
import router from './router'
import VueTheMask from 'vue-the-mask'
import createPersistedState from 'vuex-persistedstate'
import './assets/style.scss'
const app = createApp(App)


 
const store = createStore({
    plugins: [createPersistedState()],
    state () {
      return {
        isAuthorized: false,
        username: '',
      }
    },
    mutations: {
      unAuthorize(state){
        state.isAuthorized = false;
      },
      authorize(state){
        state.isAuthorized = true;
      },
      setUserName(state, name){
        state.username = name;
      }
    },
    getters:{
        ISAUTHORIZED(state){
            return state.isAuthorized
        },
        USERNAME(state){
            return state.username;
        }
    }
  })


app.use(router);
app.use(VueTheMask);
app.use(store)

app.mount('#app')
