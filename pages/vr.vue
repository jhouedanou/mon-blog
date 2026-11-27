<template>
  <div class="vr">
    <div class="vr-loader" :class="{ 'is-done': ready }" role="status">
      <div>
        <p class="vr-loader__label">{{ $t('vrMode') }}</p>
        <h1 class="vr-loader__title">{{ $t('vrTitle') }}</h1>
        <p class="vr-loader__text">{{ failed ? $t('vrNoWebgl') : $t('vrLoading') }}</p>
        <NuxtLink v-if="failed" :to="localePath('/')" class="btn btn--primary">
          <i class="material-icons" aria-hidden="true">arrow_back</i> {{ $t('backToHome') }}
        </NuxtLink>
      </div>
    </div>

    <header class="mode-bar">
      <NuxtLink :to="localePath('/')" class="mode-bar__brand">
        <img src="/favicon-96x96.png" :alt="imgText($t('logoAlt'))" :title="imgText($t('logoAlt'))" width="30" height="30" />
        <span>Jean-Luc Houédanou</span>
      </NuxtLink>
      <p class="mode-bar__name">{{ $t('vrMode') }}</p>
      <div class="mode-bar__actions">
        <LanguageSwitcher />
        <NuxtLink :to="localePath('/')" class="btn btn--primary">
          <i class="material-icons" aria-hidden="true">arrow_back</i> {{ $t('backToBlog') }}
        </NuxtLink>
      </div>
    </header>

    <div class="vr-bottom">
      <p class="vr-bottom__hint">{{ $t('vrHint') }}</p>
      <div class="vr-filters" role="group" :aria-label="$t('themesNavLabel')">
        <button
          v-for="f in filters"
          :key="f.id"
          type="button"
          class="chip"
          :class="{ 'is-active': filter === f.id }"
          :aria-pressed="filter === f.id ? 'true' : 'false'"
          @click="setFilter(f.id)"
        >{{ f.label }}</button>
      </div>
    </div>

    <!-- La scène A-Frame est injectée après le chargement de la bibliothèque,
         côté navigateur seulement : rien de 3D dans le HTML pré-généré. -->
    <div ref="sceneHost" class="vr-scene-host"></div>

    <!-- Les mêmes articles en liens, pour les robots et les lecteurs d'écran. -->
    <nav class="visually-hidden" :aria-label="$t('latestArticles')">
      <ul>
        <li v-for="article in shown" :key="article._path">
          <NuxtLink :to="article._path">{{ article.title }}</NuxtLink>
        </li>
      </ul>
    </nav>

    <ArticleSheet :article="selected" @close="onSheetClose" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocalePath } from '#i18n'
import LanguageSwitcher from '~/components/LanguageSwitcher.vue'
import ArticleSheet from '~/components/ArticleSheet.vue'
import { useArticleList } from '~/composables/useArticleList.js'
import { useImageText } from '~/composables/useImageText.js'
import { useSeo } from '~/composables/useSeo.js'
import { THEME_DEFINITIONS, articleMatchesTheme, localizeTheme } from '~/data/editorial.js'
import { dateLocale } from '~/utils/i18n.js'
import { canonicalUrl } from '~/utils/site.js'
import { createVrGallery, hasWebGL, VR_MAX_CARDS } from '~/utils/vr-gallery.js'

definePageMeta({ immersive: true })

// Même version que la galerie du CV.
const AFRAME_URL = 'https://aframe.io/releases/1.6.0/aframe.min.js'

const { locale, t } = useI18n()
const localePath = useLocalePath()
const imgText = useImageText()

const { data: articles } = await useArticleList()
const list = computed(() => articles.value || [])

useSeo({
  title: t('vrTitle'),
  description: t('vrDescription'),
  canonical: canonicalUrl(localePath('/vr')),
  robots: 'noindex, follow',
  imageIsCard: true,
})

const filters = computed(() => [
  { id: 'all', label: t('vrAll') },
  ...THEME_DEFINITIONS.map((theme) => ({ id: theme.slug, label: localizeTheme(theme, locale.value).label })),
])

function matches(article, filterId) {
  if (filterId === 'all') return true
  const theme = THEME_DEFINITIONS.find((item) => item.slug === filterId)
  return theme ? articleMatchesTheme(article, theme) : true
}

const filter = ref('all')
const selected = ref(null)
const ready = ref(false)
const failed = ref(false)
const sceneHost = ref(null)
let gallery = null

const shown = computed(() => list.value.filter((a) => matches(a, filter.value)).slice(0, VR_MAX_CARDS))

function setFilter(id) {
  filter.value = id
  gallery?.setFilter(id)
}

function onSheetClose() {
  selected.value = null
  gallery?.clearSelection()
}

function formatDate(createdAt) {
  const date = new Date(createdAt)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat(dateLocale(locale.value), { day: '2-digit', month: 'short', year: 'numeric' })
    .format(date).replace('.', '')
}

function loadAframe() {
  if (window.AFRAME) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = AFRAME_URL
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}

