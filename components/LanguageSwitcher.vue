<template>
    <nav class="language-switcher" :aria-label="$t('language')">
        <NuxtLink
            v-for="item in items"
            :key="item.code"
            :to="item.to"
            class="language-switcher__link"
            :class="{ 'is-active': item.code === locale }"
            :aria-current="item.code === locale ? 'true' : null"
            :aria-label="item.label"
            :title="item.label"
            :hreflang="item.code"
            @click="rememberLanguage(item.code)"
        >{{ item.code.toUpperCase() }}</NuxtLink>
    </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useSwitchLocalePath } from '#i18n'
import { translatedArticlePath, rememberLanguage } from '~/utils/i18n.js'

const route = useRoute()
const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

// Les articles vivent dans content/<locale>/<slug> : leur URL porte déjà la
// langue (/fr/<slug>, /en/<slug>) et switchLocalePath produirait /en/fr/<slug>.
// Pour le reste du site (accueil, tags, thématiques), on s'appuie sur i18n.
//
// Exception : un tag n'a pas le même slug d'une langue à l'autre (afrique,
// africa). switchLocalePath menait de /en/tags/africa à /tags/africa, une page
// vide en noindex que le prerender générait puis que le sitemap annonçait
// (53 pages). Depuis une page de tag, on renvoie vers l'index des tags.
const TAG_PAGE = /^(\/en)?\/tags\/[^/]+\/?$/

function otherLocalePath(code) {
    if (TAG_PAGE.test(route.path)) return code === 'en' ? '/en/tags' : '/tags'
    return switchLocalePath(code)
}

const items = computed(() =>
    locales.value.map((entry) => {
        const code = typeof entry === 'string' ? entry : entry.code
        return {
            code,
            to: translatedArticlePath(route.path, code) || otherLocalePath(code),
            label: code === 'en' ? t('switchToEnglish') : t('switchToFrench'),
        }
    })
)
</script>

<style scoped>
.language-switcher {
    display: inline-flex;
    align-items: center;
    gap: 0.15rem;
    padding: 0.2rem;
    border: 1px solid var(--border-color);
    border-radius: 999px;
    background: var(--bg-card);
}

.language-switcher__link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2rem;
    height: 1.7rem;
    padding: 0 0.55rem;
    border-radius: 999px;
    font-family: var(--font-mono);
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    color: var(--text-muted);
    text-decoration: none;
    transition: color 0.2s ease, background-color 0.2s ease;
}

.language-switcher__link:hover {
    color: var(--accent);
}

.language-switcher__link.is-active {
    color: var(--accent-contrast);
    background: var(--accent);
}
</style>
