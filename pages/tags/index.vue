<template>
  <div class="tags-index">
    <div class="tags-index__container">
      <header class="tags-index__header">
        <span class="tags-index__eyebrow">— {{ $t('exploreByTag') }}</span>
        <h1 class="tags-index__title">{{ $t('tagsTitle') }}</h1>
        <p class="tags-index__intro">{{ $t('tagsIntro') }}</p>
        <p class="tags-index__lede" v-if="tagEntries.length">
          {{ tagEntries.length }} {{ $t('tagsCountLabel') }}
        </p>
      </header>

      <ul v-if="tagEntries.length" class="tag-cloud" role="list">
        <li v-for="entry in tagEntries" :key="entry.slug">
          <NuxtLink
            :to="localePath(`/tags/${entry.slug}`)"
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
        <NuxtLink :to="localePath('/')" class="tags-index__back">
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
import { useLocalePath } from '#i18n'
import { getArticleTags, slugifyTag, getTagColor } from '~/utils/tags.js'
import { useSeo } from '~/composables/useSeo.js'
import { collectionPageLd } from '~/utils/schema.js'
import { canonicalUrl } from '~/utils/site.js'

const { locale, t } = useI18n()
const localePath = useLocalePath()

const { data: articles } = await useAsyncData(`all-tags-${locale.value}`, () =>
  queryContent(locale.value).find()
)

// Dédupliqué par slug : « Claude Code » et « claude-code » mènent à la même
// URL, on n'affiche qu'une pastille (première graphie rencontrée).
const tagEntries = computed(() => {
  const bySlug = new Map()
  for (const article of articles.value || []) {
    for (const tag of getArticleTags(article)) {
      const slug = slugifyTag(tag)
      const entry = bySlug.get(slug) || { tag, count: 0, slug }
      entry.count += 1
      bySlug.set(slug, entry)
    }
  }
  return [...bySlug.values()]
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
})

const pageUrl = canonicalUrl(localePath('/tags'))
const pageDescription = locale.value === 'en'
  ? 'Every subject covered on the blog: tech, design, opinions, productivity and more.'
  : 'Tous les sujets abordés sur le blog : tech, design, opinions, productivité, et plus.'

useSeo(() => ({
  title: t('tagsTitle'),
  description: pageDescription,
  canonical: pageUrl,
  imageIsCard: true,
  jsonLd: tagEntries.value.length
    ? collectionPageLd({
        url: pageUrl,
        name: t('tagsTitle'),
        description: pageDescription,
        items: tagEntries.value.map((e) => ({ path: localePath(`/tags/${e.slug}`), name: `#${e.tag}` })),
        trail: [{ name: t('home'), path: localePath('/') }, { name: t('tagsTitle'), path: localePath('/tags') }],
      })
    : null,
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
