<template>
  <div class="tags-index">
    <div class="tags-index__container">
      <header class="tags-index__header">
        <span class="tags-index__eyebrow">— {{ $t('exploreByTag') }}</span>
        <h1 class="tags-index__title">{{ $t('tagsTitle') }}</h1>
        <p class="tags-index__intro">
          Les étiquettes regroupent les articles par sujet. Utilisez-les pour passer d’un retour d’expérience à un autre, même lorsqu’ils ont été publiés à des dates différentes.
        </p>
        <p class="tags-index__lede" v-if="tagEntries.length">
          {{ tagEntries.length }} {{ $t('tagsCountLabel') }}
        </p>
      </header>

      <ul v-if="tagEntries.length" class="tag-cloud" role="list">
        <li v-for="entry in tagEntries" :key="entry.slug">
          <NuxtLink
            :to="`/tags/${entry.slug}`"
            class="tag-cloud__pill"
            :style="{ '--tag-color': getTagColor(entry.tag) }"
            :aria-label="`${entry.tag} — ${entry.count} ${entry.count > 1 ? $t('articles') : $t('article')}`"
          >
            <span class="tag-cloud__name">{{ entry.tag }}</span>
            <span class="tag-cloud__count" aria-hidden="true">{{ entry.count }}</span>
          </NuxtLink>
        </li>
      </ul>
      <p v-else class="tags-index__empty">{{ $t('noTags') }}</p>

      <footer class="tags-index__footer">
        <NuxtLink to="/" class="tags-index__back">
          <span class="tags-index__back-arrow">←</span>
          <span>{{ $t('backToArticles') }}</span>
        </NuxtLink>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAsyncData } from '#app'
import { useI18n } from 'vue-i18n'
import { getArticleTags, slugifyTag, getTagColor } from '~/utils/tags.js'

const { locale } = useI18n()

const { data: articles } = await useAsyncData('all-tags', () =>
  queryContent(locale.value).find()
)

const tagEntries = computed(() => {
  const counts = {}
  for (const article of articles.value || []) {
    for (const tag of getArticleTags(article)) {
      counts[tag] = (counts[tag] || 0) + 1
    }
  }
  return Object.entries(counts)
    .map(([tag, count]) => ({ tag, count, slug: slugifyTag(tag) }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
})

useHead(() => ({
  title: 'Tags — Le Blog de Jean-Luc Houédanou',
  meta: [
    { name: 'description', content: 'Tous les sujets abordés sur le blog : tech, design, opinions, productivité, et plus.' },
    { name: 'robots', content: 'index, follow' },
  ],
}))
</script>

<style lang="scss" scoped>
.tags-index {
  background: transparent;
  font-family: var(--font-body);
}

.tags-index__container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 4rem 1.5rem 5rem;
}

.tags-index__header {
  padding-bottom: 2.5rem;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 3rem;
}

.tags-index__eyebrow {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--accent);
  margin-bottom: 1rem;
}

.tags-index__title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 7vw, 5rem);
  font-weight: 400;
  letter-spacing: -0.03em;
  line-height: 1;
  color: var(--text-primary);
  margin: 0 0 1rem;
}

.tags-index__lede {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  text-transform: uppercase;
  margin: 0;
}

.tags-index__intro {
  max-width: 62ch;
  margin: 0 0 1.25rem;
  font-size: 1.08rem;
  line-height: 1.65;
  color: var(--text-secondary);
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.tag-cloud__pill {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-left: 3px solid var(--tag-color, var(--accent));
  border-radius: 2px;
  padding: 0.6rem 0.95rem;
  text-decoration: none;
  color: var(--text-primary);
  font-family: var(--font-sans);
  font-size: 0.9rem;
  font-weight: 500;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, color 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: var(--tag-color, var(--accent));
    color: var(--tag-color, var(--accent));
    background: var(--accent-soft);
  }
}

.tag-cloud__name {
  text-transform: lowercase;
}

.tag-cloud__count {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  color: var(--text-muted);
  background: var(--bg-elevated);
  padding: 0.15rem 0.45rem;
  border-radius: 2px;
}

.tags-index__empty {
  color: var(--text-muted);
  text-align: center;
  padding: 2rem 0;
}

.tags-index__footer {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
}

.tags-index__back {
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

    .tags-index__back-arrow {
      transform: translateX(-4px);
    }
  }
}

.tags-index__back-arrow {
  display: inline-block;
  transition: transform 0.25s ease;
}
</style>
