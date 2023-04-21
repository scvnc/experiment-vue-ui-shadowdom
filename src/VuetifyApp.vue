<script setup lang="ts">
import { ref } from 'vue'
import { VBtn } from 'vuetify/components/VBtn'
import { VAutocomplete } from 'vuetify/components/VAutocomplete'
import { watchEffect } from 'vue'

// Click
const clickCount = ref(0)
const handleClick = () => {
  clickCount.value = clickCount.value + 1
}

// Auto complete
const autoCompleteValue = ref('')
const autoCompleteSuggestions = ref([] as string[])
const autoCompleteSearch = (searchTerm: string) => {
  if (!searchTerm) {
    autoCompleteSuggestions.value = []
  }
  autoCompleteSuggestions.value = [...Array(10).keys()].map((item) => searchTerm + '-' + item)
}

watchEffect(() => {
  autoCompleteSearch(autoCompleteValue.value)
})
</script>

<template>
  <div>
    This will try out some prime vue components in a vue app that is mounted normally or with a
    shadow root
  </div>
  <div class="wrapper">
    <h2>Button</h2>
    <v-btn @click="handleClick">Click Me</v-btn>

    <div>
      Clicked {{ clickCount }} times. You can see how the styles are applied depending on where the
      css is injected.
    </div>

    <h2>Calendar</h2>
    <div>Vuetify3 has not implemented v-date-picker!</div>

    <h2>Autocomplete</h2>
    <v-autocomplete
      label="autocomplete"
      :items="autoCompleteSuggestions"
      v-model:search="autoCompleteValue"
    />
  </div>
</template>
