import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import FontAwesomeIcon from './assets/FontAwesomeIcon'
import { createPinia } from 'pinia'
// import store from './store/vuex'

const pinia = createPinia()

createApp(App).use(router,pinia).component('font-awesome-icon', FontAwesomeIcon).mount('#app')


