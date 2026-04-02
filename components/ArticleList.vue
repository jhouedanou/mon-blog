<template>
    <div class="article-list">
        <div class="article-list-container container">
            <!-- Barre sticky : recherche + tags -->
            <div class="sticky-filters">
                <SearchBar v-model="searchQuery" />
                <TagFilter
                    v-if="availableTags.length"
                    :tags="availableTags"
                    :selectedTags="selectedTags"
                    @update:selectedTags="selectedTags = $event"
                />
            </div>

            <div v-if="filteredArticles && filteredArticles.length" class="mosaic-grid">
                <NuxtLink
                    v-for="(article, index) in displayedArticles"
                    :key="article._path"
                    :to="localePath(article._path)"
                    class="mosaic-tile"
                    :class="{ 'mosaic-tile--large': getTileSize(index) === 'large' }"
                    :style="[getTileBackground(article, index), getAnimationDelay(index)]"
                >
                    <span v-if="isNew(article)" class="mosaic-badge">{{ $t('newBadge') }}</span>

                    <div class="mosaic-overlay">
                        <div v-if="getArticleTags(article).length" class="mosaic-tags">
                            <span
                                v-for="tag in getArticleTags(article)"
                                :key="tag"
                                class="mosaic-tag"
                            >{{ tag }}</span>
                        </div>
                        <div class="mosaic-text-block" :style="getTextBlockStyle(index)">
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
                    </div>
                </NuxtLink>
            </div>
            <p v-else class="no-articles">{{ $t('noArticles') }}</p>

            <!-- Sentinel pour le défilement infini -->
            <div ref="scrollSentinel" class="scroll-sentinel">
                <div v-if="isLoadingMore" class="loading-more">
                    <span class="loading-dot"></span>
                    <span class="loading-dot"></span>
                    <span class="loading-dot"></span>
                </div>
                <p v-if="allLoaded && displayedArticles.length > 0" class="all-loaded-msg">
                    — Tous les articles ont été chargés —
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
import TagFilter from '~/components/TagFilter.vue'

const localePath = useLocalePath()
const { locale } = useI18n()

const ITEMS_PER_PAGE = 6
const displayCount = ref(ITEMS_PER_PAGE)
const isLoadingMore = ref(false)
const scrollSentinel = ref(null)
let infiniteObserver = null
const searchQuery = ref('')
const selectedTags = ref([])

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

function getArticleTags(article) {
    if (article.tags && Array.isArray(article.tags)) {
        return article.tags.map(t => t.toLowerCase().trim())
    }
    return []
}

// Extraire tous les tags uniques depuis les articles
const allTags = computed(() => {
    if (!articles.value) return []
    const tagCount = {}
    articles.value.forEach(article => {
        getArticleTags(article).forEach(t => {
            tagCount[t] = (tagCount[t] || 0) + 1
        })
    })
    // Trier par fréquence décroissante
    return Object.keys(tagCount).sort((a, b) => tagCount[b] - tagCount[a])
})

const availableTags = computed(() => {
    const source = searchQuery.value.trim() ? filteredArticles.value : articles.value
    if (!source) return []
    const usedTags = new Set()
    source.forEach(article => {
        getArticleTags(article).forEach(t => usedTags.add(t))
    })
    // Garder l'ordre de fréquence globale
    return allTags.value.filter(t => usedTags.has(t))
})

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

    if (selectedTags.value.length) {
        result = result.filter(a => {
            const tags = getArticleTags(a)
            return selectedTags.value.some(t => tags.includes(t))
        })
    }

    return result
})

// Reset displayed count when search or tags change
watch([searchQuery, selectedTags], () => {
    displayCount.value = ITEMS_PER_PAGE
}, { deep: true })

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

const titleColors = [
    '#FF6F61',
    '#2EC4B6',
    '#F5B700',
    '#55D6BE',
    '#9B5DE5',
    '#00BBF9',
]

const fallbackGradients = [
    'linear-gradient(135deg, #1a1a2e, #16213e)',
    'linear-gradient(135deg, #0f3460, #533483)',
    'linear-gradient(135deg, #2d4059, #ea5455)',
    'linear-gradient(135deg, #222831, #393e46)',
    'linear-gradient(135deg, #1b262c, #0f4c75)',
    'linear-gradient(135deg, #2c3e50, #3498db)',
]

function getTitleColor(index) {
    return titleColors[index % titleColors.length]
}

function getTextBlockStyle(index) {
    const color = getTitleColor(index)
    return {
        borderLeft: `3px solid ${color}`,
        paddingLeft: '0.75rem',
    }
}

