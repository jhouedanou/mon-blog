<template>
  <div class="bv" :class="{ 'bv--flat': flat }">
    <header class="mode-bar" :class="{ 'mode-bar--static': flat }">
      <NuxtLink :to="localePath('/')" class="mode-bar__brand">
        <img src="/favicon-96x96.png" :alt="imgText($t('logoAlt'))" :title="imgText($t('logoAlt'))" width="30" height="30" />
        <span>Jean-Luc Houédanou</span>
      </NuxtLink>
      <p class="mode-bar__name">Blogvision</p>
      <div class="mode-bar__actions">
        <LanguageSwitcher />
        <NuxtLink :to="localePath('/')" class="btn btn--primary">
          <i class="material-icons" aria-hidden="true">arrow_back</i> {{ $t('backToBlog') }}
        </NuxtLink>
      </div>
    </header>

    <h1 class="visually-hidden">{{ $t('blogvisionTitle') }}</h1>

    <!-- Tunnel : on avance à la molette, au doigt ou aux flèches. Chaque
         miniature est un vrai bouton, donc utilisable au clavier. -->
    <div
      v-if="!flat"
      ref="stageEl"
      class="bv-stage"
      @wheel.prevent="onWheel"
      @touchstart.passive="onTouchStart"
      @touchmove.prevent="onTouchMove"
    >
      <div class="bv-world" :style="{ '--cam': `${pos - REST}px` }">
        <div class="bv-floor" :style="{ backgroundPositionY: `${pos}px` }" aria-hidden="true"></div>
        <div class="bv-ceiling" :style="{ backgroundPositionY: `${-pos}px` }" aria-hidden="true"></div>
        <button
          v-for="item in visible"
          :key="item.article._path"
          type="button"
          class="bv-card"
          :class="item.side"
          :style="{ '--z': `${-item.index * SPACING}px`, opacity: item.opacity }"
          :tabindex="item.near ? 0 : -1"
          @click="selected = item.article"
          @focus="onCardFocus($event, item.index)"
        >
          <span class="bv-card__media">
            <img
              v-if="item.article.image"
              :src="item.article.image"
              :alt="imgText(item.article.title)"
              :title="imgText(item.article.title)"
              :loading="item.near ? 'eager' : 'lazy'"
              decoding="async"
            />
            <ArticleThumbFallback v-else :seed="item.article._path" />
          </span>
          <span class="bv-card__meta">{{ formatDate(item.article.createdAt) }}</span>
          <span class="bv-card__title">{{ frenchSpacing(item.article.title, locale) }}</span>
        </button>
      </div>
      <div class="bv-fog" aria-hidden="true"></div>
    </div>

    <!-- Sans animation (réglage « réduire les mouvements ») : même contenu en grille. -->
    <ul v-else class="bv-grid">
      <li v-for="article in list" :key="article._path">
        <button type="button" class="bv-card bv-card--flat" @click="selected = article">
          <span class="bv-card__media">
            <img
              v-if="article.image"
              :src="article.image"
              :alt="imgText(article.title)"
              :title="imgText(article.title)"
              loading="lazy"
              decoding="async"
            />
            <ArticleThumbFallback v-else :seed="article._path" />
          </span>
          <span class="bv-card__meta">{{ formatDate(article.createdAt) }}</span>
          <span class="bv-card__title">{{ frenchSpacing(article.title, locale) }}</span>
        </button>
      </li>
    </ul>

    <div v-if="!flat" class="bv-controls">
      <!-- Légende à plat : le titre de l'article en face de soi reste lisible,
           quel que soit l'angle de la miniature. -->
      <div v-if="currentArticle" class="bv-caption" aria-live="polite">
        <p class="bv-caption__meta">{{ formatDate(currentArticle.createdAt) }}</p>
        <p class="bv-caption__title">{{ frenchSpacing(currentArticle.title, locale) }}</p>
        <button type="button" class="btn btn--primary" @click="selected = currentArticle">{{ $t('blogvisionOpen') }}</button>
      </div>
      <div class="bv-controls__nav">
        <button type="button" class="btn btn--secondary" :disabled="current <= 0" :aria-label="$t('blogvisionBack')" @click="goTo(current - 1)">
          <i class="material-icons" aria-hidden="true">arrow_back</i>
        </button>
        <span class="bv-controls__count">{{ current + 1 }} / {{ list.length }}</span>
        <button type="button" class="btn btn--secondary" :disabled="current >= list.length - 1" :aria-label="$t('blogvisionForward')" @click="goTo(current + 1)">
          <i class="material-icons" aria-hidden="true">arrow_forward</i>
        </button>
      </div>
    </div>

    <ArticleSheet :article="selected" @close="selected = null" />
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
import { frenchSpacing } from '~/utils/typography.js'
import { dateLocale } from '~/utils/i18n.js'
import { canonicalUrl } from '~/utils/site.js'

