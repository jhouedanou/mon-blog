<template>
    <div class="article-list">
        <div class="article-list-container">
            <div v-if="articles.length">
                <div v-for="article in articles" :key="article._path" class="article-item">
                    <h2 class="article-title">{{ article.title }}</h2>
                    <p class="article-date">{{ formatDate(article._path) }}</p>
                    <NuxtLink :to="article._path" class="read-more">Lire plus</NuxtLink>
                </div>
            </div>
            <p v-else class="no-articles">Aucun article trouvé.</p>
        </div>
    </div>
</template>

<script setup>
import { useAsyncData } from '#app'

const { data: articles } = await useAsyncData('articles', () =>
    queryContent().sort({ _path: -1 }).find()
)

function formatDate(path) {
    const match = path.match(/\/(\d{4})\/(\d{2})\//)
    if (match) {
        const [, year, month] = match
        return `${month}/${year}`
    }
    return 'Date inconnue'
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Source+Sans+Pro:wght@400;600&display=swap');

.article-list {
    font-family: 'Source Sans Pro', sans-serif;
    background-color: #fafafa;
    padding: 2rem 0;
}

.article-list-container {
    max-width: 680px;
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
    font-family: 'Merriweather', serif;
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

.no-articles {
    text-align: center;
    color: #757575;
    font-style: italic;
    padding: 2rem 0;
}
</style>