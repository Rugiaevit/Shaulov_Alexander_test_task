import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import 'flatpickr/dist/flatpickr.css' // ← ГЛОБАЛЬНО для всего проекта!
// import 'vue3-datepicker/dist/vue3-datepicker.css'

const app = createApp(App)
app.use(router)

app.mount('#app')
