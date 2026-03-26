<template>
    <main>
        <ArticleList />
    </main>
</template>

<script setup>
useHead({
    title: 'Le Blog de Jean-Luc Houédanou - Tech, Culture & Réflexions',
    meta: [
        { name: 'description', content: 'Blog personnel de Jean-Luc Houédanou. Articles sur la technologie, la culture numérique, les outils créatifs et des réflexions sur le quotidien.' },
        { name: 'keywords', content: 'blog, technologie, culture numérique, outils créatifs, Jean-Luc Houédanou, Côte d\'Ivoire, Afrique, tech' },
        { property: 'og:title', content: 'Le Blog de Jean-Luc Houédanou' },
        { property: 'og:description', content: 'Articles sur la technologie, la culture numérique, les outils créatifs et des réflexions sur le quotidien.' },
        { property: 'og:url', content: 'https://houedanou.com' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Jean-Luc Houédanou' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'Le Blog de Jean-Luc Houédanou' },
        { name: 'twitter:description', content: 'Articles sur la technologie, la culture numérique, les outils créatifs et des réflexions sur le quotidien.' },
    ],
})
</script>
