// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  target: 'static',

  devtools: { enabled: false },
  modules: [
    '@nuxt/content', 
    '@nuxt/image',
    '@nuxtjs/sitemap',
    '@nuxtjs/i18n'
    //'@nuxtjs/google-analytics'
],  
i18n: {
  locales: [
    { code: 'fr', name: 'Français', iso: 'fr-FR', file: 'fr-FR.js' },
    { code: 'en', name: 'English', iso: 'en-US', file: 'en-US.js' },
  ],
  defaultLocale: 'fr',
  lazy: true,
  langDir: 'lang/',
  strategy: 'prefix_except_default',
  detectBrowserLanguage: false,
}, 
 sitemap: {
    hostname: 'https://houedanou.com',
    gzip: true,
    routes: async () => {
      const articles = await queryContent()
        .sort({ createdAt: -1 }) // Tri par date de création décroissante
        .find()

      return articles.map(article => article._path)
    }
  },  
  image: {
    quality: 80,
    format: ['webp', 'jpg']
  },
  ssr: true,
  nitro: {
    preset: 'vercel',
//    baseURL: "http://houedanou.com",
    prerender: {
      // crawlLinks: true,
      failOnError: false
    },
  },  
  content: {
    // Ajoutez cette ligne pour voir les logs de Nuxt Content
    documentDriven: true,
    navigation: {
      fields: ['title', 'description', '_path']
    }
  },
  css: [
    'bulma/css/bulma.min.css',
    '@/assets/custom.scss',
  ],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      script: [
        {
          src: 'https://platform-api.sharethis.com/js/sharethis.js#property=671678124be62400139baad2&product=inline-share-buttons',
          async: true
        },
        {
          src:'https://platform-api.sharethis.com/js/sharethis.js#property=671678124be62400139baad2&product=sop'
        }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&family=Montserrat:wght@400;600;700&family=Inter:wght@400;600;700&family=Ubuntu:wght@400;500;700&family=Source+Sans+Pro:wght@400;600;700&display=swap'
        },
        { rel: 'apple-touch-icon', sizes: '57x57', href: '/apple-icon-57x57.png' },
        { rel: 'apple-touch-icon', sizes: '60x60', href: '/apple-icon-60x60.png' },
        { rel: 'apple-touch-icon', sizes: '72x72', href: '/apple-icon-72x72.png' },
        { rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-icon-76x76.png' },
        { rel: 'apple-touch-icon', sizes: '114x114', href: '/apple-icon-114x114.png' },
        { rel: 'apple-touch-icon', sizes: '120x120', href: '/apple-icon-120x120.png' },
        { rel: 'apple-touch-icon', sizes: '144x144', href: '/apple-icon-144x144.png' },
        { rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-icon-152x152.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-icon-180x180.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-icon-192x192.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/manifest.json' }
      ],
      meta: [
        { name: 'msapplication-TileColor', content: '#ffffff' },
        { name: 'msapplication-TileImage', content: '/ms-icon-144x144.png' },
        { name: 'theme-color', content: '#ffffff' }
      ]
    }
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          }
        }
      }
    }
  },
  routeRules: {
    '/': { prerender: true }
  },
  compatibilityDate: '2024-10-10'
})

