<template>
  <header class="site-header" @keydown.esc="closeMenu">
    <div class="site-header__inner">
      <NuxtLink :to="localePath('/')" class="site-header__brand" :aria-label="`${$t('home')} - Le Blog de Jean-Luc Houédanou`">
        <img class="site-header__mark" src="/favicon-96x96.png" :alt="imgText($t('logoAlt'))" :title="imgText($t('logoAlt'))" width="34" height="34" />
        <span class="site-header__wordmark"><span class="site-header__kicker">Le Blog de </span><span class="site-header__name">Jean-Luc Houédanou</span></span>
      </NuxtLink>

      <nav id="nav-menu" class="site-header__nav" :class="{ 'is-open': mobileMenuOpen }" :aria-label="$t('mainNav')">
        <NuxtLink :to="localePath('/')" class="site-header__nav-link" :class="{ 'is-current': isHome }" @click="closeMenu">{{ $t('home') }}</NuxtLink>
        <NuxtLink :to="localePath('/tags')" class="site-header__nav-link" @click="closeMenu">{{ $t('tags') }}</NuxtLink>
        <NuxtLink :to="localePath('/themes')" class="site-header__nav-link" @click="closeMenu">{{ $t('themes') }}</NuxtLink>
        <NuxtLink to="/a-propos" class="site-header__nav-link" @click="closeMenu">{{ $t('about') }}</NuxtLink>
        <!-- Liens présents seulement dans le menu mobile : sur ordinateur,
             ils vivent dans les actions de l'en-tête et le pied de page. -->
        <a href="/feed.xml" class="site-header__nav-link site-header__nav-link--mobile" @click="closeMenu">{{ $t('rssFeed') }}</a>
        <NuxtLink :to="localePath('/vr')" class="site-header__nav-link site-header__nav-link--mobile" @click="closeMenu">{{ $t('vrMode') }}</NuxtLink>
        <NuxtLink :to="localePath('/blogvision')" class="site-header__nav-link site-header__nav-link--mobile" @click="closeMenu">Blogvision</NuxtLink>
        <a :href="CV_URL" class="site-header__nav-link site-header__nav-link--mobile site-header__nav-link--external" target="_blank" rel="noopener" :aria-label="$t('cvLabel')" @click="closeMenu">{{ $t('cv') }}</a>
      </nav>

      <div class="site-header__actions">
        <LanguageSwitcher />
        <button
          type="button"
          class="site-header__icon-btn"
          @click="toggleDarkMode"
          :aria-label="isDark ? $t('lightMode') : $t('darkMode')"
          :title="isDark ? $t('lightMode') : $t('darkMode')"
        >
          <i class="material-icons" aria-hidden="true">{{ isDark ? 'light_mode' : 'dark_mode' }}</i>
        </button>
        <NuxtLink :to="localePath('/vr')" class="btn site-header__mode" :aria-label="$t('vrModeLabel')">{{ $t('vrMode') }}</NuxtLink>
        <NuxtLink :to="localePath('/blogvision')" class="btn site-header__mode" :aria-label="$t('blogvisionLabel')">Blogvision</NuxtLink>
        <a
          :href="CV_URL"
          class="btn btn--primary site-header__cta"
          target="_blank"
          rel="noopener"
          :aria-label="$t('cvLabel')"
        >{{ $t('cv') }} <i class="material-icons" aria-hidden="true">north_east</i></a>
        <button
          type="button"
          class="site-header__burger"
          :class="{ 'is-active': mobileMenuOpen }"
          @click="mobileMenuOpen = !mobileMenuOpen"
          :aria-expanded="mobileMenuOpen ? 'true' : 'false'"
          :aria-label="$t('menuLabel')"
          aria-controls="nav-menu"
        >
          <span aria-hidden="true"></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useImageText } from '~/composables/useImageText.js'

const imgText = useImageText()
// En-tête partagé par app.vue et error.vue : la page d'erreur remplace
// app.vue entièrement et perdait sinon toute navigation.
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLocalePath } from '#i18n'
import LanguageSwitcher from '~/components/LanguageSwitcher.vue'
import { CV_URL } from '~/utils/site.js'
import { THEME_OVERRIDE_KEY } from '~/utils/theme.js'

const localePath = useLocalePath()
const route = useRoute()
const isHome = computed(() => /^\/(en\/?)?$/.test(route.path))

const isDark = ref(true)
const mobileMenuOpen = ref(false)

function closeMenu() {
  mobileMenuOpen.value = false
}

// Le menu mobile se referme à chaque changement de page.
watch(() => route.path, closeMenu)

function applyTheme(dark) {
  isDark.value = dark
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
}

function currentThemeIsDark() {
  try {
    return sessionStorage.getItem(THEME_OVERRIDE_KEY) !== 'light'
  } catch {
    return true
  }
}

function toggleDarkMode() {
  const next = !isDark.value
  applyTheme(next)
  try {
    // Revenir au sombre, c'est revenir au défaut : on efface le choix.
    if (next) sessionStorage.removeItem(THEME_OVERRIDE_KEY)
    else sessionStorage.setItem(THEME_OVERRIDE_KEY, 'light')
  } catch {}
}

