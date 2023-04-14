import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'

import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(PrimeVue)

interface MountAppOptions {
  shadowDom?: boolean
  injectPrimeVueStyles: 'document' | 'shadow-root' | 'both'
}

export const mountMainApp = ({ shadowDom, injectPrimeVueStyles }: MountAppOptions) => {
  const mountElement = document.querySelector('#app')

  if (!mountElement) {
    throw new Error('Could not find the mount element to mount the app on!')
  }

  // Conditionally set up shadow DOM
  if (shadowDom) {
    mountElement.attachShadow({ mode: 'open' })
  }

  // Mount on either the elements shadowRoot, or just the element if it isn't set up.
  if (mountElement.shadowRoot) {
    app.mount(mountElement.shadowRoot as any)
  } else {
    app.mount(mountElement)
  }

  const createCssLinkElement = (url: string) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = url

    return link
  }

  const injectCss = (url: string) => {
    const shouldInjectIntoShadowRoot = injectPrimeVueStyles !== 'document'
    const shouldInjectIntoDocument = injectPrimeVueStyles !== 'shadow-root'

    if (shouldInjectIntoShadowRoot && mountElement.shadowRoot) {
      mountElement.shadowRoot.appendChild(createCssLinkElement(url))
    }

    if (shouldInjectIntoDocument) {
      document.head.appendChild(createCssLinkElement(url))
    }
  }

  // The css that is desired by PrimeVue to be available.

  injectCss(
    'https://cdn.jsdelivr.net/npm/primevue@3.26.1/resources/themes/lara-light-indigo/theme.css'
  )

  //core
  injectCss('https://cdn.jsdelivr.net/npm/primevue@3.26.1/resources/primevue.min.css')

  //icons
  injectCss('https://cdn.jsdelivr.net/npm/primeicons@6.0.1/primeicons.css')
}
