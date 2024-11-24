import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'tichaduch',
      link: [
        {
         rel: 'icon',
         type: 'image/svg+xml',
         href: '/favicon.svg'
        }
      ]
    }
  },
  telemetry: false,
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/apollo',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],

  apollo: {
    clients: {
      default: {
        httpEndpoint: '/graphql'
      }
    },
  },

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true }
})
