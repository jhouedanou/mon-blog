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
            <span class="article-header__divider" aria-hidden="true">·</span>
            <span v-if="readingTime" class="article-header__reading-time">
              <i class="material-icons">schedule</i>
              {{ readingTime }} {{ $t('readingTime') }}
            </span>
          </div>
          <h1 class="article-header__title">{{ article.title }}</h1>
        </header>

        <div v-if="article.summary" class="article-summary">
          <span class="article-summary__label">— Résumé</span>
          <p>{{ article.summary }}</p>
        </div>

        <div class="article-content">
          <ContentDoc />

          <div class="social-share">
            <span class="social-share__label">— Partager</span>
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
            <span class="back-arrow">←</span>
            <span>{{ $t("backToArticles") }}</span>
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
  font-family: var(--font-body);
  color: var(--text-primary);
  line-height: 1.7;
  background: transparent;
}

.article-layout {
  display: flex;
  max-width: 1280px;
  margin: 0 auto;
  gap: 4rem;
  padding: 0 1.5rem;
}

.article-layout > :deep(.toc) {
  width: 260px;
  flex-shrink: 0;
}

/* ==========================================
   Article header
   ========================================== */
.article-header {
  margin-bottom: 3rem;
  position: relative;
}

.article-header__meta {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
  padding: 0.4rem 0.8rem;
  border: 1px solid var(--border-color);
  border-radius: 2px;
  background: var(--bg-card);
}

.article-header__date {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.14em;
}

.article-header__divider {
  color: var(--text-muted);
  font-size: 0.8rem;
}

.article-header__reading-time {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  color: var(--text-secondary);
  text-transform: uppercase;

  .material-icons {
    font-size: 0.9rem;
  }
}

.article-header__title {
  font-family: var(--font-display);
  font-size: clamp(1.85rem, 4vw, 3rem);
  font-weight: 400;
  font-style: italic;
  line-height: 1.08;
  color: var(--text-primary);
  margin: 0 0 1.5rem 0;
  letter-spacing: -0.03em;
}

/* ==========================================
   Article body
   ========================================== */
.article-container {
  max-width: 760px;
  flex: 1;
  min-width: 0;
  padding: 4rem 0 4rem;
}

.article-summary {
  position: relative;
  margin-bottom: 3rem;
  padding: 1.75rem 2rem;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-left: 3px solid var(--accent-magenta);
  border-radius: 2px;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 46, 147, 0.04),
      transparent 60%
    );
    pointer-events: none;
    border-radius: 2px;
  }
}

.article-summary__label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--accent-magenta);
  display: block;
  margin-bottom: 0.65rem;
  position: relative;
}

.article-summary p {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-style: italic;
  font-weight: 400;
  line-height: 1.55;
  color: var(--text-primary);
  margin: 0;
  position: relative;
  letter-spacing: -0.005em;
}

/* ==========================================
   Article content — magazine editorial typography
   ========================================== */
