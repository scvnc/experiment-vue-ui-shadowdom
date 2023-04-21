<script setup lang="ts">
import { ref } from 'vue'
import { useShadowDomEnabled } from './features/demo-settings'
import { QBtn, QIcon, QDate, QPopupProxy, QInput, QItem, QItemSection, QSelect } from 'quasar'
// Click
const clickCount = ref(0)
const handleClick = () => {
  clickCount.value = clickCount.value + 1
}

// Date picker
const selectedDate = ref('')

// Auto complete

const stringOptions: string[] = ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'].reduce(
  (acc, opt) => {
    for (let i = 1; i <= 5; i++) {
      acc.push(opt + ' ' + i)
    }
    return acc
  },
  [] as string[]
)

const model = ref<string | null>(null)
const options = ref(stringOptions)

const filterFn = (val: string, update: any) => {
  update(() => {
    const needle = val.toLocaleLowerCase()
    options.value = stringOptions.filter((v) => v.toLocaleLowerCase().indexOf(needle) > -1)
  })
}

const setModel = (val: string) => {
  model.value = val
}
</script>

<template>
  <div>
    This will try out some prime vue components in a vue app that is mounted normally or with a
    shadow root
  </div>
  <div class="wrapper">
    <h2>Button</h2>
    <q-btn @click="handleClick">Click Me</q-btn>

    <div>
      Clicked {{ clickCount }} times. You can see how the styles are applied depending on where the
      css is injected.
    </div>

    <h2>Calendar</h2>

    <div class="q-pa-md" style="max-width: 300px">
      <q-input filled v-model="selectedDate" mask="date" :rules="['date']">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="selectedDate">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>

    <div v-if="selectedDate">You selected: {{ selectedDate }}</div>

    <h2>Autocomplete</h2>

    <div class="q-pa-md">
      <div class="q-gutter-md row">
        <q-select
          filled
          :model-value="model"
          use-input
          hide-selected
          fill-input
          input-debounce="0"
          :options="options"
          @filter="filterFn"
          @input-value="setModel"
          hint="Text autocomplete"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </div>
  </div>
</template>
