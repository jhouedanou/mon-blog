<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />

    <a href="#main-content" class="skip-link">{{ $t('skipToContent') }}</a>

    <header class="site-header">
      <div class="site-header__inner">
        <NuxtLink to="/" class="site-header__logo" aria-label="Accueil - Le Blog de Jean-Luc Houédanou">
          <img alt="Le Blog de Jean-Luc Houédanou" src="/images/1837389.webp" height="40" width="40">
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
          <span></span>
        </button>

        <nav id="nav-menu" class="site-header__nav" :class="{ 'is-open': mobileMenuOpen }">
          <NuxtLink to="/" class="site-header__nav-link" @click="mobileMenuOpen = false">
            {{ $t('home') }}
          </NuxtLink>
          <NuxtLink to="/a-propos" class="site-header__nav-link" @click="mobileMenuOpen = false">
            {{ $t('about') }}
          </NuxtLink>
        </nav>

        <div class="site-header__actions">
          <button
            class="site-header__action-btn"
            @click="toggleDarkMode"
            :aria-label="isDark ? $t('lightMode') : $t('darkMode')"
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

    <main id="main-content" class="section">
      <NuxtPage />
    </main>

    <ClientOnly>
      <ScrollToTop />
    </ClientOnly>
  </NuxtLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ScrollToTop from '~/components/ScrollToTop.vue'

const isDark = ref(false)
const mobileMenuOpen = ref(false)

function toggleDarkMode() {
  isDark.value = !isDark.value
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved) {
    isDark.value = saved === 'dark'
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
})

useHead({
  title: 'Le blog de Jean-Luc Houédanou',
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
  transition: background-color 0.3s ease, color 0.3s ease;
}

main {
  background: var(--bg-primary);
}

/* Skip link */
.skip-link {
  position: absolute;
  top: -100%;
  left: 1rem;
  z-index: 9999;
  background: #2EC4B6;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 0 0 8px 8px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  text-decoration: none;
  transition: top 0.2s ease;

  &:focus {
    top: 0;
  }
}

/* Header */
.site-header {
  background: var(--bg-card);
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: background-color 0.3s ease;
}

.site-header__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.site-header__logo {
  display: flex;
  align-items: center;
  flex-shrink: 0;

  img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
}

.site-header__nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.site-header__nav-link {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #2EC4B6;
  }
}

.site-header__actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.site-header__action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: none;
  background: none;
  color: var(--text-secondary);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;

  .material-icons {
    font-size: 1.3rem;
  }

  &:hover {
    background: var(--bg-secondary);
    color: #2EC4B6;
  }
}

/* Hamburger */
.site-header__burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 38px;
  height: 38px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;

  span {
    display: block;
    width: 22px;
    height: 2px;
    background: var(--text-primary);
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  &.is-active {
    span:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }
  }
}

@media screen and (max-width: 768px) {
  .site-header__burger {
    display: flex;
    order: 3;
  }

  .site-header__nav {
    display: none;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background: var(--bg-card);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    flex-direction: column;
    padding: 1rem;
    gap: 0;

    &.is-open {
      display: flex;
    }
  }

  .site-header__nav-link {
    padding: 0.75rem 1rem;
    width: 100%;
    border-radius: 8px;

    &:hover {
      background: var(--bg-secondary);
    }
  }

  .site-header__actions {
    margin-left: auto;
    margin-right: 0.5rem;
  }
}
</style>
