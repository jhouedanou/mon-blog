<template>
  <div class="article-wrapper">
    <div
      v-if="article.image"
      class="cover-image"
      :style="{ backgroundImage: `url(${article.image})` }"
    >
      <h1 class="article-title">{{ article.title }}</h1>
    </div>
    <article class="article-container">
      <header class="article-header">
        <div class="article-meta">
          <!-- <div class="language-switch">
            <NuxtLink :to="switchLocalePath('fr')" class="lang-link">FR</NuxtLink>
            <NuxtLink :to="switchLocalePath('en')" class="lang-link">EN</NuxtLink>
          </div> -->
          <!-- <span class="article-author">{{ article.author || 'Auteur inconnu' }}</span> -->
          <span class="article-date">{{ formatDate(article.createdAt) }}</span>
          <!-- <span class="article-read-time">{{ estimateReadTime(article.body) }} min de lecture</span> -->
        </div>
        <!-- Affichage du résumé de l'article -->
        <div v-if="article.summary" class="article-summary">
          <p>{{ article.summary }}</p>
        </div>
      </header>
      <div class="article-content">
        <ContentDoc />
        <!-- Section de partage social -->
        <div class="social-share">
          <div class="sharethis-inline-share-buttons"></div>
        </div>
        <!-- Section de commentaires -->
        <DisqusComments :pageUrl="currentUrl" :pageIdentifier="article._path" />
        <a href="https://houedanou.com" rel="dofollow">Jean-Luc Houédanou</a>
        <br />
        <a target="_blank" href="https://jeanluchouedanou.blogspot.com/"
          >Mes anciens articles</a
        >
      </div>
      <footer class="article-footer">
        <NuxtLink to="/" class="back-to-articles">{{
          $t("backToArticles")
        }}</NuxtLink>
      </footer>
    </article>
  </div>
</template>

<script setup>
import { useHead } from "@unhead/vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { useLocalePath, useSwitchLocalePath } from "#i18n";
import DisqusComments from "~/components/DisqusComments.vue";

const route = useRoute();
const { locale } = useI18n();
const localePath = useLocalePath();

const switchLocalePath = useSwitchLocalePath();

const { data: article } = await useAsyncData("article", () =>
  queryContent(route.path).findOne()
);

// Vérifier que l'article existe
if (!article.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Article non trouvé'
  })
}

// Configuration SEO avec protection contre les valeurs null
useHead({
  title: article.value?.title || 'Article - Blog de Jean-Luc Houédanou',
  meta: [
    { 
      name: 'description', 
      content: article.value?.description || 'Article du blog de Jean-Luc Houédanou' 
    },
    { 
      name: 'keywords', 
      content: article.value?.keywords || 'Jean-Luc Houédanou, blog, article' 
    },
    { property: 'og:title', content: article.value?.title || 'Article - Blog de Jean-Luc Houédanou' },
    { property: 'og:description', content: article.value?.description || 'Article du blog de Jean-Luc Houédanou' },
    { 
      property: 'og:image', 
      content: article.value?.image 
        ? `https://houedanou.com${article.value.image}` 
        : 'https://houedanou.com/images/default-og.webp'
    },
    { property: 'og:url', content: `https://houedanou.com${route.path}` },
    { property: 'og:type', content: 'article' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: article.value?.title || 'Article - Blog de Jean-Luc Houédanou' },
    { name: 'twitter:description', content: article.value?.description || 'Article du blog de Jean-Luc Houédanou' },
    { 
      name: 'twitter:image', 
      content: article.value?.image 
        ? `https://houedanou.com${article.value.image}` 
        : 'https://houedanou.com/images/default-og.webp'
    }
  ],
  link: [
    { rel: 'canonical', href: `https://houedanou.com${route.path}` }
  ]
})
const currentUrl = `https://houedanou.com${route.path}`;
function formatDate(createdAt) {
  if (createdAt) {
    const [day, month, year] = createdAt.split("-");
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  return "Date inconnue";
}

function estimateReadTime(content) {
  const wordsPerMinute = 200;
  const wordCount =
    typeof content === "string" ? content.split(/\s+/).length : 0;
  return Math.ceil(wordCount / wordsPerMinute);
}
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Source+Sans+Pro:wght@400;600&display=swap");

.article-wrapper {
  background: white;
  font-family: "Source Sans Pro", sans-serif;
  color: #292929;
  line-height: 1.6;
}

.cover-image {
  min-height: 20vh;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  padding: 2rem;
  position: relative;
  text-align: center;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 0;
  }
}

.article-title {
  z-index: 15;
  font-family: "Merriweather", serif;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.3;
  margin: 0 auto;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.article-container {
  max-width: 1024px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.article-header {
  margin-bottom: 2rem;
}

.article-meta {
  font-size: 0.9rem;
  color: #757575;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.article-author {
  font-weight: 600;
}

.language-switch {
  display: flex;
  gap: 0.5rem;
}

.lang-link {
  color: #03a87c;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;

  &:hover {
    color: #018f69;
  }
}

.article-content :deep(h2) {
  font-family: "Merriweather", serif;
  font-size: 1.8rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.article-content :deep(p) {
  margin-bottom: 1.5rem;
}

.article-content :deep(a) {
  color: #03a87c;
  text-decoration: none;
  border-bottom: 1px solid #03a87c;
}

.article-content :deep(a:hover) {
  color: #018f69;
  border-bottom-color: #018f69;
}

.article-footer {
  margin-top: 3rem;
  padding-top: 1rem;
  border-top: 1px solid #e6e6e6;
}

.back-to-articles {
  display: inline-block;
  color: #03a87c;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.back-to-articles:hover {
  color: #018f69;
}

.social-share {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
}

.network {
  cursor: pointer;
  color: #03a87c;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;

  &:hover {
    color: #018f69;
  }
}

.article-summary {
  margin: 1.5rem 0;
  padding: 1rem;
  background-color: #f8f9fa;
  border-left: 4px solid #03a87c;
  border-radius: 0 4px 4px 0;
  
  p {
    font-family: "Source Sans Pro", sans-serif;
    font-size: 1.1rem;
    font-style: italic;
    line-height: 1.6;
    color: #4a4a4a;
    margin: 0;
  }
}

@media screen and (max-width: 1024px) {
  .article-title {
    font-family: "Merriweather", serif;
    font-size: 0.5rem !important;
    font-weight: 700;
    line-height: 1.3;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
}
</style>
