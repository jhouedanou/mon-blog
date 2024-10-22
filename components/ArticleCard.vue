<template>
    <article class="article-card">
        <div class="language-switch">
            <nuxt-link v-for="locale in $i18n.locales" :key="locale.code"
                :to="localePath(switchLocalePath(locale.code))">
                {{ locale.name }}
            </nuxt-link>
        </div>
        <h2 class="article-title">{{ formatTitle(article.title) }}</h2>
        <div class="article-meta">
            <span class="article-date">{{ formatDate(article.createdAt) }}</span></span>
        </div>
        <div class="article-content" v-html="article.body?.html || article.description"></div>

    </article>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
    article: {
        type: Object,
        required: true
    }
})

const { locale, t } = useI18n()
const route = useRoute()
const router = useRouter()

const articleUrl = computed(() => `${window.location.origin}${route.path}`)
const networks = ['facebook', 'twitter', 'linkedin']

function switchLocalePath(localeCode) {
    const { pathname, search, hash } = window.location
    const baseUrl = pathname.replace(/^\/[a-z]{2}/, '')
    return `/${localeCode}${baseUrl}${search}${hash}`
}

function formatTitle(title) {
    return cleanHtmlEntities(decodeHtmlEntities(title))
}

function decodeHtmlEntities(text) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = text
    return textArea.value.replace(/'/g, "'")
}

function cleanHtmlEntities(text) {
    return text
        .replace(/–/g, '–')
        .replace(/'/g, "'")
        .replace(/ /g, ' ')
}

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


<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Inter:wght@400;600;700&display=swap');

.article-image {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 1rem;
}

.article-card {
    font-family: 'Inter', sans-serif;
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
    font-family: 'Montserrat', sans-serif;
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

.article-content {
    margin-bottom: 1.5rem;
    line-height: 1.6;
    color: inherit;
}

.article-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.read-more {
    display: inline-block;
    text-decoration: none;
    color: #666;
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

.language-switch {
    margin-bottom: 1rem;

    a {
        margin-right: 1rem;
        text-decoration: none;
        color: #666;
        font-weight: 600;
        transition: color 0.3s ease;
    }

    a:hover {
        color: #018f69;
    }
}
</style>