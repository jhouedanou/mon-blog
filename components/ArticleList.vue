<template>
    <div class="article-list">
        <div class="article-list-container">
            <!-- Hero intro -->
            <section class="hero-intro">
                <div class="hero-intro__line">
                    <span class="hero-intro__eyebrow">— Journal {{ currentYear }} ·
                        <span v-if="articles && articles.length">{{ articles.length }} articles</span>
                    </span>
                </div>
                <h1 class="hero-intro__title">
                    <span class="hero-intro__word">Jean<span class="hero-intro__dot">-</span>Luc</span>
                    <span class="hero-intro__word hero-intro__word--accent">Houédanou</span>
                </h1>
                <p class="hero-intro__lede">
                    Retours d'expérience, outils web, administration système et culture numérique depuis Abidjan.
                </p>
            </section>

            <!-- Sticky search -->
            <div class="sticky-filters">
                <SearchBar v-model="searchQuery" />
            </div>

            <div v-if="filteredArticles && filteredArticles.length" class="mosaic-grid">
                <NuxtLink
                    v-for="(article, index) in displayedArticles"
                    :key="article._path"
                    :to="localePath(article._path)"
                    class="mosaic-tile"
                    :class="[
                        `mosaic-tile--${getTileSize(index)}`,
                        `mosaic-tile--accent-${getAccentVariant(index)}`
                    ]"
                    :style="[getTileBackground(article, index), getAnimationDelay(index)]"
                >
                    <span v-if="isNew(article)" class="mosaic-badge">
                        <span class="mosaic-badge__dot"></span>
                        {{ $t('newBadge') }}
                    </span>

                    <div class="mosaic-overlay">
                        <div class="mosaic-text-block">
                            <h2 class="mosaic-title">
                                {{ article.title }}
                            </h2>
                            <p v-if="getExcerptText(article)" class="mosaic-excerpt">{{ getExcerptText(article) }}</p>
                        </div>
                        <div class="mosaic-meta">
                            <span class="mosaic-date">{{ formatDate(article.createdAt) }}</span>
                            <span v-if="getReadingTime(article)" class="mosaic-reading-time">
                                <i class="material-icons">schedule</i>
                                {{ getReadingTime(article) }} {{ $t('readingTime') }}
                            </span>
                        </div>
                        <span class="mosaic-arrow" aria-hidden="true">→</span>
                    </div>
                </NuxtLink>
            </div>
            <p v-else class="no-articles">{{ $t('noArticles') }}</p>

            <!-- Infinite scroll sentinel -->
            <div ref="scrollSentinel" class="scroll-sentinel">
                <div v-if="isLoadingMore" class="loading-more">
                    <span class="loading-dot"></span>
                    <span class="loading-dot"></span>
                    <span class="loading-dot"></span>
                </div>
                <p v-if="allLoaded && displayedArticles.length > 0" class="all-loaded-msg">
                    — Fin du journal —
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useAsyncData } from '#app'
import { useI18n } from 'vue-i18n'
import { useLocalePath } from '#i18n'
import SearchBar from '~/components/SearchBar.vue'

const localePath = useLocalePath()
const { locale } = useI18n()

const ITEMS_PER_PAGE = 6
const displayCount = ref(ITEMS_PER_PAGE)
const isLoadingMore = ref(false)
const scrollSentinel = ref(null)
let infiniteObserver = null
const searchQuery = ref('')
const currentYear = new Date().getFullYear()

const { data: articles } = await useAsyncData('articles', () =>
    queryContent(locale.value)
        .sort({ createdAt: -1 })
        .find()
        .then(articles => {
            return articles
                .map(article => {
                    if (article.createdAt) {
                        const ts = new Date(article.createdAt).getTime()
                        article.timestamp = isNaN(ts) ? 0 : ts
                    } else {
                        article.timestamp = 0
                    }
                    return article
                })
                .sort((a, b) => b.timestamp - a.timestamp)
        })
)

