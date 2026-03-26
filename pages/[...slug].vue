<template>
  <div class="article-wrapper">
    <div
      class="article-hero"
      :style="article.image ? { backgroundImage: `url(${article.image})` } : {}"
      :class="{ 'article-hero--no-image': !article.image }"
    >
      <div class="article-hero__overlay">
        <div class="article-hero__content">
          <h1 class="article-hero__title">{{ article.title }}</h1>
          <div class="article-hero__meta">
            <span class="article-hero__date">{{ formatDate(article.createdAt) }}</span>
          </div>
        </div>
      </div>
    </div>

    <article class="article-container">
      <div v-if="article.summary" class="article-summary">
        <p>{{ article.summary }}</p>
      </div>

      <div class="article-content">
        <ContentDoc />

        <div class="social-share">
          <div class="sharethis-inline-share-buttons"></div>
        </div>

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

useHead({
  title: article.value.title,
  meta: [
    { name: "description", content: article.value.description || "Description par défaut" },
    { name: "keywords", content: article.value.keywords || "" },
    { property: "og:title", content: article.value.title },
    {
      property: "og:description",
      content: article.value.description || "Description par défaut",
    },
    { property: "og:url", content: `https://houedanou.com${route.path}` },
    { property: "og:image", content: `https://houedanou.com${article.value.image}` },
    { property: "og:site_name", content: "Jean-Luc Houédanou" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `https://houedanou.com${article.value.image}` },
    { name: "twitter:title", content: article.value.title },
    {
      name: "twitter:description",
      content: article.value.description || "Description par défaut",
    },
  ],
});

const currentUrl = `https://houedanou.com${route.path}`;

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
  background: #ffffff;
  font-family: "Inter", sans-serif;
  color: #292929;
  line-height: 1.7;
}

// Hero section
.article-hero {
  min-height: 50vh;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: flex-end;

  &--no-image {
    min-height: 35vh;
    background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
  }
}

.article-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.85) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    rgba(0, 0, 0, 0.15) 100%
  );
  display: flex;
  align-items: flex-end;
}

.article-hero__content {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.article-hero__title {
  font-family: "Montserrat", sans-serif;
  font-size: 2.8rem;
  font-weight: 800;
  line-height: 1.2;
  color: #ffffff;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
  margin: 0 0 0.75rem 0;
}

.article-hero__meta {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.article-hero__date {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

// Article body
.article-container {
  max-width: 780px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 3rem;
}

.article-summary {
  margin-bottom: 2.5rem;
  padding: 1.25rem 1.5rem;
  background: #f8f9fa;
  border-left: 4px solid #2EC4B6;
  border-radius: 0 8px 8px 0;

  p {
    font-family: "Inter", sans-serif;
    font-size: 1.1rem;
    font-style: italic;
    line-height: 1.7;
    color: #4a4a4a;
    margin: 0;
  }
}

// Article content
.article-content {
  :deep(h2) {
    font-family: "Montserrat", sans-serif;
    font-size: 1.75rem;
    font-weight: 700;
    color: #1a1a2e;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    line-height: 1.3;
  }

  :deep(h3) {
    font-family: "Montserrat", sans-serif;
    font-size: 1.35rem;
    font-weight: 600;
    color: #1a1a2e;
    margin-top: 2rem;
    margin-bottom: 0.75rem;
  }

  :deep(p) {
    font-family: "Merriweather", serif;
    font-size: 1.1rem;
    line-height: 1.85;
    color: #363636;
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
    background: #f8f9fa;
    border-left: 4px solid #9B5DE5;
    margin: 2rem 0;
    padding: 1.25rem 1.5rem;
    border-radius: 0 8px 8px 0;
    font-style: italic;
    color: #4a4a4a;
  }

  :deep(ul), :deep(ol) {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;

    li {
      font-family: "Merriweather", serif;
      font-size: 1.1rem;
      line-height: 1.85;
      color: #363636;
      margin-bottom: 0.5rem;
    }
  }

  :deep(img) {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 1.5rem 0;
  }

  :deep(pre) {
    border-radius: 8px;
    margin: 1.5rem 0;
  }

  :deep(strong) {
    color: #111111;
    font-weight: 700;
  }
}

// Links at bottom
.article-links {
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
  display: flex;
  gap: 1.5rem;

  a {
    color: #2EC4B6;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.95rem;
    transition: color 0.2s ease;

    &:hover {
      color: #1a9e92;
    }
  }
}

// Footer
.article-footer {
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
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
    color: #1a9e92;
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
}

// Responsive
@media screen and (max-width: 768px) {
  .article-hero {
    min-height: 40vh;
  }

  .article-hero__title {
    font-size: 1.75rem;
  }

  .article-hero__content {
    padding: 2rem 1.25rem;
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
  .article-hero {
    min-height: 35vh;
  }

  .article-hero__title {
    font-size: 1.5rem;
  }
}
</style>
