<template>
  <div class="article-wrapper" v-if="article">
    <ClientOnly>
      <ReadingBar :key="article._path" :title="article.title" />
    </ClientOnly>

    <!-- Hero façon remarkable : visuel à gauche, titre à droite -->
    <section class="article-hero" :class="{ 'article-hero--full': !article.image }">
      <div v-if="article.image" class="article-hero__media">
        <img :src="article.image" :alt="imgText(article.title)" :title="imgText(article.title)" width="1200" height="900" fetchpriority="high" decoding="async" />
      </div>
      <header class="article-header">
        <p class="article-header__meta">
          <!-- Signature visible : confirme en HTML l'auteur déclaré en JSON-LD. -->
          <NuxtLink to="/a-propos" rel="author" class="article-header__author">{{ $t('byAuthor') }} Jean-Luc Houédanou</NuxtLink>
          <span aria-hidden="true">·</span>
          <time :datetime="article.createdAt">{{ formatDate(article.createdAt) }}</time>
          <template v-if="readingTime">
            <span aria-hidden="true">·</span>
            <span>{{ readingTime }} {{ $t('readingTime') }}</span>
          </template>
        </p>
        <h1 class="article-header__title">{{ frenchSpacing(article.title, locale) }}</h1>
        <div v-if="articleTags.length" class="article-header__tags" :aria-label="$t('articleTagsLabel')">
          <NuxtLink
            v-for="tag in articleTags"
            :key="tag"
            :to="localePath(`/tags/${slugifyTag(tag)}`)"
            class="chip"
          >#{{ tag }}</NuxtLink>
        </div>
        <div v-if="articleThemes.length" class="article-header__themes">
          <span>{{ $t('explore') }}</span>
          <NuxtLink v-for="themeItem in articleThemes" :key="themeItem.slug" :to="localePath(`/themes/${themeItem.slug}`)" class="chip chip--copper">
            {{ localizeTheme(themeItem, locale).label }}
          </NuxtLink>
        </div>
      </header>
    </section>

    <div class="article-layout">
      <article class="article-container">
        <div v-if="articleSummary" class="article-summary">
          <span class="article-summary__label">{{ $t('summary') }}</span>
          <p>{{ articleSummary }}</p>
        </div>

        <div class="article-content">
          <!-- :head="false" : sinon useContentHead écrase og:image/description avec le front matter brut (WebP). -->
          <ContentDoc :head="false" />
        </div>

        <!-- Hors de .article-content : la typographie du billet (liens soulignés,
             paragraphes, titres) ne doit pas déteindre sur ces blocs. -->
        <div class="article-after">
          <div class="social-share">
            <p class="social-share__label">{{ $t('share') }}</p>
            <div class="sharethis-inline-share-buttons"></div>
          </div>

          <ArticleNavigation :prev="prevArticle" :next="nextArticle" />

          <SuggestedArticles
            :articles="suggestedArticles"
            :label="$t('readNextSameThemes')"
          />

          <DisqusComments :pageUrl="currentUrl" :pageIdentifier="article._path" />

          <div class="article-links">
            <a target="_blank" rel="noopener" href="https://jeanluchouedanou.blogspot.com/">{{ $t('oldArticles') }} <i class="material-icons" aria-hidden="true">north_east</i></a>
          </div>
        </div>

        <footer class="article-footer">
          <NuxtLink :to="localePath('/')" class="btn btn--secondary back-to-articles">
            <i class="material-icons" aria-hidden="true">arrow_back</i>
            <span>{{ $t("backToArticles") }}</span>
          </NuxtLink>
        </footer>
      </article>

      <ClientOnly>
        <TableOfContents v-if="tocLinks.length >= 2" :links="tocLinks" />
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { useLocalePath } from "#i18n";
import { onMounted, watch, computed, nextTick } from "vue";
import { dateLocale, translatedArticlePath, LOCALE_CODES } from "~/utils/i18n.js";
import DisqusComments from "~/components/DisqusComments.vue";
import ArticleNavigation from "~/components/ArticleNavigation.vue";
import SuggestedArticles from "~/components/SuggestedArticles.vue";
import TableOfContents from "~/components/TableOfContents.vue";
import { getArticleTags, slugifyTag } from "~/utils/tags.js";
import { getReadingStats } from "~/utils/reading.js";
import { canonicalUrl, absoluteUrl } from "~/utils/site.js";
import { ogImageFor } from "~/utils/og.js";
import { articleGraph } from "~/utils/schema.js";
import { frenchSpacing } from "~/utils/typography.js";
import { useImageText } from "~/composables/useImageText.js";
import { useSeo } from "~/composables/useSeo.js";
import { ARTICLE_LIST_FIELDS } from "~/utils/content-fields.js";
import {
  THEME_DEFINITIONS,
  articleMatchesTheme,
  getArticleSearchIntent,
  localizeTheme,
} from "~/data/editorial.js";

