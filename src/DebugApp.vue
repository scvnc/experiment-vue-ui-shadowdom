<script setup lang="ts">
import { computed, ref } from 'vue'
import { mountMainApp } from './app'
import { useLocalStorage } from '@vueuse/core'

type CssInjectTarget = 'document' | 'shadow-root' | 'both'

const shadowDomEnabled = useLocalStorage('shadowDomEnabled', true)
const _injectCssTarget = useLocalStorage<CssInjectTarget>('injectCssTarget', 'document')
const injectCssTarget = computed<CssInjectTarget>({
  get: () => (shadowDomEnabled.value ? _injectCssTarget.value : 'document'),
  set: (val) => (_injectCssTarget.value = val)
})

const mounted = ref(false)
const handleButtonClick = () => {
  mountMainApp({ shadowDom: shadowDomEnabled.value, injectPrimeVueStyles: injectCssTarget.value })
  mounted.value = true
}
</script>
<template>
  <div class="container">
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
      <label for="">Where should we inject the PrimeVue CSS?</label>

      <select v-model="injectCssTarget">
        <option value="shadow-root" v-if="shadowDomEnabled">Only Shadow DOM</option>
        <option value="document">Only Head Tag</option>
        <option value="both" v-if="shadowDomEnabled">Both</option>
      </select>

      <div v-if="injectCssTarget === 'shadow-root'">
        The PrimeVue css will be inserted in the shadow root.
        <img src="./assets/img/css-in-shadow-root.png" />
      </div>

      <div v-if="injectCssTarget === 'document'">
        The PrimeVue css will be inserted in the head tag.
        <img src="./assets/img/css-in-head.png" />
      </div>
    </div>

    <button @click="handleButtonClick" :disabled="mounted">Mount App</button>
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
