<template>
    <main>
        <ArticleList />
    </main>
</template>

<script setup>
// Configuration SEO pour la page d'accueil
useHead({
  title: 'Blog de Jean-Luc Houédanou - Développeur web et défenseur du bon sens',
  meta: [
    { 
      name: 'description', 
      content: 'Articles et réflexions sur le développement web, la technologie et la société par Jean-Luc Houédanou' 
    },
    { 
      name: 'keywords', 
      content: 'Jean-Luc Houédanou, développeur web, blog, technologie, programmation, Côte d\'Ivoire, Abidjan' 
    },
    { property: 'og:title', content: 'Blog de Jean-Luc Houédanou' },
    { property: 'og:description', content: 'Articles et réflexions sur le développement web, la technologie et la société' },
    { property: 'og:image', content: 'https://houedanou.com/images/default-og.webp' },
    { property: 'og:url', content: 'https://houedanou.com/' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Blog de Jean-Luc Houédanou' },
    { name: 'twitter:description', content: 'Articles et réflexions sur le développement web, la technologie et la société' },
    { name: 'twitter:image', content: 'https://houedanou.com/images/default-og.webp' }
  ],
  link: [
    { rel: 'canonical', href: 'https://houedanou.com/' }
  ]
})
</script>