definePageMeta({ immersive: true })

const { locale, t } = useI18n()
const localePath = useLocalePath()
const imgText = useImageText()

const { data: articles } = await useArticleList()
const list = computed(() => articles.value || [])

// Vue alternative des mêmes articles : pas d'indexation, mais les liens comptent.
useSeo({
  title: t('blogvisionTitle'),
  description: t('blogvisionDescription'),
  canonical: canonicalUrl(localePath('/blogvision')),
  robots: 'noindex, follow',
  imageIsCard: true,
})

// Distance entre deux miniatures dans le tunnel, et nombre affiché devant soi.
const SPACING = 640
// Miniatures affichées devant soi : 6 sur ordinateur, 3 sur téléphone (au-delà,
// elles se cachent les unes derrière les autres et ne sont plus cliquables).
const ahead = ref(5)
// Recul de la caméra : la miniature courante reste un peu devant soi.
const REST = 100

const pos = ref(0) // position de la caméra dans le tunnel, en px
const selected = ref(null)
const flat = ref(false)
const stageEl = ref(null)
let target = 0
let raf = 0
let touchY = 0

const maxPos = computed(() => Math.max(0, (list.value.length - 1) * SPACING))
const current = computed(() => Math.min(list.value.length - 1, Math.max(0, Math.round(pos.value / SPACING))))

const currentArticle = computed(() => list.value[current.value] || null)

// Fenêtre glissante : seules les miniatures proches sont dans la page.
const visible = computed(() => {
  // Rien derrière soi : une miniature dépassée s'afficherait énorme, en gros plan.
  const first = current.value
  const last = Math.min(list.value.length - 1, current.value + ahead.value)
  const items = []
  for (let index = first; index <= last; index++) {
    const ahead = index - current.value
    items.push({
      index,
      article: list.value[index],
      side: index % 2 === 0 ? 'is-left' : 'is-right',
      near: ahead >= 0 && ahead <= 3,
      opacity: Math.max(0.45, 1 - ahead * 0.14),
    })
  }
  return items
})

function clamp(value) {
  return Math.min(maxPos.value, Math.max(0, value))
}

function animate() {
  const delta = target - pos.value
  if (Math.abs(delta) < 0.5) {
    pos.value = target
    raf = 0
    return
  }
  pos.value += delta * 0.14
  raf = requestAnimationFrame(animate)
}

function moveTo(value) {
  target = clamp(value)
  if (!raf) raf = requestAnimationFrame(animate)
}

function goTo(index) {
  moveTo(index * SPACING)
}

// Au clavier (Tab), le tunnel avance jusqu'à la miniature qui reçoit le focus.
// Pas à la souris : le clic doit ouvrir la fiche sans déplacer le tunnel.
function onCardFocus(event, index) {
  if (event.target.matches(':focus-visible')) goTo(index)
}

function onWheel(event) {
  moveTo(target + event.deltaY * 1.2)
}

function onTouchStart(event) {
  touchY = event.touches[0].clientY
}

function onTouchMove(event) {
  const y = event.touches[0].clientY
  moveTo(target + (touchY - y) * 3)
  touchY = y
}

function onKey(event) {
  if (selected.value || flat.value) return
  const steps = { ArrowUp: 1, ArrowRight: 1, PageDown: 3, ArrowDown: -1, ArrowLeft: -1, PageUp: -3 }
  if (event.key === 'Home') { event.preventDefault(); goTo(0); return }
  if (event.key === 'End') { event.preventDefault(); goTo(list.value.length - 1); return }
  const step = steps[event.key]
  if (!step) return
  event.preventDefault()
  goTo(Math.round(target / SPACING) + step)
}

function formatDate(createdAt) {
  const date = new Date(createdAt)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat(dateLocale(locale.value), { day: '2-digit', month: 'short', year: 'numeric' })
    .format(date).replace('.', '')
}

onMounted(() => {
  flat.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ahead.value = window.matchMedia('(max-width: 640px)').matches ? 2 : 5
  window.addEventListener('keydown', onKey)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  cancelAnimationFrame(raf)
})
</script>

<style lang="scss" scoped>
.bv {
  position: relative;
  height: 100dvh;
  overflow: hidden;
  background: var(--bg-primary);

  &--flat {
    height: auto;
    min-height: 100dvh;
    overflow: visible;
  }
}

/* ==========================================
   Tunnel
   ========================================== */
.bv-stage {
  position: absolute;
  inset: 0;
  perspective: 900px;
  perspective-origin: 50% 46%;
  overflow: hidden;
  touch-action: none;
}

.bv-world {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  /* Le calque lui-même ne bouge pas et ne capte aucun clic. Chaque miniature
     avance seule (`--cam`). Déplacer le calque le faisait passer devant les
     miniatures, puis derrière la caméra : le navigateur ne trouvait alors plus
     aucune miniature sous le pointeur. */
  pointer-events: none;
}

