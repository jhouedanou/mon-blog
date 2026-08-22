<template>
    <figure class="embed" :style="figureStyle">
        <div class="embed__frame" :style="frameStyle">
            <button
                v-if="!isActive"
                type="button"
                class="embed__poster"
                :class="{ 'embed__poster--image': poster }"
                :style="posterStyle"
                :aria-label="`Lire ${title || 'le média'}`"
                @click="activate"
            >
                <span v-if="poster" class="embed__veil" aria-hidden="true"></span>
                <span class="embed__play" aria-hidden="true">
                    <i class="material-icons">play_arrow</i>
                </span>
                <span class="embed__label">{{ title || 'Lancer le lecteur' }}</span>
            </button>

            <iframe
                v-else
                :src="frameSrc"
                :title="title || 'Lecteur intégré'"
                frameborder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture; web-share"
                allowfullscreen
                referrerpolicy="strict-origin-when-cross-origin"
            ></iframe>
        </div>
    </figure>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    src: { type: String, required: true },
    title: { type: String, default: '' },
    /** Hauteur fixe en pixels (lecteurs audio). Sinon, ratio 16/9. */
    height: { type: [String, Number], default: null },
    /** Ratio personnalisé, ex. « 9 / 16 » pour une capture verticale. */
    ratio: { type: String, default: '' },
    /** Largeur maximale, utile pour ne pas étirer une vidéo verticale. */
    maxWidth: { type: [String, Number], default: null },
    /** Image d'affiche affichée avant le chargement du lecteur. */
    poster: { type: String, default: '' },
})

const { activeEmbedSrc } = useEmbedPlayer()

const isActive = computed(() => activeEmbedSrc.value === props.src)

function activate() {
    activeEmbedSrc.value = props.src
}

// Beaucoup de fournisseurs acceptent `autoplay=1` ; ceux qui l'ignorent
// affichent simplement leur propre bouton de lecture.
const frameSrc = computed(() =>
    props.src + (props.src.includes('?') ? '&' : '?') + 'autoplay=1'
)

const frameStyle = computed(() => {
    if (props.height) return { height: `${parseInt(props.height, 10)}px` }
    return { aspectRatio: props.ratio || '16 / 9' }
})

const figureStyle = computed(() =>
    props.maxWidth
        ? { maxWidth: `${parseInt(props.maxWidth, 10)}px`, marginInline: 'auto' }
        : {}
)

const posterStyle = computed(() =>
    props.poster ? { backgroundImage: `url("${props.poster}")` } : {}
)
</script>

<style lang="scss" scoped>
.embed {
    margin: 2.75rem 0;
}

.embed__frame {
    position: relative;
    width: 100%;
    border-radius: 6px;
    overflow: hidden;
    background: var(--bg-secondary);
}

.embed__frame iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
}

.embed__poster {
    position: absolute;
    inset: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.55rem;
    background-color: var(--bg-secondary);
    background-size: cover;
    background-position: center;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    cursor: pointer;
    font-family: var(--font-sans);
    transition: border-color 0.25s ease, background-color 0.25s ease;

    &:hover {
        border-color: var(--accent);

        .embed__play {
            background: var(--accent);
            color: var(--accent-contrast);
            border-color: var(--accent);
            transform: scale(1.06);
        }
    }

    /* Avec une affiche, le texte passe en blanc sur voile sombre. */
    &--image {
        .embed__play {
            border-color: rgba(255, 255, 255, 0.5);
            background: rgba(255, 255, 255, 0.14);
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
            color: #fff;
        }

        .embed__label {
            color: #fff;
            text-shadow: 0 1px 8px rgba(0, 0, 0, 0.6);
        }
    }

    > * {
        position: relative;
    }
}

.embed__veil {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.7) 0%,
        rgba(0, 0, 0, 0.3) 55%,
        rgba(0, 0, 0, 0.14) 100%
    );
}

.embed__play {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    border: 1px solid var(--border-strong);
    color: var(--text-primary);
    transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease;

    .material-icons {
        font-size: 1.7rem;
    }
}

.embed__label {
    font-size: 0.98rem;
    font-weight: 600;
    color: var(--text-primary);
}
</style>
