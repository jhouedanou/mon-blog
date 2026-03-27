<template>
    <div class="article-list">
        <div class="article-list-container container">
            <div v-if="articles && articles.length" class="mosaic-grid">
                <NuxtLink
                    v-for="(article, index) in visibleArticles"
                    :key="article._path"
                    :to="localePath(article._path)"
                    class="mosaic-tile"
                    :class="{ 'mosaic-tile--large': getTileSize(index) === 'large' }"
                    :style="getTileBackground(article, index)"
                >
                    <div class="mosaic-overlay">
                        <div class="mosaic-text-block" :style="getTextBlockStyle(index)">
                            <h2 class="mosaic-title">
                                {{ article.title }}
                            </h2>
                            <p v-if="getExcerptText(article)" class="mosaic-excerpt">{{ getExcerptText(article) }}</p>
                        </div>
                        <span class="mosaic-date">{{ formatDate(article.createdAt) }}</span>
                    </div>
                </NuxtLink>
            </div>
            <p v-else class="no-articles">{{ $t('noArticles') }}</p>
            <div ref="sentinel" class="mosaic-sentinel"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAsyncData } from '#app'
import { useI18n } from 'vue-i18n'
import { useLocalePath } from '#i18n'

const localePath = useLocalePath()
const { locale } = useI18n()

const ITEMS_PER_LOAD = 6
const visibleCount = ref(ITEMS_PER_LOAD)
const sentinel = ref(null)
let observer = null

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

const visibleArticles = computed(() => {
    if (!articles.value) return []
    return articles.value.slice(0, visibleCount.value)
})

const titleColors = [
    '#FF6F61', // coral
    '#2EC4B6', // teal
    '#F5B700', // gold
    '#55D6BE', // mint
    '#9B5DE5', // plum
    '#00BBF9', // sky blue
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
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }
    }
    return {
        backgroundImage: fallbackGradients[index % fallbackGradients.length],
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

function loadMore() {
    if (articles.value && visibleCount.value < articles.value.length) {
        visibleCount.value = Math.min(
            visibleCount.value + ITEMS_PER_LOAD,
            articles.value.length
        )
    }
}

onMounted(() => {
    if (!sentinel.value) return
    observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                loadMore()
            }
        },
        { rootMargin: '200px' }
    )
    observer.observe(sentinel.value)
})

onUnmounted(() => {
    if (observer) {
        observer.disconnect()
    }
})
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
    cursor: pointer;
    text-decoration: none;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: scale(1.02);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
    }

    &--large {
        grid-row: span 2;
    }
}

.mosaic-overlay {
    position: absolute;
    inset: 0;
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

.mosaic-date {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.6);
}

.mosaic-sentinel {
    height: 1px;
    width: 100%;
}

.no-articles {
    text-align: center;
    color: #757575;
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
