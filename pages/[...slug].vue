<template>
  <div class="article-wrapper">
    <div v-if="article.image" class="cover-image" :style="{ backgroundImage: `url(${article.image})` }">
      <h1 class="article-title">{{ article.title }}</h1>
    </div>
    <article class="article-container">
      <header class="article-header">
        <div class="article-meta">
          <span class="article-author">{{ article.author || 'Auteur inconnu' }}</span>
          <span class="article-date">{{ formatDate(article._path) }}</span>
          <span class="article-read-time">{{ estimateReadTime(article.body) }} min de lecture</span>
        </div>
      </header>
      <div class="article-content">
        <ContentDoc />
      </div>
      <footer class="article-footer">
        <NuxtLink to="/" class="back-to-articles">Retour à la liste des articles</NuxtLink>
      </footer>
    </article>
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { data: article } = await useAsyncData('article', () => queryContent(route.path).findOne())

useHead({
  title: article.value.title,
  meta: [
    { property: 'og:title', content: article.value.title },
    { property: 'og:description', content: article.value.description || 'Description par défaut' },
    { property: 'og:url', content: `https://votresite.com${route.path}` },
    { property: 'og:image', content: article.value.image },
  ],
})

function formatDate(path) {
  const match = path.match(/\/(\d{4})\/(\d{2})\//)
  if (match) {
    const [, year, month] = match
    const date = new Date(year, month - 1)
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
  }
  return 'Date inconnue'
}

function estimateReadTime(content) {
  const wordsPerMinute = 200
  const wordCount = typeof content === 'string' ? content.split(/\s+/).length : 0
  return Math.ceil(wordCount / wordsPerMinute)
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Source+Sans+Pro:wght@400;600&display=swap');

.article-wrapper {
  background: white;
  font-family: 'Source Sans Pro', sans-serif;
  color: #292929;
  line-height: 1.6;
}

.cover-image {
  height: 20vh;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  padding: 2rem;
}

.article-title {
  font-family: 'Merriweather', serif;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.3;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.article-container {
  max-width: 680px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.article-header {
  margin-bottom: 2rem;
}

.article-meta {
  font-size: 0.9rem;
  color: #757575;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.article-author {
  font-weight: 600;
}

.article-content {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 3rem;
}

.article-content :deep(h2) {
  font-family: 'Merriweather', serif;
  font-size: 1.8rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.article-content :deep(p) {
  margin-bottom: 1.5rem;
}

.article-content :deep(a) {
  color: #03a87c;
  text-decoration: none;
  border-bottom: 1px solid #03a87c;
}

.article-content :deep(a:hover) {
  color: #018f69;
  border-bottom-color: #018f69;
}

.article-footer {
  margin-top: 3rem;
  padding-top: 1rem;
  border-top: 1px solid #e6e6e6;
}

.back-to-articles {
  display: inline-block;
  color: #03a87c;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.back-to-articles:hover {
  color: #018f69;
}
</style>