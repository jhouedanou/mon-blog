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
          <div v-if="articleTags.length" class="article-header__tags" aria-label="Étiquettes de l’article">
            <NuxtLink
              v-for="tag in articleTags"
              :key="tag"
              :to="`/tags/${slugifyTag(tag)}`"
              class="article-header__tag"
            >#{{ tag }}</NuxtLink>
          </div>
          <div v-if="articleThemes.length" class="article-header__themes">
            <span>À explorer :</span>
            <NuxtLink v-for="themeItem in articleThemes" :key="themeItem.slug" :to="`/themes/${themeItem.slug}`">
              {{ themeItem.label }}
            </NuxtLink>
          </div>
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

          <SuggestedArticles
            :articles="suggestedArticles"
            label="À lire ensuite dans les mêmes thèmes"
          />

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
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { onMounted, watch, computed, nextTick } from "vue";
import DisqusComments from "~/components/DisqusComments.vue";
import ArticleNavigation from "~/components/ArticleNavigation.vue";
import SuggestedArticles from "~/components/SuggestedArticles.vue";
import TableOfContents from "~/components/TableOfContents.vue";
import { getArticleTags, slugifyTag } from "~/utils/tags.js";
import {
  THEME_DEFINITIONS,
  articleMatchesTheme,
  getArticleSearchIntent,
} from "~/data/editorial.js";

const route = useRoute();
const { locale } = useI18n();

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

const articleTags = computed(() => getArticleTags(article.value));

const articleThemes = computed(() => {
  if (!article.value) return [];
  return THEME_DEFINITIONS.filter((theme) => articleMatchesTheme(article.value, theme));
});

const suggestedArticles = computed(() => {
  if (!allArticles.value || !article.value) return [];
  const excludePaths = new Set([
    article.value._path,
    prevArticle.value?._path,
    nextArticle.value?._path,
  ]);
  const currentDate = new Date(article.value.createdAt).getTime();
  const currentTagSlugs = new Set(articleTags.value.map(slugifyTag));
  const currentThemeSlugs = new Set(articleThemes.value.map((theme) => theme.slug));

  return allArticles.value
    .filter((a) => !excludePaths.has(a._path))
    .map((candidate) => {
      const sharedTags = getArticleTags(candidate)
        .map(slugifyTag)
        .filter((tag) => currentTagSlugs.has(tag)).length;
      const sharedThemes = THEME_DEFINITIONS
        .filter((theme) => currentThemeSlugs.has(theme.slug) && articleMatchesTheme(candidate, theme))
        .length;
      const distanceInDays = Math.abs(new Date(candidate.createdAt).getTime() - currentDate) / 86400000;

      return {
        article: candidate,
        score: (sharedTags * 100) + (sharedThemes * 35) - Math.min(distanceInDays / 365, 2),
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ article: relatedArticle }) => relatedArticle);
});

const siteUrl = "https://houedanou.com";
const currentUrl = computed(() => `${siteUrl}${route.path}`);
const canonicalImage = computed(() => {
  if (!article.value?.image) return `${siteUrl}/images/1837389.webp`;
  return new URL(article.value.image, siteUrl).href;
});
const metaDescription = computed(() =>
  getArticleSearchIntent(article.value) ||
  "Article du blog de Jean-Luc Houédanou sur la technologie, le développement et la culture numérique."
);

useHead(() => ({
  title: article.value?.title,
  link: [{ rel: "canonical", href: currentUrl.value }],
  meta: [
    { name: "description", content: metaDescription.value },
    { property: "og:title", content: article.value?.title },
    { property: "og:description", content: metaDescription.value },
    { property: "og:url", content: currentUrl.value },
    { property: "og:type", content: "article" },
    { property: "og:image", content: canonicalImage.value },
    { property: "og:image:alt", content: article.value?.title },
    { property: "og:site_name", content: "Jean-Luc Houédanou" },
    { property: "article:published_time", content: article.value?.createdAt },
    { property: "article:modified_time", content: article.value?.updatedAt || article.value?.createdAt },
    { property: "article:author", content: "Jean-Luc Houédanou" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: canonicalImage.value },
    { name: "twitter:title", content: article.value?.title },
    { name: "twitter:description", content: metaDescription.value },
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: article.value?.title,
        description: metaDescription.value,
        image: [canonicalImage.value],
        datePublished: article.value?.createdAt,
        dateModified: article.value?.updatedAt || article.value?.createdAt,
        author: {
          "@type": "Person",
          name: "Jean-Luc Houédanou",
          url: `${siteUrl}/a-propos`,
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": currentUrl.value,
        },
      }),
    },
  ],
}));

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
  overflow-x: clip;
}

.article-layout {
  display: grid;
  grid-template-columns: minmax(0, 720px) minmax(220px, 280px);
  justify-content: center;
  align-items: start;
  max-width: 1180px;
  width: 100%;
  margin: 0 auto;
  gap: clamp(2rem, 5vw, 4rem);
  padding: 0 1.5rem;
}

.article-layout > :deep(.toc) {
  width: 100%;
}

/* ==========================================
   Article header
   ========================================== */
.article-header {
  margin-bottom: 2.75rem;
  position: relative;
}

.article-header__meta {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
  padding: 0.45rem 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: var(--bg-card);
}

