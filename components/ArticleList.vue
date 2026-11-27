<template>
    <div class="home">
        <!-- Ouverture : même composition que le héros du portfolio -->
        <section class="home-hero" aria-labelledby="home-title">
            <div class="home-hero__copy">
                <p class="home-hero__data">
                    <span>Abidjan</span>
                    <span aria-hidden="true">·</span>
                    <span v-if="articles && articles.length">{{ articles.length }} {{ $t('articles') }}</span>
                </p>
                <!-- L'espace explicite est indispensable : le compilateur Vue supprime
                     les nœuds de texte blancs contenant un saut de ligne, ce qui donnait
                     « Jean-LucHouédanou » dans le HTML servi à Google. -->
                <h1 id="home-title" class="home-hero__title">
                    <span class="home-hero__kicker">{{ $t('blogOf') }} </span><span>Jean-Luc </span><em>Houédanou.</em>
                </h1>
                <p class="home-hero__lede">{{ $t('heroLede') }}</p>
            </div>

            <div class="home-hero__tools">
                <SearchBar v-model="searchQuery" />
                <nav class="home-hero__themes" :aria-label="$t('themesNavLabel')">
                    <p class="home-hero__themes-title">{{ $t('browseThemes') }}</p>
                    <div class="home-hero__chips">
                        <NuxtLink
                            v-for="theme in themes"
                            :key="theme.slug"
                            :to="localePath(`/themes/${theme.slug}`)"
                            class="chip"
                        >{{ theme.label }}</NuxtLink>
                        <NuxtLink :to="localePath('/tags')" class="chip chip--copper">{{ $t('allTags') }}</NuxtLink>
                    </div>
                </nav>
            </div>
        </section>

        <!-- Billet à la une : le plus récent, hors recherche -->
        <NuxtLink
            v-if="featured"
            :to="featured._path"
            class="featured"
        >
            <div class="featured__media">
                <img
                    v-if="featured.image"
                    :src="featured.image"
                    alt=""
                    width="1200"
                    height="750"
                    fetchpriority="high"
                    decoding="async"
                />
                <ArticleThumbFallback v-else class="thumb-fallback-fill" :seed="featured._path" />
            </div>
            <div class="featured__body">
                <p class="card-meta">
                    <span v-if="isNew(featured)" class="card-meta__new">{{ $t('newBadge') }}</span>
                    <time :datetime="featured.createdAt">{{ formatDate(featured.createdAt) }}</time>
                    <span v-if="featured.readingTime" aria-hidden="true">·</span>
                    <span v-if="featured.readingTime">{{ featured.readingTime }} {{ $t('readingTime') }}</span>
                </p>
                <h2 class="featured__title">{{ frenchSpacing(featured.title, locale) }}</h2>
                <p v-if="getExcerptText(featured, 200)" class="featured__excerpt">{{ getExcerptText(featured, 200) }}</p>
                <span class="card-link" aria-hidden="true">{{ $t('readArticle') }} <i class="material-icons">arrow_forward</i></span>
            </div>
        </NuxtLink>

        <section class="home-list" aria-labelledby="home-list-title">
            <div class="home-list__head">
                <h2 id="home-list-title" class="home-list__title">
                    {{ isSearching ? $t('searchResults') : $t('latestArticles') }}
                </h2>
                <p class="home-list__count" aria-live="polite">
                    <template v-if="isSearching">{{ filteredArticles.length }} / {{ articles ? articles.length : 0 }}</template>
                    <template v-else>{{ shownCount }} / {{ articles ? articles.length : 0 }}</template>
                </p>
            </div>

            <ul v-if="listed.length" class="card-grid">
                <li v-for="article in listed" :key="article._path">
                    <NuxtLink :to="article._path" class="card">
                        <div class="card__media">
                            <img
                                v-if="article.image"
                                :src="article.image"
                                alt=""
                                width="640"
                                height="400"
                                loading="lazy"
                                decoding="async"
                            />
                            <ArticleThumbFallback v-else class="thumb-fallback-fill" :seed="article._path" />
                        </div>
                        <div class="card__body">
                            <p class="card-meta">
                                <span v-if="isNew(article)" class="card-meta__new">{{ $t('newBadge') }}</span>
                                <time :datetime="article.createdAt">{{ formatDate(article.createdAt) }}</time>
                                <span v-if="article.readingTime" aria-hidden="true">·</span>
                                <span v-if="article.readingTime">{{ article.readingTime }} {{ $t('readingTime') }}</span>
                            </p>
                            <h3 class="card__title">{{ frenchSpacing(article.title, locale) }}</h3>
                            <p v-if="getExcerptText(article)" class="card__excerpt">{{ getExcerptText(article) }}</p>
                        </div>
                    </NuxtLink>
                </li>
            </ul>

            <div v-else-if="isSearching" class="home-empty">
                <p>{{ $t('noArticles') }}</p>
                <button type="button" class="btn btn--secondary" @click="searchQuery = ''">{{ $t('clearSearch') }}</button>
            </div>

            <div v-if="!allLoaded" class="home-more">
                <button type="button" class="btn btn--secondary" @click="loadMore">
                    {{ $t('loadMore') }}
                </button>
            </div>
            <p v-else-if="!isSearching && listed.length" class="home-end">{{ $t('endOfBlog') }}</p>
        </section>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useAsyncData } from '#app'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useLocalePath } from '#i18n'
