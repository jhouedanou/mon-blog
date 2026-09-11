// https://nuxt.com/docs/api/configuration/nuxt-config
import { SITE_URL, SITE_NAME } from './utils/site.js'
import { buildRedirectRouteRules } from './redirects.js'

export default defineNuxtConfig({
  target: 'static',

  devtools: { enabled: false },
  modules: [
    '@nuxt/content', 
    '@nuxt/image',
    '@nuxtjs/sitemap',
    '@nuxtjs/i18n',
], 
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
    // Les articles viennent déjà de /api/_sitemap-urls avec leur lastmod ;
    // la source document-driven les ajouterait une seconde fois sans date.
    excludeAppSources: ['@nuxt/content:document-driven'],
    exclude: ['/api/**', '/_content/**', '/manifest.json'],
    xsl: false,
    credits: false,
  },
  site: {
    url: SITE_URL,
    name: SITE_NAME,
  },  
  image: {
    quality: 80,
    format: ['webp', 'jpg']
  },
  ssr: true,
  nitro: {
    preset: 'cloudflare-pages',
    prerender: {
      crawlLinks: true,
      failOnError: false,
      routes: [
        '/',
        '/tags',
        '/themes',
        '/themes/tutoriels',
        '/themes/apple',
        '/themes/developpement',
        '/themes/afrique-numerique',
        '/themes/opinions',
        '/a-propos',
        '/cv',
        '/confidentialite',
        '/sitemap.xml',
        '/feed.xml',
        '/robots.txt',
      ],
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
        },
        {
          children: `var infolinks_pid = 3444616; var infolinks_wsid = 0;`
        },
        {
          src: '//resources.infolinks.com/js/infolinks_main.js',
          async: true
        }
        // Le balisage Person/WebSite vit désormais dans app.vue (@graph unique).
      ],
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300..700;1,6..72,300..700&family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=JetBrains+Mono:wght@400;600&display=swap'
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
        { rel: 'manifest', href: '/manifest.json' },
        // Le <link rel="alternate" rss> est émis une seule fois, dans app.vue.
      ],
      meta: [
        { name: 'msapplication-TileColor', content: '#ffffff' },
        { name: 'msapplication-TileImage', content: '/ms-icon-144x144.png' },
        { name: 'theme-color', content: '#f6f5f0' }
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
    // Anti-clickjacking : seul houedanou.com peut embarquer houedanou.com.
    // Nitro (preset cloudflare-pages) transforme cette règle en `dist/_headers`,
    // et l'applique aussi aux réponses rendues par le worker.
    '/**': {
      headers: {
        'Content-Security-Policy': "frame-ancestors 'self';",
      },
    },
    '/': { prerender: true },
    '/fr/**': { prerender: true },
    '/tags/**': { prerender: true },
    '/themes/**': { prerender: true },
    '/a-propos': { prerender: true },
    '/cv': { prerender: true },
    '/confidentialite': { prerender: true },
    '/api/_content/**': { robots: false },
    // Asset statique de public/ : le crawler de prerender le prenait pour une route.
    '/manifest.json': { prerender: false },
    // En dernier : garantit qu'aucune règle de prerender n'écrase une redirection.
    ...buildRedirectRouteRules(301),
  },
  compatibilityDate: '2024-10-10'
})
