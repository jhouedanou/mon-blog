<template>
    <aside v-if="links && links.length >= 2" class="toc">
        <button class="toc__mobile-toggle" @click="isOpen = !isOpen" :aria-expanded="isOpen" aria-label="Table des matières">
            <i class="material-icons">toc</i>
        </button>
        <nav class="toc__nav" :class="{ 'toc__nav--open': isOpen }" :aria-label="$t('tableOfContents')">
            <h4 class="toc__heading">{{ $t('tableOfContents') }}</h4>
            <ul class="toc__list">
                <li
                    v-for="link in links"
                    :key="link.id"
                    class="toc__item"
                    :class="{
                        'toc__item--active': activeId === link.id,
                        [`toc__item--depth-${link.depth}`]: true
                    }"
                >
                    <a
                        :href="`#${link.id}`"
                        class="toc__link"
                        @click.prevent="scrollToSection(link.id)"
                    >
                        {{ link.text }}
                    </a>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
    links: {
        type: Array,
        default: () => []
    }
})

const activeId = ref('')
const isOpen = ref(false)
let observer = null

function scrollToSection(id) {
    const el = document.getElementById(id)
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        isOpen.value = false
    }
}

onMounted(() => {
    if (!props.links || props.links.length < 2) return

    const ids = props.links.map(l => l.id)
    observer = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    activeId.value = entry.target.id
                    break
                }
            }
        },
        { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )

    ids.forEach(id => {
        const el = document.getElementById(id)
        if (el) observer.observe(el)
    })
})

onUnmounted(() => {
    observer?.disconnect()
})
</script>

<style lang="scss" scoped>
.toc {
    position: sticky;
    top: calc(72px + 1.5rem);
    align-self: flex-start;
    max-height: calc(100dvh - 104px);
}

.toc__mobile-toggle {
    display: none;
    position: fixed;
    bottom: 5rem;
    right: 2rem;
    width: 48px;
    height: 48px;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    background: var(--bg-card);
    color: var(--text-primary);
    cursor: pointer;
    align-items: center;
    justify-content: center;
    box-shadow: var(--card-shadow);
    z-index: 89;
    transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease, transform 0.25s ease;

    &:hover {
        border-color: var(--accent);
        color: var(--accent);
        transform: translateY(-2px);
    }

    .material-icons {
        font-size: 1.4rem;
    }
}

.toc__nav {
    position: static;
    max-height: calc(100dvh - 104px);
    overflow-y: auto;
    padding: 1rem 0;
    background: color-mix(in srgb, var(--bg-card) 78%, transparent);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    box-shadow: var(--card-shadow);
    scrollbar-width: thin;
    scrollbar-color: var(--border-strong) transparent;
}

.toc__heading {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--accent);
    margin: 0 0 1rem 0;
    padding-left: 1rem;
}

.toc__list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.toc__item {
    margin: 0;

    &--depth-3 {
        .toc__link {
            padding-left: 2rem;
            font-size: 0.82rem;
        }
    }

    &--active > .toc__link {
        color: var(--accent);
        border-left-color: var(--accent);
        background: var(--accent-soft);
        font-weight: 600;
    }
}

.toc__link {
    display: block;
    padding: 0.5rem 1rem;
    font-family: var(--font-sans);
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text-secondary);
    text-decoration: none;
    border-left: 2px solid transparent;
    transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease;
    line-height: 1.45;
    text-wrap: pretty;

    &:hover {
        color: var(--accent);
        border-left-color: var(--border-strong);
    }
}

@media screen and (max-width: 1100px) {
    .toc {
        position: relative;
        top: auto;
        max-height: none;
    }

    .toc__mobile-toggle {
        display: flex;
    }

    .toc__nav {
        display: none;
        position: fixed;
        bottom: 6.5rem;
        right: 2rem;
        width: 280px;
        max-height: 50vh;
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        box-shadow: var(--card-shadow-hover);
        padding: 1rem 0;
        z-index: 88;

        &--open {
            display: block;
        }
    }
}
</style>
