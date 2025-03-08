// https://nuxt.com/docs/api/configuration/nuxt-config
import Nora from "@primeuix/themes/aura";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  runtimeConfig: {
    apiProxyUrl: "http://localhost:8000"
  },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: [
    "@primevue/nuxt-module",
    "@nuxt/image",
    "@nuxt/icon",
    "@pinia/nuxt",
  ],
  primevue: {
    options: {
      theme: {
        preset: Nora,
      },
    },
  },
});
