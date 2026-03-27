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
    position: relative;
}

.toc__mobile-toggle {
    display: none;
    position: fixed;
    bottom: 5rem;
    right: 2rem;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: none;
    background: var(--text-primary, #1a1a2e);
    color: var(--bg-card, #fff);
    cursor: pointer;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    z-index: 89;

    .material-icons {
        font-size: 1.4rem;
    }
}

.toc__nav {
    position: sticky;
    top: 80px;
    max-height: calc(100vh - 100px);
    overflow-y: auto;
    padding: 1rem 0;
}

.toc__heading {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-muted);
    margin: 0 0 0.75rem 0;
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
        color: #2EC4B6;
        border-left-color: #2EC4B6;
        background: rgba(46, 196, 182, 0.06);
    }
}

.toc__link {
    display: block;
    padding: 0.4rem 1rem;
    font-family: 'Inter', sans-serif;
    font-size: 0.88rem;
    color: var(--text-secondary);
    text-decoration: none;
    border-left: 3px solid transparent;
    transition: all 0.2s ease;
    line-height: 1.4;

    &:hover {
        color: #2EC4B6;
        border-left-color: var(--border-color);
    }
}

@media screen and (max-width: 1100px) {
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
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        padding: 1rem 0;
        z-index: 88;

        &--open {
            display: block;
        }
    }
}
</style>
