import { createApp } from 'vue';
import { createPinia } from "pinia";
import request from '@/utils/request';

import App from './App.vue'
import router from './router'

import '@/assets/reset.css'

const app = createApp(App)
app.provide('request',request)

app.use(createPinia())
app.use(router)


app.mount('#app')
