import { useLocalStorage } from '@vueuse/core'

export const useShadowDomEnabled = () => useLocalStorage('shadowDomEnabled', true)
