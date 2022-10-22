import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store, key } from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { i18n } from './locales/i18n';

createApp(App)
  .use(i18n)
  .use(store, key)
  .use(router)
  .use(ElementPlus)
  .mount('#app');
