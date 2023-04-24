# experiment-vue-ui-shadowdom

See [Demo.](https://scvnc.github.io/experiment-vue-ui-shadowdom/)


I am experimenting with having Popular Vue UI Frameworks used in a ShadowDOM environment for microfrontends.  Pros and cons to these libraries.

### Tested Frameworks

## Primevue

has js errors, but styles are relatively isolated when adding the styles to 'both'

Seems to require requiring the styles in both document and shadowRoot.

## Quasar

Works really well, stellar datepicker, low level components kind of nice.  It does pollute the styles a bit so we'd have to figure out how to bake in namespacing for it.

Seems to require requiring the styles in both document and shadowRoot. 

## Vuetify3

Missing datepicker.  It does pollute the styles a bit so we'd have to figure out how to bake in namespacing for it.

Seems to require requiring the styles in both document and shadowRoot.

## Scaffolding

This was scaffolded with `yarn create vue` [docs](https://vuejs.org/guide/quick-start.html)