.article-content {
  :deep(h1:first-child) {
    display: none;
  }

  :deep(h2) {
    font-family: var(--font-display);
    font-size: clamp(1.75rem, 3vw, 2.4rem);
    font-weight: 400;
    font-style: italic;
    color: var(--text-primary);
    margin-top: 3.5rem;
    margin-bottom: 1.25rem;
    line-height: 1.15;
    letter-spacing: -0.025em;
    position: relative;
    padding-left: 1.25rem;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.5em;
      bottom: 0.3em;
      width: 3px;
      background: var(--accent);
      border-radius: 2px;
    }
  }

  :deep(h3) {
    font-family: var(--font-display);
    font-size: 1.45rem;
    font-weight: 500;
    color: var(--text-primary);
    margin-top: 2.5rem;
    margin-bottom: 0.85rem;
    letter-spacing: -0.015em;
  }

  :deep(p) {
    font-family: var(--font-body);
    font-size: 1.08rem;
    line-height: 1.78;
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
  }

  /* Drop cap on first paragraph */
  :deep(p:first-of-type::first-letter) {
    font-family: var(--font-display);
    font-style: italic;
    font-weight: 400;
    font-size: 4.5em;
    float: left;
    line-height: 0.85;
    margin: 0.05em 0.12em 0 0;
    color: var(--accent);
    padding-top: 0.05em;
  }

  :deep(a) {
    color: var(--text-primary);
    text-decoration: none;
    border-bottom: 1px solid var(--accent);
    transition: background 0.25s ease, color 0.25s ease;
    padding: 0 1px;

    &:hover {
      background: var(--accent);
      color: #0a0a0f;
    }
  }

  :deep(blockquote) {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-left: 3px solid var(--accent-violet);
    margin: 2.5rem 0;
    padding: 2rem 2rem 2rem 3.5rem;
    border-radius: 2px;
    position: relative;
    box-shadow: var(--card-shadow);

    &::before {
      content: '\201C';
      font-family: var(--font-display);
      font-style: italic;
      font-size: 5rem;
      color: var(--accent-violet);
      opacity: 0.5;
      position: absolute;
      top: -0.1em;
      left: 0.5rem;
      line-height: 1;
      text-shadow: var(--neon-glow-violet);
    }

    p {
      margin-bottom: 0.75rem;
      font-family: var(--font-display);
      font-style: italic;
      font-weight: 400;
      font-size: 1.2rem;
      line-height: 1.55;
      color: var(--text-primary);
      letter-spacing: -0.005em;

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
      font-family: var(--font-body);
      font-size: 1.08rem;
      line-height: 1.78;
      color: var(--text-secondary);
      margin-bottom: 0.75rem;
      padding-left: 1.75rem;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0.7em;
        width: 12px;
        height: 1px;
        background: var(--accent);
      }

      ul {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;

        li::before {
          width: 8px;
          background: var(--accent-magenta);
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
      font-family: var(--font-body);
      font-size: 1.08rem;
      line-height: 1.78;
      color: var(--text-secondary);
      margin-bottom: 0.85rem;
      padding-left: 2.5rem;
      position: relative;
      counter-increment: ol-counter;

      &::before {
        content: counter(ol-counter, decimal-leading-zero);
        position: absolute;
        left: 0;
        top: 0.18em;
        font-family: var(--font-mono);
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--accent);
        letter-spacing: 0.05em;
      }
    }
  }

  :deep(table) {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin: 2rem 0;
    border-radius: 2px;
    overflow: hidden;
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    font-family: var(--font-body);
    font-size: 0.92rem;

    thead {
      background: var(--bg-elevated);

      th {
        padding: 0.95rem 1.2rem;
        font-family: var(--font-mono);
        font-size: 0.72rem;
        font-weight: 600;
        text-align: left;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: var(--accent);
        border: none;
        border-bottom: 1px solid var(--border-color);
      }
    }

    tbody {
      tr {
        transition: background-color 0.15s ease;

        &:hover {
          background: var(--accent-soft);
        }
      }

      td {
        padding: 0.85rem 1.2rem;
        border-bottom: 1px solid var(--border-color);
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
    border-radius: 4px;
    margin: 2.5rem 0;
    box-shadow: var(--card-shadow);
    border: 1px solid var(--border-color);
  }

  :deep(.table-wrapper),
  :deep(div:has(> table)) {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin: 2rem 0;

    table {
      margin: 0;
    }
  }

  :deep(pre) {
    border-radius: 4px;
    margin: 2rem 0;
    background: var(--code-bg);
    border: 1px solid var(--border-color);
    padding: 1.25rem 1.5rem;
    font-family: var(--font-mono);
    font-size: 0.88rem;
    overflow-x: auto;
  }

  :deep(code) {
    background: var(--code-bg);
    padding: 0.15rem 0.45rem;
    border-radius: 3px;
    font-family: var(--font-mono);
    font-size: 0.88em;
    color: var(--accent);
    border: 1px solid var(--border-color);
  }

  :deep(pre code) {
    background: none;
    padding: 0;
    border: none;
    color: var(--text-primary);
  }

  :deep(strong) {
    color: var(--text-primary);
    font-weight: 700;
  }

  :deep(em) {
    color: var(--text-primary);
    font-style: italic;
  }

  :deep(hr) {
    border: none;
    margin: 3.5rem auto;
    height: 1px;
    background: var(--border-color);
    max-width: 60%;
    position: relative;

    &::before {
      content: '✦';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: var(--bg-primary);
      padding: 0 1rem;
      color: var(--accent);
      font-size: 0.85rem;
    }
  }
}

/* ==========================================
   Links footer
   ========================================== */
.article-links {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;

  a {
    font-family: var(--font-mono);
    color: var(--accent);
    text-decoration: none;
    font-weight: 500;
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    transition: color 0.2s ease, transform 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;

    &::before {
      content: '→';
      transition: transform 0.25s ease;
    }

    &:hover {
      color: var(--accent-hover);

      &::before {
        transform: translateX(3px);
      }
    }
  }
}

.article-footer {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
}

.back-to-articles {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--text-primary);
  text-decoration: none;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  padding: 0.85rem 1.25rem;
  border: 1px solid var(--border-color);
  border-radius: 2px;
  transition: all 0.25s ease;

  .back-arrow {
    display: inline-block;
    font-size: 1rem;
    transition: transform 0.25s ease;
  }

  &:hover {
    color: var(--accent);
    border-color: var(--accent);
    background: var(--accent-soft);
    box-shadow: var(--neon-glow-teal);

    .back-arrow {
      transform: translateX(-4px);
    }
  }
}

