<template>
    <article class="article-card">
        <h2 class="article-title">{{ article.title }}</h2>
        <div class="article-meta">
            <span class="article-date">{{ formatDate(article._path) }}</span>
            <span class="article-read-time">{{ estimateReadTime(article.content) }} min read</span>
        </div>
        <p v-if="article.description" class="article-description">{{ article.description }}</p>
        <div class="article-actions">
            <NuxtLink :to="article._path" class="read-more">Lire plus</NuxtLink>
            <div class="share-buttons">
                <button v-for="network in networks" :key="network" class="share-network-button"
                    @click="shareArticle(network)">
                    <span class="icon">{{ getNetworkIcon(network) }}</span>
                </button>
            </div>
        </div>
    </article>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
    article: {
        type: Object,
        required: true
    }
})

const route = useRoute()
const articleUrl = computed(() => `${window.location.origin}${route.path}`)
const networks = ['facebook', 'twitter', 'linkedin']

function formatDate(path) {
    const match = path.match(/\/(\d{4})\/(\d{2})\//)
    return match ? `${match[2]}/${match[1]}` : 'Date inconnue'
}

function estimateReadTime(content) {
    const wordsPerMinute = 200
    const wordCount = content?.split(/\s+/).length || 0
    return Math.ceil(wordCount / wordsPerMinute)
}

function shareArticle(network) {
    // Implémentez ici la logique de partage pour chaque réseau
    console.log(`Partage sur ${network}`)
}

function getNetworkIcon(network) {
    switch (network) {
        case 'facebook': return 'f'
        case 'twitter': return 't'
        case 'linkedin': return 'in'
        default: return ''
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Source+Sans+Pro:wght@400;600&display=swap');

.article-card {
    font-family: 'Source Sans Pro', sans-serif;
    max-width: 680px;
    margin: 2rem auto;
    padding: 2rem;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    transition: box-shadow 0.3s ease;
}

.article-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.article-title {
    font-family: 'Merriweather', serif;
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #292929;
    line-height: 1.3;
}

.article-meta {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    color: #757575;
    margin-bottom: 1rem;
}

.article-date {
    margin-right: 1rem;
}

.article-read-time::before {
    content: '•';
    margin-right: 0.5rem;
}

.article-description {
    font-size: 1rem;
    color: #292929;
    margin-bottom: 1.5rem;
    line-height: 1.6;
}

.article-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.read-more {
    display: inline-block;
    text-decoration: none;
    color: #03a87c;
    font-weight: 600;
    transition: color 0.3s ease;
}

.read-more:hover {
    color: #018f69;
}

.share-buttons {
    display: flex;
}

.share-network-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    margin-left: 0.5rem;
    font-size: 0.8rem;
    color: #757575;
    background-color: #f2f2f2;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.share-network-button:hover {
    background-color: #e0e0e0;
    color: #292929;
}

.icon {
    font-size: 1rem;
}
</style>