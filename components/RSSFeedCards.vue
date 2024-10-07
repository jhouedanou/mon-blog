<script setup>
import { ref, computed, onMounted } from "vue";
import { useFetchRSS } from "@/composables/useFetchRSS";

const feedItems = ref([]);
const error = ref(null);
const currentPage = ref(1);
const selectedArticle = ref(null);
const articlesPerPage = 12;
const isLoading = ref(true);

function decodeHtmlEntities(text) {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value.replace(/’/g, "'");
}
function cleanHtmlEntities(text) {
  return text
    .replace(/&#8211;/g, '–')
    .replace(/&rsquo;/g, "'")
    .replace(/&nbsp;/g, ' ');
}
onMounted(async () => {
  try {
    const rssFeed = await $fetch('/api/rss');
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(rssFeed, 'text/xml');
    const entries = xmlDoc.getElementsByTagName('entry');

    feedItems.value = await Promise.all(Array.from(entries).map(async (entry) => {
      const title = decodeHtmlEntities(entry.getElementsByTagName('title')[0].textContent);
      const imageUrl = await $fetch('/api/pexels', { params: { query: title } });

      return {
        title,
        content: decodeHtmlEntities(entry.getElementsByTagName('content')[0].textContent),
        link: entry.getElementsByTagName('link')[0].getAttribute('href'),
        updated: new Date(entry.getElementsByTagName('updated')[0].textContent),
        image: imageUrl || '' // Utilisez l'image de Pexels si disponible
      };
    }));
  } catch (e) {
    error.value = e.message;
  } finally {
    isLoading.value = false;
  }
});

const currentArticles = computed(() => {
  const indexOfLastArticle = currentPage.value * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  return feedItems.value.slice(indexOfFirstArticle, indexOfLastArticle);
});

const totalPages = computed(() =>
  Math.ceil(feedItems.value.length / articlesPerPage)
);

const paginate = (pageNumber) => {
  currentPage.value = pageNumber;
};

const openPopup = (article) => {
  selectedArticle.value = article;
};

const closePopup = () => {
  selectedArticle.value = null;
};

const imageLoaded = (article) => {
  article.isLoading = false;
};
</script>
<template>
  <div class="container mt-6">
    <h2 class="title is-4 has-text-centered mb-4">A Unix Mind in A Windows World</h2>
    <div v-if="isLoading" class="has-text-centered">
      <svg class="spinner" viewBox="0 0 50 50">
        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
      </svg>
    </div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div class="columns is-multiline">
        <div v-for="(article, index) in currentArticles" :key="index"
          class="column is-12-mobile is-3-tablet is-4-desktop">
          <div class="card article-card">
            <div class="card-image" v-if="article.image">
              <figure class="image is-4by3">
                <img :src="article.image" :alt="article.title" @load="imageLoaded(article)" v-show="!article.isLoading">
                <div v-show="article.isLoading" class="spinner-container">
                  <svg class="spinner" viewBox="0 0 50 50">
                    <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                  </svg>
                </div>
              </figure>
            </div>
            <div class="card-content">
              <p class="title is-5">{{ article.title }}</p>
              <p class="subtitle is-6">
                {{ article.updated.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }) }}
              </p>
              <p class="content">
                {{ cleanHtmlEntities(article.content.replace(/<[^>]+>/g, '').substring(0, 250)) }}...
              </p>
            </div>
            <footer class="card-footer">
              <a @click="openPopup(article)" class="card-footer-item button is-primary">Lire plus</a>
            </footer>
          </div>
        </div>
      </div>
      <nav class="pagination is-centered" role="navigation" aria-label="pagination">
        <ul class="pagination-list">
          <li v-for="page in totalPages" :key="page">
            <button class="pagination-link" :class="{ 'is-current': currentPage === page }" :aria-label="`Page ${page}`"
              @click="paginate(page)">
              {{ page }}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>

  <!-- Popup -->
  <div v-if="selectedArticle" class="modal is-active">
    <div class="modal-background" @click="closePopup"></div>
    <div class="modal-content">
      <div class="box">
        <h3 class="title is-4">{{ selectedArticle.title }}</h3>
        <div v-html="selectedArticle.content"></div>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="closePopup"></button>
  </div>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Charter&family=Georgia&display=swap');

body {
  font-family: 'Charter', 'Georgia', serif;
  font-size: 18px;
  line-height: 1.75;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  font-family: 'Charter', 'Georgia', serif;
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
}

.card {
  background-color: white;
  color: black;
  border: none;
  transition: all 0.3s ease-in-out;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
  background-color: #f8f9fa;
}

.card-image img {
  border-radius: 8px 8px 0 0;
}

.card-content {
  padding: 20px;
  font-family: 'Charter', 'Georgia', serif;
  font-size: 16px;
  color: #333;
}

.subtitle.is-6 {
  font-family: 'Charter', 'Georgia', serif;
  font-size: 0.875rem;
  color: #777;
}

.button.is-primary {
  background-color: black;
  color: white;
  font-family: 'Charter', 'Georgia', serif;
}

.pagination-link {
  color: #0072ce;
}

.pagination-link.is-current {
  background-color: #0072ce;
  color: white;
}

.modal .box {
  max-width: 800px;
  margin: 0 auto;
}

.article-card {
  margin-bottom: 2rem;
  border-radius: 10px;
}

.spinner {
  animation: rotate 2s linear infinite;
  z-index: 2;
  width: 50px;
  height: 50px;
}

.spinner .path {
  stroke: #5d5d5d;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #f5f5f5;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }

  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}

.article-popup,
.modal-content,
.box {
  background-color: white;
  color: black;
  border-radius: 10px;
  padding: 20px;
  font-family: 'Charter', 'Georgia', serif;
}
</style>