const filteredArticles = computed(() => {
    if (!articles.value) return []
    let result = articles.value

    if (searchQuery.value.trim()) {
        const q = searchQuery.value.toLowerCase().trim()
        result = result.filter(a =>
            (a.title && a.title.toLowerCase().includes(q)) ||
            (a.description && a.description.toLowerCase().includes(q))
        )
    }

    return result
})

watch(searchQuery, () => {
    displayCount.value = ITEMS_PER_PAGE
})

const displayedArticles = computed(() => {
    if (!filteredArticles.value) return []
    return filteredArticles.value.slice(0, displayCount.value)
})

const allLoaded = computed(() => {
    if (!filteredArticles.value) return true
    return displayCount.value >= filteredArticles.value.length
})

function loadMore() {
    if (allLoaded.value || isLoadingMore.value) return
    isLoadingMore.value = true
    setTimeout(() => {
        displayCount.value += ITEMS_PER_PAGE
        isLoadingMore.value = false
    }, 300)
}

onMounted(() => {
    infiniteObserver = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                loadMore()
            }
        },
        { rootMargin: '300px' }
    )
    if (scrollSentinel.value) {
        infiniteObserver.observe(scrollSentinel.value)
    }
})

onUnmounted(() => {
    infiniteObserver?.disconnect()
})

function getReadingTime(article) {
    if (!article.body) return null
    const text = extractText(article.body)
    const words = text.split(/\s+/).filter(w => w.length > 0).length
    return Math.ceil(words / 200) || 1
}

function extractText(node) {
    if (!node) return ''
    if (typeof node === 'string') return node
    if (node.value) return node.value
    if (node.children && Array.isArray(node.children)) {
        return node.children.map(extractText).join(' ')
    }
    return ''
}

function isNew(article) {
    if (!article.createdAt) return false
    const created = new Date(article.createdAt).getTime()
    const sevenDays = 7 * 24 * 60 * 60 * 1000
    return (Date.now() - created) < sevenDays
}

const fallbackGradients = [
    'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 58%, color-mix(in srgb, var(--accent) 34%, var(--bg-secondary)) 100%)',
    'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 62%, color-mix(in srgb, var(--accent-violet) 30%, var(--bg-secondary)) 100%)',
    'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 60%, color-mix(in srgb, var(--accent-magenta) 28%, var(--bg-secondary)) 100%)',
    'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 64%, color-mix(in srgb, var(--accent-amber) 28%, var(--bg-secondary)) 100%)',
]

const accentVariants = ['teal', 'magenta', 'violet', 'teal', 'amber', 'magenta']

function getAccentVariant(index) {
    return accentVariants[index % accentVariants.length]
}

function getTileSize(index) {
    // Pattern: large, normal, normal, normal, large, normal → magazine grid
    const posInGroup = index % 6
    if (posInGroup === 0) return 'hero'
    if (posInGroup === 3) return 'wide'
    return 'normal'
}

function getTileBackground(article, index) {
    if (article.image) {
        return {
            backgroundImage: `url(${article.image})`,
        }
    }
    return {
        backgroundImage: fallbackGradients[index % fallbackGradients.length],
    }
}

function getAnimationDelay(index) {
    return {
        animationDelay: `${Math.min(index * 0.06, 0.6)}s`,
    }
}

function getExcerptText(article) {
    const content = article.description || ''
    const text = content.replace(/<[^>]*>/g, '')
    return text.length > 120 ? text.slice(0, 120) + '…' : text
}

function formatDate(createdAt) {
    if (createdAt) {
        const date = new Date(createdAt)
        if (isNaN(date.getTime())) return ''
        return new Intl.DateTimeFormat('fr-FR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).format(date).replace('.', '')
    }
    return ''
}
</script>

<style lang="scss" scoped>
.article-list {
    padding: 0 0 4rem;
}

.article-list-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1.5rem;
}

/* ==========================================
   Hero intro
   ========================================== */
.hero-intro {
    padding: 4.25rem 0 3rem;
    border-bottom: 1px solid var(--border-color);
    margin-bottom: 2rem;
}

.hero-intro__line {
    margin-bottom: 1.5rem;
}