import SearchBar from '~/components/SearchBar.vue'
import { getArticleSearchIntent, getArticleSearchText, THEME_DEFINITIONS, localizeTheme } from '~/data/editorial.js'
import { ARTICLE_LIST_FIELDS } from '~/utils/content-fields.js'
import { dateLocale } from '~/utils/i18n.js'
import { frenchSpacing } from '~/utils/typography.js'

const localePath = useLocalePath()
const { locale } = useI18n()
const route = useRoute()
const router = useRouter()

// 1 billet à la une + 9 cartes : trois rangées pleines sur ordinateur.
const ITEMS_PER_PAGE = 10
const displayCount = ref(ITEMS_PER_PAGE)
const searchQuery = ref('')

const themes = computed(() =>
    THEME_DEFINITIONS.map((theme) => ({ slug: theme.slug, label: localizeTheme(theme, locale.value).label }))
)

const { data: articles } = await useAsyncData(`articles-${locale.value}`, () =>
    queryContent(locale.value)
        .only(ARTICLE_LIST_FIELDS)
        .sort({ createdAt: -1 })
        .find()
        .then(articles => {
            return articles
                .map(article => {
                    if (article.createdAt) {
                        const ts = new Date(article.createdAt).getTime()
                        article.timestamp = isNaN(ts) ? 0 : ts
                    } else {
                        article.timestamp = 0
                    }
                    return article
                })
                .sort((a, b) => b.timestamp - a.timestamp)
        })
)

const isSearching = computed(() => searchQuery.value.trim().length > 0)

const filteredArticles = computed(() => {
    if (!articles.value) return []
    if (!isSearching.value) return articles.value
    const q = searchQuery.value.toLowerCase().trim()
    return articles.value.filter(a => getArticleSearchText(a).includes(q))
})

// Hors recherche, le plus récent est à la une ; les cartes prennent la suite.
const featured = computed(() => (isSearching.value ? null : filteredArticles.value[0] || null))

const listed = computed(() => {
    const pool = isSearching.value ? filteredArticles.value : filteredArticles.value.slice(1)
    const limit = isSearching.value ? displayCount.value : displayCount.value - 1
    return pool.slice(0, Math.max(limit, 0))
})

const shownCount = computed(() => listed.value.length + (featured.value ? 1 : 0))

const allLoaded = computed(() => displayCount.value >= filteredArticles.value.length)

function loadMore() {
    displayCount.value += ITEMS_PER_PAGE - 1
}

watch(searchQuery, () => {
    displayCount.value = ITEMS_PER_PAGE
})

// Recherche partageable via `?q=` (cible du SearchAction déclaré dans app.vue).
// `/` est prérendu sans query et Cloudflare sert ce même HTML pour `/?q=nuxt` :
// lire `route.query.q` dans setup() provoquerait une erreur d'hydratation sur la
// page la plus importante du site. On l'applique donc APRÈS le montage.
const SEARCH_URL_DEBOUNCE = 300
let searchUrlTimer = null

function queryFromRoute() {
    const q = route.query.q
    return typeof q === 'string' ? q : ''
}

