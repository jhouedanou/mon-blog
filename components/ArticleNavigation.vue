<template>
  <nav v-if="prev || next" class="article-nav">
    <NuxtLink v-if="prev" :to="prev._path" class="article-nav__link article-nav__link--prev">
      <div
        class="article-nav__thumb"
        :style="prev.image ? { backgroundImage: `url(${prev.image})` } : {}"
        :class="{ 'article-nav__thumb--no-image': !prev.image }"
      >
        <span class="article-nav__direction">{{ $t('previous') }}</span>
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
        <span class="article-nav__direction">{{ $t('next') }}</span>
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
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

.article-nav__link {
  flex: 1;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  border-radius: 10px;
  overflow: hidden;
  background: #f8f9fa;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
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
  height: 120px;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: flex-end;

  &--no-image {
    background: linear-gradient(135deg, #1a1a2e, #16213e);
  }
}

.article-nav__direction {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  margin: 0.5rem;
}

.article-nav__title {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: #1a1a2e;
  padding: 0.75rem;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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
    height: 100px;
  }
}
</style>
