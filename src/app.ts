import { createApp } from 'vue'
import PrimeVueApp from './PrimeVueApp.vue'
import VuetifyApp from './VuetifyApp.vue'
import QuasarApp from './QuasarApp.vue'

import PrimeVue from 'primevue/config'
import { createVuetify } from 'vuetify'
import { Quasar } from 'quasar'
import './assets/main.css'
import type { CssInjectTarget, FrameworkName } from './types'

interface MountAppOptions {
  shadowDom?: boolean
  injectFrameworkStyles: CssInjectTarget
  framework: FrameworkName
}

const _resolveRootComponent = (framework: FrameworkName) => {
  switch (framework) {
    case 'PrimeVue':
      return PrimeVueApp
    case 'Vuetify':
      return VuetifyApp
    case 'Quasar':
      return QuasarApp
    default:
      throw new Error(`"${framework}" is an unknown framework.`)
  }
}

export const mountDemoApp = ({
  shadowDom,
  injectFrameworkStyles: injectPrimeVueStyles,
  framework
}: MountAppOptions) => {
  const RootComponent = _resolveRootComponent(framework)
  const app = createApp(RootComponent)

  if (framework === 'PrimeVue') {
    app.use(PrimeVue)
  } else if (framework === 'Vuetify') {
    const vuetify = createVuetify()
    app.use(vuetify)
  } else if (framework === 'Quasar') {
    app.use(Quasar as any)
  }

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

  interface InjectCssOptions {
    target?: Exclude<CssInjectTarget, 'both'>
  }
  const injectCss = (url: string, options: InjectCssOptions = {}) => {
    const shouldInjectIntoShadowRoot = (() => {
      if (options.target) {
        return options.target === 'shadow-root'
      }

      return injectPrimeVueStyles !== 'document'
    })()

    const shouldInjectIntoDocument = (() => {
      if (options.target) {
        return options.target === 'document'
      }

      return injectPrimeVueStyles !== 'shadow-root'
    })()

    if (shouldInjectIntoShadowRoot && mountElement.shadowRoot) {
      mountElement.shadowRoot.appendChild(createCssLinkElement(url))
    }

    if (shouldInjectIntoDocument) {
      document.head.appendChild(createCssLinkElement(url))
    }
  }

  // The css that is desired by PrimeVue to be available.

  if (framework === 'PrimeVue') {
    injectCss(
      'https://cdn.jsdelivr.net/npm/primevue@3.26.1/resources/themes/lara-light-indigo/theme.css'
    )

    //core
    injectCss('https://cdn.jsdelivr.net/npm/primevue@3.26.1/resources/primevue.min.css')

    //icons
    injectCss('https://cdn.jsdelivr.net/npm/primeicons@6.0.1/primeicons.css')
  }

  if (framework === 'Vuetify') {
    injectCss('https://cdn.jsdelivr.net/npm/vuetify@3.1.14/dist/vuetify.min.css')
  }

  if (framework === 'Quasar') {
    // https://quasar.dev/start/umd
    injectCss('https://cdn.jsdelivr.net/npm/quasar@2.11.10/dist/quasar.prod.css')

    // Always need to inject the fonts into the head because it does'nt work when doing shadow dom only
    injectCss(
      'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons'
    )
  }
}
