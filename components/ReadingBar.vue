<template>
  <div class="reading-bar" :class="{ 'reading-bar--visible': isVisible }">
    <div class="reading-bar__content">
      <NuxtLink to="/" class="reading-bar__logo">
        <img src="/images/1837389.webp" alt="Accueil" />
      </NuxtLink>
      <span class="reading-bar__title">{{ title }}</span>
      <div class="reading-bar__share">
        <div class="sharethis-inline-share-buttons" data-description="" data-title=""></div>
      </div>
    </div>
    <div class="reading-bar__progress" :style="{ width: progress + '%' }"></div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

const isVisible = ref(false);
const progress = ref(0);
let shareInitialized = false;

watch(isVisible, (val) => {
  if (val && !shareInitialized) {
    nextTick(() => {
      if (window.__sharethis__?.initialize) {
        window.__sharethis__.initialize();
      }
      shareInitialized = true;
    });
  }
});

function onScroll() {
  isVisible.value = window.scrollY > 300;

  const docHeight = document.documentElement.scrollHeight;
  const winHeight = window.innerHeight;
  const scrollable = docHeight - winHeight;
  progress.value = scrollable > 0 ? Math.min((window.scrollY / scrollable) * 100, 100) : 0;
}

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<style lang="scss" scoped>
.reading-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #1a1a2e;
  transform: translateY(-100%);
  transition: transform 0.3s ease;

  &--visible {
    transform: translateY(0);
  }
}

.reading-bar__content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1.25rem;
  max-width: 1200px;
  margin: 0 auto;
}

.reading-bar__logo {
  flex-shrink: 0;
  display: flex;
  align-items: center;

  img {
    height: 32px;
    width: 32px;
    border-radius: 50%;
    object-fit: cover;
  }
}

.reading-bar__title {
  font-family: "Montserrat", sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
  flex: 1;
}

.reading-bar__share {
  flex-shrink: 0;
  display: flex;
  align-items: center;

  :deep(.sharethis-inline-share-buttons) {
    display: flex !important;
    align-items: center;
    gap: 4px;
  }

  :deep(.st-btn) {
    width: 28px !important;
    height: 28px !important;
    min-width: 28px !important;
    display: inline-flex !important;
    align-items: center;
    justify-content: center;
    border-radius: 50% !important;
    padding: 0 !important;

    img, svg {
      width: 16px !important;
      height: 16px !important;
    }
  }

  :deep(.st-label) {
    display: none !important;
  }

  :deep(.st-total) {
    display: none !important;
  }

  :deep(.st-count) {
    display: none !important;
  }
}

.reading-bar__progress {
  height: 3px;
  background: #2ec4b6;
  transition: width 0.1s linear;
}

@media screen and (max-width: 768px) {
  .reading-bar__content {
    padding: 0.4rem 1rem;
    gap: 0.5rem;
  }

  .reading-bar__logo img {
    height: 26px;
    width: 26px;
  }

  .reading-bar__title {
    font-size: 0.8rem;
  }

  .reading-bar__share {
    display: none;
  }
}
</style>
