<template>
  <section v-if="articles && articles.length" class="suggested">
    <h3 class="suggested__heading">{{ $t('suggestedArticles') }}</h3>
    <div class="suggested__grid">
      <NuxtLink
        v-for="article in articles"
        :key="article._path"
        :to="article._path"
        class="suggested__card"
      >
        <div
          class="suggested__thumb"
          :style="article.image ? { backgroundImage: `url(${article.image})` } : {}"
          :class="{ 'suggested__thumb--no-image': !article.image }"
        ></div>
        <div class="suggested__info">
          <span class="suggested__title">{{ article.title }}</span>
          <span class="suggested__date">{{ formatDate(article.createdAt) }}</span>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup>
defineProps({
  articles: { type: Array, default: () => [] },
})

function formatDate(createdAt) {
  if (createdAt) {
    const date = new Date(createdAt)
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }
  return 'Date inconnue'
}
</script>

<style lang="scss" scoped>
.suggested {
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color, #eee);
}

.suggested__heading {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--text-primary, #1a1a2e);
  margin: 0 0 1.25rem 0;
}

.suggested__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.suggested__card {
  text-decoration: none;
  border-radius: 10px;
  overflow: hidden;
  background: var(--bg-secondary, #f8f9fa);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }
}

.suggested__thumb {
  width: 100%;
  height: 140px;
  background-size: cover;
  background-position: center;

  &--no-image {
    background: linear-gradient(135deg, #1a1a2e, #16213e);
  }
}

.suggested__info {
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.suggested__title {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary, #1a1a2e);
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.suggested__date {
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: var(--text-muted, #757575);
}

@media screen and (max-width: 768px) {
  .suggested__grid {
    grid-template-columns: 1fr;
  }

  .suggested__card {
    display: flex;
    flex-direction: row;
  }

  .suggested__thumb {
    width: 120px;
    min-width: 120px;
    height: auto;
    min-height: 90px;
  }

  .suggested__info {
    justify-content: center;
  }
}
</style>
