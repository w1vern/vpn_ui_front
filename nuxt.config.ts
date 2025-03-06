// https://nuxt.com/docs/api/configuration/nuxt-config
import Nora from '@primeuix/themes/aura'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  modules: ['@primevue/nuxt-module'],
  primevue: {
    options: {
    theme: {
      preset: Nora
    }
    }
  }
})