// Saisie → URL, debouncée et en `replace` : 8 caractères tapés = zéro entrée
// d'historique. Chaque watcher compare à la source de l'autre avant d'écrire.
watch(searchQuery, (value) => {
    clearTimeout(searchUrlTimer)
    searchUrlTimer = setTimeout(() => {
        const trimmed = value.trim()
        if (trimmed === queryFromRoute()) return
        const query = { ...route.query }
        if (trimmed) query.q = trimmed
        else delete query.q
        router.replace({ query })
    }, SEARCH_URL_DEBOUNCE)
})

// URL → saisie : retour arrière du navigateur, lien collé.
watch(() => route.query.q, () => {
    const fromRoute = queryFromRoute()
    if (fromRoute !== searchQuery.value.trim()) searchQuery.value = fromRoute
})

onMounted(() => {
    const initialQuery = queryFromRoute()
    if (initialQuery) searchQuery.value = initialQuery
})

onUnmounted(() => {
    clearTimeout(searchUrlTimer)
})

function isNew(article) {
    if (!article.createdAt) return false
    const created = new Date(article.createdAt).getTime()
    const sevenDays = 7 * 24 * 60 * 60 * 1000
    return (Date.now() - created) < sevenDays
}

function getExcerptText(article, max = 140) {
    const content = getArticleSearchIntent(article)
    const text = content.replace(/<[^>]*>/g, '')
    return text.length > max ? text.slice(0, max).trimEnd() + '…' : text
}

function formatDate(createdAt) {
    if (createdAt) {
        const date = new Date(createdAt)
        if (isNaN(date.getTime())) return ''
        return new Intl.DateTimeFormat(dateLocale(locale.value), {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).format(date).replace('.', '')
    }
    return ''
}
</script>

<style lang="scss" scoped>
.home {
    max-width: var(--wrap);
    margin: 0 auto;
    padding: 0 var(--gutter);
    /* Le cercle du héros dépasse à droite : `clip` le coupe sans créer de
       zone de défilement (contrairement à `hidden`). */
    overflow-x: clip;
}

/* ==========================================
   Ouverture
   ========================================== */
.home-hero {
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(300px, 0.75fr);
    gap: clamp(2rem, 6vw, 5rem);
    align-items: end;
    padding: clamp(3rem, 8vw, 6rem) 0 clamp(2.5rem, 5vw, 3.5rem);
    border-bottom: 1px solid var(--border-color);

    /* Le cercle du héros du portfolio, en filigrane. */
    &::before {
        content: '';
        position: absolute;
        z-index: -1;
        top: -18%;
        right: -12%;
        width: min(46vw, 620px);
        aspect-ratio: 1;
        border: 1px solid var(--accent-2-line);
        border-radius: 50%;
        background: radial-gradient(circle, var(--accent-2-soft), transparent 64%);
        opacity: 0.55;
        pointer-events: none;
    }
}

.home-hero__data {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 0 0 1.25rem;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--accent-2-text);
}

.home-hero__title {
    margin: 0 0 1.5rem;
    font-size: clamp(2.9rem, 7vw, 5.75rem);
    font-weight: 600;
    line-height: 0.95;
    letter-spacing: -0.04em;

    em {
        font-style: normal;
        color: var(--accent);
    }
}

/* « Le blog de » : partie du titre pour les robots, posée en petit au-dessus. */
.home-hero__kicker {
    display: block;
    margin-bottom: 0.6rem;
    font-size: clamp(1rem, 1.6vw, 1.25rem);
    font-weight: 500;
    letter-spacing: -0.01em;
    color: var(--text-muted);
}

.home-hero__lede {
    max-width: 46ch;
    margin: 0;
    font-size: clamp(1.05rem, 1.4vw, 1.2rem);
    line-height: 1.6;
    color: var(--text-muted);
}

.home-hero__tools {
    display: grid;
    gap: 1.5rem;
}

.home-hero__themes-title {
    margin: 0 0 0.65rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-primary);
}

.home-hero__chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
}

/* ==========================================
   Métadonnées partagées par les cartes
   ========================================== */
.card-meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.45rem;
    margin: 0 0 0.75rem;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--accent-2-text);
}

.card-meta__new {
    padding: 0.15rem 0.45rem;
    border: 1px solid var(--accent-line);
    border-radius: var(--radius);
    background: var(--accent-soft);
    color: var(--accent);
    font-weight: 600;
}

