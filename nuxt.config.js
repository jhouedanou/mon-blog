// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  target: 'static',

  devtools: { enabled: false },
  modules: [
    '@nuxt/content', 
    '@nuxt/image',
    '@nuxtjs/sitemap',
    '@nuxtjs/i18n',
    'nuxt-feedme'
], 
feedme: {
  defaults: {
    routes: false,
  },
  feeds: {
    common: {
      revisit: '6h',
      fixDateFields: true,
      feed: {
        title: 'Le Blog de Jean-Luc Houédanou',
        link: 'https://houedanou.com',
        description: 'Chroniques sur l\'innovation numérique, la transformation digitale en Afrique et pérégrinations technologiques.',
        language: 'fr',
      },
      collections: ['content'],
      mapping: [
        ['link', 'path'],
        ['date', 'createdAt'],
      ],
      replace: [[/^(?=\/)/.toString(), 'https://houedanou.com']],
    },
    routes: {
      '/feed.xml': { type: 'rss2' },
    },
  },
},
i18n: {
  locales: [
    { code: 'fr', name: 'Français', language: 'fr-FR', file: 'fr-FR.js' },
  ],
  defaultLocale: 'fr',
  lazy: true,
  langDir: 'lang/',
  strategy: 'no_prefix',
  detectBrowserLanguage: false,
}, 
  sitemap: {
    sources: ['/api/_sitemap-urls'],
    exclude: ['/api/**', '/_content/**'],
  },
  site: {
    url: 'https://houedanou.com',
  },  
  image: {
    quality: 80,
    format: ['webp', 'jpg']
  },
  ssr: true,
  nitro: {
    preset: 'vercel',
    prerender: {
      crawlLinks: true,
      failOnError: false,
      routes: ['/sitemap.xml', '/feed.xml', '/'],
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
          src: `https://www.googletagmanager.com/gtag/js?id=G-5DSHDPMFNP`,
          async: true
        },
        {
          children: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5DSHDPMFNP');
          `
        }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&family=Montserrat:wght@400;600;700&family=Inter:wght@400;600;700&display=swap'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
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
            if (id.includes('node_modules') && !id.includes('nitropack') && !id.includes('sitemap')) {
              return 'vendor';
            }
          }
        }
      }
    }
  },
  routeRules: {
    '/': { prerender: true },
    '/fr/**': { prerender: true },
    '/api/_content/**': { robots: false },
  },
  compatibilityDate: '2024-10-10'
})

