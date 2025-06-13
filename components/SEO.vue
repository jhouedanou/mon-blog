<template>
  <div>
    <!-- Le contenu sera injecté ici -->
  </div>
</template>

<script setup>
// Props pour recevoir les données de la page
const props = defineProps({
  title: {
    type: String,
    default: 'Blog de Jean-Luc Houédanou'
  },
  description: {
    type: String,
    default: 'Blog personnel de Jean-Luc Houédanou - Développeur web et défenseur du bon sens'
  },
  image: {
    type: String,
    default: '/images/default-og.webp'
  },
  keywords: {
    type: String,
    default: 'Jean-Luc Houédanou, développeur web, blog, technologie'
  }
})

const route = useRoute()

// Configuration des métadonnées
useHead({
  title: computed(() => props.title),
  meta: [
    {
      name: 'description',
      content: computed(() => props.description)
    },
    {
      name: 'keywords',
      content: computed(() => props.keywords)
    },
    {
      property: 'og:title',
      content: computed(() => props.title)
    },
    {
      property: 'og:description',
      content: computed(() => props.description)
    },
    {
      property: 'og:image',
      content: computed(() => props.image.startsWith('http') ? props.image : `https://houedanou.com${props.image}`)
    },
    {
      property: 'og:url',
      content: computed(() => `https://houedanou.com${route.path}`)
    },
    {
      property: 'og:type',
      content: 'article'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: computed(() => props.title)
    },
    {
      name: 'twitter:description',
      content: computed(() => props.description)
    },
    {
      name: 'twitter:image',
      content: computed(() => props.image.startsWith('http') ? props.image : `https://houedanou.com${props.image}`)
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: computed(() => `https://houedanou.com${route.path}`)
    }
  ]
})
</script>
