<script setup lang="ts">
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import AutoComplete from 'primevue/autocomplete'
import { ref } from 'vue'
import { useShadowDomEnabled } from './features/demo-settings'

// Click
const clickCount = ref(0)
const handleClick = () => {
  clickCount.value = clickCount.value + 1
}

// Date picker
const selectedDate = ref('')

// Auto complete
const autoCompleteValue = ref('')
const autoCompleteSuggestions = ref([] as string[])
const autoCompleteSearch = (event: any) => {
  autoCompleteSuggestions.value = [...Array(10).keys()].map((item) => event.query + '-' + item)
}

const shadowDomEnabled = useShadowDomEnabled()
</script>

<template>
  <div>
    This will try out some prime vue components in a vue app that is mounted normally or with a
    shadow root
  </div>
  <div class="wrapper">
    <h2>Button</h2>
    <Button @click="handleClick">Click Me</Button>

    <div>
      Clicked {{ clickCount }} times. You can see how the styles are applied depending on where the
      css is injected.
    </div>

    <h2>Calendar</h2>
    <Calendar v-model="selectedDate" />
    <div v-if="selectedDate">You selected: {{ selectedDate }}</div>

    <h2>Autocomplete</h2>
    <AutoComplete
      v-model="autoCompleteValue"
      @complete="autoCompleteSearch"
      :suggestions="autoCompleteSuggestions"
    />
  </div>
  <hr />
  <div v-if="shadowDomEnabled">
    There is an issue when you try to use the date picker or autocomplete while in a shadow dom:
    this error occurs.
    <img src="./assets/img/hover-error.png" />
  </div>
</template>
