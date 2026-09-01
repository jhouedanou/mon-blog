<template>
    <main>
        <ArticleList />
    </main>
</template>

<script setup>
import { useSeo } from '~/composables/useSeo.js'
import { webPageLd } from '~/utils/schema.js'
import { canonicalUrl } from '~/utils/site.js'

const homeUrl = canonicalUrl('/')
const homeDescription =
  'Blog personnel de Jean-Luc Houédanou. Articles sur la technologie, la culture numérique, les outils créatifs et des réflexions sur le quotidien.'

useSeo({
  // Titre complet : la home ne prend pas le suffixe du titleTemplate global.
  title: 'Le Blog de Jean-Luc Houédanou — Tech, culture numérique et réflexions depuis Abidjan',
  titleTemplate: null,
  description: homeDescription,
  canonical: homeUrl,
  imageIsCard: true,
  jsonLd: webPageLd({ url: homeUrl, name: 'Le Blog de Jean-Luc Houédanou', description: homeDescription, breadcrumb: false }),
})
</script>
