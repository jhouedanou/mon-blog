<template>
    <div class="article-list home">
        <div v-if="loading" class="spinner">
            <div class="spinner-circle"></div>
        </div>
        <div v-else>
            <div v-if="paginatedArticles.length" class="columns is-multiline">
                <div v-for="article in paginatedArticles" :key="article._path"
                    class="column is-4-desktop is-6-tablet is-12-mobile">
                    <ArticleCard :article="article" />
                </div>
            </div>
            <p v-else class="no-articles">Aucun article trouvé.</p>

            <div class="pagination">
                <button @click="prevPage" :disabled="currentPage === 1">Précédent</button>
                <span>Page {{ currentPage }} sur {{ totalPages }}</span>
                <button @click="nextPage" :disabled="currentPage === totalPages">Suivant</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAsyncData } from '#app'
import ArticleCard from './ArticleCard.vue'

const articles = ref([])
const loading = ref(true)
const currentPage = ref(1)
const articlesPerPage = 9

const fetchArticles = async () => {
    try {
        loading.value = true
        const { data } = await useAsyncData('articles', () =>
            queryContent()
                .where({ _path: /^\/\d{2}\/\d{4}\// })  // Filtre pour les chemins commençant par /MM/YYYY/
                .sort({ _path: -1 })
                .find()
        )
        console.log('Articles récupérés :', data.value)
        articles.value = data.value || []
    } catch (error) {
        console.error('Erreur lors de la récupération des articles:', error)
    } finally {
        loading.value = false
    }
}


onMounted(fetchArticles)

const totalPages = computed(() => Math.ceil(articles.value.length / articlesPerPage))

const paginatedArticles = computed(() => {
    const start = (currentPage.value - 1) * articlesPerPage
    const end = start + articlesPerPage
    return articles.value.slice(start, end)
})

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++
    }
}

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--
    }
};
</script>

<style scoped>
.spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
}

.spinner-circle {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #000;
    border-radius: 50%;
    width: 40px;
    height: 40px;
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

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
}

.pagination button {
    margin: 0 1rem;
}
</style>