definePageMeta({ key: (route) => route.path });

const route = useRoute();
const { locale, t } = useI18n();
const localePath = useLocalePath();
const imgText = useImageText();

// La transition de page est en `out-in` : en quittant un article, `route.path`
// vaut déjà la nouvelle route alors que ce composant est encore monté le temps
// de l'animation de sortie. Un `watch` sur `route.path` relançait donc la requête
// sur `/` ou `/tags`, qui n'ont pas de document : l'article basculait sur
// « Article introuvable » sous les yeux du lecteur. La clé de page recrée le
// composant à chaque chemin, ce qui rend le watcher inutile.
const { data: article } = await useAsyncData(
  `article-${route.path}`,
  () => queryContent(route.path).findOne()
);

// Un chemin sans document est un vrai 404, pas une page en 200 affichant un
// message : les anciennes URLs WordPress restaient sinon des soft-404 pour Google.
if (!article.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Article introuvable",
    fatal: true,
  });
}

// `only()` est obligatoire ici : cette liste ne sert qu'à l'article précédent,
// au suivant et aux trois suggestions, mais sans elle chaque page d'article
// désérialisait le corps entier des 48 billets.
const { data: allArticles } = await useAsyncData(`all-articles-${locale.value}`, () =>
  queryContent(locale.value).only(ARTICLE_LIST_FIELDS).sort({ createdAt: -1 }).find()
);

// Implémentation partagée avec ArticleList (voir utils/reading.js) ; `words`
// alimente aussi `wordCount` et `timeRequired` du BlogPosting.
const readingStats = computed(() => getReadingStats(article.value?.body));
const readingTime = computed(() => readingStats.value.minutes || null);

// Les billets déclarent `description` dans leur front matter ; `summary` reste
// accepté pour ceux qui en fournissent un explicitement.
const articleSummary = computed(
  () => article.value?.summary || article.value?.description || ""
);

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

const currentUrl = computed(() => canonicalUrl(route.path));
// La meta description vient de `description` (120 à 160 caractères, rédigée
// pour la SERP). `searchIntent` est une question éditoriale, pas un extrait.
const metaDescription = computed(() =>
  String(article.value?.description || "").trim() ||
  getArticleSearchIntent(article.value) ||
  (locale.value === "en"
    ? "An article from Jean-Luc Houédanou's blog on technology, development and digital culture."
    : "Article du blog de Jean-Luc Houédanou sur la technologie, le développement et la culture numérique.")
);

// Le même billet existe dans chaque langue sous le même slug : on l'annonce
// à Google avec des <link rel="alternate" hreflang>, en plus de la canonique.
useHead(() => ({
  link: [
    ...LOCALE_CODES.map((code) => ({
      rel: "alternate",
      hreflang: code,
      href: canonicalUrl(translatedArticlePath(route.path, code) || route.path),
    })),
    {
      rel: "alternate",
      // Anglais par défaut pour les visiteurs dont la langue n'est pas le français.
      hreflang: "x-default",
      href: canonicalUrl(translatedArticlePath(route.path, "en") || route.path),
    },
  ],
}));
// Carte JPEG 1200x630 générée hors ligne : X et LinkedIn ne rendent pas le WebP.
const ogImage = computed(() => absoluteUrl(ogImageFor(article.value?.image)));

