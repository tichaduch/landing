// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    // ... your configuration
    theme: {
      defaultTheme: 'light',
      themes: {
        dark: {
          colors: {
            background: '#c62828',
          },
        },
        light: {
          colors: {
            background: '#c62828',
          },
        },
      },
    },
  })
  app.vueApp.use(vuetify)
})

