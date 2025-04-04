import { createApp } from 'vue'
import './assets/main.css'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './router/router'
import '@mdi/font/css/materialdesignicons.css'
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  components,
  directives,
 });
 
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')

// токен к бд: pat4mDRAgEew4bUNv.4760e3755664a04ddce094ff3e7677d3b775ab7e7790f9d55aac4bef554b78ab
// id базы: appcypm6A9zLAuGpD