import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')

const defaultBackgroundColor = 'purple'

app.directive('background', (el, binding) => {
  el.style.backgroundColor = binding.arg || defaultBackgroundColor
})
