export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'shuuu',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com'},
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: ''},
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&display=swap'},
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/ress.scss',
    '@/assets/scss/common.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/storageAvailable.js',
    '@/plugins/vee-validate',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: [
      '~/components',
      '~/components/validation',
    ]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
  },

  proxy: {
    '/api/': { target: 'https://inquiry.microcms.io' },
  },

  styleResources: {
    scss: [
      '@/assets/scss/mixin.scss',
      '@/assets/scss/font.scss',
      '@/assets/scss/color.scss',
      '@/assets/scss/object.scss',
    ]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    terser: {
      terserOptions: {
        compress: {
          drop_console: process.env.NODE_ENV === "production"
        }
      }
    },
    transpile: ["vee-validate/dist/rules"],
  },

  generate: {
    interval: 300,
  },
}
