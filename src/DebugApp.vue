<script setup lang="ts">
import { computed, ref } from 'vue'
import { mountDemoApp } from './app'
import { useLocalStorage } from '@vueuse/core'
import type { CssInjectTarget, FrameworkName } from './types'

const shadowDomEnabled = useLocalStorage('shadowDomEnabled', true)
const _injectCssTarget = useLocalStorage<CssInjectTarget>('injectCssTarget', 'document')
const injectCssTarget = computed<CssInjectTarget>({
  get: () => (shadowDomEnabled.value ? _injectCssTarget.value : 'document'),
  set: (val) => (_injectCssTarget.value = val)
})

const frameworkTarget = useLocalStorage<FrameworkName>('frameworkTarget', 'PrimeVue')

const mounted = ref(false)
const handleButtonClick = () => {
  if (mounted.value === true) {
    // Start clean before remounting again
    window.location.reload()
    return
  }

  mountDemoApp({
    shadowDom: shadowDomEnabled.value,
    injectFrameworkStyles: injectCssTarget.value,
    framework: frameworkTarget.value
  })

  mounted.value = true
}
</script>
<template>
  <div class="container">
    <div class="option">
      <label for="">Which framework should we use?</label>

      <select v-model="frameworkTarget">
        <option value="PrimeVue">PrimeVue</option>
        <option value="Vuetify">Vuetify</option>
        <option value="Quasar">Quasar</option>
      </select>
    </div>
    <div class="option">
      <label for="">Should we mount the app under a created shadowRoot?</label>
      <div>
        <input type="radio" id="shadow-enabled" value="true" v-model="shadowDomEnabled" />
        <label for="shadow-enabled">Yes</label>
      </div>
      <div>
        <input type="radio" id="shadow-disabled" value="false" v-model="shadowDomEnabled" />
        <label for="shadow-disabled">No</label>
      </div>
    </div>

    <div class="option">
      <label for="">Where should we inject the Framework's CSS?</label>

      <select v-model="injectCssTarget">
        <option value="shadow-root" v-if="shadowDomEnabled">Only Shadow DOM</option>
        <option value="document">Only Head Tag</option>
        <option value="both" v-if="shadowDomEnabled">Both</option>
      </select>

      <div v-if="injectCssTarget === 'shadow-root'">
        The Framework's css will be inserted in the shadow root.
        <img src="./assets/img/css-in-shadow-root.png" />
      </div>

      <div v-if="injectCssTarget === 'document'">
        The Framework's css will be inserted in the head tag.
        <img src="./assets/img/css-in-head.png" />
      </div>
    </div>

    <button @click="handleButtonClick">
      {{ mounted ? 'Reload Page' : 'Mount App' }}
    </button>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;

  border: 1px #111 solid;
}

.option,
button {
  margin: 1rem;
}
</style>