/* Sol et plafond : la grille du site, qui défile avec l'avancée. */
.bv-floor,
.bv-ceiling {
  position: absolute;
  left: 50%;
  width: 2400px;
  height: 8000px;
  margin-left: -1200px;
  background-image:
    linear-gradient(var(--accent-2-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--accent-2-line) 1px, transparent 1px);
  background-size: 120px 120px;
  opacity: 0.55;
  pointer-events: none;
}

.bv-floor {
  top: 50%;
  transform-origin: 50% 0;
  transform: translateZ(-260px) translateY(330px) rotateX(90deg) translateY(-7000px);
}

.bv-ceiling {
  top: 50%;
  transform-origin: 50% 0;
  transform: translateZ(-260px) translateY(-330px) rotateX(90deg) translateY(-7000px);
  opacity: 0.25;
}

/* Brume au centre : le fond du tunnel se perd dans le bleu nuit. */
.bv-fog {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 16% 18% at 50% 46%, var(--bg-primary) 10%, transparent 100%);
  pointer-events: none;
}

.bv-card {
  --w: min(460px, 60vw);
  --x: min(480px, 34vw);
  --turn: 30deg;
  display: flex;
  pointer-events: auto;
  flex-direction: column;
  padding: 0;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  background: linear-gradient(135deg, var(--bg-card), var(--bg-secondary));
  color: var(--text-primary);
  font-family: var(--font-sans);
  text-align: left;
  cursor: pointer;
  overflow: hidden;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover,
  &:focus-visible {
    border-color: var(--accent);
    box-shadow: 0 0 0 2px var(--accent-line), var(--card-shadow-hover);
  }

  .bv-stage & {
    position: absolute;
    top: 46%;
    left: 50%;
    width: var(--w);
    margin: calc(var(--w) * -0.42) 0 0 calc(var(--w) * -0.5);
    transition: opacity 0.4s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  }

  /* Miniatures posées de part et d'autre, tournées vers le visiteur. */
  &.is-left {
    transform: translate3d(calc(var(--x) * -1), 0, calc(var(--z) + var(--cam))) rotateY(var(--turn));
  }

  &.is-right {
    transform: translate3d(var(--x), 0, calc(var(--z) + var(--cam))) rotateY(calc(var(--turn) * -1));
  }
}

.bv-card__media {
  position: relative;
  display: block;
  aspect-ratio: 16 / 10;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-secondary);
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.bv-card__meta {
  padding: 0.75rem 0.9rem 0;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent-2-text);
}

.bv-card__title {
  /* Marge et non padding en bas : avec un padding, une 4e ligne dépassait
     sous la coupe à 3 lignes. */
  margin-bottom: 0.9rem;
  padding: 0.3rem 0.9rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.03em;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ==========================================
   Commandes
   ========================================== */
.bv-controls {
  position: absolute;
  inset: auto 0 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem var(--gutter) max(1rem, env(safe-area-inset-bottom, 0px));
  background: linear-gradient(transparent, var(--bg-primary));
  pointer-events: none;

  > * {
    pointer-events: auto;
  }
}

.bv-caption {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem 1rem;
  min-width: 0;
  max-width: 760px;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  background: var(--bg-card);
}

.bv-caption__meta {
  flex-basis: 100%;
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent-2-text);
}

.bv-caption__title {
  flex: 1 1 16rem;
  min-width: 0;
  margin: 0;
  font-size: 1.15rem;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.03em;
  color: var(--text-primary);
}

.bv-controls__nav {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-left: auto;

  .btn {
    width: 44px;
    padding: 0;
    background: var(--bg-glass);

    &:disabled {
      opacity: 0.4;
      cursor: default;
    }
  }

  .material-icons {
    font-size: 1.2rem;
  }
}

.bv-controls__count {
  min-width: 5.5em;
  text-align: center;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--text-primary);
}

/* ==========================================
   Grille sans animation
   ========================================== */
.bv-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.125rem;
  max-width: var(--wrap);
  margin: 0 auto;
  padding: 1.5rem var(--gutter) 3rem;
  list-style: none;

  .bv-card {
    width: 100%;
    height: 100%;
  }
}

@media screen and (max-width: 640px) {
  /* Point de fuite relevé : les miniatures suivantes dépassent au-dessus de
     celle qui est en face, au lieu de se cacher derrière elle. */
  .bv-stage {
    perspective-origin: 50% 16%;
  }

  .bv-stage .bv-card {
    top: 44%;
  }

  .bv-fog {
    display: none;
  }

  .bv-card {
    --w: 64vw;
    --x: 21vw;
    --turn: 18deg;
  }

  .bv-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .bv-controls__nav {
    margin-left: 0;
    justify-content: space-between;
  }
}
</style>
