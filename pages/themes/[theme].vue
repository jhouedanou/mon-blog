<template>
  <div v-if="theme" class="theme-archive">
    <div class="theme-archive__container">
      <header class="theme-archive__header">
        <NuxtLink to="/themes" class="theme-archive__crumb">Thématiques</NuxtLink>
        <span class="theme-archive__eyebrow">— {{ theme.label }}</span>
        <h1 class="theme-archive__title">{{ theme.title }}</h1>
        <p class="theme-archive__intro">{{ theme.intro }}</p>
        <p class="theme-archive__meta">
          {{ filteredArticles.length }} {{ filteredArticles.length > 1 ? 'articles' : 'article' }} dans cette sélection
        </p>
      </header>

      <section aria-labelledby="theme-articles-title">
        <div class="theme-archive__section-head">
          <h2 id="theme-articles-title">Les articles du thème</h2>
          <NuxtLink to="/tags" class="theme-archive__tags-link">Explorer les étiquettes →</NuxtLink>
        </div>

        <div v-if="filteredArticles.length" class="theme-archive__grid">
          <NuxtLink
            v-for="article in filteredArticles"
            :key="article._path"
            :to="article._path"
            class="theme-card"
          >
            <div
              class="theme-card__thumb"
              :style="article.image ? { backgroundImage: `url(${article.image})` } : {}"
              :class="{ 'theme-card__thumb--no-image': !article.image }"
              role="img"
              :aria-label="article.title"
            ></div>
            <div class="theme-card__body">
              <div class="theme-card__meta">
                <time :datetime="article.createdAt">{{ formatDate(article.createdAt) }}</time>
                <span v-for="tag in getArticleTags(article).slice(0, 2)" :key="tag">#{{ tag }}</span>
              </div>
              <h3>{{ article.title }}</h3>
              <p v-if="getArticleSearchIntent(article)">{{ getArticleSearchIntent(article) }}</p>
              <span class="theme-card__more">Lire l’article <span aria-hidden="true">→</span></span>
            </div>
          </NuxtLink>
        </div>

        <p v-else class="theme-archive__empty">Aucun article n’est encore rattaché à cette thématique.</p>
      </section>

      <footer class="theme-archive__footer">
        <NuxtLink to="/themes" class="theme-archive__back">← Toutes les thématiques</NuxtLink>
        <NuxtLink to="/" class="theme-archive__back">Retour aux articles →</NuxtLink>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getArticleTags } from '~/utils/tags.js'
import { getArticleSearchIntent, getThemeDefinition, articleMatchesTheme } from '~/data/editorial.js'

const route = useRoute()
const theme = getThemeDefinition(route.params.theme)

if (!theme) {
  throw createError({ statusCode: 404, statusMessage: 'Thématique introuvable' })
}

const { data: articles } = await useAsyncData(`theme-${theme.slug}`, () =>
  queryContent('fr').sort({ createdAt: -1 }).find(),
)

const filteredArticles = computed(() =>
  (articles.value || []).filter((article) => articleMatchesTheme(article, theme)),
)

function formatDate(value) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date).replace('.', '')
}

useHead(() => ({
  title: `${theme.title} — Le Blog de Jean-Luc Houédanou`,
  meta: [
    { name: 'description', content: theme.description },
    { name: 'robots', content: filteredArticles.value.length ? 'index, follow' : 'noindex, follow' },
  ],
}))
</script>

<style lang="scss" scoped>
.theme-archive { font-family: var(--font-body); }

.theme-archive__container {
  max-width: 1180px;
  margin: 0 auto;
  padding: 3.5rem 1.5rem 5rem;
}

.theme-archive__header {
  max-width: 820px;
  margin-bottom: 3rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid var(--border-color);
}

.theme-archive__crumb,
.theme-archive__tags-link,
.theme-archive__back {
  color: var(--accent);
  text-decoration: none;
}

.theme-archive__crumb {
  display: block;
  margin-bottom: 1.5rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.theme-archive__eyebrow {
  display: block;
  margin-bottom: 0.8rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
}

.theme-archive__title {
  max-width: 17ch;
  margin: 0 0 1.25rem;
  font-family: var(--font-display);
  font-size: clamp(2.7rem, 7vw, 5.4rem);
  font-weight: 400;
  line-height: 0.98;
  letter-spacing: -0.04em;
  color: var(--text-primary);
}

.theme-archive__intro {
  max-width: 64ch;
  margin: 0 0 1.25rem;
  font-size: 1.12rem;
  line-height: 1.7;
  color: var(--text-secondary);
}

.theme-archive__meta {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.theme-archive__section-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.theme-archive__section-head h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 500;
  color: var(--text-primary);
}

.theme-archive__tags-link,
.theme-archive__back {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.theme-archive__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
}

.theme-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  text-decoration: none;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 5px;
  transition: transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: var(--accent);
    box-shadow: var(--card-shadow-hover);

    h3 { color: var(--accent); }
    .theme-card__more { transform: translateX(3px); color: var(--accent); }
  }
}

.theme-card__thumb {
  height: 170px;
  background-position: center;
  background-size: cover;
  filter: saturate(0.9);

  &--no-image {
    background: linear-gradient(135deg, var(--bg-card), var(--bg-secondary), var(--accent-soft));
  }
}

.theme-card__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.65rem;
  padding: 1.15rem 1.2rem 1.25rem;
}

.theme-card__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.theme-card h3 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 550;
  line-height: 1.2;
  letter-spacing: -0.015em;
  color: var(--text-primary);
  transition: color 0.2s ease;
}

.theme-card p {
  display: -webkit-box;
  margin: 0;
  overflow: hidden;
  color: var(--text-secondary);
  line-height: 1.55;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.theme-card__more {
  margin-top: auto;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  transition: color 0.2s ease, transform 0.2s ease;
}

.theme-archive__empty {
  padding: 2rem 0;
  color: var(--text-muted);
}

.theme-archive__footer {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 3.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

@media (max-width: 900px) {
  .theme-archive__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 640px) {
  .theme-archive__container { padding: 3rem 1rem 4rem; }
  .theme-archive__section-head,
  .theme-archive__footer { align-items: flex-start; flex-direction: column; }
  .theme-archive__grid { grid-template-columns: 1fr; }
}
</style>