onMounted(() => {
  try { localStorage.removeItem('theme') } catch {}
  applyTheme(currentThemeIsDark())
})
</script>

<style lang="scss">
/* ==========================================
   En-tête — celui du portfolio
   ========================================== */
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--bg-glass);
  backdrop-filter: blur(14px) saturate(130%);
  -webkit-backdrop-filter: blur(14px) saturate(130%);
  border-bottom: 1px solid var(--border-color);
}

.site-header__inner {
  max-width: var(--wrap);
  margin: 0 auto;
  padding: 0 var(--gutter);
  height: var(--header-h);
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.site-header__brand {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  min-height: 44px;
  text-decoration: none;
  color: var(--text-primary);
  flex-shrink: 0;

  &:hover .site-header__mark {
    transform: rotate(0deg);
  }
}

/* Le logo, incliné comme le monogramme du CV. */
.site-header__mark {
  width: 34px;
  height: 34px;
  border-radius: var(--radius);
  display: block;
  transform: rotate(-3deg);
  box-shadow: 0 0 0 1px var(--accent-line);
  transition: transform 0.3s var(--ease-out);
}

.site-header__wordmark {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  line-height: 1;
}

.site-header__kicker {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent-2-text);
}

.site-header__name {
  font-family: var(--font-brand);
  font-size: 1.12rem;
  font-weight: 400;
  letter-spacing: 0;
  color: var(--text-primary);
}

.site-header__nav {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-left: auto;
}

.site-header__nav-link {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 0.7rem;
  font-family: var(--font-sans);
  font-size: 0.92rem;
  font-weight: 500;
  color: var(--text-primary);
  text-decoration: none;
  border-radius: var(--radius);
  transition: color 0.2s ease, background-color 0.2s ease;

  &:hover {
    color: var(--accent);
  }

  &.router-link-active,
  &.is-current {
    color: var(--accent);
  }

  &--mobile {
    display: none;
  }
}

.site-header__actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.site-header__icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 1px solid var(--border-color);
  background: transparent;
  color: var(--text-primary);
  border-radius: var(--radius);
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;

  .material-icons {
    font-size: 1.3rem;
  }

  &:hover {
    background: var(--bg-elevated);
    border-color: var(--accent-2-line);
    color: var(--accent-2-text);
  }
}

/* Modes VR et Blogvision : contour lavande, comme le bouton « VR / 3D » du CV. */
.site-header__mode {
  padding: 0 0.8rem;
  border-color: var(--accent-2-line);
  color: var(--accent-2-text);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  letter-spacing: 0.06em;

  &:hover {
    background: var(--accent-2);
    border-color: var(--accent-2);
    color: var(--bg-primary);
  }
}

.site-header__cta .material-icons {
  font-size: 1.05rem;
}

/* ==========================================
   Menu mobile — même tiroir que le CV
   ========================================== */
.site-header__burger {
  display: none;
  place-items: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  background: transparent;
  color: var(--text-primary);
  cursor: pointer;

  span,
  span::before,
  span::after {
    display: block;
    width: 18px;
    height: 2px;
    border-radius: 2px;
    background: currentColor;
    transition: transform 0.2s ease, background-color 0.2s ease;
  }

  span {
    position: relative;
  }

  span::before,
  span::after {
    content: '';
    position: absolute;
    left: 0;
  }

  span::before { top: -6px; }
  span::after { top: 6px; }

  &.is-active span { background: transparent; }
  &.is-active span::before { transform: translateY(6px) rotate(45deg); }
  &.is-active span::after { transform: translateY(-6px) rotate(-45deg); }
}

@media screen and (max-width: 1160px) {
  .site-header__cta,
  .site-header__mode {
    display: none;
  }

  .site-header__inner {
    gap: 0.75rem;
  }

  .site-header__burger {
    display: grid;
  }

  .site-header__actions {
    margin-left: auto;
  }

  .site-header__nav {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    max-height: calc(100dvh - var(--header-h));
    overflow-y: auto;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    margin: 0;
    padding: 0.25rem var(--gutter) 0.9rem;
    background: var(--bg-primary);
    border-bottom: 1px solid var(--border-color);
    box-shadow: 0 24px 40px rgba(2, 6, 18, 0.35);

    &.is-open {
      display: flex;
    }
  }

  .site-header__nav-link,
  .site-header__nav-link--mobile {
    display: flex;
    justify-content: space-between;
    min-height: 48px;
    padding: 0 0.25rem;
    border-top: 1px solid var(--border-color);
    border-radius: 0;
    font-size: 1rem;
    font-weight: 600;

    &::after {
      content: '→';
      color: var(--accent);
    }
  }

  .site-header__nav-link--external::after {
    content: '↗';
  }
}

@media screen and (max-width: 480px) {
  // Sur petit écran, « Le Blog de » reste dans le lien (nom du site pour les
  // robots et les lecteurs d'écran) mais n'est plus affiché.
  .site-header__kicker {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }

  .site-header__name {
    font-size: 1rem;
    line-height: 1.1;
    max-width: 7.5em;
  }

  .site-header__mark {
    width: 30px;
    height: 30px;
  }
}
</style>