function getTileSize(index) {
    const posInGroup = index % 6
    return (posInGroup === 0 || posInGroup === 3) ? 'large' : 'normal'
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
        animationDelay: `${index * 0.08}s`,
    }
}

function getExcerptText(article) {
    const content = article.description || ''
    const text = content.replace(/<[^>]*>/g, '')
    return text.length > 100 ? text.slice(0, 100) + '...' : text
}

function formatDate(createdAt) {
    if (createdAt) {
        const date = new Date(createdAt)
        if (isNaN(date.getTime())) return 'Date non disponible'
        return new Intl.DateTimeFormat('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(date)
    }
    return 'Date non disponible'
}
</script>

<style lang="scss" scoped>
.article-list {
    padding: 1.5rem 0;
}

.article-list-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
}

/* Staggered animation */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.mosaic-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 280px;
    gap: 12px;
}

.mosaic-tile {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat !important;
    background-color: #1a1a2e;
    cursor: pointer;
    text-decoration: none;
    transition: box-shadow 0.3s ease;
    animation: fadeInUp 0.5s ease both;

    // Prevent image repetition in pseudo-element
    &::before {
        content: '';
        position: absolute;
        inset: -8px;
        background: inherit;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat !important;
        transition: transform 0.4s ease;
        z-index: 0;
    }

    &:hover {
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);

        &::before {
            transform: scale(1.06);
        }
    }

    &--large {
        grid-row: span 2;
    }
}

.mosaic-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    background: #FF6F61;
    color: #fff;
    font-family: 'Inter', sans-serif;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    padding: 0.2rem 0.6rem;
    border-radius: 12px;
    z-index: 2;
    letter-spacing: 0.03em;
}

.mosaic-overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
    background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.85) 0%,
        rgba(0, 0, 0, 0.4) 50%,
        rgba(0, 0, 0, 0.1) 100%
    );
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 1.2rem;
}

.mosaic-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    margin-bottom: 0.5rem;
}

.mosaic-tag {
    font-family: 'Inter', sans-serif;
    font-size: 0.65rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: rgba(255, 255, 255, 0.9);
    background: rgba(255, 255, 255, 0.15);
    padding: 0.15rem 0.5rem;
    border-radius: 10px;
}

.mosaic-text-block {
    margin-bottom: 0.4rem;
}

.mosaic-title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    font-size: 1.1rem;
    line-height: 1.3;
    color: #ffffff;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
    margin: 0 0 0.3rem 0;

    .mosaic-tile--large & {
        font-size: 1.5rem;
    }
}

.mosaic-excerpt {
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.4;
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
}

.mosaic-date {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.6);
}

.mosaic-reading-time {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.6);

    .material-icons {
        font-size: 0.9rem;
    }
}

/* Sticky filters bar */
.sticky-filters {
    position: sticky;
    top: 60px; // height of site-header
    z-index: 50;
    background: var(--bg-primary);
    padding: 1rem 0 0.5rem;
    margin: 0 -1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border-color);
    transition: background-color 0.3s ease;
}

/* Infinite scroll sentinel */
.scroll-sentinel {
    padding: 2rem 0;
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
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent, #2EC4B6);
    animation: loadingBounce 1.2s infinite ease-in-out;

    &:nth-child(2) {
        animation-delay: 0.15s;
    }
    &:nth-child(3) {
        animation-delay: 0.3s;
    }
}

@keyframes loadingBounce {
    0%, 80%, 100% {
        transform: scale(0.6);
        opacity: 0.4;
    }
    40% {
        transform: scale(1);
        opacity: 1;
    }
}

.all-loaded-msg {
    color: var(--text-muted);
    font-size: 0.85rem;
    font-style: italic;
}

.no-articles {
    text-align: center;
    color: var(--text-muted);
    font-style: italic;
    padding: 2rem 0;
}

// Tablet: 2 columns
@media screen and (max-width: 1023px) {
    .mosaic-grid {
        grid-template-columns: repeat(2, 1fr);
        grid-auto-rows: 250px;
    }
}

// Mobile: 1 column
@media screen and (max-width: 640px) {
    .mosaic-grid {
        grid-template-columns: 1fr;
        grid-auto-rows: 220px;
    }

    .mosaic-tile--large {
        grid-row: span 2;
    }

    .mosaic-title {
        font-size: 1rem;

        .mosaic-tile--large & {
            font-size: 1.2rem;
        }
    }
}
</style>