.hero-intro__eyebrow {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--accent);
}

.hero-intro__title {
    font-family: var(--font-display);
    font-weight: 650;
    font-size: clamp(2.35rem, 5vw, 4.25rem);
    line-height: 1;
    letter-spacing: -0.03em;
    color: var(--text-primary);
    margin: 0 0 1.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.2em 0.35em;
    align-items: baseline;
}

.hero-intro__word {
    display: inline-block;

    &--accent {
        font-weight: 650;
        color: var(--accent);
        position: relative;

        &::after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0.08em;
            height: 0.04em;
            background: var(--accent);
            opacity: 0.22;
            transform-origin: left;
            animation: underlineSlide 1.4s cubic-bezier(0.65, 0, 0.35, 1) 0.4s both;
        }
    }
}

.hero-intro__dot {
    color: var(--accent);
    font-weight: 650;
}

@keyframes underlineSlide {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
}

.hero-intro__lede {
    font-family: var(--font-sans);
    font-size: 1.08rem;
    color: var(--text-secondary);
    max-width: 580px;
    line-height: 1.55;
    margin: 0;
}

/* ==========================================
   Sticky filters bar
   ========================================== */
.sticky-filters {
    position: sticky;
    top: 72px;
    z-index: 50;
    background: var(--bg-glass);
    backdrop-filter: blur(18px) saturate(140%);
    -webkit-backdrop-filter: blur(18px) saturate(140%);
    padding: 1rem 0;
    margin: 0 -1.5rem 2rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    border-bottom: 1px solid var(--border-color);
    transition: background-color 0.3s ease;
}

/* ==========================================
   Magazine grid
   ========================================== */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(24px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.mosaic-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-auto-rows: 200px;
    gap: 1rem;
}

.mosaic-tile {
    position: relative;
    border-radius: 6px;
    overflow: hidden;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: var(--bg-card);
    cursor: pointer;
    text-decoration: none;
    transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
                box-shadow 0.45s cubic-bezier(0.22, 1, 0.36, 1),
                border-color 0.3s ease;
    animation: fadeInUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
    border: 1px solid var(--border-color);
    grid-column: span 2;
    grid-row: span 2;

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: inherit;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1),
                    filter 0.7s ease;
        z-index: 0;
        filter: saturate(0.9);
    }

    &:hover {
        transform: translateY(-3px);
        box-shadow: var(--card-shadow-hover);

        &::before {
            transform: scale(1.05);
            filter: saturate(1.1);
        }

        .mosaic-title {
            color: #ffffff;
        }

        .mosaic-arrow {
            transform: translate(4px, -4px);
            color: #ffffff;
        }
    }

    /* Magazine sizes — hero = wide+tall, wide = wide, normal = standard */
    &--hero {
        grid-column: span 4;
        grid-row: span 3;

        .mosaic-title {
            font-size: clamp(1.3rem, 2.4vw, 1.9rem);
            line-height: 1.1;
        }

        .mosaic-excerpt {
            font-size: 0.95rem;
            -webkit-line-clamp: 3;
        }
    }

    &--wide {
        grid-column: span 4;
        grid-row: span 2;

        .mosaic-title {
            font-size: clamp(1.1rem, 1.8vw, 1.5rem);
        }
    }

    &--normal {
        grid-column: span 2;
        grid-row: span 2;
    }

    /* Accent variants — calm border treatment */
    &--accent-teal {
        --tile-accent: var(--accent);
    }
    &--accent-magenta {
        --tile-accent: var(--accent-magenta);
    }
    &--accent-violet {
        --tile-accent: var(--accent-violet);
    }
    &--accent-amber {
        --tile-accent: var(--accent-amber);
    }

    &:hover {
        border-color: var(--tile-accent, var(--accent));
    }
}

.mosaic-badge {
    position: absolute;
    top: 14px;
    left: 14px;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: rgba(10, 10, 15, 0.85);
    backdrop-filter: blur(8px);
    color: #fff;
    font-family: var(--font-mono);
    font-size: 0.65rem;
    font-weight: 600;
    text-transform: uppercase;
    padding: 0.3rem 0.65rem;
    border-radius: 2px;
    z-index: 3;
    letter-spacing: 0.12em;
    border: 1px solid rgba(255, 255, 255, 0.18);
}

