<template>
  <div class="article-wrapper" v-if="article">
    <ClientOnly>
      <ReadingBar :key="article._path" :title="article.title" />
    </ClientOnly>

    <div class="article-layout">
      <article class="article-container">
        <header class="article-header">
          <div class="article-header__meta">
            <span class="article-header__date">{{ formatDate(article.createdAt) }}</span>
            <span v-if="readingTime" class="article-header__reading-time">
              <i class="material-icons">schedule</i>
              {{ readingTime }} {{ $t('readingTime') }}
            </span>
          </div>
          <h1 class="article-header__title">{{ article.title }}</h1>
          <div v-if="articleTags.length" class="article-header__tags">
            <span
              v-for="tag in articleTags"
              :key="tag"
              class="article-header__tag"
            >{{ tag }}</span>
          </div>
        </header>

        <div v-if="article.summary" class="article-summary">
          <p>{{ article.summary }}</p>
        </div>

        <div class="article-content">
          <ContentDoc />

          <div class="social-share">
            <div class="sharethis-inline-share-buttons"></div>
          </div>

          <ArticleNavigation :prev="prevArticle" :next="nextArticle" />

          <SuggestedArticles :articles="suggestedArticles" />

          <DisqusComments :pageUrl="currentUrl" :pageIdentifier="article._path" />

          <div class="article-links">
            <a href="https://houedanou.com" rel="dofollow">Jean-Luc Houédanou</a>
            <a target="_blank" href="https://jeanluchouedanou.blogspot.com/">Mes anciens articles</a>
          </div>
        </div>

        <footer class="article-footer">
          <NuxtLink to="/" class="back-to-articles">
            <span class="back-arrow">&larr;</span> {{ $t("backToArticles") }}
          </NuxtLink>
        </footer>
      </article>

      <ClientOnly>
        <TableOfContents v-if="tocLinks.length >= 2" :links="tocLinks" />
      </ClientOnly>
    </div>
  </div>
  <div v-else class="article-not-found">
    <p>Article introuvable.</p>
    <NuxtLink to="/">← Retour à l'accueil</NuxtLink>
  </div>
</template>

<script setup>
import { useHead } from "@unhead/vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useLocalePath, useSwitchLocalePath } from "#i18n";
import { onMounted, watch, computed, nextTick } from "vue";
import DisqusComments from "~/components/DisqusComments.vue";
import ArticleNavigation from "~/components/ArticleNavigation.vue";
import SuggestedArticles from "~/components/SuggestedArticles.vue";
import TableOfContents from "~/components/TableOfContents.vue";

const route = useRoute();
const { locale } = useI18n();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();

const { data: article } = await useAsyncData(
  `article-${route.path}`,
  () => queryContent(route.path).findOne(),
  { watch: [() => route.path] }
);

const { data: allArticles } = await useAsyncData("all-articles", () =>
  queryContent("fr").sort({ createdAt: -1 }).find()
);

const predefinedTags = ['tech', 'opinion', 'tutoriel', 'productivité', 'apple', 'afrique']

const articleTags = computed(() => {
  if (!article.value) return [];
  if (article.value.tags && Array.isArray(article.value.tags)) {
    return article.value.tags;
  }
  if (article.value.keywords) {
    const kw = typeof article.value.keywords === 'string'
      ? article.value.keywords.toLowerCase().split(',').map(k => k.trim())
      : [];
    return predefinedTags.filter(tag => kw.some(k => k.includes(tag)));
  }
  return [];
});

const readingTime = computed(() => {
  if (!article.value?.body) return null;
  const text = extractText(article.value.body);
  const words = text.split(/\s+/).filter(w => w.length > 0).length;
  return Math.ceil(words / 200) || 1;
});

function extractText(node) {
  if (!node) return '';
  if (typeof node === 'string') return node;
  if (node.value) return node.value;
  if (node.children && Array.isArray(node.children)) {
    return node.children.map(extractText).join(' ');
  }
  return '';
}

const tocLinks = computed(() => {
  if (!article.value?.body?.toc?.links) return [];
  return article.value.body.toc.links;
});

const currentIndex = computed(() => {
  if (!allArticles.value || !article.value) return -1;
  return allArticles.value.findIndex((a) => a._path === article.value._path);
});

const prevArticle = computed(() => {
  if (!allArticles.value || currentIndex.value <= 0) return null;
  return allArticles.value[currentIndex.value - 1];
});

const nextArticle = computed(() => {
  if (!allArticles.value || currentIndex.value < 0) return null;
  if (currentIndex.value >= allArticles.value.length - 1) return null;
  return allArticles.value[currentIndex.value + 1];
});

