<template>
    <figure class="carousel">
        <div class="carousel__stage" :style="stageStyle">
            <button
                v-if="!isLoaded"
                type="button"
                class="carousel__poster"
                :style="posterStyle"
                :aria-label="`Lire ${current.title}`"
                @click="load"
            >
                <span class="carousel__veil" aria-hidden="true"></span>
                <span class="carousel__play" aria-hidden="true">
                    <i class="material-icons">play_arrow</i>
                </span>
                <span class="carousel__caption">
                    <span class="carousel__index">{{ pad(activeIndex + 1) }}</span>
                    <span class="carousel__title">{{ current.title }}</span>
                </span>
            </button>

            <iframe
                v-else
                :key="current.src"
                :src="frameSrc"
                :title="current.title"
                frameborder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture; web-share"
                allowfullscreen
                referrerpolicy="strict-origin-when-cross-origin"
            ></iframe>
        </div>

        <!-- `div` et non `ol` : les styles de liste de l'article injectent un
             compteur en ::before qui doublerait la numérotation. -->
        <div class="carousel__bar" role="group" :aria-label="label">
            <button
                type="button"
                class="carousel__arrow"
                :disabled="activeIndex === 0"
                aria-label="Morceau précédent"
                @click="step(-1)"
            >←</button>

            <div class="carousel__thumbs">
                <button
                    v-for="(item, i) in items"
                    :key="item.src"
                    type="button"
                    class="carousel__thumb"
                    :class="{ 'is-active': i === activeIndex }"
                    :style="thumbStyle(item)"
                    :aria-label="item.title"
                    :aria-current="i === activeIndex ? 'true' : undefined"
                    @click="select(i)"
                >
                    <span class="carousel__thumb-num">{{ pad(i + 1) }}</span>
                </button>
            </div>

            <button
                type="button"
                class="carousel__arrow"
                :disabled="activeIndex === items.length - 1"
                aria-label="Morceau suivant"
                @click="step(1)"
            >→</button>
        </div>
    </figure>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
    /** [{ src, title, poster? }] */
    items: { type: Array, required: true },
    label: { type: String, default: 'Sélecteur de morceaux' },
    /** Hauteur fixe en pixels. Sinon, ratio 16/9. */
    height: { type: [String, Number], default: null },
})

const { activeEmbedSrc } = useEmbedPlayer()

const activeIndex = ref(0)
const current = computed(() => props.items[activeIndex.value] ?? {})

// Une seule diapositive est rendue à la fois : changer de morceau démonte
// l'iframe précédente, donc coupe son son.
const isLoaded = computed(() => activeEmbedSrc.value === current.value.src)

function load() {
    activeEmbedSrc.value = current.value.src
}

function select(i) {
    activeIndex.value = i
}

function step(delta) {
    const next = activeIndex.value + delta
    if (next >= 0 && next < props.items.length) activeIndex.value = next
}

function pad(n) {
    return String(n).padStart(2, '0')
}

const frameSrc = computed(() => {
    const src = current.value.src || ''
    return src + (src.includes('?') ? '&' : '?') + 'autoplay=1'
})

const stageStyle = computed(() =>
    props.height
        ? { height: `${parseInt(props.height, 10)}px` }
        : { aspectRatio: '16 / 9' }
)

const posterStyle = computed(() =>
    current.value.poster ? { backgroundImage: `url("${current.value.poster}")` } : {}
)

function thumbStyle(item) {
    return item.poster ? { backgroundImage: `url("${item.poster}")` } : {}
}
</script>

<style lang="scss" scoped>
.carousel {
    margin: 2.75rem 0;
}

/* ---------- Scène ---------- */
.carousel__stage {
    position: relative;
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
}

.carousel__stage iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
}

.carousel__poster {
    position: absolute;
    inset: 0;
    width: 100%;
    padding: 0;
    display: block;
    background-color: var(--bg-secondary);
    background-size: cover;
    background-position: center;
    border: 0;
    cursor: pointer;
    font-family: var(--font-sans);
}

.carousel__veil {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.78) 0%,
        rgba(0, 0, 0, 0.32) 45%,
        rgba(0, 0, 0, 0.12) 100%
    );
    transition: background 0.3s ease;
}

.carousel__poster:hover .carousel__veil {
    background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.82) 0%,
        rgba(0, 0, 0, 0.4) 50%,
        rgba(0, 0, 0, 0.18) 100%
    );
}

.carousel__play {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 66px;
    height: 66px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.14);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    color: #fff;
    transition: background 0.25s ease, transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);

    .material-icons {
        font-size: 2.1rem;
    }
}

.carousel__poster:hover .carousel__play {
    background: var(--accent);
    border-color: var(--accent);
    transform: translate(-50%, -50%) scale(1.08);
}

.carousel__caption {
    position: absolute;
    left: 1.35rem;
    right: 1.35rem;
    bottom: 1.15rem;
    display: flex;
    align-items: baseline;
    gap: 0.7rem;
    text-align: left;
}

.carousel__index {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    color: rgba(255, 255, 255, 0.62);
}

.carousel__title {
    font-family: var(--font-display);
    font-size: 1.28rem;
    font-weight: 600;
    letter-spacing: -0.015em;
    color: #fff;
}

/* ---------- Barre de navigation ---------- */
.carousel__bar {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-top: 0.7rem;
}

.carousel__arrow {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    background: transparent;
    color: var(--text-secondary);
    font-family: var(--font-mono);
    font-size: 1rem;
    cursor: pointer;
    transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;

    &:hover:not(:disabled) {
        color: var(--accent);
        border-color: var(--accent);
        background: var(--accent-soft);
    }

    &:disabled {
        opacity: 0.3;
        cursor: default;
    }
}

.carousel__thumbs {
    display: flex;
    gap: 0.45rem;
    flex: 1;
    min-width: 0;
    overflow-x: auto;
    scrollbar-width: none;
    padding: 2px;

    &::-webkit-scrollbar {
        display: none;
    }
}

/* Vignette en background-image : un `img` hériterait des marges et de l'ombre
   que l'article applique aux images de contenu. */
.carousel__thumb {
    position: relative;
    flex: 1 1 0;
    min-width: 64px;
    aspect-ratio: 16 / 9;
    padding: 0;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    background-color: var(--bg-secondary);
    background-size: cover;
    background-position: center;
    cursor: pointer;
    opacity: 0.55;
    overflow: hidden;
    transition: opacity 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;

    &::after {
        content: '';
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.28);
        transition: background 0.22s ease;
    }

    &:hover {
        opacity: 1;
        border-color: var(--accent);
    }

    &.is-active {
        opacity: 1;
        border-color: var(--accent);
        box-shadow: 0 0 0 2px var(--accent-soft);

        &::after {
            background: rgba(0, 0, 0, 0.12);
        }
    }
}

.carousel__thumb-num {
    position: absolute;
    left: 5px;
    bottom: 3px;
    z-index: 1;
    font-family: var(--font-mono);
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: #fff;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
}

@media screen and (max-width: 640px) {
    .carousel__title {
        font-size: 1.05rem;
    }

    .carousel__caption {
        left: 1rem;
        right: 1rem;
        bottom: 0.9rem;
    }

    .carousel__thumb {
        flex: 0 0 auto;
        width: 72px;
    }
}
</style>
