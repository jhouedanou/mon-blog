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
  padding: 2rem 1rem;
  background: var(--bg-primary);
}

.error-page__content {
  max-width: 600px;
  text-align: center;
}

.error-page__illustration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.error-page__code {
  font-family: 'Montserrat', sans-serif;
  font-size: 5rem;
  font-weight: 800;
  color: #2EC4B6;
  line-height: 1;
}

.error-page__emoji {
  font-size: 4rem;
  line-height: 1;
}

.error-page__title {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.75rem 0;
}

.error-page__message {
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin: 0 0 2rem 0;
  line-height: 1.6;
}

.error-page__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #2EC4B6;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;

  .material-icons {
    font-size: 1.2rem;
  }

  &:hover {
    background: #1a9e92;
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(46, 196, 182, 0.3);
  }
}

.error-page__recent {
  margin-top: 3rem;
  text-align: left;
}

.error-page__recent-heading {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 1rem 0;
  text-align: center;
}

.error-page__recent-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.error-page__article-card {
  text-decoration: none;
  border-radius: 10px;
  overflow: hidden;
  background: var(--bg-card);
  box-shadow: var(--card-shadow);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }
}

.error-page__article-thumb {
  width: 100%;
  height: 100px;
  background-size: cover;
  background-position: center;

  &--no-image {
    background: linear-gradient(135deg, #1a1a2e, #16213e);
  }
}

.error-page__article-info {
  padding: 0.6rem;
}

.error-page__article-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.3;
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