const suggestedArticles = computed(() => {
  if (!allArticles.value || !article.value) return [];
  const excludePaths = new Set([
    article.value._path,
    prevArticle.value?._path,
    nextArticle.value?._path,
  ]);
  const currentDate = new Date(article.value.createdAt).getTime();
  return allArticles.value
    .filter((a) => !excludePaths.has(a._path))
    .sort((a, b) => {
      const diffA = Math.abs(new Date(a.createdAt).getTime() - currentDate);
      const diffB = Math.abs(new Date(b.createdAt).getTime() - currentDate);
      return diffA - diffB;
    })
    .slice(0, 3);
});

useHead(() => ({
  title: article.value?.title,
  meta: [
    { name: "description", content: article.value?.description || "Description par défaut" },
    { name: "keywords", content: article.value?.keywords || "" },
    { property: "og:title", content: article.value?.title },
    {
      property: "og:description",
      content: article.value?.description || "Description par défaut",
    },
    { property: "og:url", content: `https://houedanou.com${route.path}` },
    { property: "og:image", content: `https://houedanou.com${article.value?.image}` },
    { property: "og:site_name", content: "Jean-Luc Houédanou" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `https://houedanou.com${article.value?.image}` },
    { name: "twitter:title", content: article.value?.title },
    {
      name: "twitter:description",
      content: article.value?.description || "Description par défaut",
    },
  ],
}));

const currentUrl = computed(() => `https://houedanou.com${route.path}`);

function loadShareThis() {
  if (window.__sharethis__) {
    window.__sharethis__.initialize();
    return;
  }
  const s1 = document.createElement('script');
  s1.src = 'https://platform-api.sharethis.com/js/sharethis.js#property=671678124be62400139baad2&product=inline-share-buttons';
  s1.async = true;
  document.head.appendChild(s1);
}

onMounted(() => {
  loadShareThis();
});

watch(() => route.path, () => {
  nextTick(() => {
    loadShareThis();
  });
});

