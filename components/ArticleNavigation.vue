<template>
  <nav v-if="prev || next" class="article-nav">
    <NuxtLink v-if="prev" :to="prev._path" class="article-nav__link article-nav__link--prev">
      <div
        class="article-nav__thumb"
        :style="prev.image ? { backgroundImage: `url(${prev.image})` } : {}"
        :class="{ 'article-nav__thumb--no-image': !prev.image }"
      >
        <span class="article-nav__direction"><span class="article-nav__arrow">←</span> {{ $t('previous') }}</span>
      </div>
      <span class="article-nav__title">{{ prev.title }}</span>
    </NuxtLink>
    <div v-else class="article-nav__placeholder"></div>

    <NuxtLink v-if="next" :to="next._path" class="article-nav__link article-nav__link--next">
      <div
        class="article-nav__thumb"
        :style="next.image ? { backgroundImage: `url(${next.image})` } : {}"
        :class="{ 'article-nav__thumb--no-image': !next.image }"
      >
        <span class="article-nav__direction">{{ $t('next') }} <span class="article-nav__arrow">→</span></span>
      </div>
      <span class="article-nav__title">{{ next.title }}</span>
    </NuxtLink>
    <div v-else class="article-nav__placeholder"></div>
  </nav>
</template>

<script setup>
defineProps({
  prev: { type: Object, default: null },
  next: { type: Object, default: null },
})
</script>

<style lang="scss" scoped>
.article-nav {
  display: flex;
  gap: 1rem;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
}

.article-nav__link {
  flex: 1;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  border-radius: 4px;
  overflow: hidden;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
              box-shadow 0.3s ease,
              border-color 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: var(--accent);
    box-shadow: var(--card-shadow-hover);

    .article-nav__title {
      color: var(--accent);
    }

    .article-nav__arrow {
      transform: translateX(3px);
    }

    &.article-nav__link--prev .article-nav__arrow {
      transform: translateX(-3px);
    }
  }
}

.article-nav__link--next {
  text-align: right;
}

.article-nav__placeholder {
  flex: 1;
}

.article-nav__thumb {
  width: 100%;
  height: 130px;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: flex-end;
  filter: saturate(0.9);

  &--no-image {
    background: linear-gradient(135deg, var(--bg-card), var(--bg-secondary), color-mix(in srgb, var(--accent) 28%, var(--bg-secondary)));
  }
}

.article-nav__direction {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  padding: 0.3rem 0.7rem;
  border-radius: 2px;
  margin: 0.65rem;
  border: 1px solid var(--accent);
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.article-nav__arrow {
  display: inline-block;
  transition: transform 0.25s ease;
  color: var(--accent);
}

.article-nav__title {
  font-family: var(--font-display);
  font-weight: 650;
  font-size: 1.1rem;
  line-height: 1.25;
  letter-spacing: -0.015em;
  color: var(--text-primary);
  padding: 1rem 1.1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.25s ease;
}

@media screen and (max-width: 768px) {
  .article-nav {
    flex-direction: column;
  }

  .article-nav__link--next {
    text-align: left;
  }

  .article-nav__placeholder {
    display: none;
  }

  .article-nav__thumb {
    height: 110px;
  }
}
</style>