.article-header__date {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.1em;
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
  font-weight: 650;
  line-height: 1.06;
  color: var(--text-primary);
  margin: 0 0 1.5rem 0;
  letter-spacing: -0.025em;
  text-wrap: balance;
}

.article-header__tags,
.article-header__themes {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}

.article-header__tags {
  margin-top: -0.5rem;
  margin-bottom: 0.85rem;
}

.article-header__tag {
  padding: 0.3rem 0.55rem;
  border: 1px solid var(--border-color);
  border-radius: 3px;
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.04em;
  text-decoration: none;
  transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;

  &:hover {
    color: var(--accent);
    border-color: var(--accent);
    background: var(--accent-soft);
  }
}

.article-header__themes {
  gap: 0.35rem;
  color: var(--text-muted);
  font-size: 0.86rem;

  a {
    color: var(--accent);
    text-decoration: none;
    border-bottom: 1px solid color-mix(in srgb, var(--accent) 45%, transparent);

    &:hover { color: var(--accent-hover); }
  }
}

/* ==========================================
   Article body
   ========================================== */
.article-container {
  max-width: 720px;
  width: 100%;
  min-width: 0;
  padding: 4rem 0 4rem;
}

.article-summary {
  position: relative;
  margin-bottom: 3rem;
  padding: 1.75rem 2rem;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-left: 3px solid var(--accent);
  border-radius: 8px;
  box-shadow: var(--card-shadow);
}

.article-summary__label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent);
  display: block;
  margin-bottom: 0.65rem;
  position: relative;
}

.article-summary p {
  font-family: var(--font-body);
  font-size: 1.12rem;
  font-weight: 500;
  line-height: 1.62;
  color: var(--text-primary);
  margin: 0;
  position: relative;
  letter-spacing: -0.005em;
}

/* ==========================================
   Article content — editorial typography
   ========================================== */
.article-content {
  width: 100%;
  min-width: 0;

  :deep(h1:first-child) {
    display: none;
  }

  :deep(h2) {
    font-family: var(--font-display);
    font-size: clamp(1.65rem, 3vw, 2.25rem);
    font-weight: 650;
    color: var(--text-primary);
    margin-top: 3.25rem;
    margin-bottom: 1.25rem;
    line-height: 1.18;
    letter-spacing: -0.018em;
    position: relative;
    padding-left: 1rem;
    text-wrap: balance;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.5em;
      bottom: 0.3em;
      width: 2px;
      background: var(--accent);
      border-radius: 2px;
    }
  }

  :deep(h3) {
    font-family: var(--font-display);
    font-size: 1.38rem;
    font-weight: 650;
    color: var(--text-primary);
    margin-top: 2.5rem;
    margin-bottom: 0.85rem;
    letter-spacing: -0.015em;
  }

  :deep(p) {
    font-family: var(--font-body);
    font-size: 1.08rem;
    line-height: 1.8;
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
    text-wrap: pretty;
  }

  :deep(p:first-of-type::first-letter) {
    font: inherit;
    float: none;
    margin: 0;
    color: inherit;
    padding: 0;
  }

  :deep(a) {
    color: var(--text-primary);
    text-decoration: none;
    border-bottom: 1px solid var(--accent);
    transition: background 0.25s ease, color 0.25s ease;
    padding: 0 1px;

    &:hover {
      background: var(--accent);
      color: var(--accent-contrast);
    }
  }

  :deep(h2 a),
  :deep(h3 a) {
    color: inherit;
    border-bottom: 0;
    padding: 0;

    &:hover {
      background: transparent;
      color: inherit;
    }
  }

  :deep(blockquote) {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-left: 3px solid var(--accent);
    margin: 2.5rem 0;
    padding: 1.5rem 1.75rem;
    border-radius: 8px;
    position: relative;
    box-shadow: var(--card-shadow);

    &::before {
      content: none;
    }

    p {
      margin-bottom: 0.75rem;
      font-family: var(--font-display);
      font-weight: 550;
      font-size: 1.14rem;
      line-height: 1.6;
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
        top: 0.76em;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: var(--accent);
      }

      ul {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;

        li::before {
          width: 5px;
          height: 5px;
          background: var(--accent);
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
    border-radius: 8px;
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
    border-radius: 8px;
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
    color: var(--text-primary);
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
    box-shadow: var(--card-shadow-hover);

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
    display: block;
    gap: 2rem;
  }

  .article-layout > :deep(.toc) {
    width: 100%;
  }
}

@media screen and (max-width: 768px) {
  .article-layout {
    padding: 0 1rem;
    max-width: 100%;
  }

  .article-container {
    max-width: 100%;
    width: 100%;
    padding: 2.5rem 0 3rem;
  }

  .article-header {
    margin-bottom: 2rem;
  }

  .article-header__meta {
    max-width: 100%;
    flex-wrap: wrap;
  }

  .article-header__title {
    font-size: clamp(1.75rem, 8.5vw, 2.25rem);
    overflow-wrap: anywhere;
  }

  .article-content {
    max-width: 100%;

    :deep(p), :deep(li) {
      font-size: 1rem;
      overflow-wrap: break-word;
    }

    :deep(h2),
    :deep(h3) {
      overflow-wrap: anywhere;
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
      color: var(--accent-contrast);
      box-shadow: var(--card-shadow-hover);
    }
  }
}
</style>
