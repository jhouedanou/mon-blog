// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxt/content'],
  css: ['bulma/css/bulma.min.css'],

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2024-10-10'
})