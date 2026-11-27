<template>
  <NuxtLayout>
    <NuxtLoadingIndicator color="var(--accent)" :height="2" />

    <a href="#main-content" class="skip-link">{{ $t('skipToContent') }}</a>

    <!-- Les modes immersifs (/vr, /blogvision) ont leur propre barre. -->
    <SiteHeader v-if="!immersive" />

    <main id="main-content">
      <NuxtPage />
    </main>

    <ClientOnly v-if="!immersive">
      <ScrollToTop />
    </ClientOnly>
  </NuxtLayout>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import ScrollToTop from '~/components/ScrollToTop.vue'
import SiteHeader from '~/components/SiteHeader.vue'
import { SITE_URL, SITE_NAME, AUTHOR_NAME, AUTHOR_JOB_TITLE, PERSON_ID, PERSON_URL, WEBSITE_ID, BLOG_ID, SAME_AS } from '~/utils/site.js'
import { THEME_OVERRIDE_KEY } from '~/utils/theme.js'

const { locale } = useI18n()
const route = useRoute()
const immersive = computed(() => Boolean(route.meta.immersive))

import { safeJsonLd } from '~/composables/useSeo.js'
import { LANGUAGE_REDIRECT_SCRIPT } from '~/utils/i18n.js'

const HOME_TITLE = 'Le Blog de Jean-Luc Houédanou — Tech, culture numérique et réflexions depuis Abidjan'

// Graphe d'entité servi sur toutes les pages : c'est lui qui permet aux
// références `{ '@id': '…#person' }` des articles et de /a-propos de se
// résoudre sur la page où elles apparaissent.
const siteGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: 'Jean-Luc Houédanou',
      // `afrowebdesigner` : le pseudonyme de X/Twitter, rattaché au nom réel.
      alternateName: ['Jean Luc Houédanou', 'Jean Luc Houedanou', 'afrowebdesigner', 'Don Dada', 'JLH'],
      url: PERSON_URL,
      image: {
        '@type': 'ImageObject',
        '@id': `${SITE_URL}/#personimage`,
        url: `${SITE_URL}/images/1837389.jpeg`,
        contentUrl: `${SITE_URL}/images/1837389.jpeg`,
      },
      // Même intitulé que le sous-titre de /a-propos et que le nœud Person de /cv
      // (même @id) : voir AUTHOR_JOB_TITLE dans utils/site.js.
      jobTitle: AUTHOR_JOB_TITLE.fr,
      description:
        "Développeur web full-stack et administrateur systèmes basé à Abidjan, Côte d'Ivoire. Blogueur tech sur houedanou.com.",
      worksFor: {
        '@type': 'Organization',
        name: 'Big Five Solutions',
        url: 'https://bigfive.solutions/',
      },
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Université de Sherbrooke',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Abidjan',
        addressCountry: 'CI',
      },
      knowsAbout: [
        'Développement web',
        'Vue.js',
        'Nuxt',
        'Administration système Linux',
        'Culture numérique en Afrique',
      ],
      sameAs: SAME_AS,
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: SITE_URL,
      // `name` est le nom de site que Google affiche au-dessus du résultat.
      name: SITE_NAME,
      alternateName: [AUTHOR_NAME, 'houedanou.com'],
      // Site bilingue : les billets existent en /fr et en /en.
      inLanguage: ['fr', 'en'],
      author: { '@id': PERSON_ID },
      publisher: { '@id': PERSON_ID },
      copyrightHolder: { '@id': PERSON_ID },
      // La recherche de l'accueil écrit `?q=` dans l'URL (cf. ArticleList) :
      // cette action pointe donc vers une URL qui fonctionne réellement.
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      // Chaînon manquant : un BlogPosting appartient au Blog, le Blog au WebSite.
      // C'est cette chaîne qui rend le graphe d'entité lisible pour Google.
      '@type': 'Blog',
      '@id': BLOG_ID,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      description:
        "Retours d'expérience, outils web, administration système et culture numérique depuis Abidjan.",
      // Site bilingue : les billets existent en /fr et en /en.
      inLanguage: ['fr', 'en'],
      isPartOf: { '@id': WEBSITE_ID },
      author: { '@id': PERSON_ID },
      publisher: { '@id': PERSON_ID },
    },
  ],
}

useHead(() => ({
  // Le nom de l'auteur est la marque : il suit chaque titre pour que le site
  // ressorte sur la recherche « Jean-Luc Houédanou ». Pas le nom complet du
  // blog (31 caractères) : les titres d'articles font déjà 55-70 caractères.
  // Pas de doublon quand le titre contient déjà le nom (À propos, CV).
  titleTemplate: (title) => {
    if (!title) return HOME_TITLE
    return title.includes(AUTHOR_NAME) ? title : `${title} — ${AUTHOR_NAME}`
  },
  script: [
    {
      id: 'ld-site',
      type: 'application/ld+json',
      innerHTML: safeJsonLd(siteGraph),
    },
    {
      // Exécuté avant le premier rendu : envoie le visiteur vers sa langue
      // (voir utils/i18n.js).
      id: 'lang-init',
      tagPosition: 'head',
      innerHTML: LANGUAGE_REDIRECT_SCRIPT,
    },
    {
      // Exécuté avant le premier rendu : pose le thème (sombre, ou clair si le
      // lecteur l'a choisi pendant la visite) sur <html> pour éviter un flash
      // de la mauvaise couleur.
      id: 'theme-init',
      tagPosition: 'head',
      innerHTML: `(function(){try{var l=false;try{l=sessionStorage.getItem('${THEME_OVERRIDE_KEY}')==='light'}catch(e){}document.documentElement.setAttribute('data-theme',l?'light':'dark')}catch(e){}})();`,
    },
  ],
  // Pas de `data-theme` ici : unhead ré-appliquerait la valeur à chaque mise à
  // jour réactive et écraserait le thème posé par le script ci-dessus. Sans
  // JavaScript, `html:not([data-theme])` reçoit les couleurs du thème sombre.
  htmlAttrs: {
    // Requis pour que `hyphens: auto` charge le bon dictionnaire de césure.
    lang: locale.value,
  },
  meta: [
    // Couleur de la barre du navigateur, alignée sur --bg-primary du thème sombre (le défaut).
    { key: 'theme-color', name: 'theme-color', content: '#111522' },
  ],
  link: [
    {
      rel: 'alternate',
      type: 'application/rss+xml',
      title: `${SITE_NAME} — Flux RSS`,
      href: `${SITE_URL}/feed.xml`,
    },
  ],
}));
</script>

<style lang="scss">
html {
  background: var(--bg-primary);
  transition: background-color 0.4s ease, color 0.4s ease;
}

main {
  background: transparent;
  min-height: calc(100vh - var(--header-h));
}

/* ==========================================
   Skip link
   ========================================== */
.skip-link {
  position: absolute;
  top: -100%;
  left: 1rem;
  z-index: 9999;
  background: var(--accent-fill);
  color: var(--accent-contrast);
  padding: 0.75rem 1.5rem;
  border-radius: 0 0 var(--radius) var(--radius);
  font-family: var(--font-sans);
  font-weight: 600;
  text-decoration: none;
  transition: top 0.2s ease;

  &:focus {
    top: 0;
  }
}

</style>
