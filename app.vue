<template>
  <NuxtLayout>
    <NuxtLoadingIndicator color="#00ffd1" :height="2" />

    <a href="#main-content" class="skip-link">{{ $t('skipToContent') }}</a>

    <header class="site-header" :class="{ 'site-header--scrolled': scrolled }">
      <div class="site-header__inner">
        <NuxtLink to="/" class="site-header__brand" aria-label="Accueil - Le Blog de Jean-Luc Houédanou">
          <span class="site-header__mark" aria-hidden="true">JLH</span>
          <span class="site-header__wordmark">Journal<em>.</em></span>
        </NuxtLink>

        <button
          class="site-header__burger"
          :class="{ 'is-active': mobileMenuOpen }"
          @click="mobileMenuOpen = !mobileMenuOpen"
          :aria-expanded="mobileMenuOpen"
          aria-label="Menu de navigation"
          aria-controls="nav-menu"
        >
          <span></span>
          <span></span>
        </button>

        <nav id="nav-menu" class="site-header__nav" :class="{ 'is-open': mobileMenuOpen }">
          <NuxtLink to="/" class="site-header__nav-link" @click="mobileMenuOpen = false">
            <span>{{ $t('home') }}</span>
          </NuxtLink>
          <NuxtLink to="/tags" class="site-header__nav-link" @click="mobileMenuOpen = false">
            <span>{{ $t('tags') }}</span>
          </NuxtLink>
          <NuxtLink to="/cv" class="site-header__nav-link" @click="mobileMenuOpen = false">
            <span>{{ $t('cv') }}</span>
          </NuxtLink>
          <NuxtLink to="/a-propos" class="site-header__nav-link" @click="mobileMenuOpen = false">
            <span>{{ $t('about') }}</span>
          </NuxtLink>
        </nav>

        <div class="site-header__actions">
          <button
            class="site-header__action-btn"
            @click="toggleDarkMode"
            :aria-label="isDark ? $t('lightMode') : $t('darkMode')"
            :title="isDark ? $t('lightMode') : $t('darkMode')"
          >
            <i class="material-icons">{{ isDark ? 'light_mode' : 'dark_mode' }}</i>
          </button>
          <a
            href="/feed.xml"
            class="site-header__action-btn"
            aria-label="Flux RSS"
            target="_blank"
          >
            <i class="material-icons">rss_feed</i>
          </a>
        </div>
      </div>
    </header>

    <main id="main-content">
      <NuxtPage />
    </main>

    <ClientOnly>
      <ScrollToTop />
    </ClientOnly>
  </NuxtLayout>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ScrollToTop from '~/components/ScrollToTop.vue'

const isDark = ref(true)
const mobileMenuOpen = ref(false)
const scrolled = ref(false)

function toggleDarkMode() {
  isDark.value = !isDark.value
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

function onScroll() {
  scrolled.value = window.scrollY > 8
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved) {
    isDark.value = saved === 'dark'
  } else {
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches
    isDark.value = !prefersLight
  }
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

useHead({
  title: 'Le blog de Jean-Luc Houédanou',
  htmlAttrs: {
    'data-theme': 'dark',
  },
  meta: [
    { name: 'theme-color', content: '#0a0a0f' },
  ],
  link: [
    {
      rel: 'alternate',
      type: 'application/rss+xml',
      title: 'Le Blog de Jean-Luc Houédanou — Flux RSS',
      href: '/feed.xml',
    },
  ],
});
</script>

<style lang="scss">
html {
  background: var(--bg-primary);
  transition: background-color 0.4s ease, color 0.4s ease;
}

main {
  background: transparent;
  min-height: calc(100vh - 60px);
}

/* ==========================================
   Skip link
   ========================================== */
.skip-link {
  position: absolute;
  top: -100%;
  left: 1rem;
  z-index: 9999;
  background: var(--accent);
  color: #0a0a0f;
  padding: 0.75rem 1.5rem;
  border-radius: 0 0 8px 8px;
  font-family: var(--font-sans);
  font-weight: 600;
  text-decoration: none;
  transition: top 0.2s ease;

  &:focus {
    top: 0;
  }
}

/* ==========================================
   Header
   ========================================== */
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: transparent;
  transition: background 0.35s ease, backdrop-filter 0.35s ease, border-color 0.35s ease;
  border-bottom: 1px solid transparent;

  &--scrolled {
    background: var(--bg-glass);
    backdrop-filter: blur(18px) saturate(140%);
    -webkit-backdrop-filter: blur(18px) saturate(140%);
    border-bottom-color: var(--border-color);
  }
}

