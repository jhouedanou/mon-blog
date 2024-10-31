<template>
    <div class="article-list is-flex flex-column align-items-center justify-center is-justify-content-center">

        <div class="article-list-container container">
            <!-- <div class="container">
                <div class="columns">
                    <div class="column is-12">
                        <div class="language-switch">
                            <NuxtLink v-for="locale in $i18n.locales" :key="locale.code"
                                :to="localePath('/', locale.code)">
                                {{ locale.code.toUpperCase() }}
                            </NuxtLink>


                        </div>
                    </div>
                </div>
            </div> -->

            <div v-if="paginatedArticles.length" class="columns is-multiline">
                <div v-for="article in paginatedArticles" :key="article._path"
                    class="is-4-desktop column is-4-desktop is-6-tablet is-12-mobile">

                    <div class="article-item p-4 m-3">
                        <div v-if="article.image" class="cover-image"
                            :style="{ backgroundImage: `url(${article.image})` }">
                        </div>
                        <br>
                        <h2 class="article-title">
                            <NuxtLink :to="localePath(article._path)" class="article-link">{{ article.title }}
                            </NuxtLink>
                        </h2>
                        <span class="article-date">{{ formatDate(article.createdAt) }}</span>

                        <p class="article-excerpt" v-html="getExcerpt(article)"></p>
                        <NuxtLink :to="localePath(article._path)" class="read-more">{{ $t('readMore') }}</NuxtLink>
                    </div>
                </div>
            </div>
            <p v-else class="no-articles">{{ $t('noArticles') }}</p>
            <!-- pagination -->
            <nav class="pagination is-centered" role="navigation" aria-label="pagination">
                <a class="pagination-previous" @click="changePage(currentPage - 1)" :disabled="currentPage === 1">{{
                    $t('previous') }}</a>
                <a class="pagination-next" @click="changePage(currentPage + 1)"
                    :disabled="currentPage === totalPages">{{ $t('next') }}</a>
                <ul class="pagination-list">
                    <li v-for="page in totalPages" :key="page">
                        <a class="pagination-link" :class="{ 'is-current': page === currentPage }"
                            @click="changePage(page)">{{ page }}</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAsyncData } from '#app'
import { useI18n } from 'vue-i18n'
import { useLocalePath } from '#i18n'

const localePath = useLocalePath()
const { locale, t } = useI18n()
const currentPage = ref(1)
const articlesPerPage = 6
const { data: articles } = await useAsyncData('articles', () =>
    queryContent(locale.value)
        .sort({ createdAt: -1 })
        .find()
)
const paginatedArticles = computed(() => {
    const start = (currentPage.value - 1) * articlesPerPage
    const end = start + articlesPerPage
    return articles.value.slice(start, end)
})
const totalPages = computed(() => Math.ceil(articles.value.length / articlesPerPage))

function changePage(page) {
    currentPage.value = page
}
function formatDate(createdAt) {
    if (createdAt) {
        const [day, month, year] = createdAt.split('-')
        const date = new Date(year, month - 1, day)
        return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
    }
    return 'Date inconnue'
}

function getExcerpt(article) {
    const content = article.description || article._raw || ''
    return content.length > 150 ? content.slice(0, 150) + '...' : content
}
</script>

<style lang="scss" scoped>
.cover-image {
    height: 320px;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: flex-end;
    padding: 2rem;
}

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
    color: #666;
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
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
    overflow-wrap: break-word;
    color: #363636;
    font-family: "Merriweather", sans-serif;
    margin-top: 0;
    font-size: 1.25rem;
    line-height: 1.875rem;
    margin-left: 0;
    margin-right: 0;
    width: 100%;
    max-width: 100%;
    margin-bottom: 0;
}

.pagination {
    margin-top: 2rem;
}

.pagination-link.is-disabled,
.pagination-link[disabled],
.pagination-next.is-disabled,
.pagination-next[disabled],
.pagination-previous.is-disabled,
.pagination-previous[disabled] {
    background: none !important
}

.pagination-link,
.pagination-next,
.pagination-previous {
    color: #292929 !important
}

.pagination-link.is-current,
.pagination-link.is-selected {

    background-color: #03a87c;
    border-color: #03a87c;
    border: none !important
}

.language-switch {
    margin-bottom: 2rem;
    text-align: center;

    a {
        margin: 0 0.5rem;
        padding: 0.5rem 1rem;
        text-decoration: none;
        color: #666;
        font-weight: 600;
        transition: color 0.3s ease, background-color 0.3s ease;
        border-radius: 4px;

        &:hover,
        &.nuxt-link-active {
            color: #fff;
            background-color: #018f69;
        }
    }
}
</style>