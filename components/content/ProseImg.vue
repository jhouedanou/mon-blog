<template>
  <!-- Remplace le ProseImg de Nuxt Content : même image (optimisée par
       @nuxt/image), plus une lightbox au clic. `span` et `button` restent
       valides dans le <p> que Markdown met autour de chaque image. -->
  <span ref="rootEl" class="zoomable">
    <component
      :is="ImageComponent"
      class="zoomable__img"
      :src="refinedSrc"
      :alt="alt"
      :width="width"
      :height="height"
      @click="openFromImage"
    />
    <!-- Pas de loupe dans un lien : le clic suivrait le lien, et un bouton
         dans un <a> n'est pas du HTML valide. -->
    <button v-if="!inLink" type="button" class="zoomable__btn" :aria-label="t('zoomImage')" @click="open">
      <i class="material-icons" aria-hidden="true">zoom_in</i>
    </button>

    <Teleport to="body">
      <dialog
        v-if="isOpen"
        ref="dialogEl"
        class="lightbox"
        :aria-label="t('imageViewer')"
        @close="onClose"
        @click="onDialogClick"
      >
        <div ref="scrollerEl" class="lightbox__scroller">
          <!-- Fichier d'origine, pas la version /_ipx : un SVG reste net à toutes les tailles. -->
          <img
            class="lightbox__img"
            :class="{ 'is-zoomed': zoomed }"
            :style="zoomed ? { width: `${zoomWidth}px` } : null"
            :src="refinedSrc"
            :alt="alt"
            @click.stop="toggleZoom"
          />
        </div>
        <button type="button" class="lightbox__close" :aria-label="t('closeImage')" @click="close">
          <i class="material-icons" aria-hidden="true">close</i>
        </button>
      </dialog>
    </Teleport>
  </span>
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { withTrailingSlash, withLeadingSlash, joinURL } from 'ufo'
import ImageComponent from '#build/mdc-image-component.mjs'

const props = defineProps({
  src: { type: String, default: '' },
  alt: { type: String, default: '' },
  width: { type: [String, Number], default: undefined },
  height: { type: [String, Number], default: undefined },
})

const { t } = useI18n()

// Même calcul que le ProseImg d'origine (@nuxtjs/mdc).
const refinedSrc = computed(() => {
  if (props.src?.startsWith('/') && !props.src.startsWith('//')) {
    const base = withLeadingSlash(withTrailingSlash(useRuntimeConfig().app.baseURL))
    if (base !== '/' && !props.src.startsWith(base)) {
      return joinURL(base, props.src)
    }
  }
  return props.src
})

const isOpen = ref(false)
const zoomed = ref(false)
const zoomWidth = ref(0)
const inLink = ref(false)
const rootEl = ref(null)
const dialogEl = ref(null)
const scrollerEl = ref(null)

onMounted(() => {
  inLink.value = Boolean(rootEl.value?.closest('a'))
})

async function open() {
  isOpen.value = true
  await nextTick()
  dialogEl.value?.showModal()
}

function openFromImage(event) {
  // Une image placée dans un lien garde le comportement du lien.
  if (event.target.closest('a')) return
  open()
}

function close() {
  dialogEl.value?.close()
}

// Appelé par close() et par la touche Échap. L'événement `close` arrive
// après coup : si la lightbox a été rouverte entre-temps, on l'ignore.
function onClose() {
  if (dialogEl.value?.open) return
  isOpen.value = false
  zoomed.value = false
}

// Un clic hors de l'image (sur le fond) ferme la lightbox.
function onDialogClick(event) {
  if (event.target === dialogEl.value || event.target === scrollerEl.value) close()
}

// Un clic sur l'image zoome (deux fois la taille affichée, 960 px au moins),
// en gardant sous le doigt le point touché.
async function toggleZoom(event) {
  const img = event.currentTarget
  const rect = img.getBoundingClientRect()
  const rx = (event.clientX - rect.left) / rect.width
  const ry = (event.clientY - rect.top) / rect.height
  if (!zoomed.value) zoomWidth.value = Math.round(Math.max(rect.width * 2, 960))
  zoomed.value = !zoomed.value
  await nextTick()
  const s = scrollerEl.value
  if (!zoomed.value || !s) return
  // Position de l'image dans la zone défilante, marge intérieure comprise.
  const box = s.getBoundingClientRect()
  const after = img.getBoundingClientRect()
  const left = after.left - box.left + s.scrollLeft
  const top = after.top - box.top + s.scrollTop
  s.scrollLeft = left + rx * after.width - (event.clientX - box.left)
  s.scrollTop = top + ry * after.height - (event.clientY - box.top)
}
</script>

<style scoped>
.zoomable {
  position: relative;
  display: block;
  width: fit-content;
  max-width: 100%;
  margin: 2.5rem 0;
}

/* La page article donne une marge de 2,5rem à chaque image : elle passe au conteneur. */
.zoomable .zoomable__img {
  display: block;
  margin: 0;
  cursor: zoom-in;
}

.zoomable__btn {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-glass);
  color: var(--text-primary);
  cursor: pointer;
  opacity: 0.85;
  transition: opacity 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.zoomable__btn:hover,
.zoomable__btn:focus-visible {
  opacity: 1;
  color: var(--accent);
  border-color: var(--accent);
}

.zoomable__btn .material-icons {
  font-size: 1.3rem;
}

.lightbox {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100dvh;
  max-width: none;
  max-height: none;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  overflow: hidden;
}

.lightbox::backdrop {
  background: rgba(8, 12, 9, 0.92);
}

.lightbox__scroller {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 1rem;
  overflow: auto;
  overscroll-behavior: contain;
}

/* margin: auto centre l'image sans couper le haut quand elle déborde. */
.lightbox__img {
  display: block;
  flex-shrink: 0; /* sinon le zoom est ramené à la largeur de l'écran */
  margin: auto;
  max-width: calc(100vw - 2rem);
  max-height: calc(100dvh - 2rem);
  border-radius: 6px;
  cursor: zoom-in;
}

/* La largeur zoomée est posée en ligne par toggleZoom. */
.lightbox__img.is-zoomed {
  height: auto;
  max-width: none;
  max-height: none;
  cursor: zoom-out;
}

.lightbox__close {
  position: fixed;
  top: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 50%;
  background: rgba(18, 23, 20, 0.7);
  color: #fff;
  cursor: pointer;
}

.lightbox__close:hover,
.lightbox__close:focus-visible {
  background: rgba(18, 23, 20, 0.95);
  border-color: #fff;
}
</style>

<style>
/* La page ne défile pas derrière la lightbox. */
html:has(.lightbox[open]) {
  overflow: hidden;
}
</style>
