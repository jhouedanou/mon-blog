<template>
    <div class="article-list is-flex flex-column align-items-center justify-center is-justify-content-center">
        <div class="article-list-container container">
            <div v-if="articles && articles.length" class="columns is-multiline">
                <div v-for="article in articles" :key="article._path"
                    class="article-item is-4-desktop column is-6-tablet is-12-mobile p-4 m-3">
                    <h2 class="article-title">
                        <NuxtLink :to="article._path" class="article-link">{{ article.title }}</NuxtLink>
                    </h2>
                    <p class="article-date">{{ formatDate(article) }}</p>
                    <p class="article-excerpt" v-html="getExcerpt(article)"></p>
                    <NuxtLink :to="article._path" class="read-more">Lire plus</NuxtLink>
                </div>
            </div>
            <p v-else class="no-articles">Aucun article trouvé.</p>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAsyncData } from '#app'
import axios from 'axios'
import Parser from 'rss-parser'

const parser = new Parser()
const allArticles = ref([])

const fetchRssArticles = async () => {
    try {
        const response = await axios.get('https://feeds.feedburner.com/houedanou/mezt/')
        console.log('Réponse brute RSS:', response.data)
        const feed = await parser.parseString(response.data)
        return feed.items.map(item => ({
            title: item.title,
            _path: item.link,
            description: item.content,
            pubDate: item.pubDate,
            source: 'rss'
        }))
    } catch (error) {
        console.error('Erreur lors de la récupération du flux RSS:', error)
        return []
    }
}

const { data: contentArticles } = await useAsyncData('contentArticles', () =>
    queryContent().sort({ _path: -1 }).find()
)

const rssArticles = ref([])

onMounted(async () => {
    rssArticles.value = await fetchRssArticles()
    console.log('Articles RSS:', rssArticles.value)

    allArticles.value = [...contentArticles.value, ...rssArticles.value]
    console.log('Tous les articles combinés:', allArticles.value)
})

const articles = computed(() => {
    return allArticles.value.sort((a, b) => {
        const dateA = new Date(a.pubDate || a._path)
        const dateB = new Date(b.pubDate || b._path)
        return dateB - dateA
    })
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
</style>