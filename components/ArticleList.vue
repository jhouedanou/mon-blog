<template>
    <div v-if="loading" class="spinner">
        <div class="spinner-circle"></div>
    </div>
    <div v-else class="article-list is-flex flex-column align-items-center justify-center is-justify-content-center">
        <div class="article-list-container container">
            <div v-if="displayedArticles.length" class="columns is-multiline">
                <div v-for="article in displayedArticles" :key="article._path"
                    class="is-4-desktop column is-6-tablet is-12-mobile">
                    <div class="article-item p-4 m-3">
                        <h2 class="article-title">
                            <NuxtLink :to="article._path" class="article-link">{{ article.title }}</NuxtLink>
                        </h2>
                        <p class="article-date">{{ formatDate(article) }}</p>
                        <p class="article-excerpt" v-html="getExcerpt(article)"></p>
                        <NuxtLink :to="article._path" class="read-more">Lire plus</NuxtLink>
                    </div>
                </div>
            </div>
            <p v-else class="no-articles">Aucun article trouvé.</p>
        </div>
        <div v-if="hasMoreArticles" ref="loadMoreTrigger" class="load-more">Chargement...</div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAsyncData } from '#app'
import { useFetchRSS } from "@/composables/useFetchRSS"
import { useIntersectionObserver } from '@vueuse/core'

const { feedItems, error, fetchRSS } = useFetchRSS()

const loading = ref(true)
const pageSize = 10
const currentPage = ref(1)
const allArticles = ref([])
const loadMoreTrigger = ref(null)

const fetchArticles = async () => {
    try {
        loading.value = true
        const { data: contentArticles } = await useAsyncData('contentArticles', () =>
            queryContent().sort({ _path: -1 }).limit(25).find()
        )
        await fetchRSS('https://feeds.feedburner.com/houedanou/mezt')

        allArticles.value = [...(contentArticles || []), ...feedItems.value].sort((a, b) => {
            const dateA = new Date(a.pubDate || a._path)
            const dateB = new Date(b.pubDate || b._path)
            return dateB - dateA
        })
    } catch (error) {
        console.error('Erreur lors de la récupération des articles:', error)
    } finally {
        loading.value = false
    }
}

onMounted(fetchArticles)

const displayedArticles = computed(() => {
    const start = 0
    const end = currentPage.value * pageSize
    return allArticles.value.slice(start, end)
})

const hasMoreArticles = computed(() => displayedArticles.value.length < allArticles.value.length)

useIntersectionObserver(loadMoreTrigger, ([{ isIntersecting }]) => {
    if (isIntersecting && hasMoreArticles.value) {
        currentPage.value++
    }
})

function formatDate(article) {
    if (article.pubDate) {
        const date = new Date(article.pubDate)
        return `${date.getMonth() + 1}/${date.getFullYear()}`
    }
    const match = article._path.match(/\/(\d{4})\/(\d{2})\//)
    if (match) {
        const [, year, month] = match
        return `${month}/${year}`
    }
    return 'Date inconnue'
}

function getExcerpt(article) {
    const content = article.description || article._raw || ''
    return content.length > 150 ? content.slice(0, 150) + '...' : content
}
</script>

<style lang="scss" scoped>
.article-list {
    font-family: 'Inter', sans-serif;
    padding: 2rem 0;

    .container {
        margin: 0;
        padding: 0;
    }
}

.article-list-container {
    margin: 0 auto;
    padding: 0 1rem;
}

.article-item {
    background-color: #ffffff;
    border-bottom: 1px solid #e6e6e6;
    padding: 2rem 0;
}

.article-item:last-child {
    border-bottom: none;
}

.article-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: #292929;
    margin-bottom: 0.5rem;
}

.article-date {
    font-size: 0.9rem;
    color: #757575;
    margin-bottom: 1rem;
}

.read-more {
    display: inline-block;
    color: #03a87c;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.3s ease;
}

.read-more:hover {
    color: #018f69;
}

h2 {
    a {
        color: black;
    }
}

.no-articles {
    text-align: center;
    color: #757575;
    font-style: italic;
    padding: 2rem 0;
}

.article-excerpt {
    font-family: "Source Sans Pro", sans-serif;
    box-sizing: inherit;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    font-size: 1.2rem;
    color: #555;
    line-height: 1.4;
    margin-bottom: 1.5rem;
}

.spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.spinner-circle {
    width: 50px;
    height: 50px;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.load-more {
    text-align: center;
    padding: 1rem;
    font-style: italic;
    color: #757575;
}
</style>
