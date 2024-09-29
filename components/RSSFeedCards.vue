<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";

const articles = ref([]);
const currentPage = ref(1);
const selectedArticle = ref(null);
const articlesPerPage = 12;

const fetchRSS = async () => {
  try {
    const response = await axios.get(
      "https://jeanluchouedanou.blogspot.com/feeds/posts/default"
    );
    const parser = new XMLParser();
    const result = parser.parse(response.data);
    articles.value = result.feed.entry;
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
  }
};

onMounted(fetchRSS);

const currentArticles = computed(() => {
  const indexOfLastArticle = currentPage.value * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  return articles.value.slice(indexOfFirstArticle, indexOfLastArticle);
});

const totalPages = computed(() =>
  Math.ceil(articles.value.length / articlesPerPage)
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
</script>

<template>
  <div class="container mt-6">
    <h2 class="title is-4 has-text-centered mb-4">
      En attendant, lisez notre blog
    </h2>
    <div class="columns is-multiline">
      <div
        v-for="(article, index) in currentArticles"
        :key="index"
        class="column is-3"
      >
        <div class="card h-100">
          <div class="card-content">
            <p class="title is-5">{{ article.title }}</p>
            <p class="content">{{ article.summary.substring(0, 120) }}...</p>
          </div>
          <footer class="card-footer">
            <button
              class="card-footer-item button is-primary"
              @click="openPopup(article)"
            >
              Lire plus
            </button>
          </footer>
        </div>
      </div>
    </div>
    <nav
      class="pagination is-centered"
      role="navigation"
      aria-label="pagination"
    >
      <ul class="pagination-list">
        <li v-for="page in totalPages" :key="page">
          <button
            class="pagination-link"
            :class="{ 'is-current': currentPage === page }"
            :aria-label="`Page ${page}`"
            @click="paginate(page)"
          >
            {{ page }}
          </button>
        </li>
      </ul>
    </nav>
    <div v-if="selectedArticle" class="modal is-active">
      <div class="modal-background" @click="closePopup"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ selectedArticle.title }}</p>
          <button
            class="delete"
            aria-label="close"
            @click="closePopup"
          ></button>
        </header>
        <section
          class="modal-card-body"
          v-html="selectedArticle.content"
        ></section>
      </div>
    </div>
  </div>
</template>
