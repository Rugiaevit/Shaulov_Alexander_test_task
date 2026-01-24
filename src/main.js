import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'flatpickr/dist/flatpickr.css' // ← ГЛОБАЛЬНО для всего проекта!

const app = createApp(App)
app.use(router)

app.mount('#app')