function formatDate(createdAt) {
  if (createdAt) {
    const date = new Date(createdAt);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  return "Date inconnue";
}
</script>

<style lang="scss" scoped>
.article-wrapper {
  background: var(--bg-card);
  font-family: "Inter", sans-serif;
  color: var(--text-primary);
  line-height: 1.7;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.article-layout {
  display: flex;
  max-width: 1100px;
  margin: 0 auto;
  gap: 2rem;
}

// Table of contents sidebar — 30% width
.article-layout > :deep(.toc) {
  width: 30%;
  flex-shrink: 0;
}

// Article header
.article-header {
  margin-bottom: 2.5rem;
}

.article-header__meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.article-header__date {
  display: inline-block;
  font-family: "Inter", sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: #2EC4B6;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.article-header__reading-time {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-family: "Inter", sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-muted);

  .material-icons {
    font-size: 1rem;
  }
}

.article-header__title {
  font-family: "Montserrat", sans-serif;
  font-size: 2.6rem;
  font-weight: 800;
  line-height: 1.15;
  color: var(--text-primary);
  margin: 0 0 1rem 0;
  letter-spacing: -0.02em;
}

.article-header__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.5rem;
}

.article-header__tag {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #2EC4B6;
  background: rgba(46, 196, 182, 0.1);
  padding: 0.2rem 0.65rem;
  border-radius: 12px;
}

// Article body
.article-container {
  max-width: 780px;
  flex: 1;
  min-width: 0;
  padding: 2.5rem 1.5rem 3rem;
}

.article-summary {
  margin-bottom: 2.5rem;
  padding: 1.25rem 1.5rem;
  background: var(--blockquote-bg);
  border-left: 4px solid #2EC4B6;
  border-radius: 0 8px 8px 0;

  p {
    font-family: "Inter", sans-serif;
    font-size: 1.1rem;
    font-style: italic;
    line-height: 1.7;
    color: var(--text-secondary);
    margin: 0;
  }
}

// Article content
.article-content {
  :deep(h1:first-child) {
    display: none;
  }

  :deep(h2) {
    font-family: "Montserrat", sans-serif;
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    line-height: 1.3;
  }

  :deep(h3) {
    font-family: "Montserrat", sans-serif;
    font-size: 1.35rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-top: 2rem;
    margin-bottom: 0.75rem;
  }

  :deep(p) {
    font-family: "Merriweather", serif;
    font-size: 1.1rem;
    line-height: 1.85;
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
    text-align: justify;
  }

  :deep(a) {
    color: #2EC4B6;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s ease;

    &:hover {
      border-bottom-color: #2EC4B6;
    }
  }

  :deep(blockquote) {
    background: var(--blockquote-bg);
    border-left: 4px solid #9B5DE5;
    margin: 2rem 0;
    padding: 1.25rem 1.5rem;
    border-radius: 0 8px 8px 0;
    font-style: italic;
    color: var(--text-secondary);
    position: relative;

    &::before {
      content: '\201C';
      font-family: Georgia, serif;
      font-size: 3.5rem;
      color: #9B5DE5;
      opacity: 0.3;
      position: absolute;
      top: -0.25rem;
      left: 0.75rem;
      line-height: 1;
    }

    p {
      margin-bottom: 0.75rem;
      font-family: 'Merriweather', serif;
      font-size: 1.05rem;
      line-height: 1.8;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  :deep(ul) {
    margin-bottom: 1.5rem;
    padding-left: 0;
    list-style: none;

    li {
      font-family: "Merriweather", serif;
      font-size: 1.1rem;
      line-height: 1.85;
      color: var(--text-secondary);
      margin-bottom: 0.65rem;
      padding-left: 1.75rem;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0.65em;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--accent, #2EC4B6);
      }

      ul {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;

        li::before {
          width: 6px;
          height: 6px;
          background: transparent;
          border: 2px solid var(--accent, #2EC4B6);
        }
      }
    }
  }

  :deep(ol) {
    margin-bottom: 1.5rem;
    padding-left: 0;
    list-style: none;
    counter-reset: ol-counter;

    li {
      font-family: "Merriweather", serif;
      font-size: 1.1rem;
      line-height: 1.85;
      color: var(--text-secondary);
      margin-bottom: 0.65rem;
      padding-left: 2.25rem;
      position: relative;
      counter-increment: ol-counter;

      &::before {
        content: counter(ol-counter);
        position: absolute;
        left: 0;
        top: 0.15em;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        background: var(--accent, #2EC4B6);
        color: #fff;
        font-family: 'Inter', sans-serif;
        font-size: 0.8rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  :deep(table) {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin: 1.5rem 0;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: var(--card-shadow, 0 2px 12px rgba(0, 0, 0, 0.08));
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;

    thead {
      background: var(--accent, #2EC4B6);
      color: #fff;

      th {
        padding: 0.85rem 1.2rem;
        font-weight: 700;
        text-align: left;
        letter-spacing: 0.02em;
        border: none;
      }
    }

    tbody {
      tr {
        transition: background-color 0.15s ease;

        &:nth-child(even) {
          background: var(--bg-secondary, #eef0f4);
        }

        &:hover {
          background: rgba(46, 196, 182, 0.08);
        }
      }

      td {
        padding: 0.75rem 1.2rem;
        border-bottom: 1px solid var(--border-color, #e6e6e6);
        color: var(--text-secondary);
        line-height: 1.6;
      }

      tr:last-child td {
        border-bottom: none;
      }
    }
  }

  :deep(img) {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 1.5rem 0;
  }

  // Responsive table wrapper
  :deep(.table-wrapper),
  :deep(div:has(> table)) {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin: 1.5rem 0;

    table {
      margin: 0;
    }
  }

  :deep(pre) {
    border-radius: 8px;
    margin: 1.5rem 0;
    background: var(--code-bg);
  }

  :deep(code) {
    background: var(--code-bg);
    padding: 0.15rem 0.4rem;
    border-radius: 4px;
    font-size: 0.9em;
  }

  :deep(pre code) {
    background: none;
    padding: 0;
  }

  :deep(strong) {
    color: var(--text-primary);
    font-weight: 700;
  }
}

// Links at bottom
.article-links {
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  gap: 1.5rem;

  a {
    color: #2EC4B6;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.95rem;
    transition: color 0.2s ease;

    &:hover {
      color: var(--accent-hover);
    }
  }
}

// Footer
.article-footer {
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

.back-to-articles {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: #2EC4B6;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: color 0.2s ease, transform 0.2s ease;

  &:hover {
    color: var(--accent-hover);
    .back-arrow {
      transform: translateX(-3px);
    }
  }
}

.back-arrow {
  display: inline-block;
  transition: transform 0.2s ease;
  font-size: 1.2rem;
}

// Social share
.social-share {
  margin-top: 2.5rem;

  :deep(.st-total) {
    display: none !important;
  }

  :deep(.st-count) {
    display: none !important;
  }
}

// Responsive
@media screen and (max-width: 1100px) {
  .article-layout {
    flex-direction: column;
  }
}

@media screen and (max-width: 768px) {
  .article-header__title {
    font-size: 1.85rem;
  }

  .article-container {
    padding: 2rem 1.25rem;
  }

  .article-content {
    :deep(h2) {
      font-size: 1.4rem;
    }

    :deep(p), :deep(li) {
      font-size: 1rem;
    }
  }

  .article-links {
    flex-direction: column;
    gap: 0.75rem;
  }
}

@media screen and (max-width: 480px) {
  .article-header__title {
    font-size: 1.5rem;
  }

  .article-header__meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.3rem;
  }
}

.article-not-found {
  max-width: 780px;
  margin: 4rem auto;
  padding: 2rem;
  text-align: center;
  font-family: "Inter", sans-serif;

  p {
    font-size: 1.25rem;
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
  }

  a {
    color: #2EC4B6;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      color: var(--accent-hover);
    }
  }
}
</style>