useSeo(() => ({
  title: article.value?.title,
  description: metaDescription.value,
  canonical: currentUrl.value,
  image: ogImage.value,
  imageAlt: article.value?.title,
  imageIsCard: true,
  type: "article",
  publishedTime: article.value?.createdAt,
  modifiedTime: article.value?.updatedAt,
  tags: articleTags.value,
  lang: locale.value,
  jsonLd: articleGraph({
    article: article.value,
    url: currentUrl.value,
    image: ogImage.value,
    description: metaDescription.value,
    tags: articleTags.value,
    themes: articleThemes.value,
    stats: readingStats.value,
    lang: locale.value,
  }),
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
    return date.toLocaleDateString(dateLocale(locale.value), {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  return t("unknownDate");
}
</script>

<style lang="scss" scoped>
.article-wrapper {
  font-family: var(--font-body);
  color: var(--text-primary);
  line-height: 1.7;
  background: transparent;
  /* `overflow-x: clip` seul suffit à empêcher le débordement horizontal ;
     `hidden` forcerait un contexte de défilement qui casserait le
     `position: sticky` de la table des matières. `overflow-y: visible`
     doit rester explicite pour la même raison. */
  overflow-x: clip;
  overflow-y: visible;
}

/* Table des matières en colonne gauche (sticky), lecture à droite.
   La colonne de lecture tient 66 à 72 signes par ligne en Figtree 18 px. */
.article-layout {
  display: grid;
  grid-template-columns: minmax(200px, 240px) minmax(0, 640px);
  justify-content: center;
  align-items: start;
  gap: clamp(2rem, 5vw, 5rem);
  max-width: var(--wrap);
  width: 100%;
  margin: 0 auto;
  padding: 0 var(--gutter);
}

/* La TOC est après l'article dans le DOM (elle peut être absente) :
   on la force dans la première colonne. */
.article-layout > .article-container {
  grid-column: 2;
  grid-row: 1;
}

.article-layout > :deep(.toc) {
  grid-column: 1;
  grid-row: 1;
  width: 100%;
}

/* Sans TOC (article court), la colonne de lecture reste centrée. */
.article-layout:not(:has(> .toc)) {
  grid-template-columns: minmax(0, 640px);

  > .article-container {
    grid-column: 1;
  }
}

/* ==========================================
   Ouverture — visuel encadré comme le portrait du CV
   ========================================== */
.article-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(2.5rem, 6vw, 5.5rem);
  align-items: center;
  max-width: var(--wrap);
  margin: 0 auto;
  padding: clamp(2.5rem, 6vh, 4.5rem) var(--gutter) clamp(3rem, 7vh, 5rem);

  /* Sans image : header pleine largeur, aligné sur la colonne de lecture */
  &--full {
    grid-template-columns: minmax(0, 860px);
    justify-content: center;
  }
}

.article-hero__media {
  position: relative;
  min-width: 0;
  isolation: isolate;

  /* Cadre cuivre décalé, comme derrière le portrait du portfolio. */
  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    inset: 7% -4% -5% 6%;
    border: 1px solid var(--accent-line);
    border-radius: 12px 44px 12px 44px;
    background: var(--accent-soft);
    transform: rotate(-3deg);
  }

  img {
    display: block;
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    border: 1px solid var(--border-color);
    border-radius: 12px 44px 12px 44px;
    box-shadow: var(--card-shadow);
  }
}

/* ==========================================
   Article header
   ========================================== */
.article-header {
  position: relative;
  min-width: 0;
}

.article-header__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem 0.55rem;
  margin: 0 0 1.25rem;
  font-family: var(--font-mono);
  font-size: 0.74rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent-2-text);
}

.article-header__author {
  color: var(--text-primary);
  text-decoration: none;

  &:hover {
    color: var(--accent);
  }
}

.article-header__title {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 4.2vw, 3.75rem);
  font-weight: 600;
  line-height: 1.02;
  color: var(--text-primary);
  margin: 0 0 1.75rem 0;
  letter-spacing: -0.04em;
  text-wrap: balance;
}

.article-header__tags,
.article-header__themes {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.45rem;
}

.article-header__tags {
  margin-bottom: 0.75rem;
}

.article-header__themes {
  color: var(--text-muted);
  font-size: 0.9rem;
}

/* ==========================================
   Article body
   ========================================== */
.article-container {
  max-width: 100%;
  width: 100%;
  min-width: 0;
  padding: 0 0 2rem;
}

