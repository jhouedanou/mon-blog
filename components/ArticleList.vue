<template>
    <div v-if="loading" class="spinner">
        <div class="spinner-circle"></div>
    </div>
    <div v-else class="article-list">
        <div class="article-list-container container">
            <div v-if="displayedArticles.length" class="articles-grid">
                <div v-for="(article, index) in displayedArticles" :key="article._path" class="article-item" :style="{
                    borderTopColor: getBackgroundColor(index),
                    color: getTextColor(getBackgroundColor(index))
                }">
                    <h2 class="article-title">
                        <NuxtLink :to="article._path" class="article-link"
                            :style="{ color: getTextColor(getBackgroundColor(index)) }">
                            {{ article.title }}
                        </NuxtLink>
                    </h2>
                    <p class="article-date">{{ formatDate(article) }}</p>
                    <div class="article-content" v-html="article.body?.html || article.description"></div>
                    <NuxtLink :to="article._path" class="read-more"
                        :style="{ color: getTextColor(getBackgroundColor(index)) }">Lire plus</NuxtLink>
                </div>
            </div>
            <p v-else class="no-articles">Aucun article trouvé.</p>
        </div>
        <div class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1">Précédent</button>
            <span>Page {{ currentPage }} sur {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">Suivant</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAsyncData } from '#app'
import { useFetchRSS } from "@/composables/useFetchRSS"

const { feedItems, error, fetchRSS } = useFetchRSS()

const loading = ref(true)
const pageSize = 9
const currentPage = ref(1)
const allArticles = ref([])

const colors = [
    '#2D2E2E', // jet
    '#B2B2B2', // silver
    '#1B1B1B', // eerie-black
    '#0C0C0C', // night
    '#EFEFEF'  // antiflash-white
]

function getBackgroundColor(index) {
    return colors[index % colors.length]
}

function getTextColor(backgroundColor) {
    const colorIndex = colors.indexOf(backgroundColor)
    return colors[(colorIndex + 2) % colors.length]
}

const fetchArticles = async () => {
    try {
        loading.value = true
        const { data: contentArticles } = await useAsyncData('contentArticles', () =>
            queryContent().sort({ _path: -1 }).find()
        )
        await fetchRSS('https://feeds.feedburner.com/houedanou/mezt')

        allArticles.value = [...(contentArticles.value ?? []), ...feedItems.value].sort((a, b) => {
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
    const start = (currentPage.value - 1) * pageSize
    const end = start + pageSize
    return allArticles.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(allArticles.value.length / pageSize))

function prevPage() {
    if (currentPage.value > 1) {
        currentPage.value--
    }
}

function nextPage() {
    if (currentPage.value < totalPages.value) {
        currentPage.value++
    }
}

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
</script>

<style lang="scss" scoped>
.article-list {
    font-family: 'Inter', sans-serif;
    padding: 2rem 0;
}

.article-list-container {
    margin: 0 auto;
    padding: 0 1rem;
}

.articles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 20px;
}

.article-item {
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    padding: 1.5rem;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
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

.article-content {
    margin-bottom: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}

.read-more {
    display: inline-block;
    color: #03a87c;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
        color: #018f69;
    }
}

.no-articles {
    text-align: center;
    color: #757575;
    font-style: italic;
    padding: 2rem 0;
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;

    button {
        padding: 0.5rem 1rem;
        margin: 0 0.5rem;
        background-color: #03a87c;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;

        &:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
    }

    span {
        margin: 0 1rem;
    }
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
</style>
