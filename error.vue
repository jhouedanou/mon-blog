<template>
  <NuxtLayout>
    <div class="error-page">
      <div class="error-page__content">
        <div class="error-page__illustration">
          <span class="error-page__code">{{ error?.statusCode || 404 }}</span>
          <span class="error-page__emoji">&#128566;</span>
        </div>

        <h1 class="error-page__title">{{ $t('errorTitle') }}</h1>
        <p class="error-page__message">{{ $t('errorMessage') }}</p>

        <NuxtLink to="/" class="error-page__btn">
          <i class="material-icons">home</i>
          {{ $t('backToHome') }}
        </NuxtLink>

        <section v-if="recentArticles && recentArticles.length" class="error-page__recent">
          <h3 class="error-page__recent-heading">{{ $t('recentArticles') }}</h3>
          <div class="error-page__recent-grid">
            <NuxtLink
              v-for="article in recentArticles"
              :key="article._path"
              :to="article._path"
              class="error-page__article-card"
            >
              <div
                class="error-page__article-thumb"
                :style="article.image ? { backgroundImage: `url(${article.image})` } : {}"
                :class="{ 'error-page__article-thumb--no-image': !article.image }"
              ></div>
              <div class="error-page__article-info">
                <span class="error-page__article-title">{{ article.title }}</span>
              </div>
            </NuxtLink>
          </div>
        </section>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { useError } from '#app'

const error = useError()

const { data: recentArticles } = await useAsyncData('recent-articles-error', () =>
  queryContent('fr')
    .sort({ createdAt: -1 })
    .limit(3)
    .find()
)

useHead({
  title: 'Page introuvable'
})
</script>

<style lang="scss" scoped>
.error-page {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  background: transparent;
}

.error-page__content {
  max-width: 640px;
  text-align: center;
}

.error-page__illustration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.error-page__code {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 400;
  font-size: clamp(5rem, 14vw, 9rem);
  color: var(--accent);
  line-height: 0.9;
  letter-spacing: -0.04em;
  text-shadow: var(--neon-glow-teal);
}

.error-page__emoji {
  font-size: 4rem;
  line-height: 1;
}

.error-page__title {
  font-family: var(--font-display);
  font-style: italic;
  font-size: clamp(1.65rem, 4vw, 2.4rem);
  font-weight: 400;
  letter-spacing: -0.025em;
  color: var(--text-primary);
  margin: 0 0 0.75rem 0;
}

.error-page__message {
  font-family: var(--font-body);
  font-size: 1.05rem;
  color: var(--text-secondary);
  margin: 0 0 2.25rem 0;
  line-height: 1.6;
}

.error-page__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: transparent;
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  padding: 0.95rem 1.75rem;
  border: 1px solid var(--accent);
  border-radius: 2px;
  text-decoration: none;
  transition: all 0.25s ease;

  .material-icons {
    font-size: 1.1rem;
  }

  &:hover {
    background: var(--accent);
    color: #0a0a0f;
    box-shadow: var(--neon-glow-teal);
    transform: translateY(-2px);
  }
}

.error-page__recent {
  margin-top: 4rem;
  text-align: left;
  padding-top: 2.5rem;
  border-top: 1px solid var(--border-color);
}

.error-page__recent-heading {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  margin: 0 0 1.25rem 0;
  text-align: center;
}

.error-page__recent-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.85rem;
}

.error-page__article-card {
  text-decoration: none;
  border-radius: 4px;
  overflow: hidden;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: var(--accent);
    box-shadow: var(--neon-glow-teal);
  }
}

.error-page__article-thumb {
  width: 100%;
  height: 100px;
  background-size: cover;
  background-position: center;
  filter: saturate(0.9);

  &--no-image {
    background: linear-gradient(135deg, #0a0a0f 0%, #1a1a3a 50%, #00ffd1 200%);
  }
}

.error-page__article-info {
  padding: 0.75rem;
}

.error-page__article-title {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: -0.01em;
  color: var(--text-primary);
  line-height: 1.25;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media screen and (max-width: 640px) {
  .error-page__code {
    font-size: 3.5rem;
  }

  .error-page__emoji {
    font-size: 3rem;
  }

  .error-page__recent-grid {
    grid-template-columns: 1fr;
  }
}
</style>