/* Encart « Résumé » : le panneau cuivre « Carnet de bord » du portfolio. */
.article-summary {
  margin-bottom: 3rem;
  padding: 1.5rem 1.75rem;
  border: 1px solid var(--accent-line);
  border-radius: var(--radius);
  background: var(--accent-soft);
}

.article-summary__label {
  display: block;
  margin-bottom: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
}

.article-summary p {
  font-family: var(--font-body);
  font-size: 1.06rem;
  line-height: 1.6;
  color: var(--text-primary);
  margin: 0;
}

/* ==========================================
   Article content — typographie de lecture
   ========================================== */
.article-content {
  width: 100%;
  min-width: 0;

  /* Échelle modulaire (tierce majeure, ratio 1.25) ancrée sur le corps. */
  --t-body: 1.1875rem;
  --t-h3: 1.45rem;
  --t-h2: 1.85rem;
  --leading-body: 1.78;

  font-kerning: normal;
  font-variant-ligatures: common-ligatures contextual;
  text-rendering: optimizeLegibility;

  :deep(h2) {
    font-family: var(--font-display);
    font-size: var(--t-h2);
    font-weight: 600;
    color: var(--text-primary);
    /* Plus d'espace au-dessus qu'en dessous : le titre se rattache au
       texte qu'il annonce. */
    margin-top: 3.25rem;
    margin-bottom: 1rem;
    line-height: 1.15;
    letter-spacing: -0.035em;
    text-wrap: balance;
    scroll-margin-top: calc(var(--header-h) + 1.5rem);
  }

  :deep(h3) {
    font-family: var(--font-display);
    font-size: var(--t-h3);
    font-weight: 600;
    color: var(--text-primary);
    margin-top: 2.5rem;
    margin-bottom: 0.75rem;
    line-height: 1.25;
    letter-spacing: -0.025em;
    text-wrap: balance;
    scroll-margin-top: calc(var(--header-h) + 1.5rem);
  }

  /* Fer à gauche : la justification creusait des blancs entre les mots. */
  :deep(p),
  :deep(ul li),
  :deep(ol li) {
    overflow-wrap: break-word;
    orphans: 2;
    widows: 2;
  }

  :deep(p) {
    font-family: var(--font-body);
    font-size: var(--t-body);
    line-height: var(--leading-body);
    color: var(--text-secondary);
    margin-bottom: 1.3em;
    text-wrap: pretty;
  }

  :deep(a) {
    color: var(--text-primary);
    text-decoration: underline;
    text-decoration-color: var(--accent);
    text-decoration-thickness: 1px;
    text-underline-offset: 0.22em;
    transition: color 0.2s ease, text-decoration-thickness 0.2s ease;

    &:hover {
      color: var(--accent);
      text-decoration-thickness: 2px;
    }
  }

  :deep(h2 a),
  :deep(h3 a) {
    color: inherit;
    text-decoration: none;

    &:hover {
      color: var(--accent);
    }
  }

  /* Citation : panneau lavande du bloc contact du portfolio, bordure
     complète plutôt qu'un filet sur le côté. */
  :deep(blockquote) {
    margin: 2.5rem 0;
    padding: 1.5rem 1.75rem;
    border: 1px solid var(--accent-2-line);
    border-radius: var(--radius);
    background: var(--accent-2-soft);

    p {
      margin-bottom: 0.75rem;
      font-size: 1.12rem;
      font-weight: 500;
      line-height: 1.6;
      color: var(--text-primary);

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
      font-size: var(--t-body);
      line-height: var(--leading-body);
      color: var(--text-secondary);
      margin-bottom: 0.6rem;
      padding-left: 1.6rem;
      position: relative;

      /* Puce carrée en cuivre, les angles du système. */
      &::before {
        content: '';
        position: absolute;
        left: 0.2rem;
        top: 0.78em;
        width: 6px;
        height: 6px;
        border-radius: 1px;
        background: var(--accent);
      }

      ul {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;

        li::before {
          background: transparent;
          border: 1px solid var(--accent);
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
      font-size: var(--t-body);
      line-height: var(--leading-body);
      color: var(--text-secondary);
      margin-bottom: 0.7rem;
      padding-left: 2.4rem;
      position: relative;
      counter-increment: ol-counter;

      &::before {
        content: counter(ol-counter, decimal-leading-zero);
        position: absolute;
        left: 0;
        top: 0.3em;
        font-family: var(--font-mono);
        font-size: 0.82rem;
        font-weight: 600;
        color: var(--accent-2-text);
        font-variant-numeric: tabular-nums;
      }
    }
  }

  :deep(table) {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin: 2rem 0;
    border-radius: var(--radius);
    overflow: hidden;
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    font-family: var(--font-body);
    font-size: 0.95rem;
    font-variant-numeric: tabular-nums;

    thead {
      background: var(--bg-elevated);

      th {
        padding: 0.9rem 1.1rem;
        font-family: var(--font-mono);
        font-size: 0.72rem;
        font-weight: 600;
        text-align: left;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--accent-2-text);
        border: none;
        border-bottom: 1px solid var(--border-color);
      }
    }

    tbody {
      tr {
        transition: background-color 0.15s ease;

        &:hover {
          background: var(--accent-2-soft);
        }
      }

      td {
        padding: 0.8rem 1.1rem;
        border-bottom: 1px solid var(--border-color);
        color: var(--text-secondary);
        line-height: 1.55;
      }

      tr:last-child td {
        border-bottom: none;
      }
    }
  }

  :deep(img) {
    max-width: 100%;
    height: auto;
    border-radius: var(--radius);
    margin: 2.5rem 0;
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
    border-radius: var(--radius);
    margin: 2rem 0;
    background: var(--code-bg);
    border: 1px solid var(--border-color);
    padding: 1.15rem 1.35rem;
    font-family: var(--font-mono);
    font-size: 0.88rem;
    line-height: 1.65;
    overflow-x: auto;
  }

  :deep(code) {
    background: var(--accent-2-soft);
    padding: 0.12rem 0.4rem;
    border-radius: 3px;
    font-family: var(--font-mono);
    font-size: 0.86em;
    color: var(--accent-2-text);
    border: 1px solid var(--accent-2-line);
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
   Fin d'article
   ========================================== */
.article-links {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;

  a {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    min-height: 44px;
    font-family: var(--font-mono);
    color: var(--accent);
    text-decoration: none;
    font-weight: 600;
    font-size: 0.8rem;
    letter-spacing: 0.04em;
    transition: color 0.2s ease;

    .material-icons {
      font-size: 1rem;
    }

    &:hover {
      color: var(--accent-hover);
    }
  }
}

.article-footer {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
}

.back-to-articles .material-icons {
  font-size: 1.1rem;
  transition: transform 0.25s var(--ease-out);
}

.back-to-articles:hover .material-icons {
  transform: translateX(-3px);
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
    border-radius: var(--radius) !important;

    img {
      position: static !important;
      top: auto !important;
      left: auto !important;
      width: 18px !important;
      height: 18px !important;
      margin: 0 !important;
      border: 0 !important;
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
  margin: 0 0 1rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--accent-2-text);
}

/* ==========================================
   Responsive
   ========================================== */
@media screen and (max-width: 1150px) {
  .article-layout {
    display: block;
    max-width: calc(640px + 2 * var(--gutter));
  }
}

@media screen and (max-width: 900px) {
  .article-hero {
    grid-template-columns: 1fr;
    gap: 2.25rem;
  }

  .article-hero__media img {
    aspect-ratio: 16 / 10;
  }
}

@media screen and (max-width: 768px) {
  .article-hero {
    padding: 1.75rem var(--gutter) 2.25rem;
  }

  .article-hero__media {
    margin-right: 0.5rem;

    &::before {
      inset: 8% -2.5% -4% 5%;
    }
  }

  .article-header__title {
    font-size: clamp(2rem, 9vw, 2.6rem);
    overflow-wrap: anywhere;
  }

  .article-content {
    --t-body: 1.0625rem;
    --t-h3: 1.3rem;
    --t-h2: 1.6rem;
    --leading-body: 1.72;

    :deep(h2),
    :deep(h3) {
      overflow-wrap: anywhere;
    }
  }

  .article-summary {
    padding: 1.25rem 1.25rem;
  }

  .article-links {
    flex-direction: column;
    gap: 0.5rem;
  }
}

/* Cible tactile d'au moins 24 px de haut (WCAG 2.5.8). */
.article-header__author {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
}
</style>
