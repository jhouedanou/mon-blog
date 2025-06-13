<template>
  <div>
    <!-- Le contenu sera injecté ici -->
  </div>
</template>

<script setup>
// Ce composable gère les métadonnées SEO pour chaque page
const { data: page } = await useAsyncData('page', () => queryContent().findOne())

// Configuration des métadonnées
useHead({
  title: computed(() => page.value?.title || 'Blog de Jean-Luc Houédanou'),
  meta: [
    {
      name: 'description',
      content: computed(() => page.value?.description || 'Blog personnel de Jean-Luc Houédanou - Développeur web et défenseur du bon sens')
    },
    {
      name: 'keywords',
      content: computed(() => page.value?.keywords || 'Jean-Luc Houédanou, développeur web, blog, technologie')
    },
    {
      property: 'og:title',
      content: computed(() => page.value?.title || 'Blog de Jean-Luc Houédanou')
    },
    {
      property: 'og:description',
      content: computed(() => page.value?.description || 'Blog personnel de Jean-Luc Houédanou')
    },
    {
      property: 'og:image',
      content: computed(() => page.value?.image ? `https://houedanou.com${page.value.image}` : 'https://houedanou.com/images/default-og.jpg')
    },
    {
      property: 'og:url',
      content: computed(() => `https://houedanou.com${useRoute().path}`)
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
      content: computed(() => page.value?.title || 'Blog de Jean-Luc Houédanou')
    },
    {
      name: 'twitter:description',
      content: computed(() => page.value?.description || 'Blog personnel de Jean-Luc Houédanou')
    },
    {
      name: 'twitter:image',
      content: computed(() => page.value?.image ? `https://houedanou.com${page.value.image}` : 'https://houedanou.com/images/default-og.jpg')
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: computed(() => `https://houedanou.com${useRoute().path}`)
    }
  ]
})
</script>
