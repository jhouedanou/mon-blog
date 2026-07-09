<template>
  <div class="tag-archive">
    <div class="tag-archive__container">
      <header class="tag-archive__header">
        <NuxtLink to="/tags" class="tag-archive__crumb">{{ $t('tagsTitle') }}</NuxtLink>
        <h1 class="tag-archive__title">
          <span class="tag-archive__hash" aria-hidden="true">#</span>{{ displayTag }}
        </h1>
        <p class="tag-archive__meta" v-if="filtered.length">
          {{ filtered.length }} {{ filtered.length > 1 ? $t('articles') : $t('article') }}
        </p>
      </header>

      <div v-if="filtered.length" class="tag-archive__grid">
        <NuxtLink
          v-for="article in filtered"
          :key="article._path"
          :to="article._path"
          class="tag-card"
        >
          <div
            class="tag-card__thumb"
            :style="article.image ? { backgroundImage: `url(${article.image})` } : {}"
            :class="{ 'tag-card__thumb--no-image': !article.image }"
          ></div>
          <div class="tag-card__body">
            <span class="tag-card__date">{{ formatDate(article.createdAt) }}</span>
            <h2 class="tag-card__title">{{ article.title }}</h2>
            <p class="tag-card__excerpt" v-if="article.description">{{ truncate(article.description, 140) }}</p>
            <span class="tag-card__more">{{ $t('readMore') }} →</span>
          </div>
        </NuxtLink>
      </div>

      <p v-else class="tag-archive__empty">{{ $t('noArticlesForTag') }}</p>

      <footer class="tag-archive__footer">
        <NuxtLink to="/tags" class="tag-archive__back">
          <span class="tag-archive__back-arrow">←</span>
          <span>{{ $t('backToTags') }}</span>
        </NuxtLink>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAsyncData } from '#app'
import { getArticleTags, slugifyTag } from '~/utils/tags.js'

const route = useRoute()
const { locale } = useI18n()

const tagSlug = computed(() => String(route.params.tag || '').toLowerCase())

const { data: articles } = await useAsyncData(
  `tag-archive-${locale.value}`,
  () => queryContent(locale.value).sort({ createdAt: -1 }).find(),
)

const filtered = computed(() => {
  return (articles.value || []).filter((article) => {
    return getArticleTags(article).some((t) => slugifyTag(t) === tagSlug.value)
  })
})

const displayTag = computed(() => {
  const first = filtered.value[0]
  if (first) {
    const match = getArticleTags(first).find((t) => slugifyTag(t) === tagSlug.value)
    if (match) return match
  }
  return tagSlug.value.replace(/-/g, ' ')
})

function formatDate(d) {
  if (!d) return ''
  const date = new Date(d)
  if (isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
    .format(date)
    .replace('.', '')
}

function truncate(text, n) {
  const clean = String(text).replace(/<[^>]*>/g, '')
  return clean.length > n ? clean.slice(0, n) + '…' : clean
}

useHead(() => ({
  title: `#${displayTag.value} — Le Blog`,
  meta: [
    { name: 'description', content: `Articles tagués #${displayTag.value} sur le blog de Jean-Luc Houédanou.` },
    { name: 'robots', content: filtered.value.length ? 'index, follow' : 'noindex, follow' },
  ],
}))
</script>

<style lang="scss" scoped>
.tag-archive {
  background: transparent;
  font-family: var(--font-body);
}

.tag-archive__container {
  max-width: 1180px;
  margin: 0 auto;
  padding: 3.5rem 1.5rem 5rem;
}

.tag-archive__header {
  padding-bottom: 2.5rem;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 3rem;
}

.tag-archive__crumb {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--accent);
  text-decoration: none;
  margin-bottom: 1rem;

  &:hover { color: var(--accent-hover); }

  &::before { content: '↩ '; }
}

.tag-archive__title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 7vw, 5rem);
  font-weight: 400;
  letter-spacing: -0.03em;
  line-height: 1;
  color: var(--text-primary);
  margin: 0 0 0.85rem;

  text-transform: lowercase;
}

.tag-archive__hash {
  font-style: normal;
  color: var(--accent);
  margin-right: 0.05em;
}

.tag-archive__meta {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin: 0;
}

.tag-archive__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;

  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 600px) { grid-template-columns: 1fr; }
}

.tag-card {
  display: flex;
  flex-direction: column;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
              border-color 0.3s ease,
              box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: var(--accent);
    box-shadow: var(--card-shadow-hover);

    .tag-card__title {
      color: var(--accent);
    }

    .tag-card__more {
      color: var(--accent);
      transform: translateX(3px);
    }
  }
}

.tag-card__thumb {
  width: 100%;
  height: 160px;
  background-size: cover;
  background-position: center;
  filter: saturate(0.9);

  &--no-image {
    background: linear-gradient(135deg, var(--bg-card), var(--bg-secondary), color-mix(in srgb, var(--accent) 28%, var(--bg-secondary)));
  }
}

.tag-card__body {
  padding: 1.1rem 1.2rem 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.tag-card__date {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--text-muted);
}

.tag-card__title {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: -0.015em;
  line-height: 1.2;
  color: var(--text-primary);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.25s ease;
}

.tag-card__excerpt {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tag-card__more {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--text-muted);
  margin-top: auto;
  transition: color 0.25s ease, transform 0.25s ease;
}

.tag-archive__empty {
  text-align: center;
  color: var(--text-muted);
  padding: 3rem 0;
}

.tag-archive__footer {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
}

.tag-archive__back {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--text-primary);
  text-decoration: none;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  padding: 0.85rem 1.25rem;
  border: 1px solid var(--border-color);
  border-radius: 2px;
  transition: all 0.25s ease;

  &:hover {
    color: var(--accent);
    border-color: var(--accent);
    background: var(--accent-soft);
    box-shadow: var(--card-shadow-hover);

    .tag-archive__back-arrow {
      transform: translateX(-4px);
    }
  }
}

.tag-archive__back-arrow {
  display: inline-block;
  transition: transform 0.25s ease;
}
</style>
