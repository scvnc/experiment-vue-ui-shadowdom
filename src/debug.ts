import { createApp } from 'vue'
import DebugApp from './DebugApp.vue'

export const mountDebugApp = () => {
  const app = createApp(DebugApp)
  app.mount('#debug')
}