.card-link {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    margin-top: auto;
    font-family: var(--font-mono);
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: var(--accent);

    .material-icons {
        font-size: 1rem;
        transition: transform 0.25s var(--ease-out);
    }
}

.thumb-fallback-fill {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
}

/* ==========================================
   À la une
   ========================================== */
.featured {
    display: grid;
    grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
    margin-top: clamp(2rem, 4vw, 3rem);
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    background: linear-gradient(135deg, var(--bg-card), var(--bg-secondary));
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    transition: border-color 0.25s ease, box-shadow 0.25s ease;

    &:hover {
        border-color: var(--accent-2-line);
        box-shadow: var(--card-shadow-hover);

        .featured__media img { transform: scale(1.03); }
        .featured__title { color: var(--accent); }
        .card-link .material-icons { transform: translateX(3px); }
    }
}

.featured__media {
    position: relative;
    min-height: 100%;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    border-right: 1px solid var(--border-color);
    background: var(--bg-secondary);

    img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.6s var(--ease-out);
    }
}

.featured__body {
    display: flex;
    flex-direction: column;
    padding: clamp(1.5rem, 3vw, 2.5rem);
}

.featured__title {
    margin: 0 0 1rem;
    font-size: clamp(1.6rem, 2.6vw, 2.35rem);
    line-height: 1.08;
    letter-spacing: -0.04em;
    transition: color 0.2s ease;
}

.featured__excerpt {
    margin: 0 0 1.75rem;
    color: var(--text-muted);
    font-size: 1.02rem;
    line-height: 1.6;
}

/* ==========================================
   Liste
   ========================================== */
.home-list {
    margin-top: clamp(3rem, 6vw, 4.5rem);
}

.home-list__head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.home-list__title {
    margin: 0;
    font-size: clamp(1.75rem, 3.2vw, 2.6rem);
    line-height: 1.05;
    letter-spacing: -0.04em;
}

.home-list__count {
    margin: 0;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: var(--text-muted);
    font-variant-numeric: tabular-nums;
}

.card-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.125rem;
    margin: 0;
    padding: 0;
    list-style: none;

    > li {
        display: flex;
    }
}

/* Carte projet du portfolio : vignette, filet, métadonnées en mono. */
.card {
    display: flex;
    flex-direction: column;
    width: 100%;
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    background: linear-gradient(135deg, var(--bg-card), var(--bg-secondary));
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s var(--ease-out);

    &:hover {
        border-color: var(--accent-2-line);
        box-shadow: var(--card-shadow-hover);
        transform: translateY(-2px);

        .card__media img { transform: scale(1.04); }
        .card__title { color: var(--accent); }
    }
}

.card__media {
    position: relative;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    border-bottom: 1px solid var(--border-color);
    background: var(--bg-secondary);

    img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.6s var(--ease-out);
    }
}

.card__body {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 1.25rem 1.35rem 1.5rem;
}

.card__title {
    margin: 0 0 0.6rem;
    font-size: 1.22rem;
    line-height: 1.2;
    letter-spacing: -0.03em;
    transition: color 0.2s ease;
}

.card__excerpt {
    margin: 0;
    color: var(--text-muted);
    font-size: 0.95rem;
    line-height: 1.55;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.home-more,
.home-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2.5rem 0 0;
}

.home-empty {
    padding: 3rem 1rem;
    border: 1px dashed var(--border-strong);
    border-radius: var(--radius);
    text-align: center;

    p {
        margin: 0;
        color: var(--text-muted);
    }
}

.home-end {
    margin: 2.5rem 0 0;
    text-align: center;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-muted);
}

/* ==========================================
   Responsive
   ========================================== */
@media screen and (max-width: 1023px) {
    .home-hero {
        grid-template-columns: 1fr;
        align-items: start;
    }

    .card-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .featured {
        grid-template-columns: 1fr;
    }

    .featured__media {
        border-right: 0;
        border-bottom: 1px solid var(--border-color);
    }
}

@media screen and (max-width: 640px) {
    .home-hero {
        padding-top: 2.25rem;
        gap: 1.75rem;

        &::before {
            width: 90vw;
            top: -10%;
            right: -40%;
        }
    }

    .home-hero__title {
        font-size: clamp(2.6rem, 13vw, 3.4rem);
    }

    .card-grid {
        grid-template-columns: 1fr;
    }

    .home-list__head {
        flex-wrap: wrap;
    }
}
</style>
