import { useBrowserLocation, useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'

export const useShadowDomEnabled = () => useLocalStorage('shadowDomEnabled', true)

export const useActiveFramework = () => {
  const location = useBrowserLocation()

  return computed(() => location.value.search)
}
