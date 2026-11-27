<template>
    <div class="layout">
        <div class="main">
            <slot />
        </div>

        <!-- Pendant de l'encadré « Carnet de bord » du portfolio, qui renvoie
             vers ce blog : ici, le blog renvoie vers le portfolio. -->
        <aside v-if="!immersive" class="portfolio-band" :aria-label="$t('cv')">
            <div class="portfolio-band__inner">
                <div class="portfolio-band__copy">
                    <p class="portfolio-band__title">{{ $t('footerPanelTitle') }}</p>
                    <p class="portfolio-band__text">{{ $t('footerPanelText') }}</p>
                </div>
                <a :href="CV_URL" class="btn btn--primary" target="_blank" rel="noopener" :aria-label="$t('cvLabel')">
                    {{ $t('footerPanelCta') }} <i class="material-icons" aria-hidden="true">north_east</i>
                </a>
            </div>
        </aside>

        <footer v-if="!immersive" class="footer">
            <div class="footer-content">
                <div class="footer-brand">
                    <NuxtLink :to="localePath('/')" class="footer-brand__link">
                        <img class="footer-brand__mark" src="/favicon-96x96.png" :alt="imgText($t('logoAlt'))" :title="imgText($t('logoAlt'))" width="34" height="34" loading="lazy" />
                        <span class="footer-brand__wordmark"><span class="footer-brand__kicker">Le Blog de </span>Jean-Luc Houédanou</span>
                    </NuxtLink>
                    <p class="footer-brand__lede">{{ $t('heroLede') }}</p>
                </div>

                <nav class="footer-col" :aria-label="$t('footerBlog')">
                    <p class="footer-col__title">{{ $t('footerBlog') }}</p>
                    <NuxtLink :to="localePath('/')">{{ $t('home') }}</NuxtLink>
                    <NuxtLink :to="localePath('/tags')">{{ $t('tags') }}</NuxtLink>
                    <NuxtLink :to="localePath('/themes')">{{ $t('themes') }}</NuxtLink>
                    <a href="/feed.xml">{{ $t('rssFeed') }}</a>
                </nav>

                <nav class="footer-col" :aria-label="$t('footerAuthor')">
                    <p class="footer-col__title">{{ $t('footerAuthor') }}</p>
                    <NuxtLink to="/a-propos">{{ $t('about') }}</NuxtLink>
                    <a :href="CV_URL" target="_blank" rel="noopener">{{ $t('cv') }}</a>
                    <NuxtLink to="/confidentialite">{{ $t('privacy') }}</NuxtLink>
                </nav>

                <nav class="footer-col" :aria-label="$t('footerElsewhere')">
                    <p class="footer-col__title">{{ $t('footerElsewhere') }}</p>
                    <a v-for="link in SOCIAL_LINKS" :key="link.href" :href="link.href" target="_blank" rel="noopener me">{{ link.label }}</a>
                </nav>
            </div>

            <div class="footer-bottom">
                <p>&copy; {{ new Date().getFullYear() }} Jean-Luc Houédanou · {{ $t('allRightsReserved') }}</p>
                <p>Abidjan, Côte d'Ivoire</p>
            </div>
        </footer>
    </div>
</template>

<script setup>
import { useImageText } from '~/composables/useImageText.js'

const imgText = useImageText()
import { useLocalePath } from '#i18n'
import { CV_URL } from '~/utils/site.js'

const localePath = useLocalePath()
// Les modes immersifs (/vr, /blogvision) occupent tout l'écran, sans pied de page.
const route = useRoute()
const immersive = computed(() => Boolean(route.meta.immersive))

// Une partie des profils de SAME_AS (utils/site.js), ceux où le blog est
// relayé. La liste complète reste visible sur /a-propos.
const SOCIAL_LINKS = [
    { label: 'GitHub', href: 'https://github.com/jhouedanou' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jlhouedanou' },
    { label: 'YouTube', href: 'https://www.youtube.com/@JeanLucHouedanou' },
    { label: 'X', href: 'https://x.com/afrowebdesigner' },
]
</script>

<style scoped>
.layout {
    font-family: var(--font-body);
    color: var(--text-primary);
    background-color: transparent;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 2;
}

.main {
    flex-grow: 1;
    padding: 0;
    background: transparent;
}

/* ==========================================
   Encadré portfolio — panneau cuivre du CV
   ========================================== */
.portfolio-band {
    max-width: var(--wrap);
    width: 100%;
    margin: 5rem auto 0;
    padding: 0 var(--gutter);
}

.portfolio-band__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    padding: clamp(1.75rem, 4vw, 3rem);
    border: 1px solid var(--accent-line);
    border-radius: var(--radius);
    background: var(--accent-soft);
}

.portfolio-band__title {
    margin: 0 0 0.5rem;
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 3vw, 2.25rem);
    font-weight: 600;
    line-height: 1.1;
    letter-spacing: -0.04em;
    color: var(--text-primary);
    text-wrap: balance;
}

.portfolio-band__text {
    margin: 0;
    max-width: 52ch;
    color: var(--text-muted);
    font-size: 1rem;
    line-height: 1.6;
}

.portfolio-band .btn .material-icons {
    font-size: 1.05rem;
}

/* ==========================================
   Footer
   ========================================== */
.footer {
    margin-top: 4rem;
    border-top: 1px solid var(--border-color);
    background: var(--bg-glass);
}

.footer-content {
    max-width: var(--wrap);
    margin: 0 auto;
    padding: 3rem var(--gutter) 2.5rem;
    display: grid;
    grid-template-columns: minmax(0, 1.6fr) repeat(3, minmax(0, 1fr));
    gap: 2.5rem;
}

.footer-brand__link {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    color: var(--text-primary);
}

.footer-brand__mark {
    width: 34px;
    height: 34px;
    border-radius: var(--radius);
    display: block;
    transform: rotate(-3deg);
    box-shadow: 0 0 0 1px var(--accent-line);
}

.footer-brand__wordmark {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    font-family: var(--font-brand);
    font-size: 1.12rem;
    line-height: 1;
}

.footer-brand__kicker {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent-2-text);
}

.footer-brand__lede {
    margin: 1rem 0 0;
    max-width: 38ch;
    color: var(--text-muted);
    font-size: 0.95rem;
    line-height: 1.6;
}

.footer-col {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.footer-col__title {
    margin: 0 0 0.5rem;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--accent-2-text);
}

.footer-col a {
    display: inline-flex;
    align-items: center;
    min-height: 36px;
    min-width: 28px;
    color: var(--text-primary);
    font-size: 0.95rem;
    text-decoration: none;
    transition: color 0.2s ease;
}

.footer-col a:hover {
    color: var(--accent);
}

.footer-bottom {
    max-width: var(--wrap);
    margin: 0 auto;
    padding: 1.25rem var(--gutter) 1.75rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 0.5rem 2rem;
    border-top: 1px solid var(--border-color);
}

.footer-bottom p {
    margin: 0;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.04em;
    color: var(--text-muted);
}

@media screen and (max-width: 900px) {
    .footer-content {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .footer-brand {
        grid-column: 1 / -1;
    }
}

@media screen and (max-width: 640px) {
    .portfolio-band {
        margin-top: 3.5rem;
    }

    .portfolio-band__inner {
        flex-direction: column;
        align-items: flex-start;
        gap: 1.5rem;
    }

    .footer-content {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 2rem 1.5rem;
    }

    .footer-col a {
        min-height: 44px;
    }
}
</style>