.mosaic-badge__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent);
}

@keyframes pulseDot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%      { opacity: 0.5; transform: scale(1.25); }
}

.mosaic-overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
    background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.9) 0%,
        rgba(0, 0, 0, 0.55) 45%,
        rgba(0, 0, 0, 0.05) 100%
    );
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 1.5rem;
    transition: background 0.3s ease;
}

.mosaic-tile:hover .mosaic-overlay {
    background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.95) 0%,
        rgba(0, 0, 0, 0.65) 50%,
        rgba(0, 0, 0, 0.1) 100%
    );
}

.mosaic-text-block {
    margin-bottom: 0.65rem;
}

.mosaic-title {
    font-family: var(--font-display);
    font-weight: 650;
    font-size: clamp(1rem, 1.2vw, 1.2rem);
    line-height: 1.18;
    color: #ffffff;
    letter-spacing: -0.015em;
    margin: 0 0 0.4rem 0;
    text-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
    transition: color 0.25s ease;
}

.mosaic-excerpt {
    font-family: var(--font-sans);
    font-size: 0.86rem;
    color: rgba(255, 255, 255, 0.82);
    line-height: 1.52;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.mosaic-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-top: 0.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.mosaic-date {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.55);
}

.mosaic-reading-time {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.06em;
    color: rgba(255, 255, 255, 0.55);

    .material-icons {
        font-size: 0.85rem;
    }
}

.mosaic-arrow {
    position: absolute;
    top: 1.2rem;
    right: 1.2rem;
    font-family: var(--font-mono);
    font-size: 1.4rem;
    color: rgba(255, 255, 255, 0.7);
    transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), color 0.25s ease;
    z-index: 2;
}

/* ==========================================
   Infinite scroll sentinel
   ========================================== */
.scroll-sentinel {
    padding: 3rem 0 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60px;
}

.loading-more {
    display: flex;
    gap: 0.4rem;
    align-items: center;
}

.loading-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent);
    animation: loadingBounce 1.2s infinite ease-in-out;

    &:nth-child(2) { animation-delay: 0.15s; }
    &:nth-child(3) { animation-delay: 0.3s; }
}

@keyframes loadingBounce {
    0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
    40%           { transform: scale(1);   opacity: 1; }
}

.all-loaded-msg {
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.2em;
}

.no-articles {
    text-align: center;
    color: var(--text-muted);
    font-style: italic;
    padding: 3rem 0;
}

/* ==========================================
   Responsive
   ========================================== */
@media screen and (max-width: 1023px) {
    .mosaic-grid {
        grid-template-columns: repeat(4, 1fr);
    }

    .mosaic-tile {
        grid-column: span 2;
        grid-row: span 2;

        &--hero {
            grid-column: span 4;
            grid-row: span 3;
        }

        &--wide {
            grid-column: span 4;
            grid-row: span 2;
        }
    }
}

@media screen and (max-width: 640px) {
    .article-list-container {
        padding: 0 1rem;
    }

    .sticky-filters {
        margin: 0 -1rem 1.5rem;
        padding-left: 1rem;
        padding-right: 1rem;
        top: 72px;
    }

    .hero-intro {
        padding: 2.5rem 0 2rem;
    }

    .hero-intro__title {
        font-size: clamp(2.25rem, 12vw, 3.5rem);
    }

    .mosaic-grid {
        grid-template-columns: 1fr;
        grid-auto-rows: 240px;
    }

    .mosaic-tile,
    .mosaic-tile--hero,
    .mosaic-tile--wide,
    .mosaic-tile--normal {
        grid-column: span 1;
        grid-row: span 1;
    }

    .mosaic-tile--hero {
        grid-row: span 1;

        .mosaic-title {
            font-size: 1.5rem;
        }
    }

    .mosaic-overlay {
        padding: 1.2rem;
    }
}
</style>
