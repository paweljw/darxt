const pkg = require('./package')

module.exports = {
  mode: 'spa',

  head: {
    title: 'Darts!',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' }
    ]
  },

  loading: { color: '#FFFFFF' },

  css: [
  ],

  plugins: [
    '~/plugins/vue-async-computed'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    // Doc: https://github.com/nuxt-community/localforage-module
    '@nuxtjs/localforage',
    // Doc: https://nuxt-community.github.io/nuxt-i18n/setup.html
    ['nuxt-i18n', {
      detectBrowserLanguage: {
        useCookie: true,
        cookieKey: 'i18n_redirected'
      },
      locales: [
        { code: 'en', iso: 'en-US', file: 'en.js', name: '🇬🇧' },
        { code: 'pl', iso: 'pl-PL', file: 'pl.js', name: '🇵🇱' }
      ],
      defaultLocale: 'en',
      langDir: 'locales/',
      lazy: true
    }]
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
