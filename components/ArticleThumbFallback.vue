<template>
  <svg
    class="thumb-fallback"
    :viewBox="`0 0 ${width} ${height}`"
    preserveAspectRatio="xMidYMid slice"
    role="img"
    :aria-label="alt"
    focusable="false"
  >
    <defs>
      <linearGradient :id="gradientId" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="var(--bg-card)" />
        <stop offset="58%" stop-color="var(--bg-secondary)" />
        <stop offset="100%" :stop-color="`var(${accentVar})`" stop-opacity="0.34" />
      </linearGradient>

      <pattern :id="gridId" width="32" height="32" patternUnits="userSpaceOnUse">
        <path d="M32 0H0V32" fill="none" stroke="var(--grid-line)" stroke-width="1" />
      </pattern>
    </defs>

    <rect width="100%" height="100%" :fill="`url(#${gradientId})`" />
    <rect width="100%" height="100%" :fill="`url(#${gridId})`" />

    <!-- Monogramme : reprend la marque du blog sans dépendre d'une police externe -->
    <g :transform="`translate(${width / 2} ${height / 2})`" opacity="0.5">
      <circle r="34" fill="none" :stroke="`var(${accentVar})`" stroke-width="2" opacity="0.55" />
      <path
        d="M-11 -14 L-11 9 A11 11 0 0 1 -33 9"
        fill="none"
        :stroke="`var(${accentVar})`"
        stroke-width="3.5"
        stroke-linecap="round"
        transform="translate(11 0)"
      />
      <path
        d="M6 -14 L6 14 M6 -14 L24 -14 M6 0 L20 0 M6 14 L24 14"
        fill="none"
        :stroke="`var(${accentVar})`"
        stroke-width="3.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
  </svg>
</template>

<script setup>
import { computed, useId } from 'vue'

const props = defineProps({
  // Sert à varier l'accent d'une vignette à l'autre dans une grille.
  seed: { type: [Number, String], default: 0 },
  width: { type: Number, default: 640 },
  height: { type: Number, default: 360 },
  alt: { type: String, default: '' },
})

// Les IDs SVG sont globaux au document : sans unicité, plusieurs vignettes
// sur la même page partageraient le premier gradient rencontré.
const uid = useId()
const gradientId = computed(() => `thumb-grad-${uid}`)
const gridId = computed(() => `thumb-grid-${uid}`)

const ACCENT_VARS = ['--accent', '--accent-violet', '--accent-magenta', '--accent-amber']

const accentVar = computed(() => {
  const n = typeof props.seed === 'number' ? props.seed : hashString(String(props.seed))
  return ACCENT_VARS[Math.abs(n) % ACCENT_VARS.length]
})

function hashString(input) {
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    hash = input.charCodeAt(i) + ((hash << 5) - hash)
  }
  return hash
}
</script>

<style lang="scss" scoped>
.thumb-fallback {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
