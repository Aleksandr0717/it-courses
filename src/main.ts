import { createApp } from 'vue';
import './assets/main.css';
import { createPinia } from 'pinia';
import App from './App.vue';
import { router } from './router/router';
import '@mdi/font/css/materialdesignicons.css';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { registerServices } from '@/plugins/api/index';

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
 
const app = createApp(App);
registerServices(app);

app.use(createPinia());
app.use(router);
app.use(vuetify);
app.mount('#app');