.site-header__inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.site-header__brand {
  display: inline-flex;
  align-items: baseline;
  gap: 0.65rem;
  text-decoration: none;
  color: var(--text-primary);
  flex-shrink: 0;

  &:hover .site-header__mark {
    background: var(--accent);
    color: #0a0a0f;
    box-shadow: var(--neon-glow-teal);
  }

  &:hover .site-header__wordmark em {
    color: var(--accent-magenta);
  }
}

.site-header__mark {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  padding: 0.32rem 0.5rem;
  border: 1px solid var(--border-strong);
  border-radius: 4px;
  color: var(--text-primary);
  transition: background 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
  line-height: 1;
}

.site-header__wordmark {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 500;
  font-size: 1.55rem;
  letter-spacing: -0.02em;
  line-height: 1;
  color: var(--text-primary);

  em {
    font-style: normal;
    color: var(--accent);
    transition: color 0.25s ease;
  }
}

.site-header__nav {
  display: flex;
  align-items: center;
  gap: 1.75rem;
  margin-left: auto;

  @media (max-width: 980px) {
    gap: 1.25rem;
  }
}

.site-header__nav-link {
  position: relative;
  font-family: var(--font-sans);
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  padding: 0.4rem 0;
  letter-spacing: 0.01em;
  transition: color 0.2s ease;

  span {
    position: relative;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 1px;
    background: var(--accent);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.35s cubic-bezier(0.65, 0, 0.35, 1);
  }

  &:hover,
  &.router-link-active {
    color: var(--text-primary);

    &::after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }
}

.site-header__actions {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.site-header__action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--border-color);
  background: transparent;
  color: var(--text-secondary);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.25s ease;
  text-decoration: none;

  .material-icons {
    font-size: 1.2rem;
  }

  &:hover {
    background: var(--accent-soft);
    color: var(--accent);
    border-color: var(--accent);
    box-shadow: var(--neon-glow-teal);
    transform: translateY(-1px);
  }
}

/* ==========================================
   Mobile burger
   ========================================== */
.site-header__burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  width: 40px;
  height: 40px;
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  padding: 0;
  margin-left: auto;

  span {
    display: block;
    width: 18px;
    height: 1.5px;
    background: var(--text-primary);
    border-radius: 1px;
    margin: 0 auto;
    transition: all 0.3s ease;
  }

  &.is-active {
    span:nth-child(1) {
      transform: translateY(4px) rotate(45deg);
    }
    span:nth-child(2) {
      transform: translateY(-4px) rotate(-45deg);
    }
  }
}

@media screen and (max-width: 768px) {
  .site-header__inner {
    padding: 0 1rem;
    gap: 1rem;
  }

  .site-header__burger {
    display: flex;
    order: 3;
  }

  .site-header__nav {
    display: none;
    position: absolute;
    top: 72px;
    left: 0;
    right: 0;
    background: var(--bg-glass);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    flex-direction: column;
    align-items: stretch;
    padding: 1rem;
    gap: 0;
    margin: 0;

    &.is-open {
      display: flex;
    }
  }

  .site-header__nav-link {
    padding: 0.85rem 1rem;
    width: 100%;
    border-radius: 8px;
    border-bottom: 1px solid var(--border-color);

    &::after {
      display: none;
    }

    &:last-child {
      border-bottom: none;
    }

    &:hover,
    &.router-link-active {
      background: var(--accent-soft);
    }
  }

  .site-header__actions {
    order: 2;
  }

  .site-header__wordmark {
    font-size: 1.3rem;
  }
}
</style>
