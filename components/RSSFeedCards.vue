<script setup>
import { ref, computed, onMounted } from "vue";
import { useFetchRSS } from "@/composables/useFetchRSS";

const { feedItems, error, fetchRSS } = useFetchRSS();
const currentPage = ref(1);
const selectedArticle = ref(null);
const articlesPerPage = 12;

onMounted(() => {
  fetchRSS("https://feeds.feedburner.com/houedanou/mezt");
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
</script>

<template>
  <div class="container mt-6">
    <h2 class="title is-4 has-text-centered mb-4">
      En attendant, lisez notre blog
    </h2>
    <div v-if="error">{{ error }}</div>
    <div v-else>
      <div class="columns is-multiline">
        <div
          v-for="(article, index) in currentArticles"
          :key="index"
          class="column is-3"
        >
          <div class="card h-100">
            <div class="card-content">
              <p class="title is-5">{{ article.title }}</p>
              <p class="content">
                {{ article.description.substring(0, 120) }}...
              </p>
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
            v-html="selectedArticle.description"
          ></section>
        </div>
      </div>
    </div>
  </div>
</template>
