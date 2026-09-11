<template>
    <main>
        <ArticleList />
    </main>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useLocalePath } from '#i18n'
import { useSeo } from '~/composables/useSeo.js'
import { webPageLd } from '~/utils/schema.js'
import { canonicalUrl } from '~/utils/site.js'

const { locale } = useI18n()
const localePath = useLocalePath()
const isEnglish = locale.value === 'en'

const homeUrl = canonicalUrl(localePath('/'))
const homeDescription = isEnglish
  ? 'Jean-Luc Houédanou\'s personal blog. Articles on technology, digital culture, creative tools and thoughts on everyday life.'
  : 'Blog personnel de Jean-Luc Houédanou. Articles sur la technologie, la culture numérique, les outils créatifs et des réflexions sur le quotidien.'

useSeo({
  // Titre complet : la home ne prend pas le suffixe du titleTemplate global.
  title: isEnglish
    ? 'Jean-Luc Houédanou\'s Blog — Tech, digital culture and thoughts from Abidjan'
    : 'Le Blog de Jean-Luc Houédanou — Tech, culture numérique et réflexions depuis Abidjan',
  titleTemplate: null,
  description: homeDescription,
  canonical: homeUrl,
  imageIsCard: true,
  jsonLd: webPageLd({ url: homeUrl, name: 'Le Blog de Jean-Luc Houédanou', description: homeDescription, breadcrumb: false }),
})
</script>
