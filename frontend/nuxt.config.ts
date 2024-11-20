import dotenv from 'dotenv'
dotenv.config()

export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: { public: { apiBase: process.env.API_BASE || 'https://app001-backend.fly.dev/api/v1' } },
  devServer: { port: 3001 },

  modules: [
    "@nuxt/test-utils/module",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "@nuxt/icon",
    "@nuxt/fonts",
  ],

  tailwindcss: {
    exposeConfig: true,
    editorSupport: true,
  },

  colorMode: {
    classSuffix: "",
  },

  imports: {
    imports: [
      {
        from: "tailwind-variants",
        name: "tv",
      },
      {
        from: "tailwind-variants",
        name: "VariantProps",
        type: true,
      },
    ],
  },
});