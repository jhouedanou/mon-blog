<template>
  <!-- Fiche d'un article, ouverte depuis le mode VR et Blogvision. `<dialog>`
       natif : Échap ferme, le focus reste dans la fenêtre. -->
  <dialog ref="dialogEl" class="sheet" :aria-label="article ? article.title : ''" @close="$emit('close')" @click="onBackdrop">
    <div v-if="article" class="sheet__inner">
      <button type="button" class="sheet__close" :aria-label="$t('close')" @click="close">
        <i class="material-icons" aria-hidden="true">close</i>
      </button>
      <div v-if="article.image" class="sheet__media">
        <img :src="article.image" :alt="imgText(article.title)" :title="imgText(article.title)" width="640" height="400" />
      </div>
      <p class="sheet__meta">
        <time :datetime="article.createdAt">{{ formatDate(article.createdAt) }}</time>
        <template v-if="article.readingTime">
          <span aria-hidden="true">·</span>
          <span>{{ article.readingTime }} {{ $t('readingTime') }}</span>
        </template>
      </p>
      <h2 class="sheet__title">{{ frenchSpacing(article.title, locale) }}</h2>
      <p v-if="article.description" class="sheet__text">{{ article.description }}</p>
      <NuxtLink :to="article._path" class="btn btn--primary sheet__cta">
        {{ $t('readArticle') }} <i class="material-icons" aria-hidden="true">arrow_forward</i>
      </NuxtLink>
    </div>
  </dialog>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useImageText } from '~/composables/useImageText.js'
import { frenchSpacing } from '~/utils/typography.js'
import { dateLocale } from '~/utils/i18n.js'

const props = defineProps({
  // L'article affiché ; `null` ferme la fiche.
  article: { type: Object, default: null },
})
defineEmits(['close'])

const { locale } = useI18n()
const imgText = useImageText()
const dialogEl = ref(null)

watch(() => props.article, async (article) => {
  await nextTick()
  const el = dialogEl.value
  if (!el) return
  if (article && !el.open) el.showModal()
  if (!article && el.open) el.close()
})

function close() {
  dialogEl.value?.close()
}

// Un clic sur le fond (hors de la fiche) ferme.
function onBackdrop(event) {
  if (event.target === dialogEl.value) close()
}

function formatDate(createdAt) {
  const date = new Date(createdAt)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString(dateLocale(locale.value), { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<style lang="scss" scoped>
.sheet {
  width: min(460px, calc(100vw - 2rem));
  max-height: calc(100dvh - 2rem);
  padding: 0;
  border: 1px solid var(--accent-2-line);
  border-radius: var(--radius);
  background: var(--bg-card);
  color: var(--text-primary);
  box-shadow: var(--card-shadow-hover);

  &::backdrop {
    background: rgba(8, 11, 20, 0.62);
  }
}

.sheet__inner {
  position: relative;
  padding: 1.25rem 1.35rem 1.5rem;
}

.sheet__close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  background: var(--bg-glass);
  color: var(--text-primary);
  cursor: pointer;

  &:hover {
    border-color: var(--accent-2-line);
    color: var(--accent-2-text);
  }
}

.sheet__media {
  margin: -1.25rem -1.35rem 1.1rem;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-secondary);

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.sheet__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin: 0 0 0.6rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent-2-text);
}

.sheet__title {
  margin: 0 0 0.7rem;
  font-size: 1.5rem;
  line-height: 1.15;
  letter-spacing: -0.035em;
}

.sheet__text {
  margin: 0 0 1.25rem;
  color: var(--text-muted);
  font-size: 0.98rem;
  line-height: 1.6;
}

.sheet__cta .material-icons {
  font-size: 1.1rem;
}
</style>