const SCENE_HTML = `
<a-scene id="vr-scene" embedded
  background="color: #111522"
  fog="type: exponential; color: #111522; density: 0.022"
  renderer="antialias: true; colorManagement: true"
  cursor="rayOrigin: mouse; fuse: false"
  raycaster="objects: .clickable; far: 30"
  loading-screen="enabled: false"
  device-orientation-permission-ui="enabled: false">
  <a-entity id="vr-rig">
    <a-entity camera="fov: 70" position="0 1.6 0" look-controls="pointerLockEnabled: false" wasd-controls="acceleration: 22" stay-inside="radius: 2.4"></a-entity>
    <a-entity laser-controls="hand: right" raycaster="objects: .clickable; far: 30; lineColor: #e0a083; lineOpacity: .8"></a-entity>
    <a-entity laser-controls="hand: left" raycaster="objects: .clickable; far: 30; lineColor: #b8beff; lineOpacity: .8"></a-entity>
  </a-entity>
  <a-entity id="vr-floor"></a-entity>
  <a-entity id="vr-intro"></a-entity>
  <a-entity id="vr-controls"></a-entity>
  <a-entity id="vr-gallery"></a-entity>
  <a-entity id="vr-detail"></a-entity>
</a-scene>`

onMounted(async () => {
  if (!hasWebGL()) { failed.value = true; return }
  try {
    await loadAframe()
    // Les polices doivent être prêtes avant de dessiner dans les canvas.
    if (document.fonts) {
      await Promise.race([
        Promise.all(['400 30px Figtree', '600 40px Figtree', '600 20px "JetBrains Mono"'].map((f) => document.fonts.load(f))),
        new Promise((resolve) => setTimeout(resolve, 3000)),
      ]).catch(() => {})
    }
    if (!sceneHost.value) return
    sceneHost.value.innerHTML = SCENE_HTML
    const scene = sceneHost.value.querySelector('a-scene')
    await new Promise((resolve) => (scene.hasLoaded ? resolve() : scene.addEventListener('loaded', resolve, { once: true })))
    gallery = createVrGallery({
      scene,
      articles: list.value,
      filters: filters.value,
      matches,
      formatDate,
      texts: {
        kicker: 'Abidjan',
        title: t('blogName'),
        lede: t('heroLede'),
        lookAround: t('vrLookAround'),
        articles: t('articles'),
        readingTime: t('readingTime'),
        clickClose: t('vrClickClose'),
      },
      onSelect: (article) => { selected.value = article },
    })
    gallery.onFilter = (id) => { filter.value = id }
    window.vrGallery = gallery // pour les tests
    ready.value = true
  } catch (error) {
    console.error(error)
    failed.value = true
  }
})

onUnmounted(() => {
  gallery = null
  delete window.vrGallery
  if (sceneHost.value) sceneHost.value.innerHTML = ''
  document.documentElement.classList.remove('a-fullscreen')
})
</script>

<style lang="scss" scoped>
.vr {
  position: relative;
  height: 100dvh;
  overflow: hidden;
  background: var(--bg-primary);
}

.vr-scene-host {
  position: absolute;
  inset: 0;

  :deep(a-scene) {
    width: 100%;
    height: 100%;
  }

  :deep(.a-canvas.is-pointing) {
    cursor: pointer;
  }

  /* Bouton « entrer en VR » d'A-Frame : sous la barre, pour ne pas couvrir les filtres. */
  :deep(.a-enter-vr) {
    top: 76px;
    right: var(--gutter);
    bottom: auto;
  }
}

.vr-loader {
  position: absolute;
  inset: 0;
  z-index: 30;
  display: grid;
  place-items: center;
  padding: 1.5rem;
  text-align: center;
  background: var(--bg-primary);
  transition: opacity 0.4s ease;

  &.is-done {
    opacity: 0;
    pointer-events: none;
  }
}

.vr-loader__label {
  margin: 0 0 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent-2-text);
}

.vr-loader__title {
  margin: 0 0 0.6rem;
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  letter-spacing: -0.035em;
}

.vr-loader__text {
  max-width: 46ch;
  margin: 0 auto 1.25rem;
  color: var(--text-muted);
}

.vr-bottom {
  position: absolute;
  inset: auto 0 0;
  z-index: 20;
  display: grid;
  gap: 0.6rem;
  padding: 1rem var(--gutter) max(1rem, env(safe-area-inset-bottom, 0px));
  background: linear-gradient(transparent, var(--bg-primary));
  pointer-events: none;

  > * {
    pointer-events: auto;
  }
}

.vr-bottom__hint {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
  pointer-events: none;
}

.vr-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;

  .chip {
    min-height: 40px;
    background: var(--bg-glass);
    cursor: pointer;

    &.is-active {
      border-color: var(--accent-2);
      background: var(--accent-2-soft);
      color: var(--accent-2-text);
    }
  }
}

@media screen and (max-width: 640px) {
  .vr-bottom__hint {
    display: none;
  }

  .vr-filters {
    flex-wrap: nowrap;
    overflow-x: auto;
    scrollbar-width: none;

    > * {
      flex-shrink: 0;
    }
  }
}
</style>
