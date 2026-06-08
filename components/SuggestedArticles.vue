<template>
  <section v-if="articles && articles.length" class="suggested">
    <span class="suggested__label">— À lire ensuite</span>
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
          <span class="suggested__date">{{ formatDate(article.createdAt) }}</span>
          <span class="suggested__title">{{ article.title }}</span>
          <span class="suggested__arrow">Lire →</span>
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
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    }).format(date).replace('.', '')
  }
  return ''
}
</script>

<style lang="scss" scoped>
.suggested {
  margin-top: 3.5rem;
  padding-top: 2.5rem;
  border-top: 1px solid var(--border-color);
}

.suggested__label {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--accent);
  margin-bottom: 0.5rem;
}

.suggested__heading {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 400;
  font-size: 1.85rem;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin: 0 0 1.5rem 0;
}

.suggested__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.suggested__card {
  text-decoration: none;
  border-radius: 4px;
  overflow: hidden;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
              box-shadow 0.3s ease,
              border-color 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: var(--accent);
    box-shadow: var(--neon-glow-teal);

    .suggested__arrow {
      color: var(--accent);
      transform: translateX(3px);
    }

    .suggested__title {
      color: var(--accent);
    }
  }
}

.suggested__thumb {
  width: 100%;
  height: 140px;
  background-size: cover;
  background-position: center;
  filter: saturate(0.9);

  &--no-image {
    background: linear-gradient(135deg, #0a0a0f 0%, #1a1a3a 50%, #00ffd1 200%);
  }
}

.suggested__info {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.suggested__date {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--text-muted);
}

.suggested__title {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 400;
  font-size: 1.05rem;
  line-height: 1.25;
  letter-spacing: -0.015em;
  color: var(--text-primary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
  transition: color 0.25s ease;
}

.suggested__arrow {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--text-secondary);
  transition: color 0.25s ease, transform 0.25s ease;
  margin-top: 0.25rem;
}

@media screen and (max-width: 768px) {
  .suggested__grid {
    grid-template-columns: 1fr;
  }

  .suggested__card {
    flex-direction: row;
  }

  .suggested__thumb {
    width: 120px;
    min-width: 120px;
    height: auto;
    min-height: 100px;
  }

  .suggested__info {
    justify-content: center;
  }
}
</style>