/* ==========================================
   Social share
   ========================================== */
.social-share {
  margin-top: 3.5rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);

  :deep(.sharethis-inline-share-buttons) {
    display: flex !important;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
  }

  :deep(.st-btn) {
    position: relative !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    margin: 0 !important;
    top: auto !important;

    img {
      position: static !important;
      top: auto !important;
      left: auto !important;
      width: 18px !important;
      height: 18px !important;
      margin: 0 !important;
    }
  }

  :deep(.st-label) {
    display: none !important;
  }

  :deep(.st-total) {
    display: none !important;
  }

  :deep(.st-count) {
    display: none !important;
  }
}

.social-share__label {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--accent);
  margin-bottom: 1rem;
}

/* ==========================================
   Responsive
   ========================================== */
@media screen and (max-width: 1100px) {
  .article-layout {
    flex-direction: column;
    gap: 2rem;
  }

  .article-layout > :deep(.toc) {
    width: 100%;
  }
}

@media screen and (max-width: 768px) {
  .article-layout {
    padding: 0 1rem;
  }

  .article-container {
    padding: 2.5rem 0 3rem;
  }

  .article-header {
    margin-bottom: 2rem;
  }

  .article-content {
    :deep(p), :deep(li) {
      font-size: 1rem;
    }

    :deep(p:first-of-type::first-letter) {
      font-size: 3.5em;
    }
  }

  .article-summary {
    padding: 1.5rem 1.25rem;
  }

  .article-summary p {
    font-size: 1.05rem;
  }

  .article-links {
    flex-direction: column;
    gap: 0.85rem;
  }
}

.article-not-found {
  max-width: 780px;
  margin: 6rem auto;
  padding: 2rem;
  text-align: center;
  font-family: var(--font-body);

  p {
    font-family: var(--font-display);
    font-style: italic;
    font-size: 1.85rem;
    color: var(--text-primary);
    margin-bottom: 1.5rem;
  }

  a {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--accent);
    text-decoration: none;
    font-weight: 500;
    padding: 0.85rem 1.5rem;
    border: 1px solid var(--accent);
    border-radius: 2px;
    transition: all 0.25s ease;

    &:hover {
      background: var(--accent);
      color: #0a0a0f;
      box-shadow: var(--neon-glow-teal);
    }
  }
}
</style>
